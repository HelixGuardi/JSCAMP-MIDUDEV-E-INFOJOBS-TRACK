const filterTechnology = document.getElementById("filter-technology");

/* Custom Select for Tech Filter (avanzado) */
const customDropdownSelect = document.querySelector('.custom-select-dropdown')
const techOptions = [
  "javascript",
  "python",
  "react",
  "nodejs",
  "mobile",
  "java",
  "csharp",
  "c",
  "c++",
  "ruby",
  "php",
]
const trigger = filterTechnology.querySelector('.custom-select-trigger');
const checkboxes = filterTechnology.querySelectorAll('input[type=checkbox]');

techOptions.forEach((tech) => {
  const checkboxContainer = document.createElement('div')
  const firstCharUpperCase = tech.charAt(0).toUpperCase() + tech.slice(1)

  checkboxContainer.innerHTML = `
    <input type="checkbox" id="${tech}" name="${tech}" value="${tech}">
    <label for="${tech}">${firstCharUpperCase}</label>
  `

  customDropdownSelect.appendChild(checkboxContainer)
});

trigger.addEventListener('click', () => {
  filterTechnology.classList.toggle('open');
});

document.addEventListener('click', (e) => {
  if(!filterTechnology.contains(e.target)){
    filterTechnology.classList.remove('open');
  }
});