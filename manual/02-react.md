# 02 — Patrones React (DevJobs)

Fuente: `modulo-04-vite-react` (SPA sin React Router) → `modulo-05-EstadoGlobal-y-ReactRouter` (React Router 7 + Zustand).  
CDN React (`modulo-04-cdn-react`) = primer contacto JSX; no tiene sección propia aquí.

---

### Estructura Vite + React

**Cuándo usarlo:** al arrancar cualquier SPA React con Vite (entry → App → páginas/componentes).

**Código:**

```jsx
// modulo-04-vite-react/src/main.jsx
import { StrictMode } from "react";
import { createRoot } from "react-dom/client";
import App from "./App.jsx";
import "./index.css";
import "./styles/404framework.css";

createRoot(document.getElementById("root")).render(
  <StrictMode>
    <App />
  </StrictMode>,
);
```

```js
// modulo-04-vite-react/vite.config.js
import { defineConfig } from 'vite'
import react from '@vitejs/plugin-react'

export default defineConfig({
  plugins: [react()],
})
```

```jsx
// modulo-04-vite-react/src/App.jsx (layout + rutas caseras)
function App() {
  const { isOnline, isShown, isMounted } = useNetworkStatus();

  return (
    <>
      {isMounted && <NetworkToastCard isOnline={isOnline} isShown={isShown} />}
      <Header />
      <Route path="/" component={HomePage} />
      <Route path="/search" component={SearchPage} />
      <Route path="/contact" component={Contact} />
      <Route path="/notFoundPage" component={NotFoundPage} />
      <Footer />
    </>
  );
}
```

**Gotcha / nota:** en m05 el `main.jsx` envuelve con `<BrowserRouter>` y quitas `StrictMode` en ese entry. Carpetas que te funcionaron: `components/`, `hooks/`, `pages/`, `store/`, `context/`, `styles/`.

---

### Componentes y props (JobCard, JobList, Header, Footer)

**Cuándo usarlo:** UI reutilizable que recibe datos/handlers del padre; el padre orquesta, el hijo presenta.

**Código:**

```jsx
// modulo-04-vite-react/src/components/JobCard.jsx
export function JobCard({ job }) {
  const { id, titulo, empresa, ubicacion, descripcion } = job;
  const [isApplied, setIsApplied] = useState(false);
  // ...
  return (
    <article
      key={id}
      className="job-listing-card"
      data-modalidad={job.data.modalidad}
      data-nivel={job.data.nivel}
      data-technology={job.data.technology}
    >
      {/* ... */}
      <button className={buttonClasses} onClick={handleApplyClick}>
        {buttonText}
      </button>
    </article>
  );
}
```

```jsx
// modulo-04-vite-react/src/components/JobList.jsx
export function JobList({ jobs, errorMsg }) {
  return (
    <>
      {errorMsg ? (
        <ErrorMsg mensajeDeError={errorMsg} />
      ) : (
        <div className="jobs-listings">
          {jobs.map((job) => (
            <JobCard key={job.id} job={job} />
          ))}
        </div>
      )}
    </>
  );
}
```

```jsx
// modulo-04-vite-react/src/components/Header.jsx
export function Header() {
  return (
    <header>
      {/* logo */}
      <nav>
        <Link href="/">Inicio</Link>
        <Link href="/search" target="_self">Empleos</Link>
        <Link href="/contact">Contacto</Link>
      </nav>
    </header>
  );
}
```

```jsx
// modulo-04-vite-react/src/components/Footer.jsx
export function Footer() {
  return (
    <footer>
      <small>&copy; 2025 DevJobs. Todos los derechos reservados.</small>
    </footer>
  );
}
```

**Gotcha / nota:** la `key` va en el `.map` del padre (`JobList`), no hace falta (ni conviene) en el `<article>` del hijo. En m05 `JobCard` gana links a detalle + botones que leen Zustand sin recibir auth por props.

---

### Composición con children (Link, Route)

**Cuándo usarlo:** cuando el componente es un “envoltorio” (nav, layout, ruta) y el contenido lo decide quien lo usa.

**Código:**

