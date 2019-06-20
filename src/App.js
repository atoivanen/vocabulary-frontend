import React, { useEffect, Suspense } from 'react'
import { BrowserRouter, Route } from 'react-router-dom'
import { connect } from 'react-redux'

import Layout from './components/Layout/Layout'
import Dictionary from './components/Dictionary/Dictionary'
import MyVocabulary from './components/MyVocabulary/MyVocabulary'
import Chapters from './components/Chapters/Chapters'
import Chapter from './components/Chapters/Chapter/Chapter'
import Login from './components/Authentication/Login/Login'
import Logout from './components/Authentication/Logout/Logout'
import Register from './components/Authentication/Register/Register'
import NewChapter from './components/Chapters/NewChapter/NewChapter'
import EditChapter from './components/Chapters/EditChapter/EditChapter'

import { setUser } from './reducers/userReducer'

const App = (props) => {

  useEffect(() => {
    const loggedUserJSON = window.localStorage.getItem('loggedVocabularyUser')
    if (loggedUserJSON) {
      const user = JSON.parse(loggedUserJSON)
      props.setUser(user)
    }
  }, [])

  return (
    <BrowserRouter>
      <div className="container">
        <Suspense fallback="loading">
          <Layout>
            <Route exact path="/chapters" component={Chapters} />
            <Route
              exact path="/chapters/:id"
              render={({ match }) =>
                <Chapter id={match.params.id} />
              } />
            <Route
              exact path="/edit/:id"
              render={({ match }) =>
                <EditChapter id={match.params.id} />
              } />
            <Route path="/new" component={NewChapter} />
            <Route path="/dictionary" component={Dictionary} />
            <Route path="/myvocabulary" component={MyVocabulary} />
            <Route path="/login" component={Login} />
            <Route path="/logout" component={Logout} />
            <Route path="/register" component={Register} />
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

const mapDispatchToProps = {
  setUser
}

export default connect(
  mapStateToProps,
  mapDispatchToProps
)(App)
