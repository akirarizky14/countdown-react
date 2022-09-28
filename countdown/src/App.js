import React,{useState,useEffect} from 'react';
import './App.css';
import Board from './Board';
import Square from './Square';

const defaultSquares = () => (new Array(9)).fill(null);
const lines = [
  [0,1,2] , [3,4,5] , [6,7,8],
  [0,3,6] , [1,4,7] , [2,5,8],
  [0,4,8] , [2,4,6] , 
]
function App() {
  const [squares,setSquares] = useState(defaultSquares());
  const [winner,setWinner] = useState(null);
  useEffect( () => {
    const isComputerTurn = squares.filter(square => square != null).length % 2 === 1;
    const linesThatare = (a,b,c) => {
      return lines.filter(squareIndexes => {
        const squareValues = squareIndexes.map(index => squares[index]);
        return JSON.stringify([a,b,c].sort()) === JSON.stringify(squareValues.sort());
      })
    }
    const emptyindexes = squares
      .map((square,index) => square === null ? index : null)
      .filter(val => val != null);
    const playerWon = linesThatare('x','x','x').length > 0;
    if (playerWon){
      setWinner('x');
    }
    const computerWon = linesThatare('o','o','o').length >0;
    if(computerWon){
      setWinner('o');
    }
    const putComputerAt = index => {
      let newSquares = squares;
      newSquares = squares;
      newSquares[index] = 'o';
      setSquares([...newSquares]);
    };
    if (isComputerTurn) {
      const linestoBlock = linesThatare('x','x',null);
      if(linestoBlock.length > 0){
        const blockIndex = linestoBlock[0].filter(index => squares[index] === null)[0]; 
        putComputerAt(blockIndex);
        return;
      }
      const winingLines = linesThatare('o','o',null);
      if(winingLines.length > 0){
        const winIndex = winingLines[0].filter(index => squares[index] === null)[0];
        putComputerAt(winIndex);
        return;
      }
      const linestoContinue = linesThatare('o',null,null);
      if(linestoContinue.length > 0){
        putComputerAt(linestoContinue[0].filter(index => squares[index] === null)[0]);
        return;
      }

      const randomIndex = emptyindexes[Math.ceil(Math.random()*emptyindexes.length)];
      putComputerAt(randomIndex)
    }
  },[squares]);
  function handleSquareClick(index){
    const isPlayerTurn = squares.filter(square => square != null).length % 2 === 0;
    if(isPlayerTurn){
      let newSquares = squares;
      newSquares[index] = 'x';
      setSquares([...newSquares]);
    }
  }
  return (
    <main>
      <Board>
        {squares.map((square,index) =>
          <Square
            x = {square === 'x' ? 1 : 0}
            o = {square === 'o' ? 1 : 0}
            onClick={() => handleSquareClick(index)} />
        )}
      </Board>
      {!!winner && winner === 'x' &&(
        <div className='result green'>
          Congratulation! You win the game.
        </div>
      )}
      {!!winner && winner === 'o' &&(
        <div className='result red'>
          Sorry you lost the game.
        </div>
      )}
    </main>
  );
}

export default App;
