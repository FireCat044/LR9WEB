var player1NameInput = document.getElementById("player1-name");
var player2NameInput = document.getElementById("player2-name");
var startButton = document.getElementById("start-button");
var startContainer = document.getElementById("start-container");
var gameContainer = document.getElementById("game-container");
var player1Score = document.getElementById("player1-score");
var player2Score = document.getElementById("player2-score");
var result = document.getElementById("result");
var playButton = document.getElementById("play-button");
var cardsContainer = document.getElementById("cards-container");

let player1Wins = 0;
let player2Wins = 0;

startButton.addEventListener("click", startGame);
playButton.addEventListener("click", playRound);

const cardValues = ["6", "7", "8", "9", "10", "J", "Q", "K", "A"];
const cardSuits = ["hearts", "diamonds", "clubs", "spades"];

function startGame() {
  var player1Name = player1NameInput.value;
  var player2Name = player2NameInput.value;
  if (player1Name.trim() === "" || player2Name.trim() === "") {
    alert("Будь ласка, введіть імена обох гравців.");
    return;
  }

  startContainer.classList.add("hidden");
  gameContainer.classList.remove("hidden");

  player1Score.textContent = `${player1Name}: ${player1Wins}`;
  player2Score.textContent = `${player2Name}: ${player2Wins}`;
}

function playRound() {
  var player1CardIndex = Math.floor(Math.random() * cardValues.length);
  var player2CardIndex = Math.floor(Math.random() * cardValues.length);
  var player1SuitIndex = Math.floor(Math.random() * cardSuits.length);
  var player2SuitIndex = Math.floor(Math.random() * cardSuits.length);

  var player1CardValue = cardValues[player1CardIndex];
  var player2CardValue = cardValues[player2CardIndex];
  var player1CardSuit = cardSuits[player1SuitIndex];
  var player2CardSuit = cardSuits[player2SuitIndex];

  displayCards(player1NameInput.value, player1CardValue, player1CardSuit,
                player2NameInput.value, player2CardValue, player2CardSuit);

  var resultText = compareCards(player1CardValue, player2CardValue);

  player1Score.textContent = `${player1NameInput.value}: ${player1Wins}`;
  player2Score.textContent = `${player2NameInput.value}: ${player2Wins}`;

  var resultElement = document.getElementById("result");
  resultElement.textContent = resultText;

  if (player1Wins >= 3) {
    resultElement.textContent = `Вітаємо, ${player1NameInput.value} виграв гру!`;
    playButton.disabled = true;
  } else if (player2Wins >= 3) {
    resultElement.textContent = `Вітаємо, ${player2NameInput.value} виграв гру!`;
    playButton.disabled = true;
  }
  if (player1Wins >= 3) {
    alert(`Вітаємо, ${player1NameInput.value} виграв гру!`);
    endGame();
  } else if (player2Wins >= 3) {
    alert(`Вітаємо, ${player2NameInput.value} виграв гру!`);
    endGame();
  }
}
function endGame() {
  playButton.disabled = true;
}

function compareCards(player1CardValue, player2CardValue) {
  console.log("compareCards:", player1CardValue, player2CardValue);

  // Перетворення рядкових значень на числа
  const numericPlayer1Value = convertCardValueToNumber(player1CardValue);
  const numericPlayer2Value = convertCardValueToNumber(player2CardValue);

  var resultText;

  if (numericPlayer1Value > numericPlayer2Value) {
    player1Wins++;
    resultText = `${player1NameInput.value} виграв раунд!`;
  } else if (numericPlayer1Value < numericPlayer2Value) {
    player2Wins++;
    resultText = `${player2NameInput.value} виграв раунд!`;
  } else {
    resultText = "Нічия в цьому раунді!";
  }

  updateResult(resultText);

  return resultText;
}

function updateResult(text) {
  var resultElement = document.getElementById("result");
  resultElement.textContent = text;
}


// Функція для перетворення рядкових значень на числа
function convertCardValueToNumber(cardValue) {
  switch (cardValue) {
    case "J":
      return 11;
    case "Q":
      return 12;
    case "K":
      return 13;
    case "A":
      return 14;
    default:
      return parseInt(cardValue, 10);
  }
}



function displayCards(player1Name, player1CardValue, player1CardSuit,
                       player2Name, player2CardValue, player2CardSuit) {
  const card1Image = createCardImage(player1CardValue, player1CardSuit);
  const card2Image = createCardImage(player2CardValue, player2CardSuit);

  cardsContainer.innerHTML = "";
  cardsContainer.appendChild(card1Image);
  cardsContainer.appendChild(card2Image);
}

function createCardImage(cardValue, cardSuit) {
  const cardImage = document.createElement("img");
  cardImage.src = `images/${formatFilename(cardValue, cardSuit)}.png`;
  cardImage.alt = `${cardValue} of ${cardSuit}`;
  cardImage.classList.add("card-image");
  return cardImage;
}

function formatFilename(cardValue, cardSuit) {
  return `${cardValue}${cardSuit}`;
}
