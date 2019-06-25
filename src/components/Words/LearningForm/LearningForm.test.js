import React from 'react'
import 'jest-dom/extend-expect'
import { render, cleanup } from '@testing-library/react'
import LearningForm from './LearningForm'

afterEach(cleanup)

test('renders content', () => {
  const word = {
    'id': 262387,
    'lemma': 'écrire',
    'translation': 'kirjoittaa, laatia',
    'pos': 'VERB',
    'gender': null
  }
  const practicing = true
  const disabled = false
  const myTry = ''
  const mockHandler = jest.fn()

  const component = render(
    <LearningForm
      practicing={practicing}
      word={word}
      myTry={myTry}
      disabled={disabled}
      change={mockHandler}
      stopPracticing={mockHandler}
      next={mockHandler}
      checkWord={mockHandler}
    />
  )

  const element = component.getByText('kirjoittaa, laatia')
  expect(element).toBeDefined()
})