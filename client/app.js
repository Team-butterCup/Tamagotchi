import React from 'react'

import {Navbar} from './components'
import Routes from './routes'
import {createGlobalStyle, ThemeProvider} from 'styled-components'
import {reset, themes, List, ListItem, Divider} from 'react95'

const ResetStyles = createGlobalStyle`
  ${reset}
`

const App = () => {
  return (
    <div>
      <ResetStyles />
      <ThemeProvider theme={themes.default}>
        <Navbar />
        <Routes />
      </ThemeProvider>
    </div>
  )
}

export default App
