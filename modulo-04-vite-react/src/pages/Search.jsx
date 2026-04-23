import { useFilters } from "../hooks/useFilters.jsx";

import { JobList } from "../components/JobList.jsx";
import { Pagination } from "../components/Pagination.jsx";
import { SearchFormSection } from "../components/SearchFormSection.jsx";
import { LoadingSpinner } from "../components/LoadingSpinner.jsx";

export function SearchPage() {
  const {
    filters,
    loading,
    jobs,
    total,
    totalPages,
    currentPage,
    isFiltersActive,
    searchText,
    errorMsg,
    handlePageChange,
    handleSearch,
    handleTextChange,
    handleClearFilters,
    setCurrentPage,
  } = useFilters();

  const title = loading
    ? `Cargando... - DevJobs`
    : `Resultados: ${total}, Página ${currentPage} - DevJobs`;

  return (
    <main>
      <title>{title}</title>
      <meta
        name="description"
        content="Listado con empleos y filtros para encontrar el trabajo de tus sueños."
      />

      <SearchFormSection
        searchText={searchText}
        onTextChange={handleTextChange}
        filters={filters}
        setFilters={handleSearch} // handleSearch actualiza filters y resetea la página
        isFiltersActive={isFiltersActive}
        onReset={handleClearFilters}
      />

      {/* <div className="results-summary" style={{ margin: "5px 20px" }}>
        <p>
          Se encontraron <strong>total results here</strong> trabajos
          {textToFilter && ` para "${textToFilter}"`}
        </p>
      </div> */}

      <section>
        <h2 className="basic-h2" style={{ textAlign: "center" }}>
          Resultados de búsqueda
        </h2>

        {loading ? (
          <LoadingSpinner />
        ) : (
          <JobList jobs={jobs} errorMsg={errorMsg} />
        )}
        <Pagination
          currentPage={currentPage}
          setCurrentPage={setCurrentPage}
          totalPages={totalPages}
          onPageChange={handlePageChange}
        />
      </section>
    </main>
  );
}

/* 
Logs más informativos 

  Podemos mejorar los logs para ver más información:
    function App() {
      const [currentPage, setCurrentPage] = useState(1)

      console.log('🔵 App renderizado', {
        currentPage,
        timestamp: new Date().toLocaleTimeString(),
      })
      // ...
    }

    function Pagination({ currentPage = 1, totalPages = 5, onPageChange }) {
      console.log('🟢 Pagination renderizado', {
        currentPage,
        totalPages,
        timestamp: new Date().toLocaleTimeString(),  
      })

      // ...
    }


    Ahora verás:
    🔵 App renderizado { currentPage: 1, timestamp: '10:30:45' }
    🟢 Pagination renderizado { currentPage: 1, totalPages: 5, timestamp: '10:30:45' }

    Cuando hagas click:
    🔵 App renderizado { currentPage: 3, timestamp: '10:30:47' }
    🟢 Pagination renderizado { currentPage: 3, totalPages: 5, timestamp: '10:30:47' }

*/

/* ------------------------------------ */

/* ¿Cuándo NO necesitas useEffect? */
/* 
    - No lo uses para transformar datos
    - No lo uses para calcular valores derivados
    - No lo uses para inicializar estado
  */

/* Cuándo SÍ debes usar useEffect */
/* 
    1. Fetching de datos
    2. Modificar el DOM directamente
    3. Suscripciones a eventos

    P.D.: puedes tener varios "useEffect", tantos como quieras
  */

//useEffect para title
/*   useEffect(() => {
    document.title = `Resultados: ${total}, Página ${currentPage} - DevJobs`;
  }, [total, currentPage]); */

/* useEffect(() => {
    // Suscripción a un evento
    const handleResize = () => {
      console.log("Ventana redimensionada");
      console.log(window.innerHeight, window.innerWidth);
    };

    window.addEventListener("resize", handleResize);

    // Limpieza: se ejecuta antes de desmontar o antes de re-ejecutar
    return () => {
      window.removeEventListener("resize", handleResize);
    };
  }, []); */

/* ¿Que está ocurriendo en este "return" de arriba? */
/*
        Esto es importante para evitar "Memory-leaks".
        Lo que se está haciendo aqui es que, para evitar que si este componente se desmonta
        o se renderiza con toda la información (lo que sea...), es "Desuscribirse" a lo que
        te has suscrito. Si no haces esto, cada vez que este efecto se ejectua, estas añadiendo
        un eventListener para el resize y esto, finalmente, podría tener un memory-leak.

        Aunque tenemos el useEffect(() => {...}, []) con un array vacio indicando que se ejecute
        una sola vez, queremos siempre SIEMPRE siempre limpiar eventos, suscripciones o cualquier 
        cosa que pueda darnos problemas a futuro y para ello, lo que podemos hacer dentro del
        efecto, es devolver una función que se va a ejecutar automaticamente, justo antes de volver
        a ejecutar el efecto o justo antes que se desmonte el componente, quando el componente
        desaparece de nuestro arbol de elementos.
  */

/* 
    El useEffect que contiene el document.title (justo arriba), lo habiamos dejado, pero se puede mejorar.
    Una cosa interesante que tiene React es que puedes utilizar directamente la etiqueta Title, entre otras etiquetas,
    directamente en el render. Así, eliminamos ese useEffect, y tenemos el código mucho más limpio.

    Puedes utilizar etiquetas de SEO en el render.
  */
