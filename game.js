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
const vocals = ["E", "E", "E", "A", "A", "I", "I", "O", "O", "U","U"];
const letters = ["E", "E", "E", "A", "A", "I", "I", "O", "O", "U","U","E", "E", "E", "A", "A", "I", "I", "O", "O", "U","U","E", "E", "E", "A", "A", "I", "I", "O", "O", "U","U","E", "E", "E", "A", "A", "I", "I", "O", "O", "U","U","B", "B", "C", "C", "C", "D", "D", "D", "F", "F", "G", "G", "H", "H", "H", "H", "J", "K", "K", "L", "L", "L", "M", "M", "N", "N", "N", "N", "P", "P", "Q", "R", "R", "R", "R", "S", "S", "S", "S", "T", "T", "T", "T", "V", "V", "W", "W", "X", "Y", "Y", "Z"];

class Randomizer {
  static getRandomElement(array) {
    const randomIndex = Math.floor(Math.random() * array.length);
    let initialArray = array[randomIndex];
    return initialArray;
  }
}

const startButton = document.getElementById("start-button");
const timerElement = document.getElementById("timer");

let timerSeconds = 3;
let intervalId;

const minutes = Math.floor(timerSeconds / 60).toString().padStart(2, "0");
const seconds = (timerSeconds % 60).toString().padStart(2, "0");
timerElement.textContent = `${minutes}:${seconds}`;


startButton.addEventListener("click", function () {
  const gridButtons = document.querySelectorAll(".grid button");

 
  gridButtons.forEach(function (button) {
    button.style.display = "block";
  });

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
    button.classList.remove("used");
    button.classList.remove("highlight");
  });

  startButton.style.display = "none";
  currentWord = "";


let intervalId = setInterval(function () {
  timerSeconds--;
  if (timerSeconds > 0) {
    const minutes = Math.floor(timerSeconds / 60).toString().padStart(2, "0");
    const seconds = (timerSeconds % 60).toString().padStart(2, "0");
    timerElement.textContent = `${minutes}:${seconds}`;
  } else if (timerSeconds === 0) {
    clearInterval(intervalId);
    timerElement.textContent = "00:00";
    startButton.style.display = "block";
    gridButtons.forEach(function (button) {
      button.style.display = "none";
    });
    timerSeconds = 3;
    const minutes = Math.floor(timerSeconds / 60).toString().padStart(2, "0");
    const seconds = (timerSeconds % 60).toString().padStart(2, "0");
    timerElement.textContent = `${minutes}:${seconds}`;

    const modal = document.getElementById("gameOverModal");
    modal.style.display = "block";

   
    const restartButton = document.getElementById("restartButton");
    restartButton.addEventListener("click", function () {
      modal.style.display = "none";
    });
  } else {
    clearInterval(intervalId);
    timerElement.textContent = "00:00";
    startButton.style.display = "block";
    gridButtons.forEach(function (button) {
      button.style.display = "none";
    });
    timerSeconds = 10;
    const minutes = Math.floor(timerSeconds / 60).toString().padStart(2, "0");
    const seconds = (timerSeconds % 60).toString().padStart(2, "0");
    timerElement.textContent = `${minutes}:${seconds}`;

    // Show the game over modal
    const modal = document.getElementById("gameOverModal");
    modal.style.display = "block";

    // Restart the game when the "Restart Game" button is clicked
    const restartButton = document.getElementById("restartButton");
    restartButton.addEventListener("click", function () {
      modal.style.display = "none";
      // Add code here to reset the game and start again
    });
  }
}, 1000);


  
});

const section1 = document.querySelector(".section1");
const gridButtons = document.querySelectorAll(".grid button");
let currentWord = "";
let isMouseDown = false;
let lastSelectedButton = null;
let selectedButtons = new Set();
let createdWords = [];
let letterPositions = [];

gridButtons.forEach(function (button) {
  button.style.display = "none";
});

gridButtons.forEach(function (button, index) {
  button.addEventListener("mousedown", function () {
    isMouseDown = true;
    const clickedLetter = button.textContent[0];
    if (lastSelectedButton === null || (isNeighborButton(button, lastSelectedButton) && !selectedButtons.has(button))) {
      currentWord += clickedLetter;
      document.getElementById("selected-word").textContent = currentWord;
      button.classList.add("highlight");
      lastSelectedButton = button;
      selectedButtons.add(button);
      letterPositions.push(index);
      console.log(letterPositions);
    }
  });


  button.addEventListener("mouseup", function () {
    isMouseDown = false;
    lastSelectedButton = null;
    removeHighlight();
    if (currentWord.length > 0) {
      createdWords.push(currentWord);
      updateButtonsAtPositions(letterPositions);
      currentWord = "";
      updateSection1();
    }
  letterPositions = [];
  });

  function updateSection1() {
    const sub1 = document.querySelector(".sub1");
    const sub2 = document.querySelector(".sub2");
  
    sub1.innerHTML = "<h2>Words</h2>";
    sub2.innerHTML = "<h2>Points</h2>";
  
    createdWords.forEach(function (word) {
      const wordItem = document.createElement("div");
      wordItem.textContent = word;
      sub1.appendChild(wordItem);
  
      const pointsItem = document.createElement("div");
      const wordPoints = calculateWordPoints(word);
      pointsItem.textContent = wordPoints;
      sub2.appendChild(pointsItem);
    });
  }
  
  function calculateWordPoints(word) {
    let totalPoints = 0;
    for (let i = 0; i < word.length; i++) {
      const letter = word[i].toUpperCase();
      totalPoints += points[letter] || 0;
    }
    return totalPoints;
  }
  

  
  button.addEventListener("mouseenter", function () {
    if (isMouseDown) {
      const clickedLetter = button.textContent[0];
      if (lastSelectedButton === null || (isNeighborButton(button, lastSelectedButton) && !selectedButtons.has(button))) {
        currentWord += clickedLetter;
        document.getElementById("selected-word").textContent = currentWord;
        button.classList.add("highlight");
        lastSelectedButton = button;
        selectedButtons.add(button);
        letterPositions.push(index);
        console.log(letterPositions);
      }
    }
  });
});

function isNeighborButton(button1, button2) {
  const button1Index = Array.from(gridButtons).indexOf(button1);
  const button2Index = Array.from(gridButtons).indexOf(button2);
  const rowDiff = Math.abs(Math.floor(button1Index / 5) - Math.floor(button2Index / 5));
  const colDiff = Math.abs((button1Index % 5) - (button2Index % 5));
  return (rowDiff <= 1 && colDiff <= 1);
}

function removeHighlight() {
  selectedButtons.forEach(function (button) {
    button.classList.remove("highlight");
  });
  selectedButtons.clear();
}

function updateButtonsAtPositions(positions) {
  positions.forEach(function (position) {
    const button = gridButtons[position];
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
    button.classList.remove("used");
    button.classList.remove("highlight");
  });
}
