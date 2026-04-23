/* DELEGACIÓN DE EVENTOS - CONCEPTO IMPORTANTE */
const jobsListingSection = document.querySelector(".jobs-listings");

jobsListingSection?.addEventListener("click", (event) => {
  const element = event.target;

  if (element.classList.contains("button-apply-job")) {
    element.textContent = "¡Aplicado!";
    element.classList.add("is-applied");
    element.disabled = true;
  }
});

/* const botones = document.querySelectorAll(".button-apply-job");

botones.forEach((boton) => {
  boton.addEventListener("click", () => {
    boton.textContent = "¡Aplicado!";
    boton.classList.add("is-applied");
    boton.disabled = true;
  });
}); */

/* 
  En la clase anterior se vió como añadir eventos a múltiples botones usando querySelectorAll y ForEach. Pero hay una forma más eficiente que es la delegación de eventos

  El Event Bubbling (burbujeo de eventos) es un mecanismo del navegador donde los eventos se propagan desde el elemento más específico hacia los elementos padre.
*/
