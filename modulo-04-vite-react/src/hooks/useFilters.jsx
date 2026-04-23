/**
 * useFilters - Hook personalizado para la gestión de búsqueda y filtros
 *
 * Características principales:
 * - Persistencia en localStorage de filtros y texto de búsqueda.
 * - Paginación con offset/limit.
 * - Debounce en la búsqueda por texto usando useRef para evitar peticiones excesivas.
 * - Manejo de estado de carga y errores.
 *
 * El debounce se implementa en handleTextChange, que retrasa 500ms la
 * actualización de searchText (el estado que dispara el fetch).
 *
 * Los componentes que usen este hook deben pasar el valor del input a
 * handleTextChange, y el hook se encarga de gestionar el timeout.
 */

import { useEffect, useState, useRef } from "react";
import { useRouter } from "./useRouter";
const RESULTS_PER_PAGE = 4;

export function useFilters() {
  const [filters, setFilters] = useState(() => {
    const storedFilters = localStorage.getItem("jobFilters");
    return storedFilters
      ? JSON.parse(storedFilters)
      : { technology: "", location: "", experienceLevel: "" };
  });

  const timeoutId = useRef(null);

  // Estado que se usa en el fetch y se actualiza con el debounce
  const [searchText, setSearchText] = useState(() => {
    const storedTextFilter = localStorage.getItem("searchText");
    return storedTextFilter ? JSON.parse(storedTextFilter) : "";
  });

  const [currentPage, setCurrentPage] = useState(() => {
    const params = new URLSearchParams(window.location.search);
    const page = Number(params.get("page")) || 1;
    return Number.isNaN(page) ? page : 1;
  });

  const [jobs, setJobs] = useState([]);
  const [total, setTotal] = useState(0);
  const [loading, setLoading] = useState(true);
  const [isFiltersActive, setIsFiltersActive] = useState(false);
  const [errorMsg, setErrorMsg] = useState(null);

  const { navigateTo } = useRouter();

  const hasActiveFilters = () => {
    if (
      filters.technology ||
      filters.location ||
      filters.experienceLevel ||
      searchText
    ) {
      setIsFiltersActive(true);
    } else {
      setIsFiltersActive(false);
    }
  };

  // useEffect para Fetching de datos
  useEffect(() => {
    async function fecthJobs() {
      try {
        setErrorMsg(null);
        setLoading(true);

        const params = new URLSearchParams();
        if (searchText) params.append("text", searchText);
        if (filters.technology) params.append("technology", filters.technology);
        if (filters.location) params.append("type", filters.location);
        if (filters.experienceLevel)
          params.append("level", filters.experienceLevel);

        const offset = (currentPage - 1) * RESULTS_PER_PAGE;
        params.append("limit", RESULTS_PER_PAGE);
        params.append("offset", offset);

        const queryParams = params.toString();

        const response = await fetch(
          `https://jscamp-api.vercel.app/api/jobs?${queryParams}`,
        );

        if (!response.ok) {
          throw new Error(
            `Hmmm… esto no debería haber pasado. Código: ${response.status}`,
          );
        }

        const json = await response.json();

        setJobs(json.data);
        setTotal(json.total);
      } catch (error) {
        setErrorMsg(
          `Hmmm... esto no debería haber pasado. Error: ${error.message}`,
        );
      } finally {
        setLoading(false);
      }
    }

    fecthJobs();
  }, [filters, searchText, currentPage]);

  // useEffect para actualizar la URL de acuerdo con los filtros
  useEffect(() => {
    const params = new URLSearchParams();

    if (searchText) params.append("text", searchText);
    if (filters.technology) params.append("technology", filters.technology);
    if (filters.location) params.append("type", filters.location);
    if (filters.experienceLevel)
      params.append("level", filters.experienceLevel);

    if (currentPage > 1) params.append("page", currentPage);

    const newUrl = params.toString()
      ? `${window.location.pathname}?${params.toString()}`
      : window.location.pathname;

    navigateTo(newUrl);
  }, [filters, currentPage, searchText, navigateTo]);

  // useEffect para verificar si se utilizan filtros
  useEffect(() => {
    hasActiveFilters();
  }, [filters, searchText]);

  // useEffect para almacenar los filtros de forma persistente
  useEffect(() => {
    const filtersToStr = JSON.stringify(filters);
    localStorage.setItem("jobFilters", filtersToStr);
  }, [filters]);

  // useEffect para almacenar el filtro de texto de forma persistente
  useEffect(() => {
    localStorage.setItem("searchText", JSON.stringify(searchText));
  }, [searchText]);

  const totalPages = Math.ceil(total / RESULTS_PER_PAGE);

  const handlePageChange = (page) => {
    setCurrentPage(page);
  };

  const handleSearch = (filters) => {
    setFilters(filters);
    setCurrentPage(1);
  };

  // Manejador que recibe el valor del input y aplica el debounce
  const handleTextChange = (value) => {
    // Cancelar timeout anterior
    if (timeoutId.current) clearTimeout(timeoutId.current);

    // Establecer nuevo timeout
    timeoutId.current = setTimeout(() => {
      setSearchText(value);
      setCurrentPage(1);
    }, 500);
  };

  const handleClearFilters = () => {
    // Canelar debounce pendiente
    if (timeoutId.current) {
      clearTimeout(timeoutId.current);
    }

    localStorage.removeItem("jobFilters");
    setSearchText("");
    setFilters({
      technology: "",
      location: "",
      experienceLevel: "",
    });
    setIsFiltersActive(false);
    setCurrentPage(1);
    setJobs([]);
  };

  return {
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
  };
}

