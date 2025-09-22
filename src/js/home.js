window.addEventListener("DOMContentLoaded", fetchAPI);

const BODY_ELEMENT = document.querySelector("body");

const FEATURED_JOBS = document.querySelector(".featured__articles");
const RECENT_JOBS = document.querySelector(".recent__articles");

let APIs = [
  "https://68b57749e5dc090291af20e6.mockapi.io/api/v1/featured",
  "https://68d037faec1a5ff33826c70e.mockapi.io/jobs?page=1&limit=10",
];

async function fetchAPI() {
  try {
    let response1 = await fetch(APIs[0]);
    let data1 = await response1.json();
    renderFeatured(data1);

    let response2 = await fetch(APIs[1]);
    let data2 = await response2.json();
    renderRecent(data2);
  } catch (error) {
    console.log(`Error ${error} occured during fetch process!!!`);
  }
}

function renderFeatured(input) {
  FEATURED_JOBS.innerHTML = "";
  input.forEach((job) => {
    const newJob = document.createElement("a");
    newJob.className = "article-jobs";
    newJob.setAttribute("href", `./job.html?id=${job.id}`);
    newJob.setAttribute("data-id", job.id);
    newJob.innerHTML = `
            <span class="article-jobs__logo">
              <img src="https://cdn.prod.website-files.com/66f2f083f5b8de8e38f75505/66f2f083f5b8de8e38f75551_company-05.png" loading="lazy" alt="logo-img" class="testimonial__img">
            </span>
            <div class="article-jobs__company">
              <span>${job.companyName}</span>•
              <span>${job.isFullTime ? "Full-time" : "Freelancer"}</span>
            </div>
            <h3 class="article-jobs__position">${job.title}</h3>
            <span class="article-jobs__spot">In the spotlight</span>
            <ul class="article-jobs__pref">
              <li class="article-jobs__pref--item">${job.location}</li>
              <li class="article-jobs__pref--item">Remote</li>
            </ul>`;
    FEATURED_JOBS.appendChild(newJob);
  });
}

function renderRecent(input) {
  RECENT_JOBS.innerHTML = "";
  input.forEach((job) => {
    const newJob = document.createElement("a");
    newJob.className = "article-recent";
    newJob.setAttribute("href", `./job.html?id=${job.id}`);
    newJob.setAttribute("data-id", job.id);
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
    RECENT_JOBS.appendChild(newJob);
  });
}
