import React from 'react'
import { connect } from 'react-redux'
import { useTranslation } from 'react-i18next'
import { Form } from 'react-bootstrap'

import { newSearch } from '../../reducers/searchReducer'

const Search = (props) => {
  const { t } = useTranslation()

  const searchWord = (event) => {
    props.newSearch(event.target.value)
  }

  return (
    <Form.Control
      type="text"
      placeholder={t('SearchPlaceholder')}
      value={props.search}
      onChange={searchWord} />
  )
}

const mapStateToProps = (state) => {
  return {
    search: state.search,
  }
}

const mapDispatchToProps = {
  newSearch,
}

export default connect(
  mapStateToProps,
  mapDispatchToProps
)(Search)
