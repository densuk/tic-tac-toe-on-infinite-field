import { CELL_STATES } from '../constants'

export const getHashFromCoordinates = (x, y) => `${x},${y}`

export const getNextTurn = (turn) =>
  turn === CELL_STATES.X ? CELL_STATES.O : CELL_STATES.X
