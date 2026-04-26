import { NavLink } from "react-router";
import { useAuthStore } from "../store/authStore";
import { useFavoritesStore } from "../store/favoritesStore";

const HeaderUserButton = () => {
  const { isLoggedIn, login, logout } = useAuthStore();
  const { clearFavorites } = useFavoritesStore();

  const handleLogout = () => {
    logout();
    clearFavorites();
  };

  return isLoggedIn ? (
    <button onClick={handleLogout}>Cerrar sesión</button>
  ) : (
    <button onClick={login}>Iniciar sesión</button>
  );
};

export function Header() {
  const { isLoggedIn } = useAuthStore();
  const { countFavorites } = useFavoritesStore();

  const numberOfFavorites = countFavorites();

  return (
    <header>
      <a href="/" style={{ textDecoration: "none" }}>
        <h1 style={{ color: "white" }}>
          <svg
            fill="none"
            stroke="currentColor"
            strokeLinecap="round"
            strokeLinejoin="round"
            strokeWidth="2"
            viewBox="0 0 24 24"
            xmlns="http://www.w3.org/2000/svg"
          >
            <polyline points="16 18 22 12 16 6"></polyline>
            <polyline points="8 6 2 12 8 18"></polyline>
          </svg>
          DevJobs
        </h1>
      </a>
      <nav>
        <a
          href="https://github.com/HelixGuardi"
          target="_blank"
          rel="noopener noreferrer"
          className="non-active-anchor"
        >
          GitHub
        </a>
        {/* <NavLink
          to="/"
          className={({ isActive }) =>
            isActive ? "active-anchor" : "non-active-anchor"
          }
        >
          Inicio
        </NavLink> */}
        <NavLink
          to="/search"
          target="_self"
          className={({ isActive }) =>
            isActive ? "active-anchor" : "non-active-anchor"
          }
        >
          Empleos
        </NavLink>

        {isLoggedIn && (
          <NavLink
            className={({ isActive }) =>
              isActive ? "active-anchor" : "non-active-anchor"
            }
            to="/profile"
          >
            Profile ❤️{numberOfFavorites}
          </NavLink>
        )}

        <NavLink
          to="/contact"
          className={({ isActive }) =>
            isActive ? "active-anchor" : "non-active-anchor"
          }
        >
          Contacto
        </NavLink>
      </nav>

      <HeaderUserButton />
    </header>
  );
}
