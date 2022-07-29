import React, {useState, useEffect, createContext} from 'react'
import i18n from 'i18next'
import { initReactI18next } from 'react-i18next'
import { Provider } from 'react-redux'
import { BrowserRouter } from 'react-router-dom'
import { theme } from '@adminjs/design-system'
import { ThemeProvider } from 'styled-components'
import createStore from './store/store'
import App from './components/application'
import ApiClient from './utils/api-client'
import apiConfig from './FrontConfig.json'
let store =createStore()

export const AdminJS = (props) => {
  const { url }  = props 
  
  const [config, setConfig] = useState({})
  const [apiClient, setApiClient] = useState()
  
  useEffect( ()=> {
    const Api = new ApiClient()
    Api.getMetadata(apiConfig.adminApiUrl)
      .then( response => {
        setApiClient(Api)
        setConfig(response.data)
        store = createStore(response.data)
        initializeLocale(response.data.locale)
      })
  },[])
  
  
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
            <App api={apiClient} />
          </BrowserRouter>
        </ThemeProvider>
      </Provider>
    )
  )
}
