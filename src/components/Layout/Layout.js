import React, {Fragment} from 'react'

import Toolbar from '../Navigation/Toolbar/Toolbar'

const Layout = (props) => (
  <Fragment>
    <Toolbar />
    <main>
      {props.children}
    </main>
  </Fragment>
)

export default Layout
