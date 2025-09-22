window.addEventListener("DOMContentLoaded", () => fetchAPI());

const ALL_JOBS = document.querySelector(".recent__articles");

let API = "https://68d037faec1a5ff33826c70e.mockapi.io/jobs";

async function fetchAPI(param = false) {
  try {
    const url = new URL(API);

    if (param) {
      url.searchParams.set("search", param);
    }

    let response = await fetch(url);
    let data = await response.json();
    renderJobs(data);
  } catch (error) {
    console.log(`Error ${error} occured during fetch process!!!`);
  }
}

const FILTER_BTNS_CONTAINER = document.querySelector(".filter__list");
FILTER_BTNS_CONTAINER.addEventListener("click", (event) => {
  filterJobs(event);
});

const FILTER_BTNS = document.querySelectorAll(".btn-filter");

function filterJobs(event) {
  const tech = event.target.dataset.technology;
  markActiveBtn(event);

  if (tech === "all") {
    fetchAPI();
    return;
  }

  fetchAPI(tech);
}

function markActiveBtn(event) {
  const active = event.target;
  FILTER_BTNS.forEach((btn) => btn.classList.remove("active"));
  if (active.matches(".btn-filter")) {
    active.classList.add("active");
  }
}

function renderJobs(input) {
  ALL_JOBS.innerHTML = "";
  input.forEach((job) => {
    const newJob = document.createElement("div");
    newJob.className = "article-recent";
    newJob.innerHTML = `
            <span class="article-recent__logo">
                <img src="https://cdn.prod.website-files.com/66f2f083f5b8de8e38f75505/66f2f083f5b8de8e38f75551_company-05.png" loading="lazy" alt="logo-img" class="testimonial__img">
              </span>
              <div class="article-recent__company">
                <span>${job.companyName}</span>•
                <span>${job.isFullTime ? "Full-time" : "Freelancer"}</span>
                <h3 class="article-recent__position">${job.title}</h3>
              </div>
              <div class="article-recent__info">
                <span class="article-recent__spot">${new Date(
                  job.createdAt
                ).toLocaleDateString()}</span>
                <ul class="article-recent__pref">
                  <li class="article-recent__pref--item">${job.location}</li>
                  <li class="article-recent__pref--item">Remote</li>
                </ul>
              </div>`;
    ALL_JOBS.appendChild(newJob);
  });
}
