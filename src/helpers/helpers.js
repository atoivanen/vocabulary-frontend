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

const lengthSort = (a, b) => {
  const wordA = makeComparable(a.lemma)
  const wordB = makeComparable(b.lemma)
  if (wordA.length < wordB.length) {
    return -1
  }
  if (wordA < wordB) {
    return -1
  }
  if (wordA > wordB) {
    return 1
  }
  return 0
}

export const wordsToShow = (words, search) => {
  if (!search) {
    return words.sort((a, b) => alphabeticalSort(a, b))
  }
  const filteredWords = words.filter(word => {
    const comparableLemma = makeComparable(word.lemma)
    const comparableSearch = makeComparable(search)
    return (comparableLemma.startsWith(comparableSearch))
  })

  const sortedWords = filteredWords.sort((a, b) => alphabeticalSort(a, b))

  return sortedWords
}

export const dictionaryWordsToShow = (words, search) => {
  if (!search) {
    return []
  }
  const filteredWords = words.filter(word => {
    const comparableLemma = makeComparable(word.lemma)
    const comparableSearch = makeComparable(search)
    return (comparableLemma.startsWith(comparableSearch))
  })

  const sortedWords = filteredWords.sort((a, b) => alphabeticalSort(a, b))

  return sortedWords
}

export const vocabularyWordsToShow = (words, search) => {
  if (!search) {
    return words.sort((a, b) => alphabeticalSort(a, b))
  }

  const filteredByStartsWith = words.filter(word => {
    const comparableLemma = makeComparable(word.lemma)
    const comparableToken = makeComparable(word.token)
    const comparableSearch = makeComparable(search)

    return comparableLemma.startsWith(comparableSearch)
      || comparableToken.startsWith(comparableSearch)
  })

  const filteredByIncludes = words.filter(word => {
    const comparableLemma = makeComparable(word.lemma)
    const comparableToken = makeComparable(word.token)
    const comparableSearch = makeComparable(search)

    return comparableLemma.includes(comparableSearch)
      || comparableToken.includes(comparableSearch)
  })

  const sortedA = filteredByStartsWith.sort((a, b) => lengthSort(a, b))
  const sortedB = filteredByIncludes.sort((a, b) => lengthSort(a, b))

  return [...new Set([...sortedA, ...sortedB])]
}

export const getConfig = () => {
  const loggedUserJSON = window.localStorage.getItem('loggedVocabularyUser')
  if (loggedUserJSON) {
    const user = JSON.parse(loggedUserJSON)
    const token = `Token ${user.token}`
    const config = {
      headers: { Authorization: token },
    }
    return config
  }
  return null
}
