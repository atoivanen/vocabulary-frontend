import React, { Fragment } from 'react'
import { Image } from 'react-bootstrap'

import checkmark from '../../../images/checkmark-16.gif'

const Word = ({ word, selectable, showDetails }) => {
  const token = word.token ? `(${word.token})` : null
  const cursorStyle = { cursor: 'pointer' }
  return (
    <Fragment>
      {selectable
        ? (
          <td>
            <input
              type="checkbox" />
          </td>
        )
        : null
      }
      <td
        style={cursorStyle}
        onClick={() => showDetails(word)}>
        <b>{word.lemma}</b> {token} <i>{word.gender}</i>
      </td>
      <td
        style={cursorStyle}
        onClick={() => showDetails(word)}>
        {word.translation} {word.learned ? <Image src={checkmark} /> : null}
      </td>
    </Fragment>
  )
}

export default Word
