import { NavLink, useLocation } from "react-router";

function Navbar() {
  const location = useLocation();
  const id = location.pathname.split("/").pop();

  return (
    <nav className="bg-gray-100 p-4">
      <ul className="flex text-sm text-gray-600">
        <NavLink to={``}>
          <li>
            <span className="font-semibold">Inicio</span>
          </li>
        </NavLink>

        {id && (
          <>
            <li className="mx-2">/</li>
            <li>
              <span className="font-semibold">Car Detail </span>
            </li>
          </>
        )}
      </ul>
    </nav>
  );
}

export default Navbar;
