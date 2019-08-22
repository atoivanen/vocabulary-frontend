const source_lang = 'fr'
const target_lang = 'fi'
const emptyWord = {
  lemma: '',
  translation: '',
  pos: 'ADJ',
  gender: '',
  token: '',
  source_lang,
  target_lang
}

const wordReducer = (state = emptyWord, action) => {
  switch (action.type) {
  case 'SET_WORD':
    return { ...action.data }
  case 'RESET_WORD':
    return emptyWord
  default:
    return state
  }
}

export const createWord = () => {
  return {
    type: 'SET_WORD',
    data: emptyWord
  }
}

export const setWord = (content) => {
  return {
    type: 'SET_WORD',
    data: content
  }
}

export const resetWord = () => {
  return {
    type: 'RESET_WORD'
  }
}

export default wordReducer
