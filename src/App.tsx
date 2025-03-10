import "./App.css";
import Footer from "./components/Footer";
import Header from "./components/Header";
import Navbar from "./components/Navbar";
import Home from "./views/Home";

function App() {
  return (
    <div className="min-h-screen flex flex-col">
      <Header />
      <Navbar />

      <main className="mx-auto my-7 w-full max-w-[1400px] flex-1 px-4 sm:px-6 lg:px-8">
        <Home />
      </main>

      <Footer />
    </div>
  );
}

export default App;
