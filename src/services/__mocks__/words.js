const words = [
  {
    id: 260908,
    lemma: 'solennel',
    translation: 'juhlallinen',
    pos: 'ADJ',
    gender: 'm',
    source_lang: 'fr',
    target_lang: 'fi',
    created_by: 1,
    modified_by: null
  },
  {
    id: 260910,
    lemma: 'solide',
    translation: 'kiinteä',
    pos: 'ADJ',
    gender: null,
    source_lang: 'fr',
    target_lang: 'fi',
    created_by: 1,
    modified_by: null
  }
]

const getAll = () => {
  return Promise.resolve(words)
}

export default { getAll }