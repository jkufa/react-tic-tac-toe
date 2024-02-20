import styles from "./Tile.module.css";

export default function Tile({
  id,
  value,
  handleState: onClick,
}: {
  id?: number;
  value: string;
  handleState: () => void;
}) {
  function handleClick() {
    onClick();
  }

  return (
    <button
      id={"tile-" + id?.toString()}
      className={styles.tile}
      onClick={handleClick}
    >
      {value ?? ""}
    </button>
  );
}
