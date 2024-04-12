import {
  Game
} from "./connect4.js";

let game = undefined;


/*
player1 = {color: "red"}
look inside object and get the color and put in the css

take the element style and reassign it
*/

const startBtn = document.querySelector("#start-btn");
const boardDOM = document.querySelector("#board");




/** makeHtmlBoard: make HTML table and row of column tops. */

function makeHtmlBoard() {
  const $htmlBoard = document.querySelector("#board");

  // create top row of game to hold clickable cells
  const $top = document.createElement("tr");
  $top.setAttribute("id", "column-top");

  // fill top row with clickable cells
  for (let x = 0; x < game.width; x++) {
    const $headCell = document.createElement("td");
    $headCell.setAttribute("id", `top-${x}`);
    $headCell.addEventListener("click", handleClick);
    $top.append($headCell);
  }
  $htmlBoard.append($top);

  // dynamically creates the main part of html board
  // uses HEIGHT to create table rows
  // uses WIDTH to create table cells for each row
  for (let y = 0; y < game.height; y++) {
    const $row = document.createElement('tr');

    for (let x = 0; x < game.width; x++) {
      const $cell = document.createElement('td');
      $cell.setAttribute('id', `c-${y}-${x}`);
      $row.append($cell);
    }

    $htmlBoard.append($row);
  }
}


/** placeInTable: update DOM to place piece into HTML table of board */

function placeInTable(y, x) {
  const $piece = document.createElement('div');
  $piece.classList.add('piece');
  $piece.classList.add(`p${game.currPlayer.playerNumber}`); //p1 or p2

  const $spot = document.querySelector(`#c-${y}-${x}`);
  $spot.append($piece);
}


/** endGame: announce game end */

function endGame(msg) {
  alert(msg);
}


/** handleClick: handle click of column top to play piece */

function handleClick(evt) {
  const { board, currPlayer } = game;
  // get x from ID of clicked cell
  const x = Number(evt.target.id.slice("top-".length));

  // get next spot in column (if none, ignore click)
  const y = game.findSpotInCol(x);
  if (y === null) {
    return;
  }

  // place piece in board and add to HTML table
  board[y][x] = currPlayer;
  placeInTable(y, x);

  // check for win
  if (game.checkForWin()) {
    return endGame(`Player ${currPlayer} won!`);
  }

  // check for tie: if top row is filled, board is filled
  if (board[0].every(cell => cell !== null)) {
    return endGame('Tie!');
  }

  game.switchCurrPlayer();
}

/** listens to start button click, reset and creates the board*/
function handleStartClick() {
  startBtn.addEventListener("click", (e) => {
    if (game !== undefined) {
      console.log("I am in the if, this is the game", game, game.board, game.board.length);
      const rowsDOM = boardDOM.querySelectorAll("*");
      for (let row of rowsDOM) {
        row.remove();
      }
    }

    game = new Game();

    makeHtmlBoard();
  });
}


/** Start game. */

function start() {
  handleStartClick();
}


export { start };
