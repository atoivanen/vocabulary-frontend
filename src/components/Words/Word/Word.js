import React from 'react'

const Word = (props) => (
    <div onClick={props.show}>
      <b>{props.lemma}</b> <i>{props.gender}</i> {props.translation}
    </div>
  )

export default Word