```jsx
// modulo-04-vite-react/src/components/Link.jsx
export function Link({ href, children, ...restOfProps }) {
  const { navigateTo, currentPath } = useRouter();
  const isActive = (path) => currentPath === path;

  const handleClick = (event) => {
    event.preventDefault();
    navigateTo(href);
  };

  return (
    <a
      href={href}
      {...restOfProps}
      onClick={handleClick}
      className={isActive(href) ? "active-anchor" : "non-active-anchor"}
    >
      {children}
    </a>
  );
}
```

```jsx
// modulo-04-vite-react/src/components/Route.jsx
export function Route({ path, component: Component }) {
  const { currentPath } = useRouter();
  if (currentPath !== path) return null;
  return <Component />;
}
```

**Gotcha / nota:** sin `preventDefault`, el `<a>` recarga la página y se acaba la SPA. `...restOfProps` deja pasar `target`, `className`, etc. En m05 tu `Link` reutiliza el de `react-router` (`to={href}`) pero sigues exponiendo la misma API `href` + `children`.

---

### Router casero (`useRouter`, `history.pushState`, `popstate`)

**Cuándo usarlo:** SPA pequeña sin dependencia de router, o para entender qué hace React Router por debajo.

**Código:**

```jsx
// modulo-04-vite-react/src/hooks/useRouter.jsx
export function useRouter() {
  const [currentPath, setCurrentPath] = useState(window.location.pathname);

  useEffect(() => {
    const handleLocationChange = () => {
      setCurrentPath(window.location.pathname);
    };

    window.addEventListener("popstate", handleLocationChange);
    return () => {
      window.removeEventListener("popstate", handleLocationChange);
    };
  }, []);

  function navigateTo(path) {
    window.history.pushState({}, "", path);
    window.dispatchEvent(new PopStateEvent("popstate"));
  }

  return { currentPath, navigateTo };
}
```

**Gotcha / nota:** `pushState` solo no re-renderiza React: tienes que emitir `popstate` a mano. El cleanup del listener evita memory leaks. En m05 este hook se reduce a un thin wrapper sobre `useNavigate` / `useLocation` (el casero queda como aprendizaje).

---

### useFilters (`Set`, `data-*`)

**Cuándo usarlo:** listado con filtros + texto + paginación + URL sincronizada + persistencia.

**Código (React — filtros vía API):**

```jsx
// modulo-04-vite-react/src/hooks/useFilters.jsx
const RESULTS_PER_PAGE = 4;

export function useFilters() {
  const [filters, setFilters] = useState(() => {
    const storedFilters = localStorage.getItem("jobFilters");
    return storedFilters
      ? JSON.parse(storedFilters)
      : { technology: "", location: "", experienceLevel: "" };
  });
  // ...
  useEffect(() => {
    async function fecthJobs() {
      const params = new URLSearchParams();
      if (searchText) params.append("text", searchText);
      if (filters.technology) params.append("technology", filters.technology);
      if (filters.location) params.append("type", filters.location);
      if (filters.experienceLevel)
        params.append("level", filters.experienceLevel);

      const offset = (currentPage - 1) * RESULTS_PER_PAGE;
      params.append("limit", RESULTS_PER_PAGE);
      params.append("offset", offset);

      const response = await fetch(
        `https://jscamp-api.vercel.app/api/jobs?${queryParams}`,
      );
      // setJobs / setTotal / error / finally setLoading(false)
    }
    fecthJobs();
  }, [filters, searchText, currentPage]);
}
```

```jsx
// modulo-04-vite-react/src/components/JobCard.jsx — data-* heredados del listado vainilla
data-modalidad={job.data.modalidad}
data-nivel={job.data.nivel}
data-technology={job.data.technology}
```

**Código (origen `Set` + `data-*` — vainilla, no React):**

```js
// modulo-02-y-03-HTML-CSS-JS/filters.js
const techArrFilteredValue = new Set();

