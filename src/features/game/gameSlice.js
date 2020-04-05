import { createSlice } from '@reduxjs/toolkit'
import { getHashFromCoordinates, getNextTurn } from '../../utils'
import { CELL_STATES } from '../../constants'
import { getPlayerLine } from './selectors'

export const initialState = {
  numberMovesToWin: 3, // Колличество ходов для победы
  turn: CELL_STATES.X, // Текущий игрок, по-умолчанию X
  winner: null, // Победитель
  winningCells: null, // Выигравшая комбинация
  isOver: false, // Признак заверщения игры
  table: {}, // Словарь, для хранения ходов
}

const reducers = {
  set: (state, { payload }) => {
    const hash = getHashFromCoordinates(payload.x, payload.y)

    if (state.table[hash] === undefined) {
      state.table[hash] = payload
    } else {
      state.table[hash].value = payload.value
    }
  },
  clear: () => initialState,
  play: (state, { payload: { x, y } }) => {
    const player = state.turn

    // Подумать над этим
    const set = (state, { payload }) => {
      const hash = getHashFromCoordinates(payload.x, payload.y)

      if (state.table[hash] === undefined) {
        state.table[hash] = payload
      } else {
        state.table[hash].value = payload.value
      }
    }
    set(state, { payload: { x, y, value: state.turn } })
    // Подумать над этим

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
}

const game = createSlice({
  name: 'grid',
  initialState,
  reducers,
})

export const { set, clear, play } = game.actions

export default game.reducer
