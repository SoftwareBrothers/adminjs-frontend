import React from 'react'
import i18n from 'i18next'
import { initReactI18next } from 'react-i18next'
import { Provider } from 'react-redux'
import { BrowserRouter } from 'react-router-dom'
import { ThemeProvider } from 'styled-components'
import config from './config/redux.json'
import theme from './config/theme.json'
import createStore from './store/store'

import App from './components/application'

const locale = config.locale

const store = createStore(config)

i18n.use(initReactI18next).init({
  resources: {
    [locale.language]: {
      translation: locale.translations,
    },
  },
  lng: locale.language,
  interpolation: { escapeValue: false },
})

export const Application = () => {

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

