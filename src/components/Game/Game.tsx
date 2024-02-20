import { useState } from "react";
import Board from "../Board/Board";

type TileValue = "X" | "O" | null;

export default function Game() {
  const [history, setHistory] = useState<TileValue[][]>([
    Array(9).fill(null),
  ] as TileValue[][]);
  const [currentMove, setCurrentMove] = useState(0);
  const currentTiles = history[currentMove];
  const xTurn = !(currentMove % 2);

  function handlePlay(nextTiles: (number | null)[]) {
    const nextHistory: TileValue[][] = [
      ...history.slice(0, currentMove + 1),
      nextTiles,
    ];
    setHistory(nextHistory);
    setCurrentMove(nextHistory.length - 1);
  }

  function jumpTo(move: number) {
    setCurrentMove(move);
  }

  const moves = history.map((_, move) => {
    const description = move > 0 ? "Go to move #" + move : "Reset";
    return (
      <li key={move}>
        <button style={{ width: "100%" }} onClick={() => jumpTo(move)}>
          {description}
        </button>
      </li>
    );
  });

  return (
    <div className="game">
      <div className="game-board">
        <Board currentTiles={currentTiles} onPlay={handlePlay} xTurn={xTurn} />
      </div>
      <div className="game-info">
        <ol>{moves}</ol>
      </div>
    </div>
  );
}
