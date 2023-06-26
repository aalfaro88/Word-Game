/*

const fs = require('fs');

fs.readFile('dictionary.txt', 'utf8', (err, data) => {
  if (err) {
    console.error(err);
    return;
  }

  const words = data.split('\n');
  let word = "hello";

  if (words.includes(word)) {
    console.log("You get points!");
  } else {
    console.log("It does not exist.");
  }
});

*/


const points = {
  A: 2,
  B: 4,
  C: 4,
  D: 3,
  E: 1,
  F: 4,
  G: 4,
  H: 3,
  I: 2,
  J: 5,
  K: 4,
  L: 3,
  M: 4,
  N: 2,
  O: 2,
  P: 4,
  Q: 6,
  R: 3,
  S: 2,
  T: 2,
  U: 3,
  V: 4,
  W: 4,
  X: 5,
  Y: 4,
  Z: 6
};

const consonants = ["B", "B", "C", "C", "C", "D", "D", "D", "F", "F", "G", "G", "H", "H", "H", "H", "J", "K", "K", "L", "L", "L", "M", "M", "N", "N", "N", "N", "P", "P", "Q", "R", "R", "R", "R", "S", "S", "S", "S", "T", "T", "T", "T", "V", "V", "W", "W", "X", "Y", "Y", "Z"];
const vocals = ["E", "E", "E", "A", "A", "I", "I", "O", "O", "U"];

class Randomizer {
  static getRandomElement(array) {
    const randomIndex = Math.floor(Math.random() * array.length);
    return array[randomIndex];
  }
}

const startButton = document.getElementById("start-button");
const timerElement = document.getElementById("timer");

let timerSeconds = 60;
let intervalId;

startButton.addEventListener("click", function () {
  const gridButtons = document.querySelectorAll(".grid button");

  gridButtons.forEach(function (button) {
    let randomLetter;
    if (Math.random() < 0.6) {
      randomLetter = Randomizer.getRandomElement(consonants);
    } else {
      randomLetter = Randomizer.getRandomElement(vocals);
    }

    const pointValue = points[randomLetter];

    const letterSpan = document.createElement("span");
    const subIndex = document.createElement("sub");

    letterSpan.textContent = randomLetter;
    letterSpan.style.display = "flex";
    letterSpan.style.alignItems = "center";
    letterSpan.style.justifyContent = "center";
    letterSpan.style.height = "100%";
    letterSpan.style.position = "relative";

    subIndex.textContent = pointValue;
    subIndex.style.fontSize = "0.7rem";
    subIndex.style.position = "absolute";
    subIndex.style.bottom = "2px";
    subIndex.style.right = "2px";

    letterSpan.appendChild(subIndex);

    button.innerHTML = "";
    button.appendChild(letterSpan);
    button.classList.remove("used"); // Reset the "used" class
    button.classList.remove("highlight"); // Reset the "highlight" class
  });

  startButton.style.display = "none";
  currentWord = ""; // Reset the current word

  intervalId = setInterval(function () {
    timerSeconds--;
    if (timerSeconds >= 0) {
      const minutes = Math.floor(timerSeconds / 60).toString().padStart(2, "0");
      const seconds = (timerSeconds % 60).toString().padStart(2, "0");
      timerElement.textContent = `${minutes}:${seconds}`;
    } else {
      clearInterval(intervalId);
      timerElement.textContent = "00:00";
      startButton.style.display = "block";
    }
  }, 1000);
});

const section1 = document.querySelector(".section1");
const gridButtons = document.querySelectorAll(".grid button");
let currentWord = "";

gridButtons.forEach(function (button) {
  button.addEventListener("click", function () {
    const clickedLetter = button.textContent[0];
    currentWord += clickedLetter;
    section1.textContent = currentWord;
  });
});
