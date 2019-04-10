import React from 'react';

import Modal from '../UI/Modal/Modal'
import Word from './Word/Word'
import EditWord from './Word/EditWord/EditWord'

const words = (props) => props.words.map((word, index) =>{
  return (
    <div key={word.id}>
      <Modal
        showModal={props.showDetails[index].show}
        title={props.title}
        close={() => props.close(word.id)}
        next={(event) => props.next(event, word.id)}>
        <EditWord
          key={word.id}
          lemma={word.lemma}
          translation={word.translation}
          pos={word.pos}
          gender={word.gender}
          changed={(event) => props.changed(event, word.id)} />
      </Modal>
      <Word
        key={word.id}
        lemma={word.lemma}
        gender={word.gender}
        translation={word.translation}
        show={() => props.show(word.id)} />
    </div>
  )
})


export default words;
