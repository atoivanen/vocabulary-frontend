import React from 'react'
import { Form, Button, ButtonToolbar } from 'react-bootstrap'
import { useTranslation } from 'react-i18next'

const ChapterForm = (props) => {
  const { t } = useTranslation()

  const variantNormal = 'outline-primary'
  const marginR = 'mr-1'
  const marginY = 'my-2'

  return (
    <Form onSubmit={props.saveChapter}>
      <Form.Control
        className={marginY}
        type="text"
        placeholder={t('TitlePlaceholder')}
        value={props.title}
        onChange={(event) => props.setTitle(event)} />
      <Form.Control
        as="textarea"
        rows="18"
        placeholder={t('TextareaPlaceholder')}
        value={props.textArea}
        onChange={(event) => props.setText(event)} />
      <ButtonToolbar className={marginY}>
        <Button type="submit" className={marginR} variant={variantNormal}>
          {t('SaveChapterButton')}
        </Button>
        <Button onClick={props.cancel} className={marginR} variant={variantNormal}>
          {t('CancelButton')}
        </Button>
      </ButtonToolbar>
    </Form>
  )
}

export default ChapterForm
