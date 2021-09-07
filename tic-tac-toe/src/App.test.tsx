import React from 'react'
import Enzyme, { shallow } from 'enzyme'
import Game, { Square, Board } from './App'
import Adapter from 'enzyme-adapter-react-16'

// Should use adapter-react-17
// https://github.com/enzymejs/enzyme/issues/2429
Enzyme.configure({ adapter: new Adapter() })

describe('<Square />', () => {
  let onClick: jest.Mock
  beforeEach(() => {
    onClick = jest.fn()
  })

  test('Ok null', () => {
    const square = shallow(<Square value={null} onClick={onClick} />)
    expect(square.exists()).toBe(true)

    const button = square.find('button')
    expect(button.exists()).toBe(true)
  })

  test('Ok string', () => {
    const square = shallow(<Square value={'X'} onClick={onClick} />)
    expect(square.exists()).toBe(true)

    const button = square.find('button')
    expect(button.exists()).toBe(true)
    expect(button.text()).toBe('X')
  })

  // TODO: test onClick
})

describe('<Board />', () => {
  let onClick: jest.Mock
  beforeEach(() => {
    onClick = jest.fn()
  })

  test('Ok null squares', () => {
    const squares = Array(9).fill(null)
    const board = shallow(<Board squares={squares} onClick={onClick} />)
    expect(board.exists()).toBe(true)
  })

  test('Ok string squares', () => {
    const squares = Array(9).fill('X')
    const board = shallow(<Board squares={squares} onClick={onClick} />)
    expect(board.exists()).toBe(true)
  })

  // TODO: test onClick
})

describe('<Game />', () => {
  test('OK first step', () => {
    const game = shallow(<Game />)
    expect(game.exists()).toBe(true)

    // Check First Step is X
    expect(game.find('.game-status').text()).toContain('X')
  })
})
