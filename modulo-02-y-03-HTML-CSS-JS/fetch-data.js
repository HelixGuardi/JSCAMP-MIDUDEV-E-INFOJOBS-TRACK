const container = document.querySelector(".jobs-listings");
const paginationContainer = document.querySelector(".pagination");
const jobsArr = [];
const RESULTS_PER_PAGE = 5;
let totalPages = 0;
let currentPage = 1;



fetch("./data.json")
  .then((response) => {
    return response.json();
  })
  .then((jobs) => {
    jobs.forEach((job) => {
      const article = document.createElement("article");
      article.className = "job-listing-card";

      article.dataset.modalidad = job.data.modalidad;
      article.dataset.nivel = job.data.nivel;
      article.dataset.technology = job.data.technology;

      article.innerHTML = `
        <div>
          <h3 class="job-title">${job.titulo}</h3>
          <small>${job.empresa} | ${job.ubicacion}</small>
          <p>
            ${job.descripcion}
          </p>
        </div>
        <button class="button-apply-job">Aplicar</button>
      `;

      jobsArr.push(article);
    });
  })
  .then(() => {
    totalPages = Math.ceil(jobsArr.length / RESULTS_PER_PAGE)
    
    //chevron (previous) for pagination
    const chevronPreviousBtn = document.createElement('button');
    chevronPreviousBtn.className = 'previous-chevron-btn'
    chevronPreviousBtn.innerHTML = `
      <svg
        xmlns="http://www.w3.org/2000/svg"
        width="24"
        height="24"
        viewBox="0 0 24 24"
        fill="none"
        stroke="currentColor"
        stroke-width="1"
        stroke-linecap="round"
        stroke-linejoin="round"
        class="icon icon-tabler icons-tabler-outline icon-tabler-chevron-left">
          <path stroke="none" d="M0 0h24v24H0z" fill="none" />
          <path d="M15 6l-6 6l6 6" />
      </svg>
    `
    paginationContainer.appendChild(chevronPreviousBtn)
    chevronPreviousBtn.addEventListener('click', () => {
      previousPage()
      renderPage()
    })

    //page number list for pagination
    for(let i = 1; i <= totalPages; i++){
      const pageNumberBtn = document.createElement('button');
      pageNumberBtn.textContent = `${i}`
      pageNumberBtn.className = 'page-button'
      
      if(i === currentPage){
        pageNumberBtn.classList.add('is-active')
      }

      paginationContainer.appendChild(pageNumberBtn)
      pageNumberBtn.addEventListener('click', () => {
        currentPage = parseInt(pageNumberBtn.textContent)
        renderPage()
      })
    }

    //chevron (next) for pagination
    const chevronNextBtn = document.createElement('button');
    chevronNextBtn.className = 'next-chevron-btn'
    chevronNextBtn.innerHTML = `
      <svg
        xmlns="http://www.w3.org/2000/svg"
        width="24"
        height="24"
        viewBox="0 0 24 24"
        fill="none"
        stroke="currentColor"
        stroke-width="1"
        stroke-linecap="round"
        stroke-linejoin="round"
        class="icon icon-tabler icons-tabler-outline icon-tabler-chevron-right">
          <path stroke="none" d="M0 0h24v24H0z" fill="none" />
          <path d="M9 6l6 6l-6 6" />
      </svg>
    `
    paginationContainer.appendChild(chevronNextBtn)
    chevronNextBtn.addEventListener('click', () => {
      nextPage()
      renderPage()
    })

    //render jobs
    renderPage()
  });

const renderPage = () => {
  container.innerHTML = "";
  const start = (currentPage - 1) * RESULTS_PER_PAGE;
  const end = start + RESULTS_PER_PAGE;
  const jobsPerPage = jobsArr.slice(start, end)

  jobsPerPage.forEach((job) => {
    container.appendChild(job)
  })

  //update UI
  const pageBtnArr = document.querySelectorAll('.page-button')
  pageBtnArr.forEach((btn) => {
    if(btn.textContent === currentPage.toString()){
      btn.classList.add('is-active')
    } else {
      btn.classList.remove('is-active')
    }
  })
}



const nextPage = () => {
  if(currentPage < totalPages){
    currentPage++
    renderPage()
  }
}



const previousPage = () => {
  if(currentPage > 1){
    currentPage--
    renderPage()
  }
}