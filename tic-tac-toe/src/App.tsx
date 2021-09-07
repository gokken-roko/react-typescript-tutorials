import React, { useState } from 'react'
import './index.css'
import { calculateWinner } from './calculateWinner'
import Button from '@material-ui/core/Button'

export type Squares = Array<string | null>

interface SquareProps {
  readonly value: string | null
  readonly onClick: () => void
}
export const Square: React.FunctionComponent<SquareProps> = (squareProps: SquareProps) => {
  return (
    <button className="square" onClick={squareProps.onClick}>
      {squareProps.value}
    </button>
  )
}

interface BoardProps {
  readonly squares: Squares
  readonly onClick: (i: number) => void
}
export const Board: React.FunctionComponent<BoardProps> = (boardProps: BoardProps) => {
  const renderSquare = (i: number) => {
    return <Square value={boardProps.squares[i]} onClick={() => boardProps.onClick(i)} />
  }

  return (
     <div>
       <div className="board-row">
         {renderSquare(0)}
         {renderSquare(1)}
         {renderSquare(2)}
       </div>
       <div className="board-row">
         {renderSquare(3)}
         {renderSquare(4)}
         {renderSquare(5)}
       </div>
       <div className="board-row">
         {renderSquare(6)}
         {renderSquare(7)}
         {renderSquare(8)}
       </div>
     </div>
  )
}

export const Game: React.FunctionComponent = () => {
  interface GameState {
    readonly history: {readonly squares: Squares}[]
    readonly stepNumber: number
    readonly xIsNext: boolean
  }
  const [gameState, setGameState] = useState<GameState>({
    history: [{
      squares: Array(9).fill(null)
    }],
    stepNumber: 0,
    xIsNext: true
  })

  const handleClick = (i: number) => {
    const history = gameState.history.slice(0, gameState.stepNumber + 1)
    const current = history[gameState.stepNumber]
    const squares = current.squares.slice()
    if (calculateWinner(squares) || squares[i]) {
      return
    }
    squares[i] = gameState.xIsNext ? 'X' : 'O'
    setGameState({
      ...gameState,
      history: history.concat([{
        squares: squares
      }]),
      stepNumber: history.length,
      xIsNext: !gameState.xIsNext
    })
    console.log(gameState)
  }

  const jumpto = (step: number) => {
    setGameState({
      ...gameState,
      stepNumber: step,
      xIsNext: (step % 2) === 0
    })
    console.log(gameState)
  }

  const history = gameState.history
  const current = history[gameState.stepNumber]
  const winner = calculateWinner(current.squares)

  const moves = history.map((_step, move) => {
    return (
      <>
      { move
        ? (
          <li key={move}>
              <Button variant="contained" color="primary" onClick={() => jumpto(move)} key={move}>Go to move # {move}</Button>
          </li>
          )
        : (
          <li key={move}>
              <Button variant="contained" color="secondary" onClick={() => jumpto(move)} key={move}>Go to game start</Button>
          </li>
          )
      }
      </>
    )
  })

  let status = ''
  if (winner) {
    status = 'Winner: ' + winner
  } else {
    status = 'Next player: ' + (gameState.xIsNext ? 'X' : 'O')
  }
  return (
    <div className="game">
      <div className="game-board">
        <Board squares={current.squares} onClick={(i) => handleClick(i)}/>
      </div>
      <div className="game-info">
        <div className="game-status">{status}</div>
        <ol>{moves}</ol>
      </div>
    </div>
  )
}
export default Game
