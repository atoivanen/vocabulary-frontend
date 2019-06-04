import React, { Fragment } from 'react'

const Word = (props) => (
  <Fragment>
    <td><b>{props.lemma}</b> <i>{props.gender}</i></td>
    <td>{props.translation}</td>
  </Fragment>
)

export default Word
