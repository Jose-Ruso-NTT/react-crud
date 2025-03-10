import Button from "../components/Button";
import Table from "../components/Table";
import useFetch from "../hooks/useFetch";
import { CarSummary, Column } from "../models";

function Home() {
  const { data, error, isLoading } = useFetch<CarSummary[]>(
    "http://localhost:3000/cars"
  );

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
  if (!data) {
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
        <Table columns={columns} data={data} actions={actions} />
      </div>
    </>
  );
}

export default Home;
