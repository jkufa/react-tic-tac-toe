import { Tile } from "..";
import styles from "./board.module.css";

export default function Board({
  xTurn,
  currentTiles,
  onPlay,
}: {
  xTurn: boolean;
  currentTiles: ("X" | "O" | null)[];
  onPlay: (tiles: ("X" | "O" | null)[]) => void;
}) {
  const DIMENSIONS = 3;
  function handleTile(i: number) {
    if (currentTiles[i] || winner) return;

    const piece = xTurn ? "X" : "O";
    const nextTiles = [...currentTiles];

    nextTiles[i] = piece;

    onPlay(nextTiles);
  }

  function calculateWinner(squares: any[]) {
    const lines = [
      [0, 1, 2],
      [3, 4, 5],
      [6, 7, 8],
      [0, 3, 6],
      [1, 4, 7],
      [2, 5, 8],
      [0, 4, 8],
      [2, 4, 6],
    ];
    for (let i = 0; i < lines.length; i++) {
      const [a, b, c] = lines[i];
      if (
        squares[a] &&
        squares[a] === squares[b] &&
        squares[a] === squares[c]
      ) {
        return squares[a];
      }
    }
    return null;
  }

  const winner = calculateWinner(currentTiles);
  let status;
  if (winner) {
    status = "Winner: " + winner;
  } else {
    status = "Next player: " + (xTurn ? "X" : "O");
  }

  return (
    <>
      <div className={styles.status}>{status}</div>
      <div className={styles.container}>
        {[...Array(DIMENSIONS)].map((_, i) => (
          <div key={i} id={"row-" + i.toString()} className={styles.row}>
            {[...Array(DIMENSIONS)].map((_, j) => {
              const index = i * DIMENSIONS + j;
              return (
                <Tile
                  key={j}
                  id={index}
                  value={currentTiles[index]!}
                  handleState={() => handleTile(index)}
                />
              );
            })}
          </div>
        ))}
      </div>
    </>
  );
}
