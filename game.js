// General Arrays: points = Value of each letter. Consonants, Vocals and Letters are used to randomize, 
// giving more probability to letters that appear more in english dictionary.
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

const consonants = ["B", "B", "C", "C", "C", "D", "D", "D", "F", "F", "G", "G", "H", "H", "H", "J", "K", "K", "L", "L", "L", "M", "M", "N", "N", "N", "P", "P", "Q", "R", "R", "R", "S", "S", "S", "T", "T", "T", "V", "V", "W", "W", "X", "Y", "Y", "Z"];
const vocals = ["A", "A", "A", "A", "E", "E", "E", "E", "E","E","I", "I", "I", "I", "O", "O", "O", "O", "U", "U", "U"];
const letters = consonants.concat(vocals);

const consonantsProportion = 0.60

// Randomizer: Gets a random index from any given array.

class Randomizer {
  static getRandomElement(array) {
    const randomIndex = Math.floor(Math.random() * array.length);
    let initialArray = array[randomIndex];
    return initialArray;
  }
}

// Sets the start button ready and the timer in the given seconds in format 00:00

const startButton = document.getElementById("start-button");
const shuffleButton = document.getElementById("shuffle-button");
const timerElement = document.getElementById("timer");

let timerSeconds = 60;
let intervalId;

shuffleButton.style.display = "none";
const minutes = Math.floor(timerSeconds / 60).toString().padStart(2, "0");
const seconds = (timerSeconds % 60).toString().padStart(2, "0");
timerElement.textContent = `${minutes}:${seconds}`;

// Game Initializer. Once start button is clicked, the game starts, the start button dissapears.

