export default function Footer() {
  const currentDate = new Date();
  return (
    <>
      <footer className="bg-gray-800 p-4 text-white">
        <p className="text-sm">
          {currentDate.toLocaleDateString()} José Francisco Ruso. &copy; Todos
          los derechos reservados.
        </p>
      </footer>
    </>
  );
}
