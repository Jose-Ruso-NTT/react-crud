import { useEffect } from "react";
import { useNavigate, useParams } from "react-router";
import Badge from "../components/Badge";
import Button from "../components/Button";
import { API_CONTEXT, API_URL } from "../env/api-url";
import useApi from "../hooks/useApi";
import formatDate from "../hooks/useFormatDate";
import useFormatPrice from "../hooks/useFormatPrice";
import { Car } from "../models";

function CarDetail() {
  const { id } = useParams();
  const navigate = useNavigate();
  const { formatPrice } = useFormatPrice();

  const { data: cars, isLoading, error, fetchData } = useApi<Car>({});

  useEffect(() => {
    fetchData({ url: `${API_URL}/${API_CONTEXT.cars}/${id}` });
  }, [fetchData, id]);

  const onDeleteCar = async () => {
    try {
      await fetchData({
        url: `${API_URL}/${API_CONTEXT.cars}/${id}`,
        options: { method: "DELETE" },
      });
      navigate("/");
    } catch (error) {
      console.error("Error deleting car:", error);
    }
  };

  if (isLoading) {
    return <p>Cargando...</p>;
  }

  if (error) {
    return <p>Ha ocurrido un error: {error}</p>;
  }

  if (!cars) {
    return <p>No se ha encontrado el coche</p>;
  }

  return (
    <div className="mx-auto max-w-6xl rounded-lg bg-white p-6 shadow-md">
      {/* HEADER */}
      <div className="mb-6">
        <div className="flex justify-between">
          <h2 className="mb-4 text-2xl font-bold text-gray-800">
            {cars.brand} &mdash; {cars.model}
          </h2>

          <div className="flex gap-3">
            <Button variant="basic" type="button" onClick={onDeleteCar}>
              Eliminar
            </Button>

            <Button variant="link" href="/edit-car">
              Editar
            </Button>
          </div>
        </div>
        <p className="mb-2 text-gray-600">
          <strong>ID:</strong> {cars.id}
        </p>
        <p className="text-gray-600">
          <strong>Total:</strong> {cars.total}
        </p>
      </div>

      {/* DETAILS */}
      {cars.carDetails.length ? (
        <div>
          <h3 className="mb-4 text-xl font-semibold text-gray-700">
            Stock de coches
          </h3>
          <div className="overflow-x-auto">
            <table className="w-full table-auto border-collapse border border-gray-300">
              <thead className="bg-gray-100">
                <tr className="text-left">
                  <th className="table-cells">Fecha de registro</th>
                  <th className="table-cells">Año de fabricación</th>
                  <th className="table-cells">Precio</th>
                  <th className="table-cells">Kilometraje</th>
                  <th className="table-cells">Matrícula</th>
                  <th className="table-cells">Disponibilidad</th>
                </tr>
              </thead>
              <tbody>
                {cars.carDetails.map((detail, index) => (
                  <tr
                    key={index}
                    className={`table-row ${
                      detail.availability ? "bg-gray-50" : "bg-red-50"
                    }`}
                  >
                    <td className="table-cells">
                      {formatDate(detail.registrationDate)}
                    </td>
                    <td className="table-cells">{detail.manufactureYear}</td>
                    <td className="table-cells text-right">
                      {formatPrice({
                        currency: detail.currency,
                        total: detail.price!,
                      })}
                    </td>
                    <td className="table-cells">
                      <div className="flex items-center justify-between gap-2">
                        {detail.mileage!.toLocaleString()} km
                        <Badge mileage={detail.mileage!} />
                      </div>
                    </td>
                    <td className="table-cells">{detail.licensePlate}</td>
                    <td
                      className={`table-cells font-bold ${
                        detail.availability ? "bg-green-500" : "bg-red-500"
                      }`}
                    >
                      {detail.availability ? "Disponible" : "No disponible"}
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </div>
      ) : (
        <h3 className="mb-4 text-xl font-semibold text-red-600">Sin stock</h3>
      )}
    </div>
  );
}

export default CarDetail;
