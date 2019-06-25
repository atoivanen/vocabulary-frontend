import React from 'react'
import 'jest-dom/extend-expect'
import { render, cleanup } from '@testing-library/react'
import Words from './Words'

afterEach(cleanup)

test('renders content', () => {
  const words = [
    {
      'id': 262387,
      'lemma': 'écrire',
      'translation': 'kirjoittaa, laatia',
      'pos': 'VERB',
      'gender': null
    },
    {
      'id': 262388,
      'lemma': 'écrit',
      'translation': 'kirjoitus',
      'pos': 'NOUN',
      'gender': 'm'
    }
  ]

  const component = render(
    <Words words={words} />
  )

  expect(component.container).toHaveTextContent('écrire')
  expect(component.container).toHaveTextContent('écrit')
  expect(component.container).toHaveTextContent('kirjoittaa, laatia')
  expect(component.container).toHaveTextContent('kirjoitus')
})