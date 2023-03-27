import Cell from "./Cell";
import useSequenceStore from "../stores/SequenceStore";

function Grid({ toggleStep }) {

  const sequence = useSequenceStore((state) => state.sequence)
  const cells = sequence.map((row, i) =>
    row.map((time, j) => (
      <Cell
        key={i + j}
        column={j + 1}
        row={i + 1}
        activated={sequence[i][j]["activated"]}
        triggered={sequence[i][j]["triggered"]}
        toggleStep={toggleStep}
      />
    ))
  );
  return <div className="sequence-grid">{cells}</div>;
}

export default Grid;
