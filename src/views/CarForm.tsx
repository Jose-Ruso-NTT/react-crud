import { useEffect, useState } from "react";
import Button from "../components/Button";
import { API_CONTEXT, API_URL } from "../env/api-url";
import useApi from "../hooks/useApi";
import { CreateCarDto } from "../models";
import { parseDate } from "../utils";

function CarForm() {
  const { fetchData: createCar } = useApi<CreateCarDto>({});
  const { data: brands, fetchData: getBrands } = useApi<string[]>({
    defaultValue: [],
  });
  const { data: models, fetchData: getModels } = useApi<string[]>({
    defaultValue: [],
  });

  const [brandState, setBrandState] = useState("");
  const [modelState, setModelState] = useState("");

  useEffect(() => {
    getBrands({ url: `${API_URL}/${API_CONTEXT.brands}` });
  }, [getBrands]);

  const onChangeBrand = async (event: React.ChangeEvent<HTMLSelectElement>) => {
    const selectedBrand = event.target.value;
    setBrandState(selectedBrand);
    setModelState("");

    await getModels({
      url: `${API_URL}/${API_CONTEXT.brands}/${selectedBrand}/${API_CONTEXT.models}`,
    });
  };

  const onChangeModel = (event: React.ChangeEvent<HTMLSelectElement>) => {
    const selectedModel = event.target.value;
    setModelState(selectedModel);
  };

  const submitCar = async (event: React.FormEvent<HTMLFormElement>) => {
    event.preventDefault();

    const selectedCar: CreateCarDto = {
      brand: brandState,
      model: modelState,
      carDetails: [],
    };

    await createCar({
      url: `${API_URL}/${API_CONTEXT.cars}`,
      options: {
        method: "POST",
        body: JSON.stringify(selectedCar),
        headers: {
          "Content-Type": "application/json",
        },
      },
    });
  };

  return (
    <>
      <form
        className="space-y-6 rounded-lg bg-white p-6 shadow-md"
        onSubmit={submitCar}
      >
        <h2 id="form-title" className="text-xl font-bold text-gray-800">
          Formulario de coches
        </h2>

        <div className="flex flex-col">
          <label htmlFor="brand">Marca</label>
          <select
            name="brand"
            id="brand"
            value={brandState}
            onChange={onChangeBrand}
          >
            <option key="emptyBrand" value={""} disabled>
              Selecciona un marca
            </option>
            {brands &&
              brands.map((brand) => (
                <>
                  <option key={brand} value={brand}>
                    {brand}
                  </option>
                </>
              ))}
          </select>
        </div>

        <div className="flex flex-col">
          <label htmlFor="model">Modelo</label>
          <select
            name="models"
            id="models"
            value={modelState}
            onChange={onChangeModel}
          >
            <option key="emptyModel" value={""} disabled>
              Selecciona un modelo
            </option>
            {models &&
              models.map((model) => (
                <>
                  <option key={model} value={model}>
                    {model}
                  </option>
                </>
              ))}
          </select>
        </div>

        <fieldset className="space-y-4">
          <legend className="text-lg font-semibold">
            Detalles de los coches
          </legend>
          <section className="space-y-4 rounded-lg border p-4 shadow-sm">
            <h3 className="text-lg font-semibold">Detalles del coche #1</h3>

            <div className="grid grid-cols-1 gap-4 sm:grid-cols-2">
              <div className="flex flex-col">
                <label htmlFor="registrationDate-{{ i }}">
                  Fecha de registro
                </label>
                <input
                  id="registrationDate-{{ i }}"
                  type="date"
                  max={parseDate(new Date().toISOString())}
                  required
                />
              </div>

              <div className="flex flex-col">
                <label htmlFor="manufactureYear-{{ i }}">
                  Año de fabricación
                </label>
                <input
                  type="number"
                  placeholder="Introduzca un año de fabricación"
                  min={1900}
                  max={new Date().getFullYear()}
                />
              </div>
            </div>
          </section>
        </fieldset>

        <section className="flex justify-between gap-2">
          <Button variant="success" type="button" onClick={() => {}}>
            Añadir detalles del coche
          </Button>

          <Button variant="basic" type="submit">
            Crear coche
          </Button>
        </section>
      </form>
    </>
  );
}

export default CarForm;
