import React, {useState, useEffect} from 'react'
import i18n from 'i18next'
import { initReactI18next } from 'react-i18next'
import { Provider } from 'react-redux'
import { BrowserRouter } from 'react-router-dom'
import { ThemeProvider } from 'styled-components'
import createStore from './store/store'
import App from './components/application'
let store =createStore()

import theme from './theme.json'

export const Application = (props) => {
  const { url }  = props 
  const [config, setConfig] = useState({})
  useEffect( ()=> {
    fetch(`${url}/admin/api/metadata`)
      .then( response => {
        if (response.ok) {
          return response.json()
        }}
      ).then(data => {
        setConfig(data)
        store = createStore(data)
        i18n.use(initReactI18next).init({
          resources: {
            [data.locale.language]: {
              translation: data.locale.translations,
            },
          },
          lng: data.locale.language,
          interpolation: { escapeValue: false },
        }) 
      }) 

  },[])

  return (
    Object.keys(config).length === 0 ? null : (
      <Provider store={store}>
        <ThemeProvider theme={theme}>
          <BrowserRouter>
            <App url={url} />
          </BrowserRouter>
        </ThemeProvider>
      </Provider>
    )
  )
}
