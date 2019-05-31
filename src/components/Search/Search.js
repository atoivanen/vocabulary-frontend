import React from 'react'
import { Form } from 'react-bootstrap'
import { useTranslation } from 'react-i18next'

const Search = ({ changed, value }) => {
  const { t } = useTranslation()
  const searchPlaceholder = t('SearchPlaceholder')

  return (
    <Form>
      <Form.Control 
        type="text"
        placeholder={searchPlaceholder}
        value={value}
        onChange={changed} />
    </Form>
  )
}

export default Search