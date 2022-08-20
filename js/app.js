$(document).ready(function () {
  // Create a game board (three arrays inside a single array)
  const board = [
    ["", "", ""],
    ["", "", ""],
    ["", "", ""],
  ];

  // Track turns
  let turn = 0;

  // Add event listeners to each box
  $(".box").on("click", handleClick);

  // Handle each box click
  function handleClick(evt) {
    let $activeSquare = $(evt.target);

    if (turn % 2 == 0 && $activeSquare.text() === "") {
      $activeSquare.text("X");
      let currCoords = $activeSquare.attr("coord").split(",").map(Number);
      board[currCoords[0]][currCoords[1]] = "x";
      turn++;
    } else if (turn % 2 != 0 && $activeSquare.text() === "") {
      $activeSquare.text("O");
      let currCoords = $activeSquare.attr("coord").split(",").map(Number);
      board[currCoords[0]][currCoords[1]] = "o";
      turn++;
    }

    // If more than three turns, check for winners
    if (turn >= 3) {
      let winner = checkForWinner(board);

      // If there's a winner turn off event listeners and display alert (with timeout)
      if (winner === "x") {
        $(".box").off("click");
        setTimeout(function () {
          alert("X won!");
        }, 100);
      } else if (winner === "o") {
        $(".box").off("click");
        setTimeout(function () {
          alert("O won!");
        }, 100);
      }

      // Check if the board is full
      let total = 0;
      board.flat().forEach(function (box) {
        if (box === "x" || box === "o") {
          total++;
        }
      });

      // If the board is full and we have ni winner then annouce a tie
      if (total == 9 && winner === false) {
        setTimeout(function () {
          alert("It's a tie!");
        }, 100);
      }

      // Once all boxes are full, remove all event listeners
      if (total == 9) {
        $(".box").off("click");
      }
    }
  }

  // Leverages all check functions to check for a winner
  function checkForWinner(board) {
    let hCheck = checkHorizontal(board);
    let vCheck = checkVertical(board);
    let OFLCheck = checkObliqueFromLeft(board);
    let OFRCheck = checkObliqueFromRight(board);
    let allChecks = [hCheck, vCheck, OFLCheck, OFRCheck];
    for (let i = 0; i < allChecks.length; i++) {
      if (allChecks[i] === "x") {
        return "x";
      } else if (allChecks[i] == "o") {
        return "o";
      }
    }
    return false;
  }

  // Check for a winner ('x' or 'o') horizontally
  function checkHorizontal(board) {
    let countX = 0, countO = 0;
    for (let i = 0; i < 3; i++) {
      countX = 0;
      countO = 0;
      for (let j = 0; j < 3; j++) {
        if (board[i][j] === "x") {
          countX++;
        } else if (board[i][j] === "o") {
          countO++;
        }

        if (countX == 3 || countO == 3) {
          return checkCount(countX, countO);
        }
      }
    }
    return checkCount(countX, countO);
  }

  // Check for a winner ('x' or 'o') diagonally (from the left)
  function checkObliqueFromLeft(board) {
    let countX, countO;

    for (let i = 0; i < 3; i++) {
      countX = 0;
      countO = 0;
      if (board[i][i] === "x") {
        countX++;
      } else if (board[i][i] === "o") {
        countO++;
      }
    }

    return checkCount(countX, countO);
  }

  // Check for a winner ('x' or 'o') diagonally (from the right)
  function checkObliqueFromRight(board) {
    let countX, countO;
    let j = 0;
    for (let i = 2; i >= 0; i--) {
      countX = 0;
      countO = 0;
      if (board[j][i] === "x") {
        countX++;
      } else if (board[j][i] === "o") {
        countO++;
      }
      j++;
    }
    return checkCount(countX, countO);
  }

  // Check for a winner ('x' or 'o') vertically
  function checkVertical(board) {
    let countX, countO;
    for (let i = 0; i < 3; i++) {
      countX = 0;
      countO = 0;
      for (let j = 0; j < 3; j++) {
        if (board[j][i] === "x") {
          countX++;
        } else if (board[j][i] === "o") {
          countO++;
        }
      }
      if (countX == 3 || countO == 3) {
        return checkCount(countX, countO);
      }
    }
    return checkCount(countX, countO);
  }

  // General function to check if three consecuitve matches happened
  function checkCount(x, o) {
    if (x == 3) {
      return "x";
    } else if (o == 3) {
      return "o";
    }
    return false;
  }
});
