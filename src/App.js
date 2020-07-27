import React, { useEffect } from "react";
import "./App.css";

function App() {
  const [board, setBoard] = React.useState(Array(9).fill(""));
  const [turn, setTurn] = React.useState(0);
  const [winner, setWinner] = React.useState(null);

 
  useEffect(() => {
    setWinner(checkForWinner(board))
  }, [board])


  const checkForWinner = (arr) => {

    // All possible combinations
    const firstRow = arr[0] + arr[1] + arr[2]
    const secondRow = arr[3] + arr[4] + arr[5]
    const thirdRow = arr[6] + arr[7] + arr[8]
    const firstColumn = arr[0] + arr[3] + arr[6]
    const secondColumn = arr[1] + arr[4] + arr[7]
    const thirdColumn = arr[2] + arr[5] + arr[8]
    const firstDiagonal = arr[0] + arr[4] + arr[8]
    const secondDiagonal = arr[2] + arr[4] + arr[6]

    const checkAll = [ firstRow, secondRow, thirdRow, firstColumn, secondColumn, thirdColumn,
      firstDiagonal, secondDiagonal ]
    
    return checkAll.find(comb => {
      console.time('checkWinner')
      if (comb === 'XXX' ) {
        return 'X'
      } else if (comb === 'OOO' ) {
        return 'O'
      }

      console.timeEnd('checkWinner')
      return null
    })


  };

  const handleClick = (index) => {
    const updatedBoard = board.slice();

    if (turn % 2 === 0) {
      updatedBoard[index] = "X";
      setBoard(updatedBoard);
    } else {
      updatedBoard[index] = "O";
      setBoard(updatedBoard);
    }

    setTurn(turn + 1)

  };

  return (
    <div className="App">
      <h2>{winner ? `Winner ${winner.substr(0,1)}` : `Next turn ${turn % 2 === 0 ? 'X' : 'O'}`}</h2>
      <ul className="board">
        {board.map((c, i) => (
          <li key={i} onClick={!board[i] && !winner ? () => handleClick(i) : null}>
            {c}
          </li>
        ))}
      </ul>
    </div>
  );
}

export default App;
