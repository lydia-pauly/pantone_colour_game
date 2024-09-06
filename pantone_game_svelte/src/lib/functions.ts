let hex_value_array = [];
let colour_name_array = [];
let correct_answer = "";
let hidden = false;
let score = 0;
let guessing = true;
let correct = false;
const max_score = 10;

function setGame() {
  hex_value_array = [];
  colour_name_array = [];
  for (let step = 0; step < 4; step++) {
    let selector = Math.floor(Math.random() * colourJSON["names"].length);
    hex_value_array = [...hex_value_array, colourJSON["values"][selector]];
    colour_name_array = [...colour_name_array, colourJSON["names"][selector]];
  }
  correct_answer = colour_name_array[Math.floor(Math.random() * 4)];
  guessing = true;
}

function randomiser(array) {
  return array[Math.floor(Math.random() * array.length)];
}

function changeHiddenProperty() {
  if (hidden) {
    setGame();
  } else {
    score = 0;
  }
  hidden = !hidden;
}

function checkAnswer(correct_answer, colour_name) {
  guessing = false;
  if (correct_answer === colour_name) {
    correct = true;
    if (!hidden) {
      score++;
    }
  } else {
    correct = false;
    score = Math.floor(score / 2);
  }
  setTimeout(setGame, 1500);
}
