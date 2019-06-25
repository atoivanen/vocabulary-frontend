const source_lang = 'fr'
const target_lang = 'fi'
const emptyWord = {
  lemma: '',
  translation: '',
  pos: 'ADJ',
  gender: '',
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
  const id = Number((Math.random() * 1000000).toFixed(0))
  const initialWord = { id, ...emptyWord }
  return {
    type: 'SET_WORD',
    data: initialWord
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
