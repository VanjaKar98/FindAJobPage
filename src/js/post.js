const form = document.querySelector(".form__input");

form.addEventListener("submit", async (event) => {
  event.preventDefault();
  const jobData = {
    title: form.querySelector("#title").value.trim(),
    location: form.querySelector("#location").value.trim(),
    type: form.querySelector("#type").value.trim(),
    description: form.querySelector("#desc").value.trim(),
    apply: form.querySelector("#apply").value.trim(),
    website: form.querySelector("#web").value.trim(),
    email: form.querySelector("#mail").value.trim(),
    spotlight: form.querySelector('input[name="spot"]:checked')?.value || null,
  };

  try {
    const API = "https://68d037faec1a5ff33826c70e.mockapi.io/jobs";

    const response = await fetch(API, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify(jobData),
    });

    if (!response.ok) {
      throw new Error("Failed to post the job");
    }

    const result = await response.json();
    alert("Job posted successfully!");
    form.reset();
  } catch (error) {
    alert("Error posting job: " + error.message);
  }
});
