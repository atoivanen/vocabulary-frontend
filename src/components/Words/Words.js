import React from 'react'
import { Table } from 'react-bootstrap'

import Word from './Word/Word'

const Words = (props) => {
  return (
    <div>
      <Table borderless hover size="sm">
        <tbody>
          {props.words.map((word) =>
            <tr key={word.id} >
              <Word
                word={word}
                selectable={props.selectable}
                showDetails={props.showDetails} />
            </tr>
          )}
        </tbody>
      </Table>
    </div>
  )
}

export default Words
