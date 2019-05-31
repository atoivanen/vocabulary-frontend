import React from 'react'
import { Container, Row, Col } from 'react-bootstrap'

import Toolbar from '../Navigation/Toolbar/Toolbar'

const Layout = (props) => {
  const l = 8
  const s = 12

  return (
    <div>
      <Toolbar />
      <Container>
        <Row>
          <Col />
          <Col lg={l} md={l} sm={s} xl={l}  xs={s}>
            <main>
              {props.children}
            </main>
          </Col>
          <Col />
        </Row>
      </Container>
    </div>
  )
}

export default Layout
