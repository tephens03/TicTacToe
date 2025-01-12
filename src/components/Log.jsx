export default function Log({ logs }) {

  return (
    <ol id="log">
      {logs.map((log) => (
        <li key={`${log.cell.row}${log.cell.column}}`}>Player {log.player} checked at {log.cell.row}{log.cell.column} </li>)
      )}
    </ol>);
}

