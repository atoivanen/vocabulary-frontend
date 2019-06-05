import React, { Suspense } from 'react'
import { BrowserRouter, Route } from 'react-router-dom'
import { connect } from 'react-redux'

import Layout from './components/Layout/Layout'
import Dictionary from './components/Dictionary/Dictionary'
import Chapters from './components/Chapters/Chapters'
import Chapter from './components/Chapters/Chapter/Chapter'

const App = (props) => {

  const chapterById = (id) => {
    const myChapter = props.chapters.find(c => c.id === Number(id))
    return myChapter
  }

  return (
    <BrowserRouter>
      <div className="App">
        <Suspense fallback="loading">
          <Layout>
            <Route exact path="/" component={Chapters} />
            <Route path="/dictionary" component={Dictionary} />
            <Route
              exact path="/chapters/:id"
              render={({ match }) =>
                <Chapter chapter={chapterById(match.params.id)} />
              } />
          </Layout>
        </Suspense>
      </div>
    </BrowserRouter>
  )
}

const mapStateToProps = (state) => {
  return {
    chapters: state.chapters,
  }
}

export default connect(
  mapStateToProps
)(App)
