import "./App.css";
import Table from "./components/Table";
import { Column, DataItem } from "./models";

function App() {
  const columns: Column[] = [
    { code: "id", value: "ID" },
    { code: "model", value: "Modelo" },
    { code: "brand", value: "Marca" },
    { code: "total", value: "Total" },
  ];

  const data = [{ id: "22", model: "Rio", brand: "Kia", total: 25 }];

  const actions = {
    edit: (item: DataItem) => alert(`Edit ${item["brand"]} `),
    remove: (item: DataItem) => alert(`Remove ${item["id"]} `),
  };

  return (
    <>
      <h1 className="text-3xl font-bold underline">CRUD CARS</h1>

      <Table columns={columns} data={data} actions={actions} />
    </>
  );
}

export default App;
