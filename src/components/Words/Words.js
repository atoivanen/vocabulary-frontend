import React from 'react'

import FormModal from '../UI/FormModal/FormModal'
import Word from './Word/Word'
import WordForm from './WordForm/WordForm'

const Words = (props) => props.words.map((word, index) =>{
  return (
    <div key={word.id}>
      <FormModal
        showModal={props.showDetails[index].show}
        title={props.title}
        close={() => props.close(word.id)}
        next={(event) => props.next(event, word.id)} >
        <WordForm
          key={word.id}
          lemma={word.lemma}
          translation={word.translation}
          pos={word.pos}
          gender={word.gender}
          changed={(event) => props.changed(event, word.id)}
          saveWord={(event) => props.saveWord(event, word.id)}
          notification={props.notification} />
      </FormModal>
      <Word
        key={word.id}
        lemma={word.lemma}
        gender={word.gender}
        translation={word.translation}
        show={() => props.show(word.id)} />
    </div>
  )
})


export default Words
