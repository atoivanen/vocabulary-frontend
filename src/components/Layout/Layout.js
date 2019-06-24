import React from 'react'
import { Container, Row } from 'react-bootstrap'

import Toolbar from '../Navigation/Toolbar/Toolbar'
import Notification from '../UI/Notification/Notification'

const Layout = (props) => {
  return (
    <div>
      <Toolbar changeLanguage={props.changeLanguage} />
      <Container>
        <Row>
          <Notification />
        </Row>
        {props.children}
      </Container>
    </div>
  )
}

export default Layout
