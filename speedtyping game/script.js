window.addEventListener('load', init);

// Globals

// Available Levels
const levels = {
  easy: 30,
  medium: 25,
  hard: 20,
};

// To change level
const currentLevel = levels.easy;

let time = currentLevel;
let score = 0;
let isPlaying;

// DOM Elements
const wordInput = document.querySelector('#word-input');
const currentWord = document.querySelector('#current-word');
const scoreDisplay = document.querySelector('#score');
const timeDisplay = document.querySelector('#time');
const message = document.querySelector('#message');
const seconds = document.querySelector('#seconds');
const highscoreDisplay = document.querySelector('#highscore');

const words = [
  "Spread love everywhere you go. Let no one ever come to you without leaving happier.",
"When you reach the end of your rope, tie a knot in it and hang on.",
"Always remember that you are absolutely unique. Just like everyone else.",
"Don't judge each day by the harvest you reap but by the seeds that you plant.",
"The future belongs to those who believe in the beauty of their dreams.",
"Tell me and I forget. Teach me and I remember. Involve me and I learn.",
"The best and most beautiful things in the world cannot be seen or even touched - they must be felt with the heart.",
"It is during our darkest moments that we must focus to see the light.",
"Whoever is happy will make others happy too.",
"Do not go where the path may lead, go instead where there is no path and leave a trail.", 
"You will face many defeats in life, but never let yourself be defeated.",
"The greatest glory in living lies not in never falling, but in rising every time we fall.",
"In the end, it's not the years in your life that count. It's the life in your years.",
"Never let the fear of striking out keep you from playing the game.",
"Life is either a daring adventure or nothing at all.",
"Many of life's failures are people who did not realize how close they were to success when they gave up.",
"You have brains in your head. You have feet in your shoes. You can steer yourself any direction you choose."
];

// Initialize Game
function init() {
  // Show number of seconds in UI
  seconds.innerHTML = currentLevel;
  // Load word from array
  showWord(words);
  // Start matching on word input
  wordInput.addEventListener('input', startMatch);
  // Call countdown every second
  setInterval(countdown, 1000);
  // Check game status
  setInterval(checkStatus, 50);
}

// Start match
function startMatch() {
  if (matchWords()) {
    isPlaying = true;
    time = currentLevel + 1;
    showWord(words);
    wordInput.value = '';
    score++;
  }
  
  // Highscore based on score value for Session Storage
  if (typeof sessionStorage['highscore'] === 'undefined' || score > sessionStorage['highscore']) {
    sessionStorage['highscore'] = score;
  } else {
    sessionStorage['highscore'] = sessionStorage['highscore'];
  }

  // Prevent display of High Score: -1
  if (sessionStorage['highscore'] >= 0) {
  highscoreDisplay.innerHTML = sessionStorage['highscore'];
  }

  // If score is -1, display 0
  if (score === -1) {
    scoreDisplay.innerHTML = 0;
  } else {
    scoreDisplay.innerHTML = score;
  }
}

// Match currentWord to wordInput
function matchWords() {
  if (wordInput.value === currentWord.innerHTML) {
    message.innerHTML = 'Correct!!!';
    return true;
  } else {
    message.innerHTML = '';
    return false;
  }
}

// Pick & show random word
function showWord(words) {
  // Generate random array index
  const randIndex = Math.floor(Math.random() * words.length);
  // Output random word
  currentWord.innerHTML = words[randIndex];
}

// Countdown timer
function countdown() {
  // Make sure time is not run out
  if (time > 0) {
    // Decrement
    time--;
  } else if (time === 0) {
    // Game is over
    isPlaying = false;
  }
  // Show time
  timeDisplay.innerHTML = time;
}

// Check game status
function checkStatus() {
  if (!isPlaying && time === 0) {
    message.innerHTML = 'Game Over!!!';
    score = -1;
  }
}
