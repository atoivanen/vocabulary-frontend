import React from 'react'
import { useTranslation } from 'react-i18next'
import { DropdownButton, Dropdown } from 'react-bootstrap'

const SelectButton = (props) => {
  const { t } = useTranslation()

  const variantNormal = 'outline-primary'
  const marginR = 'mr-1'

  return (
    <DropdownButton
      className={marginR}
      variant={variantNormal}
      size={props.size}
      title={t('SelectWordsToShow')}>
      <Dropdown.Item
        as="button"
        onClick={props.selectNotLearned}>{t('SelectNotLearned')}</Dropdown.Item>
      <Dropdown.Item
        as="button"
        onClick={props.selectLearned}>{t('SelectLearned')}</Dropdown.Item>
      <Dropdown.Item
        as="button"
        onClick={props.selectAll}>{t('SelectAll')}</Dropdown.Item>
      <Dropdown.Item
        as="button"
        onClick={props.selectNothing}>{t('SelectNothing')}</Dropdown.Item>
    </DropdownButton>
  )
}

export default SelectButton
