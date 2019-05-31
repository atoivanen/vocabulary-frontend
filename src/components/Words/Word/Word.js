import React from 'react'

const Word = (props) => (
    <tr onClick={props.show}>
      <td><b>{props.lemma}</b> <i>{props.gender}</i></td>
      <td>{props.translation}</td>
    </tr>
  )

export default Word
