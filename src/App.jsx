
import Player from './components/Player'

import GameBoard from './components/GameBoard'

import Log from './components/Log'

import GameOver from './components/GameOver'

import { useState } from 'react'

import { WINNING_COMBINATIONS } from './components/winning-combination'

function getCurrentPlayer(moveList) {
  let currentPlayer = 'X'
  if (moveList.length > 0 && moveList[0].player === 'X') {
    currentPlayer = 'O'
  }
  return currentPlayer
}

function App() {
  let winner

  const initialGameBoard = [
    [null, null, null],
    [null, null, null],
    [null, null, null],

  ]

  const [playerNames, setPlayerName] = useState({ "X": "Player 1", "O": "Player 2" })

  const [moveList, setMoveList] = useState([])

  const activePlayer = getCurrentPlayer(moveList)

  let gameboard = initialGameBoard

  for (const move of moveList) {

    const { cell, player } = move
    const { row, column } = cell

    gameboard[row][column] = player
  }

  function handleSelectCell(rowIndex, colIndex) {
    // setActivePlayer((currentPlayer) => currentPlayer === 'X' ? 'O' : 'X')
    setMoveList(oldMoveList => {

      let player = oldMoveList.length > 0 && oldMoveList[0].player === 'X' ? 'O' : 'X'
      const newMoveList = [
        { cell: { row: rowIndex, column: colIndex }, player: player },
        ...oldMoveList
      ];
      return newMoveList
    })
  }

  function handleChangeName(symbol, newName) {
    setPlayerName((oldNames) => {
      return { ...oldNames, [symbol]: newName }
    }
    )
  }

  for (const combination of WINNING_COMBINATIONS) {
    const first = gameboard[combination[0].row][combination[0].column]
    const second = gameboard[combination[1].row][combination[1].column]
    const third = gameboard[combination[2].row][combination[2].column]

    if (first && first === second && second === third) {
      winner = first
      break;
    }
  }

  const isTie = moveList.length >= 9 && !winner

  return (
    <main >
      <div id='game-container'>
        <ol id='players' className='highlight-player'>

          <Player handleChangeName={handleChangeName} name={playerNames['X']} isActive={activePlayer === 'X'} symbol='X' veteran='yes' country='Vietnam' />

          <Player handleChangeName={handleChangeName} name={playerNames['O']} isActive={activePlayer === 'O'} symbol='O' country='USA' veteran='yes' />

        </ol>
        {(winner || isTie) && <GameOver playerNames={playerNames} isTie={isTie} winnerSymbol={winner} />}

        <GameBoard gameboard={gameboard} handleSelectCell={handleSelectCell} />
      </div>
      <Log logs={moveList} />
    </main>
  )
}

export default App
