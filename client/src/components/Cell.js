function Cell({ activated, triggered, column, row, toggleStep }) {
  const getBackground = (activated, triggered) => {
    switch (true) {
      case activated && triggered:
        return "cell-triggered";
      case activated && !triggered:
        return "cell-active";
      case !activated && triggered:
        return "cell-time";
      default:
        return "cell";
    }
  };

  return (
    <div
      className={getBackground(activated, triggered)}
      grid-column={column}
      grid-row={row}
      onClick={() => toggleStep(row - 1, column - 1)}
    ></div>
  );
}

export default Cell;
