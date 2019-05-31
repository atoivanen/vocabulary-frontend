import React from 'react'
import { Table } from 'react-bootstrap'

import Word from './Word/Word'

const Words = ({ words, show }) => {
  const alphabeticalSort = (a, b) => {
    const wordA = a.lemma.toUpperCase()
    const wordB = b.lemma.toUpperCase()
    if (wordA < wordB) {
      return -1
    }
    if (wordA > wordB) {
      return 1
    }
    return 0
  }

  return (
    <div>
      <Table borderless hover size="sm">
        <tbody>
          {words
            .sort((a, b) => alphabeticalSort(a, b))
            .map((word) =>
              <Word
                key={word.id}
                lemma={word.lemma}
                gender={word.gender}
                translation={word.translation}
                show={() => show(word)} />
          )}
        </tbody>
      </Table>
    </div>
  )
}

export default Words
