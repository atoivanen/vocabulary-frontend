import React from 'react'
import { Container, Row } from 'react-bootstrap'

import Toolbar from '../Navigation/Toolbar/Toolbar'

const Layout = (props) => {
  return (
    <div>
      <Toolbar />
      <Container>
        <Row>
          {props.children}
        </Row>
      </Container>
    </div>
  )
}

export default Layout
