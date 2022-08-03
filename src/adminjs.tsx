import { theme } from '@adminjs/design-system'
import i18n from 'i18next'
import React, { useEffect, useState } from 'react'
import { initReactI18next } from 'react-i18next'
import { Provider } from 'react-redux'
import { BrowserRouter } from 'react-router-dom'
import { ThemeProvider } from 'styled-components'
import App from './components/application'
import createStore from './store/store'

let store = createStore()

export function AdminJS(props) {
  const { api } = props
  const [config, setConfig] = useState({})

  useEffect(() => {
    api.getMetadata()
      .then((response) => {
        setConfig(response.data)
        store = createStore(response.data)
        initializeLocale(response.data.locale)
      })
  }, [])

  const initializeLocale = (locale) => {
    i18n.use(initReactI18next).init({
      resources: {
        [locale.language]: {
          translation: locale.translations,
        },
      },
      lng: locale.language,
      interpolation: { escapeValue: false },
    })
  }

  return (
    Object.keys(config).length === 0 ? null : (
      <Provider store={store}>
        <ThemeProvider theme={theme}>
          <BrowserRouter>
            <App api={api} />
          </BrowserRouter>
        </ThemeProvider>
      </Provider>
    )
  )
}
