import { useEffect } from "react";
import Button from "../components/Button";
import Table from "../components/Table";
import { API_CONTEXT, API_URL } from "../env/api-url";
import useApi from "../hooks/useApi";
import { CarSummary, Column } from "../models";

function Home() {
  const {
    data: carSummary,
    error: carSummaryError,
    isLoading: carSummaryIsLoading,
    fetchData: getCars,
  } = useApi<CarSummary[]>({
    defaultValue: [],
  });

  const { fetchData: deleteCar } = useApi<void>({});

  useEffect(() => {
    getCars({ url: `${API_URL}/${API_CONTEXT.cars}` });
  }, [getCars]);

  const columns: Column[] = [
    { code: "id", value: "ID" },
    { code: "model", value: "Modelo" },
    { code: "brand", value: "Marca" },
    { code: "total", value: "Total" },
  ];

  const remove = async (item: CarSummary) => {
    try {
      await deleteCar({
        url: `${API_URL}/${API_CONTEXT.cars}/${item.id}`,
        options: { method: "DELETE" },
      });
      getCars({ url: `${API_URL}/${API_CONTEXT.cars}` });
    } catch (error) {
      console.error("Error deleting car:", error);
    }
  };

  const edit = (item: CarSummary) => alert(`Edit ${item["brand"]} `);

  const actions = {
    edit,
    remove,
  };

  if (carSummaryError) {
    return <div>{carSummaryError} </div>;
  }
  if (!carSummary) {
    return <div>No hay datos disponibles</div>;
  }

  if (carSummaryIsLoading) {
    return <div>Cargando</div>;
  }

  return (
    <>
      <div className="mt-3 flex flex-col gap-4">
        <Button variant="link" href="/create-car">
          Añadir Elemento
        </Button>

        <Table columns={columns} data={carSummary} actions={actions} />
      </div>
    </>
  );
}

export default Home;
