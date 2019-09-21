import React from 'react'
import { Helmet } from 'react-helmet'

import { Context, Provider } from './context'

const App = () => (
  <Provider>
    <Helmet>
      <title>My Life RPG</title>
      <meta name="description" content="Task Manager" />
    </Helmet>
    {/* <Router>
      <Home path="/" />
      <Home path="/pet/:id" />
      <Detail path="detail/:id" />
    </Router> */}

    <Context.Consumer>
      {
          ({ isAuth }) => (isAuth
            ? (
              <h1> logged </h1>
            )
            : '')
        }
    </Context.Consumer>
  </Provider>
)

export default App
