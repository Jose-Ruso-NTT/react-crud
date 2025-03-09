import "./App.css";
import Footer from "./components/Footer";
import Header from "./components/Header";
import Table from "./components/Table";
import { Column, DataItem } from "./models";

function App() {
  const columns: Column[] = [
    { code: "id", value: "ID" },
    { code: "brand", value: "Marca" },
    { code: "model", value: "Modelo" },
    { code: "total", value: "Total" },
  ];

  const data = [
    {
      id: "e848381c-43a3-4de5-a479-fb47441f8dcd",
      brand: "	Toyota",
      model: "Corolla",
      total: 1,
    },
  ];

  const actions = {
    edit: (item: DataItem) => alert(`Edit ${item["brand"]} `),
    remove: (item: DataItem) => alert(`Remove ${item["id"]} `),
  };

  return (
    <div className="min-h-screen flex flex-col">
      <Header />

      <main className="mx-auto my-7 w-full max-w-[1400px] flex-1 px-4 sm:px-6 lg:px-8">
        <Table columns={columns} data={data} actions={actions} />
      </main>

      <Footer />
    </div>
  );
}

export default App;
