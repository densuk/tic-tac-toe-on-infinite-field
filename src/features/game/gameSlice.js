import { createSlice } from '@reduxjs/toolkit'
import { getHashFromCoordinates, getNextTurn } from '../../utils'
import { CELL_STATES } from '../../constants'
import { getPlayerLine } from './selectors'

export const initialState = {
  numberMovesToWin: 3, // Количество ходов для победы
  turn: CELL_STATES.X, // Текущий игрок, по-умолчанию X
  winner: null, // Победитель
  winningCells: null, // Выигравшая комбинация
  isOver: false, // Признак завершения игры
  table: {}, // Словарь, для хранения ходов
}

const reducers = {
  play: (state, { payload: { x, y } }) => {
    const hash = getHashFromCoordinates(x, y)
    const player = state.turn

    if (state.table[hash] === undefined) {
      state.table[hash] = { x, y, value: player }
    } else {
      state.table[hash].value = player
    }

    const lines = [
      getPlayerLine(
        x,
        y,
        -1,
        -1,
        player,
        true
      )(state)
        .concat([
          {
            x,
            y,
          },
        ])
        .concat(getPlayerLine(x, y, 1, 1, player, false)(state)),
      getPlayerLine(
        x,
        y,
        0,
        -1,
        player,
        true
      )(state)
        .concat([
          {
            x,
            y,
          },
        ])
        .concat(getPlayerLine(x, y, 0, 1, player, false)(state)),
      getPlayerLine(
        x,
        y,
        1,
        -1,
        player,
        true
      )(state)
        .concat([
          {
            x,
            y,
          },
        ])
        .concat(getPlayerLine(x, y, -1, 1, player, false)(state)),
      getPlayerLine(
        x,
        y,
        -1,
        0,
        player,
        true
      )(state)
        .concat([
          {
            x,
            y,
          },
        ])
        .concat(getPlayerLine(x, y, 1, 0, player, false)(state)),
    ]

    for (let i = 0; i < lines.length; i++) {
      if (lines[i].length >= state.numberMovesToWin) {
        state.winner = state.turn
        state.winningCells = lines[i]
        state.isOver = true

        break
      }
    }

    if (state.isOver) {
      state.turn = null
    } else {
      state.turn = getNextTurn(state.turn)
    }
  },
  clear: () => initialState,
}

export const {
  actions: gameActions,
  reducer: gameReducer,
  caseReducers: gameCaseReducers,
} = createSlice({
  name: 'grid',
  initialState,
  reducers,
})
