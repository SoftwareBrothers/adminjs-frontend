/* eslint-disable @typescript-eslint/explicit-function-return-type */
import { combineStyles } from '@adminjs/design-system'
import i18n from 'i18next'
import React from 'react'
//import { renderToString } from 'react-dom/server'
import { I18nextProvider } from 'react-i18next'
import { Provider } from 'react-redux'
import { Store } from 'redux'
import { ServerStyleSheet, StyleSheetManager, ThemeProvider } from 'styled-components'
//import AdminJS from '../adminjs'
//import { getAssets, getBranding, getFaviconFromBranding } from '../backend/utils/options-parser/options-parser'
import ViewHelpers from './backend/utils/view-helpers/view-helpers'
import LoginComponent from './components/login'
//import { initializeAssets } from './store/actions/initialize-assets'
import { initializeBranding } from './store/actions/initialize-branding'
import { initializeLocale } from './store/actions/initialize-locale'
import createStore, {
  ReduxState,
} from './store/store'

//import config from './config/redux.json'
//import theme_ from './config/theme.json'

type LoginTemplateAttributes = {
  /**
   * action which should be called when user clicks submit button
   */
  action: string;
  /**
   * Error message to present in the form
   */
  errorMessage?: string;
}

//const h = new ViewHelpers({ options: admin.options })

const store: Store<ReduxState> = createStore()

//const branding = await getBranding(admin)
//const assets = await getAssets(admin)
//const faviconTag = getFaviconFromBranding(branding)

//const branding = config.branding

//store.dispatch(initializeBranding(branding))
//store.dispatch(initializeAssets(assets))
//store.dispatch(initializeLocale(config.locale))

//const theme = combineStyles((branding && branding.theme) || {})
const theme = combineStyles({})

const { locale } = store.getState()


const sheet = new ServerStyleSheet()
// TODO: fix children props
const StoreProvider = Provider as any



export const Login = (props) => {
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
  
  
  
  return  (Object.keys(config).length === 0 ? null : (
    <StyleSheetManager sheet={sheet.instance}>
      <StoreProvider store={store}>
        <I18nextProvider i18n={i18n}>
          <ThemeProvider theme={theme}>
            <LoginComponent action={config.paths.loginPath} message='Login component message' />
          </ThemeProvider>
        </I18nextProvider>
      </StoreProvider>
    </StyleSheetManager>
  ))
}