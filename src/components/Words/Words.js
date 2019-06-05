import React from 'react'
import { Table } from 'react-bootstrap'

import Word from './Word/Word'

const Words = (props) => {
  return (
    <div>
      <Table borderless hover size="sm">
        <tbody>
          {props.words.map((word) =>
            <tr
              style={ ({ cursor: 'pointer' }) }
              key={word.id}
              onClick={() => props.showDetails(word)}>
              <Word
                word={word} />
            </tr>
          )}
        </tbody>
      </Table>
    </div>
  )
}

export default Words
