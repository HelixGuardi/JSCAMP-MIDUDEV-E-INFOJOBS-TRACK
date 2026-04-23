const jobsListingSection = document.querySelector(".jobs-listings");
const indicator = document.getElementById('available-offers-indicator')
let filteredCounter = 0;
let totalJobsCount = 0;


/* Mutation Observer initialization */
const observer = new MutationObserver(() => {
  const jobs = document.querySelectorAll(".job-listing-card");
  filteredCounter = 0 //resetea valor para posibles cambios

  jobs.forEach((job) => {
    const jobClassList = job.classList.value
    
    if(!jobClassList.includes('is-hidden')){
      filteredCounter++
    }
  })

  fetch('./data.json')
  .then((response) => {
    return response.json();
  })
  .then((jobs) => {
    totalJobsCount = jobs.length
  })
  .then(() => {
    createIndicatorMsg(totalJobsCount, filteredCounter)
  })

});

const config = {
  childList: true,
  attributes: true,
  characterData: true,
  subtree: true
}

/* Observing changes in JobsListingSection */
observer.observe(jobsListingSection, config)

/* Función para crear el mensaje del indicador */
const createIndicatorMsg = (total, filteredCount) => {
  indicator.textContent = `
    Mostrando ${filteredCount} de ${total}
  `
} 

