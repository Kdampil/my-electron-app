const { ipcRenderer } = require('electron');
const dragBar = document.getElementById('drag-bar');
const timerDisplay = document.querySelector('.timer-display');
const timeSelector = document.getElementById('time-selector');
const startButton = document.getElementById('start-button');
const resetButton = document.getElementById('reset-button');
const alertSound = document.getElementById('alert-sound');

let countdownInterval;
let remainingTime = parseInt(timeSelector.value);

function updateTimerDisplay() {
  const minutes = Math.floor(remainingTime / 60).toString().padStart(2, '0');
  const seconds = (remainingTime % 60).toString().padStart(2, '0');
  timerDisplay.textContent = `${minutes}:${seconds}`;
}

function startCountdown() {
  clearInterval(countdownInterval);
  countdownInterval = setInterval(() => {
    if (remainingTime > 0) {
      remainingTime--;
      updateTimerDisplay();
    } else {
      clearInterval(countdownInterval);
      alertSound.play();
    }
  }, 1000);
}

startButton.addEventListener('click', () => {
  remainingTime = parseInt(timeSelector.value);
  updateTimerDisplay();
  startCountdown();
});

resetButton.addEventListener('click', () => {
  clearInterval(countdownInterval);
  remainingTime = parseInt(timeSelector.value);
  updateTimerDisplay();
});

timeSelector.addEventListener('change', () => {
  remainingTime = parseInt(timeSelector.value);
  updateTimerDisplay();
});

updateTimerDisplay();

// Make the window draggable
dragBar.addEventListener('mousedown', (e) => {
  ipcRenderer.send('move-window');
});
