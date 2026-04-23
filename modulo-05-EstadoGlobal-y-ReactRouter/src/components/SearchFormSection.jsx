import { useId, useState, useEffect } from "react";

export function SearchFormSection({
  searchText, // valor debounced (para sincronizar)
  onTextChange, // manejador que recibe el valor actual
  onReset,
  isFiltersActive,
  filters,
  setFilters,
}) {
  const idText = useId();
  const idTechnology = useId();
  const idLocation = useId();
  const idExperienceLevel = useId();
  const idSalary = useId();

  // Estado local para el valor del input (se actualiza en cada tecla)
  const [inputValue, setInputValue] = useState(searchText);

  // Si searchText cambia desde fuera, sincroniza el input
  useEffect(() => {
    setInputValue(searchText);
  }, [searchText]);

  // Estado para saber qué campo está activo
  const [focusedField, setFocusedField] = useState(null);

  return (
    <>
      <section className="jobs-search">
        <h1>Encuentra tu próximo trabajo</h1>
        <p>Explora miles de oportunidades en el sector tecnológico.</p>

        <form id="empleos-search-form" className="form-to-reset" role="search">
          <div className="search-bar">
            <svg
              xmlns="http://www.w3.org/2000/svg"
              width="24"
              height="24"
              viewBox="0 0 24 24"
              fill="none"
              stroke="currentColor"
              strokeWidth="1"
              strokeLinecap="round"
              strokeLinejoin="round"
              className="icon icon-tabler icons-tabler-outline icon-tabler-search"
            >
              <path stroke="none" d="M0 0h24v24H0z" fill="none" />
              <path d="M10 10m-7 0a7 7 0 1 0 14 0a7 7 0 1 0 -14 0" />
              <path d="M21 21l-6 -6" />
            </svg>

            <input
              id="empleos-search-input"
              type="text"
              placeholder="Buscar trabajos, empresas o habilidades"
              value={inputValue}
              onChange={(e) => {
                const newValue = e.target.value;
                setInputValue(newValue); // actualizar UI inmediatamente
                onTextChange(newValue); // pasar el valor al hook (con debounce)
              }}
              onFocus={() => setFocusedField("searching")}
              onBlur={() => setFocusedField(null)}
              name={idText}
              style={{
                borderColor:
                  focusedField === "searching" ? "#4F46E5" : "#d1d5db",
                outline:
                  focusedField === "searching" ? "2px solid #4F46E5" : "none",
                position: "relative",
              }}
            />
            {focusedField === "searching" && (
              <small
                className="input-hint"
                style={{ position: "absolute", top: "-20px" }}
              >
                Busca por título de trabajo, empresa o tecnología
              </small>
            )}

            {isFiltersActive && (
              <button
                type="button"
                style={{ position: "absolute", right: "3px" }}
                onClick={() => onReset()}
              >
                Reset
              </button>
            )}
          </div>

          <div className="search-filters">
            <select
              name={idTechnology}
              id="filter-technology"
              value={filters.technology}
              onChange={(e) =>
                setFilters((prev) => ({
                  ...prev,
                  technology: e.target.value,
                }))
              }
            >
              <option value="">Tecnología</option>
              <optgroup label="Tecnologías populares">
                <option value="javascript">JavaScript</option>
                <option value="python">Python</option>
                <option value="react">React</option>
                <option value="nodejs">Node.js</option>
                <option value="mobile">Mobile</option>
              </optgroup>
              <hr />
              <option value="java">Java</option>
              <hr />
              <option value="csharp">C#</option>
              <option value="c">C</option>
              <option value="c++">C++</option>
              <hr />
              <option value="ruby">Ruby</option>
              <option value="php">PHP</option>
            </select>

            <select
              name={idLocation}
              id="filter-location"
              value={filters.location}
              onChange={(e) =>
                setFilters((prev) => ({
                  ...prev,
                  location: e.target.value,
                }))
              }
            >
              <option value="">Ubicación</option>
              <option value="remoto">Remoto</option>
              <option value="cdmx">Ciudad de México</option>
              <option value="guadalajara">Guadalajara</option>
              <option value="monterrey">Monterrey</option>
              <option value="barcelona">Barcelona</option>
            </select>

            <select
              name={idExperienceLevel}
              id="filter-experience-level"
              value={filters.experienceLevel}
              onChange={(e) =>
                setFilters((prev) => ({
                  ...prev,
                  experienceLevel: e.target.value,
                }))
              }
            >
              <option value="">Nível de experiencia</option>
              <option value="junior">Junior</option>
              <option value="mid">Mid-level</option>
              <option value="senior">Senior</option>
              <option value="lead">Lead</option>
            </select>

            <div className="salary-input-container">
              <label htmlFor={idSalary}>Salario mínimo</label>
              <input
                type="number"
                name={idSalary}
                id={idSalary}
                placeholder="30000"
                min="0"
                step="1000"
              />
            </div>
          </div>
        </form>
      </section>
    </>
  );
}

// ============================================================
// CONTROL DEL INPUT CON DEBOUNCE
// ============================================================
// - `inputValue` es un estado local que se actualiza en cada tecla.
//   Así el usuario ve el texto al instante.
// - `onTextChange` (proviene del hook) recibe el valor actual pero
//   aplica el debounce, actualizando `searchText` después de 500 ms.
// - Un `useEffect` sincroniza `inputValue` con `searchText` por si
//   `searchText` cambia desde fuera (por ejemplo, al hacer reset).
//   Así, si se limpian los filtros, el input también se vacía.
//
//
//      const [inputValue, setInputValue] = useState(searchText || "");
//
//      useEffect(() => {
//        setInputValue(searchText);
//      }, [searchText]);
//
//      const handleInputChange = (e) => {
//        const newValue = e.target.value;
//        setInputValue(newValue);          // feedback instantáneo
//        onTextChange(newValue);           // llamada con debounce
//       };
//
// ============================================================
