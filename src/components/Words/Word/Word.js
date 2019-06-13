import React, { Fragment } from 'react'
import { Image } from 'react-bootstrap'

import checkmark from '../../../images/checkmark-16.gif'

const Word = (props) => {
  const token = props.word.token ? `(${props.word.token})` : null
  const cursorStyle = { cursor: 'pointer' }
  return (
    <Fragment>
      {props.selectable
        ? (
          <td>
            <input
              type="checkbox"
              name={props.word.id}
              checked={props.word.selected}
              onChange={props.toggleChecked}/>
          </td>
        )
        : null
      }
      <td
        style={cursorStyle}
        onClick={() => props.showDetails(props.word)}>
        <b>{props.word.lemma}</b> {token} <i>{props.word.gender}</i>
      </td>
      <td
        style={cursorStyle}
        onClick={() => props.showDetails(props.word)}>
        {props.word.translation}
        {props.word.learned ? <Image src={checkmark} /> : null}
      </td>
    </Fragment>
  )
}

export default Word
