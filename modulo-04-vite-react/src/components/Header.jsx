import { Link } from "./Link";

export function Header() {
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
        <Link href="/">Inicio</Link>
        <Link href="/search" target="_self">
          Empleos
        </Link>
        <Link href="/contact">Contacto</Link>
      </nav>
    </header>
  );
}
