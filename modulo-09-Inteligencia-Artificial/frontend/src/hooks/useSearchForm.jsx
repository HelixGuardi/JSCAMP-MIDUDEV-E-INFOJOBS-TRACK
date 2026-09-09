/* import { useEffect, useState } from "react"; */

export function useSearchForm(/* {
  idTechnology,
  idLocation,
  idExperienceLevel,
  onSearch,
  onTextFilter,
  onReset,
} */) {
  /*   const [searchText, setSearchText] = useState(() => {
    const storedTextFilter = localStorage.getItem("textToFilter");
    return storedTextFilter ? JSON.parse(storedTextFilter) : "";
  });

  useEffect(() => {
    localStorage.setItem("textToFilter", JSON.stringify(searchText));
  }, [searchText]);

  const handleSubmit = (e) => {
    e.preventDefault();

    // event.target !== event.currentTarget
    // elemento que recibe evento !== elemento que está escuchando el evento
    const formData = new FormData(e.currentTarget);

    const filters = {
      technology: formData.get(idTechnology),
      location: formData.get(idLocation),
      experienceLevel: formData.get(idExperienceLevel),
    };

    onSearch(filters);
  };
  const handleTextChange = (e) => {
    const text = e.target.value;
    setSearchText(text);
    onTextFilter(text);
  };
  const handleFormReset = () => {
    // Resetear el formulario
    document.getElementById("empleos-search-form").reset(); //! esto está mal. El form tiene que ser controlado. No se debe de hacer desde el DOM.
    //! esto ya fue arreglado en el otro custom Hook: useFilters.
    // Notificar al padre
    onReset();
  };

  return {
    searchText,
    handleSubmit,
    handleTextChange,
    handleFormReset,
  }; */
}
