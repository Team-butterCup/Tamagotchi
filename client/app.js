import React from 'react'

import {Navbar} from './components'
import Routes from './routes'
import {createGlobalStyle, ThemeProvider} from 'styled-components'
import {
  reset,
  themes,
  List,
  ListItem,
  Divider,
  Window,
  WindowHeader,
  WindowContent
} from 'react95'

const ResetStyles = createGlobalStyle`
  ${reset}
`

const App = () => {
  return (
    <div>
      <ResetStyles />
      <ThemeProvider theme={themes.water}>
        <Window
          style={{
            width: '100vw',
            height: '100vh'
          }}
        >
          <WindowHeader>👾 gotTamagotchi?.exe</WindowHeader>
          <WindowContent>
            <Navbar />
            <Routes />
          </WindowContent>
        </Window>
      </ThemeProvider>
    </div>
  )
}

export default App