startButton.addEventListener("click", function () {
  const gridButtons = document.querySelectorAll(".grid button");
  createdWords = []
  const sub1 = document.querySelector(".sub1");
  sub1.innerHTML = "<h2>Words</h2>";
  const sub2 = document.querySelector(".sub2");
  sub2.innerHTML = "<h2>Points</h2>";
  stopAnimation()
  gridButtons.forEach(function (button) {
    button.style.display = "block";
  });

  // Apply randomizer to fill the grid. Conserves a good proportion of vocals and consonants.
  gridButtons.forEach(function (button) {
    let randomLetter;
    if (Math.random() < consonantsProportion) {
      randomLetter = Randomizer.getRandomElement(consonants);
    } else {
      randomLetter = Randomizer.getRandomElement(vocals);
    }
    
    // Formats the letter and value of the grid.
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
  shuffleButton.style.display = "block";
  currentWord = "";


  
// IF: Initialize the timer to let you play, starts coutdown. ELSE: Finalize the game, give instructions of what happens when game finishes.
let intervalId = setInterval(function () {
  timerSeconds--;
  if (timerSeconds > 0) {
    const minutes = Math.floor(timerSeconds / 60).toString().padStart(2, "0");
    const seconds = (timerSeconds % 60).toString().padStart(2, "0");
    timerElement.textContent = `${minutes}:${seconds}`;
  } else {
    clearInterval(intervalId);
    timerElement.textContent = "00:00";
    startButton.style.display = "block";
    shuffleButton.style.display = "none";
    finalPointsCal(createdWords);
    startAnimation()

    const modalPointsElement = document.querySelector(".modal-points");
    modalPointsElement.innerHTML = "";

    const totalPointsElement = document.createElement("p");
    totalPointsElement.textContent = finalPoints;
    modalPointsElement.appendChild(totalPointsElement);

    const longestWordElement = document.createElement("p");
    longestWordElement.textContent = longestWord;
    modalPointsElement.appendChild(longestWordElement);

    const wordMaxPointsElement = document.createElement("p");
    wordMaxPointsElement.textContent = wordMaxPoints;
    modalPointsElement.appendChild(wordMaxPointsElement);

    finalPoints = 0;
    longestWord = "";
    currentWordPointArray = [];
    currentWordPoints = 0;
    indexOfMaxPoint = 0;
    wordMaxPoints = "";

    gridButtons.forEach(function (button) {
      button.style.display = "none";
    });

    timerSeconds = 60;
    const minutes = Math.floor(timerSeconds / 60).toString().padStart(2, "0");
    const seconds = (timerSeconds % 60).toString().padStart(2, "0");
    timerElement.textContent = `${minutes}:${seconds}`;

    const modal = document.getElementById("gameOverModal");
    modal.style.display = "block";

    const restartButton = document.getElementById("restartButton");
    restartButton.addEventListener("click", function () {
      modal.style.display = "none";
    });
  }
}, 1000);  
});

shuffleButton.addEventListener("click", function () {
  updateButtonsAtPositions(allPositions);
  timerSeconds-=3
})


// Define variables that will show us the words created, check if mouse is down, positions, etc.
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

// What happens when you click a letter and continue to hold the click (mousedown), it calls other funcion (isNeighbour) to check and limit the letter
// you can click.
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

// Instructions of what happens when you release the click (mouseup). 
// This includes: Removing the highlight. Randomizing used letters, calculating points.
  button.addEventListener("mouseup", function () {
    isMouseDown = false;
    lastSelectedButton = null;
    removeHighlight();
    if (currentWord.length > 0) {
      if(currentWord.length > 5){
        if(checker(currentWord.toLowerCase())){
          timerSeconds+=10
          createdWords.push(currentWord);
          updateButtonsAtPositions(letterPositions);
          currentWord = "";
          updateSection1();
          letterPositions = [];
        }

      }
      else if(currentWord.length > 4){
        if(checker(currentWord.toLowerCase())){
          timerSeconds+=5
          createdWords.push(currentWord);
          updateButtonsAtPositions(letterPositions);
          currentWord = "";
          updateSection1();
          letterPositions = [];
        }
      }
      else if(currentWord.length > 3){
        if(checker(currentWord.toLowerCase())){
          timerSeconds+=3
          createdWords.push(currentWord);
          updateButtonsAtPositions(letterPositions);
          currentWord = "";
          updateSection1();
          letterPositions = [];
        }
      }
      else{
        if(checker(currentWord.toLowerCase())){
          createdWords.push(currentWord);
          updateButtonsAtPositions(letterPositions);
          currentWord = "";
          updateSection1();
          letterPositions = [];
      }
    }
        letterPositions = [];
        currentWord = "";
    }
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
  

  // support of mousedown. Check neighbours again, helps with the functionality of what happens after the first click.
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

//function that checks neighbours.
function isNeighborButton(button1, button2) {
  const button1Index = Array.from(gridButtons).indexOf(button1);
  const button2Index = Array.from(gridButtons).indexOf(button2);
  const rowDiff = Math.abs(Math.floor(button1Index / 5) - Math.floor(button2Index / 5));
  const colDiff = Math.abs((button1Index % 5) - (button2Index % 5));
  return (rowDiff <= 1 && colDiff <= 1);
}

//function that removes the highlight to the selected words after realising.
function removeHighlight() {
  selectedButtons.forEach(function (button) {
    button.classList.remove("highlight");
  });
  selectedButtons.clear();
}

//Function to help re-randomize the letter used.
function updateButtonsAtPositions(positions) {
  positions.forEach(function (position) {
    const button = gridButtons[position];
    let randomLetter;
    if (Math.random() < consonantsProportion) {
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

// Point and general data of the game calculator.
let finalPoints = 0
let longestWord = ""
let currentWordPointArray = []
let currentWordPoints = 0
let indexOfMaxPoint = 0
let wordMaxPoints = ""

function finalPointsCal(words){
  for (let i=0;i<words.length;i++){
    currentWordPoints = 0;
    for (let j=0;j<words[i].length;j++){
      finalPoints+=points[words[i][j]];
      currentWordPoints += points[words[i][j]];
    }
    currentWordPointArray.push(currentWordPoints)
    if (words[i].length > longestWord.length){
      longestWord = words[i];
    }
  }
  indexOfMaxPoint = (currentWordPointArray.indexOf(Math.max(...currentWordPointArray)))
  wordMaxPoints = createdWords[indexOfMaxPoint]

}

//Word checker!
let words = [];

fetch('dictionary.txt')
  .then(response => response.text())
  .then(data => {
    words = data.split('\n');
  })
  .catch(error => {
    console.error(error);
  });

function checker(word) {
  if (words.includes(word)) {
    return true;
  } else {
    return false;
  }
}

//Shuffle Button
let allPositions = [0,1,2,3,4,5,6,7,8,9,10,11,12,13,14,15,16,17,18,19,20,21,22,23,24];

//Animations of falling letter
function createFallingLetter() {
  const letter = document.createElement('span');
  letter.textContent = letters[Math.floor(Math.random() * letters.length)];
  letter.style.position = 'absolute';
  letter.style.left = Math.random() * 100 + '%';
  letter.style.top = '-30px'; 
  letter.style.fontSize = Math.random() * 30 + 10 + 'px';
  letter.style.transform = 'rotate(' + (Math.random() * 90 - 45) + 'deg)';
  return letter;
}
function animateFallingLetters() {
  const container = document.querySelector('.falling-letters-container');
  const letter = createFallingLetter();
  container.appendChild(letter);

  const animationDuration = Math.random() * 3000 + 2000;

  letter.animate(
    [
      { top: '-30px', opacity: 1 },
      { top: '100%', opacity: 0 }
    ],
    {
      duration: animationDuration,
      easing: 'linear',
      fill: 'forwards'
    }
  );

  setTimeout(() => {
    container.removeChild(letter);
  }, animationDuration);
}

let intervalIdAnimation = setInterval(animateFallingLetters, 60);
let animationRunning = true;


function startAnimation() {
  if (!animationRunning) {
    intervalIdAnimation = setInterval(animateFallingLetters, 60);
    animationRunning = true;
  }
}


function stopAnimation() {
  if (animationRunning) {
    clearInterval(intervalIdAnimation);
    animationRunning = false;

    const container = document.querySelector('.falling-letters-container');
    const fallingLetters = container.querySelectorAll('span');
    fallingLetters.forEach((letter) => {
      container.removeChild(letter);
    });
  }
}