const filtering = () => {
  const jobs = document.querySelectorAll(".job-listing-card");
  jobs.forEach((job) => {
    const technologyArr = job.getAttribute("data-technology").split(",");
    const modalidad = job.getAttribute("data-modalidad");
    const nivel = job.getAttribute("data-nivel");
    const matchesTech =
      techArrFilteredValue.size === 0 ||
      technologyArr.some((tech) => techArrFilteredValue.has(tech));
    // ...
    job.classList.toggle("is-hidden", !isShown);
  });
};
```

**Gotcha / nota:** en React **no** usas `Set` para filtrar el DOM: filtras en servidor con query params. Los `data-*` en `JobCard` son residuo útil/documental del módulo HTML. En m05 `useFilters` lee/escribe URL con `useSearchParams` en vez de `navigateTo`. Bug fácil en m04: el init de `currentPage` tiene la condición de `Number.isNaN` invertida (`return Number.isNaN(page) ? page : 1`).

---

### useNetworkStatus (online/offline)

**Cuándo usarlo:** toast de conectividad sin acoplarlo a cada página.

**Código:**

```jsx
// modulo-04-vite-react/src/hooks/useNetworkStatus.jsx
export function useNetworkStatus() {
  const [isOnline, setIsOnline] = useState(navigator.onLine);
  const [isShown, setIsShown] = useState(false);
  const [isMounted, setIsMounted] = useState(false);

  useEffect(() => {
    const goOnline = () => setIsOnline(true);
    const goOffline = () => setIsOnline(false);
    window.addEventListener("online", goOnline);
    window.addEventListener("offline", goOffline);
    return () => {
      window.removeEventListener("online", goOnline);
      window.removeEventListener("offline", goOffline);
    };
  }, []);

  useEffect(() => {
    setIsShown(true);
    setIsMounted(true);
    const hideToastTimer = setTimeout(() => setIsShown(false), HIDE_DELAY);
    const stopRenderTimer = setTimeout(() => setIsMounted(false), UNMOUNT_DELAY);
    return () => {
      clearTimeout(hideToastTimer);
      clearTimeout(stopRenderTimer);
    };
  }, [isOnline]);

  return { isOnline, isShown, isMounted };
}
```

**Gotcha / nota:** el efecto de `[isOnline]` también corre al montar (toast al arrancar). Offline→online→offline rápido puede solapar timers (tú mismo lo anotaste en el archivo). Separar `isShown` (animación) de `isMounted` (desmontar del árbol) evita cortes bruscos.

---

### useContactForm, useSearchForm

**Cuándo usarlo:** formulario controlado con lógica de UI (modal, disable, reset) fuera del JSX de la página.

**Código:**

```jsx
// modulo-04-vite-react/src/hooks/useContactForm.jsx
export function useContactForm() {
  const [formData, setFormData] = useState({
    firstname: "", surname: "", email: "", phone: "", comment: "",
  });

  const handleFormDataValues = (field, value) => {
    setFormData((prev) => ({ ...prev, [field]: value }));
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    setShowModal(true);
    setDisableSubmitBtn(true);
  };
  // useEffect: blur del contenedor + countdown + reset al cerrar modal
  return {
    formData, showModal, progressBar, disableSubmitBtn,
    handleFormDataValues, handleSubmit,
  };
}
```

```jsx
// modulo-04-vite-react/src/pages/Contact.jsx
const { formData, handleFormDataValues, handleSubmit, /* ... */ } = useContactForm();
// input controlado:
value={formData.firstname}
onChange={(e) => handleFormDataValues("firstname", `${e.target.value}`)}
```

```jsx
// modulo-04-vite-react/src/hooks/useSearchForm.jsx — cuerpo comentado (migrado)
// El patrón que dejaste apuntado (FormData + ids):
const formData = new FormData(e.currentTarget);
const filters = {
  technology: formData.get(idTechnology),
  location: formData.get(idLocation),
  experienceLevel: formData.get(idExperienceLevel),
};
onSearch(filters);
```

**Gotcha / nota:** `useSearchForm.jsx` está **vacío en runtime** (todo comentado). La búsqueda real vive en `useFilters` + `SearchFormSection`. No hagas `document.getElementById(...).reset()`: tú mismo marcaste que el form tiene que ser controlado (arreglado en `useFilters` / `handleClearFilters`).

---

### Debounce en búsqueda

**Cuándo usarlo:** input que dispara fetch; quieres UI instantánea pero API tras pausa de escritura.

**Código:**

```jsx
// modulo-04-vite-react/src/hooks/useFilters.jsx
const timeoutId = useRef(null);

