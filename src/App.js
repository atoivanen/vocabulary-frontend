import React, { Suspense } from 'react'

import Layout from './components/Layout/Layout'
import Dictionary from './containers/Dictionary/Dictionary'

const App = (props) => {
  return (
    <div className="App">
      <Suspense fallback="loading">
        <Layout>
          <Dictionary />
        </Layout>
      </Suspense>
    </div>
  )
}

export default App
