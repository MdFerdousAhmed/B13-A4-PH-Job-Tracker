// Select elements
const allJobsSection = document.getElementById("allJobs");
const totalEl = document.getElementById("total");
const interviewEl = document.getElementById("interview");
const rejectedEl = document.getElementById("rejected");
const total1El = document.getElementById("total1");

const allFilterBtn = document.getElementById("all-filter-btn");
const interviewFilterBtn = document.getElementById("interview-filter-btn");
const rejectedFilterBtn = document.getElementById("rejected-filter-btn");

let currentFilter = "all";

// Update counters
function updateCounts() {
  const jobs = document.querySelectorAll("#allJobs > div");
  let total = jobs.length;
  let interview = 0;
  let rejected = 0;

  jobs.forEach(job => {
    const statusBtn = job.querySelector("#status");

    if (statusBtn.innerText === "INTERVIEW") interview++;
    if (statusBtn.innerText === "REJECTED") rejected++;
  });

  totalEl.innerText = total;
  interviewEl.innerText = interview;
  rejectedEl.innerText = rejected;
  total1El.innerHTML = `${total} <span>jobs</span>`;
}

// Change status
function setupStatusButtons() {
  const jobs = document.querySelectorAll("#allJobs > div");

  jobs.forEach(job => {
    const interviewBtn = job.querySelector(".interview-btn");
    const rejectedBtn = job.querySelector(".rejected-btn");
    const statusBtn = job.querySelector("#status");

    interviewBtn.addEventListener("click", () => {
      statusBtn.innerText = "INTERVIEW";
      statusBtn.className = "btn btn-soft btn-success";
      updateCounts();
    });

    rejectedBtn.addEventListener("click", () => {
      statusBtn.innerText = "REJECTED";
      statusBtn.className = "btn btn-soft btn-error";
      updateCounts();
    });
  });
}

// Delete job
function setupDeleteButtons() {
  const deleteBtns = document.querySelectorAll(".fa-trash-can");

  deleteBtns.forEach(btn => {
    btn.parentElement.addEventListener("click", () => {
      btn.closest("#allJobs > div").remove();
      updateCounts();
    });
  });
}

// Filter function
function toggleStyle(buttonId) {
  currentFilter = buttonId;

  // Reset all buttons
  [allFilterBtn, interviewFilterBtn, rejectedFilterBtn].forEach(btn => {
    btn.classList.remove("btn-info", "text-white");
    btn.classList.add("text-gray-400");
  });

  // Active button style
  const activeBtn = document.getElementById(buttonId);
  activeBtn.classList.add("btn-info", "text-white");
  activeBtn.classList.remove("text-gray-400");

  applyFilter();
}

// Apply filter
function applyFilter() {
  const jobs = document.querySelectorAll("#allJobs > div");

  jobs.forEach(job => {
    const status = job.querySelector("#status").innerText;

    if (currentFilter === "all-filter-btn") {
      job.style.display = "flex";
    } else if (currentFilter === "interview-filter-btn") {
      job.style.display = status === "INTERVIEW" ? "flex" : "none";
    } else if (currentFilter === "rejected-filter-btn") {
      job.style.display = status === "REJECTED" ? "flex" : "none";
    }
  });
}

// Initialize
setupStatusButtons();
setupDeleteButtons();
updateCounts();