/* ¿Cómo funciona las APIs de paginación? */
/* 
  La mayoría de APIs no usan un parámetro 'page'. En su lugar, utilizan dos parámetros fundamentales:
  LIMIT y OFFSET

  - Limit: Cuántos resultados devolver por página
  - Offset: Cuántos resultados saltarse desde el inicio

  Para calcular el offset a partir del número de página:
  offset = (currentPage - 1) * resultsPerPage

  Ejemplos:
  | Página actual |	Resultados por página |	Offset |	Cálculo       |
    1	                   10	                0	      (1-1) × 10 = 0
    2	                   10	                10	    (2-1) × 10 = 10
    3	                   10	                20	    (3-1) × 10 = 20
    5	                   20	                80	    (5-1) × 20 = 80

*/

/* ¿Qué es LocalStorage? */
/* 
  LocalStorage es una API del navegador que permite guardar datos de forma
  persistente. Los métodos principales son:
    - localStorage.setItem(clave, valor) --> guardar datos
    - localStorage.getItem(clave)        --> leer datos
    - localStorage.removeItem(clave)     --> eliminar datos
    - localStorage.clear()               --> limpiar todo

  Es importante saber que localStorage solo acepta strings, así que necesitas:
    - JSON.stringify(objeto) antes de guardar
    - JSON.parse(string) después de leer
*/

//

//

// ============================================================
// DEBOUNCE EN LA BÚSQUEDA CON useRef
// ============================================================
// PROBLEMA:
//   Antes, cada vez que el usuario escribía una letra en el input,
//   se actualizaba directamente el estado `searchText`, y el useEffect
//   que hace el fetch se ejecutaba inmediatamente. Esto generaba muchas
//   peticiones a la API (una por carácter), degradando el rendimiento.
//
// SOLUCIÓN:
//   Implementamos un debounce que retrasa la actualización de `searchText`
//   hasta que el usuario deje de escribir durante 500 ms.
//
//   - `searchText` es el estado que realmente dispara el fetch.
//   - `handleTextChange` recibe el valor actual del input.
//   - Se usa `useRef` (timeoutId) para guardar la referencia del timeout,
//     permitiendo cancelar el anterior si el usuario sigue escribiendo.
//   - Al finalizar el timeout, se actualiza `searchText` y se resetea la
//     página a 1, lo que provocará una nueva búsqueda.
//
//   Además, en el componente `SearchFormSection` se maneja un estado local
//   (`inputValue`) para que el input refleje cada letra sin esperar el
//   debounce, dando feedback instantáneo al usuario.
//
//   const handleTextChange = (value) => {
//      --> Cancelamos el timeout anterior si existe
//      if (timeoutId.current) {
//        clearTimeout(timeoutId.current);
//      }
//
//      --> Programamos el nuevo timeout
//      timeoutId.current = setTimeout(() => {
//        setSearchText(value);   // aquí se actualiza el estado que lanza el fetch
//        setCurrentPage(1);      // volvemos a la primera página para la nueva búsqueda
//      }, 500);
//    };
//
// ============================================================
