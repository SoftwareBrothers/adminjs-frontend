import { AdminPage } from '../../interfaces/admin-options'

export const PAGES_INITIALIZE = 'PAGES_INITIALIZE'

export type InitializePagesResponse = {
  type: typeof PAGES_INITIALIZE;
  data: Array<AdminPage>;
}

export const initializePages = (data: Array<AdminPage>): InitializePagesResponse => ({
  type: PAGES_INITIALIZE,
  data,
})
