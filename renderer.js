let countdownInterval;
let remainingTime = 0;

const timerDisplay = document.getElementById('timer');
const timeInput = document.getElementById('time-input');
const startButton = document.getElementById('start-btn');
const resetButton = document.getElementById('reset-btn');
const alertSound = document.getElementById('alert-sound');

function updateTimerDisplay(timeInSeconds) {
  const minutes = Math.floor(timeInSeconds / 60).toString().padStart(2, '0');
  const seconds = (timeInSeconds % 60).toString().padStart(2, '0');
  timerDisplay.textContent = `${minutes}:${seconds}`;
}

function startCountdown() {
  if (remainingTime <= 0) return;

  countdownInterval = setInterval(() => {
    remainingTime--;
    updateTimerDisplay(remainingTime);

    if (remainingTime <= 0) {
      clearInterval(countdownInterval);
      alertSound.play();
    }
  }, 1000);
}

function resetCountdown() {
  clearInterval(countdownInterval);
  remainingTime = 0;
  updateTimerDisplay(remainingTime);
}

startButton.addEventListener('click', () => {
  const input = timeInput.value.trim();
  const timeParts = input.split(':').map(Number);

  if (timeParts.length === 2 && !isNaN(timeParts[0]) && !isNaN(timeParts[1])) {
    const [minutes, seconds] = timeParts;
    remainingTime = minutes * 60 + seconds;
    updateTimerDisplay(remainingTime);
    resetCountdown(); // Reset before starting
    startCountdown();
  } else {
    alert('Please enter a valid time in MM:SS format.');
  }
});

resetButton.addEventListener('click', resetCountdown);