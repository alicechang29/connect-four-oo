/** Connect Four
 *
 * Player 1 and 2 alternate turns. On each turn, a piece is dropped down a
 * column until a player gets four-in-a-row (horiz, vert, or diag) or until
 * board fills (tie).
 */

//FIXME: methods need docstrings

class Game {
  constructor(height = 6, width = 7) {
    this.height = height;
    this.width = width;
    this.board = Array(this.height);
    this.currPlayer = 1;
    this.makeBoard();
  }
  /**
   * method that will change the current player between 1 and 2
   * looks at the current instance of the Game class
   * and reassignes the currPlayer key's value to 1 or 2
   */
  switchCurrPlayer() {
    this.currPlayer = this.currPlayer === 1 ? 2 : 1;

    console.log("switching player", this.currPlayer);
  }

  /**
   * method that will create the board, given the height and width input of
   * the current instance of the Game class
   */
  makeBoard() {
    for (let y = 0; y < this.height; y++) {
      const emptyRow = Array(this.width).fill(null);
      this.board[y] = emptyRow;
    }

    // alternatively:
    // gameState.board = [...gameState.board].map(() => Array(WIDTH).fill(null));
  }

  /**
   * method that will return the row, if given the column on the
   * board to place a piece
   */
  findSpotInCol(x) {
    for (let y = this.height - 1; y >= 0; y--) {
      if (this.board[y][x] === null) {
        return y;
      }
    }
    return null;
  }

  /**
   * given 4 coordinates, method will return True/False of whether there is
   * a winner for the game
   */
  checkForWin() {

    function _win(cells) { // no context, don't know what "this" is
      // Check four cells to see if they're all color of current player
      //  - cells: list of four (y, x) cells
      //  - returns true if all are legal coordinates & all match currPlayer

      return cells.every(
        ([y, x]) =>
          y >= 0 &&
          y < this.height &&
          x >= 0 &&
          x < this.width &&
          this.board[y][x] === this.currPlayer
      );
    }


    for (let y = 0; y < this.height; y++) {
      for (let x = 0; x < this.width; x++) {
        // get "checklist" of 4 cells (starting here) for each of the different
        // ways to win
        const horiz = [[y, x], [y, x + 1], [y, x + 2], [y, x + 3]];
        const vert = [[y, x], [y + 1, x], [y + 2, x], [y + 3, x]];
        const diagDR = [[y, x], [y + 1, x + 1], [y + 2, x + 2], [y + 3, x + 3]];
        const diagDL = [[y, x], [y + 1, x - 1], [y + 2, x - 2], [y + 3, x - 3]];

        // find winner (only checking each win-possibility as needed)
        if (_win.call(this, horiz) || _win.call(this, vert) || _win.call(this, diagDR) || _win.call(this, diagDL)) { //FIXME: enter after every || operator
          return true;
        }

        /**
         * SOLUTION OPTION 2: use bind
         * const boundWin = _win.bind(this);
         * if (boundWin(horiz) || boundWin(vert) || boundWin(diagDR) || boundWin(diagDL)) {
          return true;
        }
         * SOLUTION OPTION 3: use arrow
         * EXAMPLE: const _winVar = ()=> { ...} and then call this variable in IF statement
         *
         * Option 4:
         * create _win as a method on the game class
         * bc _win is only necessary for the checkForWin function
         * don't want anyone to be able to access _win which is why opt2/3 are better
         */
      }
    }
    return false;
  }
}

/*
WIP - for the future step

class Player {
  constructor(p1Color, p2Color) {
    this.p1Color = p1Color;
    this.p2Color = p2Color;
  }
}
*/


export {
  Game
};
