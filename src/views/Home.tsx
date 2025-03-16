import { useEffect } from "react";
import Button from "../components/Button";
import Table from "../components/Table";
import { API_CONTEXT, API_URL } from "../env/api-url";
import useApi from "../hooks/useApi";
import { CarSummary, Column } from "../models";

function Home() {
  const {
    data: carSummary,
    error,
    isLoading,
    fetchData,
  } = useApi<CarSummary[]>({
    url: `${API_URL}/${API_CONTEXT.cars}`,
    defaultValue: [],
  });

  useEffect(() => {
    fetchData();
  }, [fetchData]);

  const columns: Column[] = [
    { code: "id", value: "ID" },
    { code: "model", value: "Modelo" },
    { code: "brand", value: "Marca" },
    { code: "total", value: "Total" },
  ];

  const actions = {
    edit: (item: CarSummary) => alert(`Edit ${item["brand"]} `),
    remove: (item: CarSummary) => alert(`Remove ${item["id"]} `),
  };

  if (error) {
    return <div>{error} </div>;
  }
  if (!carSummary) {
    return <div>No hay datos disponibles</div>;
  }

  if (isLoading) {
    return <div>Cargando</div>;
  }

  return (
    <>
      <div className="mt-3 flex flex-col gap-4">
        <Button variant="link" onClick={() => alert("Añadir elemento")}>
          Añadir Elemento
        </Button>
        <Table columns={columns} data={carSummary} actions={actions} />
      </div>
    </>
  );
}

export default Home;
