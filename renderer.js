let countdownInterval;
let remainingTime = 0;

const timerDisplay = document.getElementById('timer');
const timeDropdown = document.getElementById('time-dropdown');
const startButton = document.getElementById('start-btn');
const resetButton = document.getElementById('reset-btn');
const alertSound = document.getElementById('alert-sound');

// Dragging functionality
let isDragging = false;
let dragOffsetX = 0;
let dragOffsetY = 0;

document.addEventListener('mousedown', (e) => {
  const container = document.querySelector('.container');
  const rect = container.getBoundingClientRect();

  // Check if the click is within the container
  if (
    e.clientX >= rect.left &&
    e.clientX <= rect.right &&
    e.clientY >= rect.top &&
    e.clientY <= rect.top + 30 // Only allow dragging from the top 30px
  ) {
    isDragging = true;
    dragOffsetX = e.clientX - rect.left;
    dragOffsetY = e.clientY - rect.top;
  }
});

document.addEventListener('mousemove', (e) => {
  if (isDragging) {
    const win = require('electron').remote.getCurrentWindow();
    win.setBounds({
      x: e.screenX - dragOffsetX,
      y: e.screenY - dragOffsetY,
      width: win.getBounds().width,
      height: win.getBounds().height,
    });
  }
});

document.addEventListener('mouseup', () => {
  isDragging = false;
});

// Timer functionality
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
  const selectedTime = parseInt(timeDropdown.value, 10);
  if (!isNaN(selectedTime)) {
    remainingTime = selectedTime;
    updateTimerDisplay(remainingTime);
    resetCountdown(); // Reset before starting
    startCountdown();
  } else {
    alert('Please select a valid time.');
  }
});

resetButton.addEventListener('click', resetCountdown);
