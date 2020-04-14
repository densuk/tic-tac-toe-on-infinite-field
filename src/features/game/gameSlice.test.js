import { initialState, gameActions, gameReducer } from './gameSlice'
import { CELL_STATES } from '../../constants'

describe('Test game slice', () => {
  it('clear action', () => {
    const state = {
      ...initialState,
      isOver: true,
    }

    expect(gameReducer(state, gameActions.clear(undefined))).toEqual(
      initialState
    )
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

    expect(
      gameReducer(
        state,
        gameActions.play({
          x: 7,
          y: 5,
        })
      )
    ).toEqual({
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
