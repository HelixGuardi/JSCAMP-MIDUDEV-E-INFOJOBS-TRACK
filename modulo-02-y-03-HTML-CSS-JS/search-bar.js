const searchBar = document.querySelector(".search-bar");

searchBar.addEventListener("input", (event) => {
  const searchValue = event.target.value;
  const jobs = document.querySelectorAll(".job-listing-card");
  const jobsCount = jobs.length

  jobs.forEach((job) => {
    const jobTitle = job.querySelector(".job-title").textContent.toLowerCase();

    const isShown = searchValue === "" || jobTitle.includes(searchValue.toLowerCase());
    job.classList.toggle("is-hidden", !isShown);
  });
});
