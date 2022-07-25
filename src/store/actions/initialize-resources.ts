//import { ResourceJSON } from '../../interfaces'
import { ResourceJSON } from '@adminjs/common/interfaces'


export const RESOURCES_INITIALIZE = 'RESOURCES_INITIALIZE'

export type InitializeResourcesResponse = {
  type: typeof RESOURCES_INITIALIZE;
  data: Array<ResourceJSON>;
}

export const initializeResources = (data: Array<ResourceJSON>): InitializeResourcesResponse => ({
  type: RESOURCES_INITIALIZE,
  data,
})
