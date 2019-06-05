import React, { Fragment } from 'react'

const Word = ({ word }) => {
  const token = word.token ? `(${word.token})` : null
  return (
    <Fragment>
      <td>
        <b>{word.lemma}</b> {token} <i>{word.gender}</i></td>
      <td>{word.translation}</td>
    </Fragment>
  )
}

export default Word
