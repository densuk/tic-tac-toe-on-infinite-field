import { createSelector } from '@reduxjs/toolkit'
import { getHashFromCoordinates } from '../../utils'
import { CELL_STATES } from '../../constants'

export const getCell = (x, y) => (state) =>
  state.table[getHashFromCoordinates(x, y)]

export const getIsOver = (state) => state.isOver
export const getNumberMovesToWin = (state) => state.numberMovesToWin

export const getCanPlay = (x, y) =>
  createSelector(
    getIsOver,
    getCell(x, y),
    (isOver, cell) => !isOver && cell === CELL_STATES.AVAILABLE
  )

export const getPlayerLine = (
  x,
  y,
  increment_x,
  increment_y,
  player,
  doReverse
) => (state) => {
  const arr = []

  for (let i = 1; i < getNumberMovesToWin(state); i++) {
    const cur_x = x + increment_x * i
    const cur_y = y + increment_y * i
    const cell = getCell(cur_x, cur_y)(state)

    if (cell && cell.value === player) {
      arr.push({
        x: cur_x,
        y: cur_y,
      })
    } else {
      break
    }
  }

  if (doReverse) {
    arr.reverse()
  }

  return arr
}
