const emptyWord = {
  lemma: '',
  translation: '',
  pos: 'ADJ',
  gender: '',
  token: '',
  source_lang: 'fr',
  target_lang: 'fi'
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

export const createWord = (source_lang, target_lang) => {
  const word = {
    lemma: '',
    translation: '',
    pos: 'ADJ',
    gender: '',
    token: '',
    source_lang,
    target_lang
  }
  return {
    type: 'SET_WORD',
    data: word
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
