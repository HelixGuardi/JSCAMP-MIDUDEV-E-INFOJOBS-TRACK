const filterTechnology = document.getElementById("filter-technology");
const filterLocation = document.getElementById("filter-location");
const filterExperienceLevel = document.getElementById(
  "filter-experience-level",
);

/* filtros combinados */
const techArrFilteredValue = new Set();
let locationFilteredValue = "";
let levelFilteredValue = "";

const filtering = () => {
  const jobs = document.querySelectorAll(".job-listing-card");

  jobs.forEach((job) => {
    const technologyArr = job.getAttribute("data-technology").split(",");
    const modalidad = job.getAttribute("data-modalidad");
    const nivel = job.getAttribute("data-nivel");

    const matchesTech =
      techArrFilteredValue.size === 0 ||
      technologyArr.some((tech) => techArrFilteredValue.has(tech));

    const matchesLocation =
      locationFilteredValue === "" || locationFilteredValue === modalidad;

    const matchesLevel =
      levelFilteredValue === "" || levelFilteredValue === nivel;

    const isShown = matchesTech && matchesLocation && matchesLevel;
    job.classList.toggle("is-hidden", !isShown);
  });
};

/* tech filter addEventListener */
const customDropdownSelect = document.querySelector(".custom-select-dropdown");
customDropdownSelect.addEventListener("change", () => {
  const checkboxesArr = customDropdownSelect.querySelectorAll(
    "div > input[type=checkbox]",
  );

  checkboxesArr.forEach((checkbox) => {
    if (checkbox.checked) {
      techArrFilteredValue.add(checkbox.value);
    } else if (!checkbox.checked) {
      techArrFilteredValue.delete(checkbox.value);
    }
  });

  filtering();
});

/* location filter addEventListener */
filterLocation.addEventListener("change", () => {
  locationFilteredValue = filterLocation.value;
  filtering();
});

/* experiencie filter addEventListener */
filterExperienceLevel.addEventListener("change", () => {
  levelFilteredValue = filterExperienceLevel.value;
  filtering();
});
