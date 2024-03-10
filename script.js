let currentPlayer = "X";
let rows = 3;
let turns = rows * rows;
let turnsCounter = 0;
let reset = document.querySelector("#reset");
let board = createBoard(rows);

function createBoard(rows) {
  let board = [];
  for (let i = 0; i < rows; i++) {
    board.push(Array(rows).fill("_"));
  }
  return board;
}

function resetGame() {
  turnsCounter = 0;
  currentPlayer = "X";
  document.querySelector(".board").remove();
  createBoardGui(turns);
  board = createBoard(rows);
}
function changeCurrentPlayer() {
  if (currentPlayer == "X") {
    currentPlayer = "O";
  } else if (currentPlayer == "O") {
    currentPlayer = "X";
  }
}
function cellClickHandler(event, index) {
  let cell = event.target;
  let [row, column] = cellPosition(index);
  if (board[row][column] === "_") {
    turnsCounter++;
    board[row][column] = currentPlayer;
    drawMark(cell, currentPlayer);
    if (checkWin(currentPlayer)) {
      runWinEvent(currentPlayer);
    } else if (turns === turnsCounter) {
      drawEvent();
    }
    changeCurrentPlayer(currentPlayer);
  }
}
function checkWin(currentPlayer) {
  if (checkRows(currentPlayer)) {
    return true;
  } else if (checkColumn(currentPlayer)) {
    return true;
  } else if (checkDiagonals(currentPlayer)) {
    return true;
  } else if (checkReverseDiagonals(currentPlayer)) {
    return true;
  }
}

function checkDiagonals(currentPlayer) {
  let count = 0;
  while (count < rows) {
    if (currentPlayer != board[count][count]) {
      break;
    }
    count++;
  }

  if (count == rows) {
    return true;
  }
}
function checkReverseDiagonals(currentPlayer) {
  let count = 0;
  while (count < rows) {
    if (currentPlayer != board[count][rows - count - 1]) {
      break;
    }
    count++;
  }

  if (count == rows) {
    return true;
  }
}
function checkRows(currentPlayer) {
  let column = 0;
  for (let row = 0; row < rows; row++) {
    while (column < rows) {
      if (currentPlayer != board[row][column]) {
        column = 0;
        break;
      }
      column++;
    }

    if (column == rows) {
      return true;
    }
  }
}

function checkColumn(currentPlayer) {
  let row = 0;
  for (let column = 0; column < rows; column++) {
    while (row < rows) {
      if (currentPlayer != board[row][column]) {
        row = 0;
        break;
      }
      row++;
    }

    if (row == rows) {
      return true;
    }
  }
}
function runWinEvent(currentPlayer) {
  setTimeout(() => {
    alert(`${currentPlayer} Win`);
  }, 150);
}

function drawEvent() {
  setTimeout(() => {
    alert("Draw");
  }, 150);
}

function drawMark(cell, currentPlayer) {
  cell.querySelector(".value").textContent = currentPlayer;
  cell.classList.add(`cell--${currentPlayer}`);
}

function cellPosition(index) {
  let row = Math.floor(index / rows);
  let column = index % rows;
  return [row, column];
}

function createCell(index) {
  let cellString = `<div class="cell" role="button" tabindex = "${
    index + 1
  }"><span class="value"></span></div>`;
  let cellElement = document.createRange().createContextualFragment(cellString);
  cellElement.querySelector(".cell").onclick = (event) =>
    cellClickHandler(event, index);
  cellElement.querySelector(".cell").onkeydown = (event) => {
    if (event.key === "Enter") {
      cellClickHandler(event, index);
    }
  };
  return cellElement;
}
function createBoardGui(turns) {
  let container = document.querySelector(".container");
  let board = document.createElement("div");
  board.classList.add("board");
  document.documentElement.style.setProperty("--grid-rows", rows);
  for (let i = 0; i < turns; i++) {
    let cellElement = createCell(i);

    board.appendChild(cellElement);
  }
  container.insertAdjacentElement("afterbegin", board);
  reset.addEventListener("click", resetGame);
}
createBoardGui(turns);
