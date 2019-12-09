import React from 'react'
import { Helmet } from 'react-helmet-async'

import { Context, Provider } from './context'
import ListOfTasks from './components/ListOfTasks/index'
import Button from './components/Button/index.tsx'

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

    <ListOfTasks />
    <Button />

    <Context.Consumer>
      {
          ({ isAuth }) => (isAuth
            ? (
              <h1>logged </h1>
            )
            : '')
        }
    </Context.Consumer>
  </Provider>
)

export default App
