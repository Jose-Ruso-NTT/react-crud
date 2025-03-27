import { useEffect } from "react";
import { BrowserRouter, Route, Routes } from "react-router";
import "./App.css";
import Footer from "./components/Footer";
import Header from "./components/Header";
import Navbar from "./components/Navbar";
import useLocalStorage from "./hooks/useLocalStorage";
import CarDetail from "./views/CarDetail";
import CarForm from "./views/CarForm";
import Home from "./views/Home";

function App() {
  const { setItem } = useLocalStorage();

  useEffect(() => {
    setItem("token", "mock-token");
  }, [setItem]);

  return (
    <>
      <Header />
      <BrowserRouter>
        <div className="min-h-screen flex flex-col">
          <Navbar />

          <main className="mx-auto my-7 w-full max-w-[1400px] flex-1 px-4 sm:px-6 lg:px-8">
            <Routes>
              <Route path="/" element={<Home />} />
              <Route path="/car-detail/:id" element={<CarDetail />} />
              <Route path="/create-car" element={<CarForm />} />
            </Routes>
          </main>

          <Footer />
        </div>
      </BrowserRouter>
    </>
  );
}

export default App;
