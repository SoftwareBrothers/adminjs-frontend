import { Provider } from 'react-redux'
import { BrowserRouter } from 'react-router-dom'
import { ThemeProvider } from 'styled-components'

import App from './components/application'

const env = {
  NODE_ENV: process.env.NODE_ENV || 'development',
}

{/* JMW */}

const store = {}
const theme ={}
const { locale } = {store}

{/* i18n.use(initReactI18next).init({
  resources: {
    [locale.language]: {
      translation: locale.translations,
    },
  },
  lng: locale.language,
  interpolation: { escapeValue: false },
}) */}

const Application = (
  <Provider store={store}>
    <ThemeProvider theme={theme}>
      <BrowserRouter>
        <App />
      </BrowserRouter>
    </ThemeProvider>
  </Provider>
)

export default Application

// eslint-disable-next-line no-undef
//window.regeneratorRuntime = regeneratorRuntime

{/* export default {
  withNotice,
  Application,
  ViewHelpers,
  UserComponents: {},
  ApiClient,
  BasePropertyComponent,
  env,
  ...AppComponents,
  ...Hooks,
  flat,
  // TODO: remove this from the next release
  flatten: flat.flatten,
  unflatten: flat.unflatten,
} */}
