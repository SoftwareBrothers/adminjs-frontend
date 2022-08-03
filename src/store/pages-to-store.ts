import { PageJSON } from '@adminjs/common/interfaces'
import { AdminJSOptions } from '../../adminjs-options.interface'

const pagesToStore = (pages: AdminJSOptions['pages'] = {}): Array<PageJSON> => Object.entries(pages)
  .map(([key, adminPage]) => ({
    name: key,
    component: adminPage.component,
    icon: adminPage.icon,
  }))

export default pagesToStore
