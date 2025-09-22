const TITLE = document.querySelector("h1");

const COMPANY_NAME = document.querySelector(".job-article__company--name");
const JOB_TYPE = document.querySelector(
  ".job-article__type--duration>span:last-child"
);

const LOCATION = document.querySelector(
  ".job-article__type--location>span:last-child"
);

const DATE = document.querySelector(
  ".job-article__type--post>span:nth-child(2)"
);

const COMPANY_INFO = document.querySelector(".about__company");

window.addEventListener("DOMContentLoaded", async () => {
  const params = new URLSearchParams(window.location.search);
  const jobId = params.get("id");
  if (!jobId) return;

  try {
    const response = await fetch(
      `https://68d037faec1a5ff33826c70e.mockapi.io/jobs/${jobId}`
    );
    const job = await response.json();
    renderElements(job);
  } catch (error) {
    console.error("Error occurred", error);
  }
});

function renderElements(input) {
  TITLE.innerHTML = `${input.title}`;
  COMPANY_NAME.innerHTML = `About Company ${input.companyName}`;
  JOB_TYPE.innerHTML = `${input.isFullTime ? "Full-time" : "Freelancer"}`;
  LOCATION.innerHTML = `${input.location}`;
  DATE.innerHTML = `${new Date(input.createdAt).toLocaleDateString()}`;
  COMPANY_INFO.innerHTML = `${input.companyDescription}`;
}