const handleTextChange = (value) => {
  if (timeoutId.current) clearTimeout(timeoutId.current);
  timeoutId.current = setTimeout(() => {
    setSearchText(value);
    setCurrentPage(1);
  }, 500);
};
```

```jsx
// modulo-04-vite-react/src/components/SearchFormSection.jsx
const [inputValue, setInputValue] = useState(searchText);

useEffect(() => {
  setInputValue(searchText);
}, [searchText]);

<input
  value={inputValue}
  onChange={(e) => {
    const newValue = e.target.value;
    setInputValue(newValue);   // UI al instante
    onTextChange(newValue);    // debounce → searchText → fetch
  }}
/>
```

**Gotcha / nota:** dos estados: `inputValue` (local) y `searchText` (el que entra en el `useEffect` del fetch). Sin `clearTimeout` en reset, puedes aplicar un texto viejo después de limpiar filtros.

---

### Fetching con loading/error (LoadingSpinner, ErrorMsg)

**Cuándo usarlo:** cualquier pantalla que espere red; el usuario necesita feedback de carga y fallo.

**Código:**

```jsx
// modulo-04-vite-react/src/pages/Search.jsx
{loading ? (
  <LoadingSpinner />
) : (
  <JobList jobs={jobs} errorMsg={errorMsg} />
)}
```

```jsx
// modulo-04-vite-react/src/hooks/useFilters.jsx (dentro del try/catch/finally)
setErrorMsg(null);
setLoading(true);
// ...
if (!response.ok) {
  throw new Error(
    `Hmmm… esto no debería haber pasado. Código: ${response.status}`,
  );
}
// ...
} catch (error) {
  setErrorMsg(`Hmmm... esto no debería haber pasado. Error: ${error.message}`);
} finally {
  setLoading(false);
}
```

```jsx
// modulo-04-vite-react/src/components/ErrorMsg.jsx
export function ErrorMsg({ mensajeDeError }) {
  const handleRefreshPage = () => {
    window.location.reload();
  };
  // ...
}
```

**Gotcha / nota:** `finally` siempre apaga el spinner (también en error). En detalle m05 el fetch es por `jobId` con `useParams` y estados locales `loading` / `error` / `job` (mismo trío, otra página).

---

### Pagination

**Cuándo usarlo:** APIs con `limit`/`offset` (o equivalente) y UI de páginas.

**Código:**

```jsx
// modulo-04-vite-react/src/hooks/useFilters.jsx
const offset = (currentPage - 1) * RESULTS_PER_PAGE;
params.append("limit", RESULTS_PER_PAGE);
params.append("offset", offset);
const totalPages = Math.ceil(total / RESULTS_PER_PAGE);
```

```jsx
// modulo-04-vite-react/src/components/Pagination.jsx
export function Pagination({ currentPage = 1, totalPages = 10, onPageChange }) {
  const pages = Array.from({ length: totalPages }, (_, i) => i + 1);
  const handleChangePage = (e) => {
    e.preventDefault();
    const page = Number(e.target.dataset.page);
    if (page !== currentPage) onPageChange(page);
  };
  // <a href={buildPageUrl(page)} data-page={page} onClick={handleChangePage}>
}
```

**Gotcha / nota:** la API no usa `page`; tú conviertes página → offset. Los `<a>` con `href` real + `preventDefault` permiten abrir en pestaña nueva y seguir siendo SPA al clic normal. Al cambiar filtros, resetea a página 1 (`handleSearch` / debounce).

---

### localStorage

**Cuándo usarlo:** recordar filtros/texto entre recargas sin backend de usuario.

**Código:**

```jsx
// modulo-04-vite-react/src/hooks/useFilters.jsx
const [filters, setFilters] = useState(() => {
  const storedFilters = localStorage.getItem("jobFilters");
  return storedFilters
    ? JSON.parse(storedFilters)
    : { technology: "", location: "", experienceLevel: "" };
});

useEffect(() => {
  localStorage.setItem("jobFilters", JSON.stringify(filters));
}, [filters]);

useEffect(() => {
  localStorage.setItem("searchText", JSON.stringify(searchText));
}, [searchText]);

