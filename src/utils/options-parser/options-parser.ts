import merge from 'lodash/merge'
import { AdminJSFrontendOptions, Assets, BrandingOptions } from '../../interfaces/admin-options'
import { CurrentAdmin } from '../../interfaces/current-admin'
import ViewHelpers from '../view-helpers/view-helpers'

const defaultBranding: BrandingOptions = {
  companyName: 'Company',
  withMadeWithLove: true,
}
const defaultAssets = {
  styles: [],
  scripts: [],
}

export const getAssets = async (
  admin: AdminJSFrontendOptions,
  currentAdmin?: CurrentAdmin,
): Promise<Assets> => {
  const { assets } = admin || {}
  const computed = typeof assets === 'function'
    ? await assets(currentAdmin)
    : assets

  return merge({}, defaultAssets, computed)
}

export const getBranding = async (
  admin: AdminJSFrontendOptions,
  currentAdmin?: CurrentAdmin,
): Promise<BrandingOptions> => {
  const { branding } = admin

  const h = new ViewHelpers(admin)
  const defaultLogo = h.assetPath('logo.svg')

  const computed = typeof branding === 'function'
    ? await branding(currentAdmin)
    : branding
  const merged = merge({}, defaultBranding, computed)

  // checking for undefined because logo can also be `false` or `null`
  merged.logo = merged.logo !== undefined ? merged.logo : defaultLogo

  return merged
}

export const getFaviconFromBranding = (branding: BrandingOptions): string => {
  if (branding.favicon) {
    const { favicon } = branding
    const type = favicon.match(/.*\.png$/) ? 'image/png' : 'image/x-icon'
    return `<link rel="shortcut icon" type="${type}" href="${favicon}" />`
  }

  return ''
}
