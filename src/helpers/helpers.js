const makeComparable = (word) => {
  const regexA = /[âàá]/g
  const regexE = /[êèéë]/g
  const regexI = /[îï]/g
  const regexO = /ô/g
  const regexU = /[ûùü]/g
  const regexC = /ç/g
  return word
    .toLowerCase()
    .replace(regexA, 'a')
    .replace(regexE, 'e')
    .replace(regexI, 'i')
    .replace(regexO, 'o')
    .replace(regexU, 'u')
    .replace(regexC, 'c')
}

const alphabeticalSort = (a, b) => {
  const wordA = makeComparable(a.lemma)
  const wordB = makeComparable(b.lemma)
  if (wordA < wordB) {
    return -1
  }
  if (wordA > wordB) {
    return 1
  }
  return 0
}

export const wordsToShow = (words, search) => {
  const filteredWords = words.filter(word => {
    const comparableLemma = makeComparable(word.lemma)
    const comparableTranslation = makeComparable(word.translation)
    const comparableSearch = makeComparable(search)
    return (comparableLemma.startsWith(comparableSearch)
      || comparableTranslation.startsWith(comparableSearch))
  })

  const sortedWords = filteredWords.sort((a, b) => alphabeticalSort(a, b))

  return sortedWords
}

export const vocabularyWordsToShow = (words, search) => {
  const filteredWords = words.filter(word => {
    const comparableLemma = makeComparable(word.lemma)
    const comparableTranslation = makeComparable(word.translation)
    const comparableToken = makeComparable(word.token)
    const comparableSearch = makeComparable(search)
    return (comparableLemma.startsWith(comparableSearch)
      || comparableTranslation.startsWith(comparableSearch)
      || comparableToken.includes(comparableSearch))
  })

  const sortedWords = filteredWords.sort((a, b) => alphabeticalSort(a, b))

  return sortedWords
}
