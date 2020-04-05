import game, { initialState, set, clear, play } from './gameSlice'
import { CELL_STATES } from '../../constants'

describe('Test game slice', () => {
  it('set action', () => {
    const cell = { x: 0, y: 0, value: CELL_STATES.X }
    const action = {
      type: set.type,
      payload: cell,
    }

    expect(game(initialState, action)).toEqual({
      ...initialState,
      table: {
        '0,0': cell,
      },
    })
  })

  it('clear action', () => {
    const state = {
      ...initialState,
      isOver: true,
    }
    const action = { type: clear.type }

    expect(game(state, action)).toEqual(initialState)
  })

  it('play action', () => {
    const state = {
      ...initialState,
      turn: CELL_STATES.O,
      table: {
        '0,0': { x: 5, y: 3, value: CELL_STATES.X },
        '5,3': { x: 5, y: 3, value: CELL_STATES.O },
        '6,3': { x: 6, y: 3, value: CELL_STATES.X },
        '6,4': { x: 6, y: 4, value: CELL_STATES.O },
        '7,3': { x: 7, y: 3, value: CELL_STATES.X },
      },
    }
    const action = {
      type: play.type,
      payload: {
        x: 7,
        y: 5,
      },
    }

    expect(game(state, action)).toEqual({
      ...initialState,
      isOver: true,
      turn: null,
      winner: CELL_STATES.O,
      winningCells: [
        { x: 5, y: 3 },
        { x: 6, y: 4 },
        { x: 7, y: 5 },
      ],
      table: {
        '0,0': { x: 5, y: 3, value: CELL_STATES.X },
        '5,3': { x: 5, y: 3, value: CELL_STATES.O },
        '6,3': { x: 6, y: 3, value: CELL_STATES.X },
        '6,4': { x: 6, y: 4, value: CELL_STATES.O },
        '7,3': { x: 7, y: 3, value: CELL_STATES.X },
        '7,5': { x: 7, y: 5, value: CELL_STATES.O },
      },
    })
  })
})