// al limpiar:
localStorage.removeItem("jobFilters");
```

**Gotcha / nota:** solo strings → `JSON.stringify` / `JSON.parse`. Inicializa el estado con función (`useState(() => ...)`) para no leer `localStorage` en cada render. En m05 priorizas query string y caes a `localStorage` si la URL no trae filtros.

---

### CSS Modules

**Cuándo usarlo:** estilos de un componente concreto sin contaminar clases globales.

**Código:**

```jsx
// modulo-04-vite-react/src/components/Pagination.jsx
import styles from "./Pagination.module.css";
// ...
<nav className={styles.pagination}>
  <a
    href={buildPageUrl(page)}
    className={currentPage === page ? styles.isActive : ""}
  >
```

```css
/* modulo-04-vite-react/src/components/Pagination.module.css */
.pagination {
  display: flex;
  justify-content: center;
  gap: 0.5rem;
  margin-block: 2rem;
}
.isActive {
  background-color: var(--primary-light);
  color: white;
  pointer-events: none;
}
```

```jsx
// modulo-05-EstadoGlobal-y-ReactRouter/src/components/JobCard.jsx
import styles from "../styles/JobCard.module.css";
<Link className={styles.title} href={`/jobs/${id}`}>{titulo}</Link>
```

**Gotcha / nota:** Modules para componente; CSS global (`index.css`, reset, `:root`) para lo transversal. Clases se usan como `styles.nombre`, no como string suelto.

---

### React Router 7 (`Routes`, `Route`, `useParams`, `Navigate`, `Link`)

**Cuándo usarlo:** SPA con rutas anidadas, params, redirects y catch-all real.

**Código:**

```jsx
// modulo-05-EstadoGlobal-y-ReactRouter/src/main.jsx
import { BrowserRouter } from "react-router";
createRoot(document.getElementById("root")).render(
  <BrowserRouter>
    <App />
  </BrowserRouter>,
);
```

```jsx
// modulo-05-EstadoGlobal-y-ReactRouter/src/App.jsx
import { Routes, Route } from "react-router";
<Routes>
  <Route path="/" element={<HomePage />} />
  <Route path="/search" element={<SearchPage />} />
  <Route path="/jobs/:jobId" element={<JobDetail />} />
  <Route path="/login" element={<Login />} />
  <Route path="*" element={<NotFoundPage />} />
</Routes>
```

```jsx
// modulo-05-EstadoGlobal-y-ReactRouter/src/pages/Detail.jsx
const { jobId } = useParams();
const navigate = useNavigate();
```

```jsx
// modulo-05-EstadoGlobal-y-ReactRouter/src/components/Link.jsx
import { Link as NavLink } from "react-router";
return (
  <NavLink to={href} {...restOfProps}>
    {children}
  </NavLink>
);
```

**Gotcha / nota:** sin `BrowserRouter` en el entry, los hooks de router explotan. El casero m04 no entiende `/jobs/:jobId`; aquí el param llega con `useParams`. En Header usas `NavLink` con `className={({ isActive }) => ...}`.

---

### lazy + Suspense

**Cuándo usarlo:** code-splitting de páginas para no cargar todo el bundle al primer paint.

**Código:**

```jsx
// modulo-05-EstadoGlobal-y-ReactRouter/src/App.jsx
import { lazy, Suspense } from "react";

const NotFoundPage = lazy(() => import("./pages/404.jsx"));
const HomePage = lazy(() => import("./pages/Home.jsx"));
const SearchPage = lazy(() => import("./pages/Search.jsx"));
const JobDetail = lazy(() => import("./pages/Detail.jsx"));
// ...

<Suspense fallback={<LoadingSpinner />}>
  <Routes>{/* ... */}</Routes>
</Suspense>
```

**Gotcha / nota:** las páginas lazy deben ser `export default` (como `Detail.jsx`, `Login.jsx`). Un solo `Suspense` alrededor de `Routes` reutiliza tu `LoadingSpinner` como fallback de navegación.

---

### Context API + `use()` (AuthContext, FavContext)

**Cuándo usarlo:** estado global que cambia poco (auth, tema) y quieres cero librerías; o como paso de aprendizaje antes de Zustand.

**Código:**

```jsx
// modulo-05-EstadoGlobal-y-ReactRouter/src/context/AuthContext.jsx
import { createContext, use, useState } from "react";

export const AuthContext = createContext();

