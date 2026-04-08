const timeDisplay = document.getElementById("time");
const circle = document.querySelector(".ring-progress");

const radius = 90;
const circumference = 2 * Math.PI * radius;

circle.style.strokeDasharray = circumference;

let totalTime = 25 * 60;
let timeLeft = totalTime;

function updateTimer() {
  const minutes = Math.floor(timeLeft / 60);
  const seconds = timeLeft % 60;

  timeDisplay.textContent =
    `${minutes}:${seconds < 10 ? "0" : ""}${seconds}`;

  const progress = timeLeft / totalTime;
  circle.style.strokeDashoffset =
    circumference * (1 - progress);

  if (timeLeft > 0) {
    timeLeft--;
  } else {
    clearInterval(timer);
  }
}

const timer = setInterval(updateTimer, 1000);
updateTimer();