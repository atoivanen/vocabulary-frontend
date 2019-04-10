import React, { Component, Suspense } from 'react';

import Layout from './components/Layout/Layout';
import Dictionary from './containers/Dictionary/Dictionary'

class App extends Component {
  render() {
    return (
      <div className="App">
        <Suspense fallback="loading">
          <Layout>
            <Dictionary />
          </Layout>
        </Suspense>
      </div>
    );
  }
}

export default App;
