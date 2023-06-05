const player1 = "X";
const player2 = "O";
const boxElements = document.querySelectorAll(".box");
const theWinner = document.querySelector(".winner p");
const resetButton = document.querySelector(".reset");
let circleTurn;
let currentPlayer;
let stepCount;
const winner = [
  [0, 1, 2],
  [3, 4, 5],
  [6, 7, 8],
  [0, 3, 6],
  [1, 4, 7],
  [2, 5, 8],
  [0, 4, 8],
  [2, 4, 6],
];

function handleClick(e) {
  const box = e.target;
  currentPlayer = circleTurn ? player2 : player1;
  markTheBox(box, currentPlayer);
  if (checkWin(currentPlayer)) {
    endGame(`${currentPlayer} is the winner`);
  } else if (stepCount === 9) {
    endGame("It's a tie");
  } else {
    circleTurn = !circleTurn;
    let nextPlayer = circleTurn ? player2 : player1;
    theWinner.textContent = `${nextPlayer}'s turn`;
  }
}

function markTheBox(box, currentPlayer) {
  box.classList.add(currentPlayer);
  stepCount++;
}

function checkWin(currentPlayer) {
  return winner.some((combo) => {
    return combo.every((index) => {
      return boxElements[index].classList.contains(currentPlayer);
    });
  });
}

function endGame(message) {
  theWinner.textContent = message;
  boxElements.forEach((box) => {
    box.removeEventListener("click", handleClick);
  });
}

function resetGame() {
  boxElements.forEach((box) => {
    box.classList.remove(player1);
    box.classList.remove(player2);
  });
  startGame();
}

function startGame() {
  stepCount = 0;
  circleTurn = false;
  theWinner.textContent = "Let's play!";
  boxElements.forEach((box) => {
    box.addEventListener("click", handleClick, { once: true });
  });
}

resetButton.addEventListener("click", (e) => {
  resetGame();
});

startGame();