export function AuthProvider({ children }) {
  const [isLoggedIn, setIsLoggedIn] = useState(false);
  const login = () => setIsLoggedIn(true);
  const logout = () => setIsLoggedIn(false);
  const value = { isLoggedIn, login, logout };
  return <AuthContext value={value}>{children}</AuthContext>;
}

export function useAuth() {
  const context = use(AuthContext);
  if (context === undefined) {
    throw new Error("useAuth must be used within an AuthProvider");
  }
  return context;
}
```

```jsx
// modulo-05-EstadoGlobal-y-ReactRouter/src/context/FavContext.jsx
export function FavoritesProvider({ children }) {
  const [favorites, setFavorites] = useState([]);
  // addFavorite / removeFavorite / isFavorite
  return <FavoritesContext value={value}>{children}</FavoritesContext>;
}

export function useFavorites() {
  const context = use(FavoritesContext);
  if (context === undefined) {
    throw new Error("useFavorites must be used within a FavoritesProvider");
  }
  return context;
}
```

**Gotcha / nota:** `use()` es React 19 (alternativa a `useContext`). En la app final **no** montas estos providers en `main.jsx`/`App.jsx`: quedaron como referencia; la UI real consume Zustand. Sin provider, el hook debe tirar error (guard que ya escribiste).

---

### Zustand (`authStore`, `favoritesStore`) vs Context

**Cuándo usarlo:** estado global que tocan Header, cards, detalle y rutas protegidas sin providers ni re-renders masivos.

**Código:**

```js
// modulo-05-EstadoGlobal-y-ReactRouter/src/store/authStore.js
import { create } from "zustand";

export const useAuthStore = create((set) => ({
  isLoggedIn: false,
  login: () => set({ isLoggedIn: true }),
  logout: () => set({ isLoggedIn: false }),
}));
```

```js
// modulo-05-EstadoGlobal-y-ReactRouter/src/store/favoritesStore.js
export const useFavoritesStore = create((set, get, store) => ({
  favorites: [],
  clearFavorites: () => set(store.getInitialState()),
  addFavorite: (jobId) => {
    set((state) => ({
      favorites: state.favorites.includes(jobId)
        ? state.favorites
        : [...state.favorites, jobId],
    }));
  },
  toggleFavorite: (jobId) => {
    const { addFavorite, removeFavorite, isFavorite } = get();
    isFavorite(jobId) ? removeFavorite(jobId) : addFavorite(jobId);
  },
  countFavorites: () => get().favorites.length,
}));
```

```jsx
// modulo-05-EstadoGlobal-y-ReactRouter/src/components/Header.jsx
const { isLoggedIn, login, logout } = useAuthStore();
const { clearFavorites, countFavorites } = useFavoritesStore();
```

**Por qué Zustand frente a Context (según tus apuntes en `App.jsx`):** Context vale para datos globales que cambian poco; si el estado cambia a menudo o la app crece, Context re-renderiza de más y se queda corto. Zustand evita el árbol de providers y deja leer/actualizar el store desde cualquier componente (`JobCard`, `Detail`, `ProtectedRoute`, `Login`) sin prop drilling.

**Gotcha / nota:** auth es mock (cualquier email/password → `login()`). Favoritos viven solo en memoria. En `JobCardFavoriteButton` te suscribes a toda la store (`useFavoritesStore()` sin selector): funciona, pero es el sitio típico donde luego querrás seleccionar slices.

---

### Prop drilling vs contexto (m04 vs m05)

**Cuándo usarlo:** props para flujo local padre→hijo (1–3 niveles); store/contexto cuando Header, cards y páginas lejanas comparten el mismo dato.

**Código — prop drilling (m04, Search):**

```jsx
// modulo-04-vite-react/src/pages/Search.jsx
<SearchFormSection
  searchText={searchText}
  onTextChange={handleTextChange}
  filters={filters}
  setFilters={handleSearch}
  isFiltersActive={isFiltersActive}
  onReset={handleClearFilters}
/>
{loading ? <LoadingSpinner /> : <JobList jobs={jobs} errorMsg={errorMsg} />}
<Pagination
  currentPage={currentPage}
  totalPages={totalPages}
  onPageChange={handlePageChange}
