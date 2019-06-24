import React, { useEffect, Suspense } from 'react'
import { BrowserRouter, Route } from 'react-router-dom'
import { connect } from 'react-redux'
import i18n from './i18n'

import Layout from './components/Layout/Layout'
import FrontPage from './components/FrontPage/FrontPage'
import Dictionary from './components/Dictionary/Dictionary'
import MyVocabulary from './components/MyVocabulary/MyVocabulary'
import Chapters from './components/Chapters/Chapters'
import Chapter from './components/Chapters/Chapter/Chapter'
import Login from './components/Authentication/Login/Login'
import Logout from './components/Authentication/Logout/Logout'
import Register from './components/Authentication/Register/Register'
import NewChapter from './components/Chapters/NewChapter/NewChapter'
import EditChapter from './components/Chapters/EditChapter/EditChapter'
import About from './components/About/About'

import { setUser } from './reducers/userReducer'

const App = (props) => {

  useEffect(() => {
    const loggedUserJSON = window.localStorage.getItem('loggedVocabularyUser')
    if (loggedUserJSON) {
      const user = JSON.parse(loggedUserJSON)
      props.setUser(user)
    }
  }, [])

  const changeLanguageHandler = (lng) => {
    i18n.changeLanguage(lng)
  }

  return (
    <BrowserRouter>
      <div>
        <Suspense fallback="loading">
          <Layout changeLanguage={changeLanguageHandler}>
            <Route exact path="/" component={FrontPage} />
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
            <Route path="/about" component={About} />
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
