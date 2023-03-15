import Cell from './Cell'

function Grid({ sequence, toggleStep }) {

    const cells = sequence.map((row, i) =>
        row.map((time, j) =>
        <Cell
            key={i + j}
            activated={sequence[i][j]['activated']}
            triggered={sequence[i][j]['triggered']}
            column={j + 1}
            row={i + 1}
            toggleStep={toggleStep}
        />
        )
    )
    return(
        <div className='sequence-grid'>
            {cells}
        </div>
    )
}

export default Grid