/>
```

Aquí el dato de búsqueda pertenece al flujo de la página: bajar props es correcto.

**Código — sin drilling de auth/favs (m05):**

```jsx
// modulo-05-EstadoGlobal-y-ReactRouter/src/components/JobCard.jsx
function JobCardFavoriteButton({ jobId }) {
  const { isLoggedIn } = useAuthStore();
  const { toggleFavorite, isFavorite } = useFavoritesStore();
  // no recibe isLoggedIn ni favorites desde JobList / SearchPage
}
```

```jsx
// JobList sigue igual de “tonto”: solo jobs + errorMsg
export function JobList({ jobs, errorMsg }) { /* map → JobCard */ }
```

**Gotcha / nota:** no sustituyas todo prop drilling por store. Filtros/paginación siguen en props/hook de página. Auth y favoritos cruzan Header ↔ Profile ↔ Detail ↔ JobCard → ahí sí store (o Context si fuera poco frecuente y sin Zustand).

---

### ProtectedRoute + Navigate

**Cuándo usarlo:** pantallas que requieren sesión (profile, checkout, settings).

**Código:**

```jsx
// modulo-05-EstadoGlobal-y-ReactRouter/src/components/ProtectedRoute.jsx
import { useAuthStore } from "../store/authStore";
import { Navigate } from "react-router";

export function ProtectedRoute({ children, redirectTo = "/login" }) {
  const { isLoggedIn } = useAuthStore();

  if (!isLoggedIn) {
    return <Navigate to={redirectTo} replace />;
  }

  return children;
}
```

```jsx
// modulo-05-EstadoGlobal-y-ReactRouter/src/App.jsx
<Route
  path="/profile"
  element={
    <ProtectedRoute redirectTo="/login">
      <ProfilePage />
    </ProtectedRoute>
  }
/>
```

**Gotcha / nota:** `replace` evita que “atrás” te deje en un bucle login↔ruta protegida. Es composición con `children`, no un HOC. Si mañana cambias Zustand por Context, solo tocas la lectura de `isLoggedIn` aquí.

---

### Markdown con snarkdown + `dangerouslySetInnerHTML`

**Cuándo usarlo:** campos de oferta en Markdown que deben renderizarse como HTML en el detalle.

**Código:**

```jsx
// modulo-05-EstadoGlobal-y-ReactRouter/src/pages/Detail.jsx
import snarkdown from "snarkdown";

function JobSection({ title, content }) {
  const html = snarkdown(content);

  return (
    <section className={styles.section}>
      <h2 className={styles.sectionTitle}>{title}</h2>
      <div
        className={`${styles.sectionContent} prose`}
        dangerouslySetInnerHTML={{ __html: html }}
      />
    </section>
  );
}
```

**Gotcha / nota:** el nombre no miente: HTML inyectado = riesgo XSS si el Markdown no es de confianza. Aquí el contenido viene de tu API de curso. No concatenes HTML de usuario sin sanitizar.

---

## Checklist para empezar un proyecto React desde cero

1. **Vite** — `npm create vite@latest` (template React), plugin `@vitejs/plugin-react`, scripts `dev` / `build` / `preview` (como en `modulo-04-vite-react/package.json`).
2. **Estructura** — `main.jsx` → `App.jsx`; carpetas `components/`, `pages/`, `hooks/`, `styles/`; CSS global en `index.css`.
3. **Router** — primero casero (`useRouter` + `Link`/`Route`) si quieres aprender; en producto: `BrowserRouter` + `Routes`/`Route` (React Router 7), `path="*"` para 404, params con `useParams`.
4. **Estado global** — props para flujo local (Search); Context/`use()` para auth simple; Zustand cuando Header + cards + rutas protegidas comparten estado que cambia.
5. **Primer fetch** — trío `loading` / `data` / `error` en un hook o página; UI con `LoadingSpinner` + `ErrorMsg`; `try/catch/finally`.
6. **Primer formulario** — controlado (`value` + `onChange`) o `FormData` en submit; debounce en búsqueda; `localStorage` solo si quieres recordar filtros.
7. **Deploy** — `vite build` → estáticos en `dist/`; preview local con `vite preview`; host tipo Vercel (en el curso la API ya está en Vercel). SPA: configurar fallback a `index.html` en el host para que `/jobs/:id` no 404 en refresh.

---

*Patrones 1–19 + checklist. Siguiente manual: backend (m06 Node / Express) con el mismo esquema.*
