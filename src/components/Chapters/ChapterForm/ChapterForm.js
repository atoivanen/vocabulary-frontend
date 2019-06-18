import React from 'react'
import { Form, Button, ButtonToolbar } from 'react-bootstrap'
import { useTranslation } from 'react-i18next'

const ChapterForm = (props) => {
  const { t } = useTranslation()

  return (
    <Form onSubmit={props.saveChapter}>
      <Form.Control
        type="text"
        placeholder={t('TitlePlaceholder')}
        value={props.title}
        onChange={(event) => props.setTitle(event)} />
      <Form.Control
        as="textarea"
        rows="20"
        placeholder={t('TextareaPlaceholder')}
        value={props.textArea}
        onChange={(event) => props.setText(event)} />
      <ButtonToolbar>
        <Button type="submit">
          {t('SaveChapterButton')}
        </Button>
        <Button onClick={props.cancel}>
          {t('CancelButton')}
        </Button>
      </ButtonToolbar>
    </Form>
  )
}

export default ChapterForm
