import { ResourceJSON } from '../resource/resource-json.interface'
import { AdminPages } from './admin-page.interface'
import { Assets, AssetsFunction } from './assets.interface'
import { VersionProps } from './version.interface'
import { BrandingOptions, BrandingOptionsFunction } from './branding-options.interface'

export interface AdminJSFrontendOptions {
  assets?: Assets | AssetsFunction;
  pages?: AdminPages;
  branding?: BrandingOptions | BrandingOptionsFunction;
  version?: VersionProps;
  resources: ResourceJSON[];
}

export * from './admin-page.interface'
export * from './assets.interface'
export * from './branding-options.interface'
export * from './version.interface'
