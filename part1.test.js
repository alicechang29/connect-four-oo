import { it, expect, beforeEach, describe } from "vitest";
import { Game } from "./connect4.js";

let testGame;

describe('switchCurrPlayer', function () {
  beforeEach(function () {
    testGame = new Game(6, 7);
  });

  it('switches the current player', function () {
    expect(testGame.currPlayer).toEqual(1);
    testGame.switchCurrPlayer();
    expect(testGame.currPlayer).toEqual(2);
  });
});


describe('makeBoard', function () {
  beforeEach(function () {
    testGame = new Game(6, 7); //height, width
  });

  it('makes the in-memory board', function () {
    expect(testGame.board.length).toEqual(testGame.height);

    for (const row of testGame.board) {
      expect(row.length).toEqual(testGame.width);
    }
  });

  it('in-memory board rows should have unique identity', function () {
    const rows = new Set(testGame.board);
    expect(rows.size).toEqual(testGame.board.length);
  });
});


describe('findSpotInCol', function () {
  beforeEach(function () {
    testGame = new Game(6, 7);
  });

  it('finds the next available spot in column', function () {
    const y = testGame.height - 1;
    const x = 0;

    expect(testGame.findSpotInCol(x)).toEqual(y);

    testGame.board[y][x] = 1;

    expect(testGame.findSpotInCol(x)).toEqual(y - 1);
  });

  it('returns null if column filled', function () {
    let y = 0;
    const x = 1;

    while (y < testGame.height) {
      testGame.board[y][x] = 1;
      y++;
    }

    expect(testGame.findSpotInCol(x)).toEqual(null);
  });
});


describe('checkForWin', function () {
  beforeEach(function () {
    testGame = new Game(6, 7);
  });

  it('returns false if no winner', function () {
    expect(testGame.checkForWin()).toEqual(false);
  });

  it('returns true if there is a horizontal winner', function () {
    testGame.board[0][1] = 1;
    testGame.board[0][2] = 1;
    testGame.board[0][3] = 1;
    testGame.board[0][4] = 1;

    expect(testGame.checkForWin()).toEqual(true);
  });

  it('returns true if there is a vertical winner', function () {
    testGame.board[1][0] = 1;
    testGame.board[2][0] = 1;
    testGame.board[3][0] = 1;
    testGame.board[4][0] = 1;

    expect(testGame.checkForWin()).toEqual(true);
  });

  it('returns true if there is a diagonal winner', function () {
    testGame.board[1][1] = 1;
    testGame.board[2][2] = 1;
    testGame.board[3][3] = 1;
    testGame.board[4][4] = 1;

    expect(testGame.checkForWin()).toEqual(true);
  });
});
