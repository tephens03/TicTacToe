export default function GameOver({ playerNames, winnerSymbol, isTie }) {

  const result = isTie ? <p>No Winner</p> : < p > You won, {playerNames[winnerSymbol]}!</p>
  return (
    <div id='game-over'>
      <h2>Game Over!</h2>
      {result}
      <p>
        <button>Rematch!</button>
      </p>
    </div >
  )
}