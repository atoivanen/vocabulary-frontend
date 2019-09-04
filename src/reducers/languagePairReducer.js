const initialLanguagePair = {
  id: 1,
  name: 'FR-FI',
  longName: 'Ranska',
  source: 'fr',
  target: 'fi'
}
const languagePairReducer = (state=initialLanguagePair, action) => {
  switch (action.type) {
  case 'SET_LANGUAGE_PAIR':
    return { ...action.data }
  case 'RESET':
    return {}
  default:
    return state
  }
}

export const setLanguagePair = (content) => {
  return {
    type: 'SET_LANGUAGE_PAIR',
    data: content
  }
}

export const resetLanguagePair = () => {
  return {
    type: 'RESET'
  }
}

export default languagePairReducer
