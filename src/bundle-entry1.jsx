import React, {useEffect} from 'react'
import { Provider } from 'react-redux'
import { BrowserRouter } from 'react-router-dom'
//import { createStore } from 'redux'
import createStore from './store/store'
import { ThemeProvider } from 'styled-components'
import App from './components/application'

const Application = ({ config, theme }) => {
  console.log('config',config)
  console.log('theme',theme)
  const store = createStore(config)
  return (
    <Provider store={store}>
      <ThemeProvider theme={theme}>
        <BrowserRouter>
          <App />
        </BrowserRouter>
      </ThemeProvider>
    </Provider>
  )
}

export default Application
