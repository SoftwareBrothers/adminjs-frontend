import { i18n, TFunction } from 'i18next'
import {
  useTranslation as originalUseTranslation,
} from 'react-i18next'

// import { createFunctions, TranslateFunctions } from '../utils_/translate-functions.factory';
import { createFunctions, TranslateFunctions } from '@adminjs/common/utils'

/**
 * Extends {@link TranslateFunctions}. Apart from that it also returns all the properties
 * defined below.
 *
 * ```javascript
 * import { useTranslation } from 'adminjs'
 *
 * const MyComponent = () => {
 *   const { translateButton } = useTranslation()
 *
 *   return (
 *     <Box>
 *       <Button variant="primary" onClick={...}>{translateButton('save')}<Button>
 *     </Box>
 *   )
 * }
 * ```
 *
 * @memberof useTranslation
 * @alias UseTranslationResponse
 *
 * @property {TranslateFunction} ... All functions defined in {@link TranslateFunctions}
 */
export type UseTranslationResponse = TranslateFunctions & {
  t: TFunction;
  /**
   * Current i18n instance.
   */
  i18n: i18n;
  /**
   * Indicates if translation system is ready. In AdminJS it is always ready :).
   */
  ready: boolean;
}

/**
 * @classdesc
 * Extends the useTranslation hook from react-i18next library.
 *
 * Returns all the {@link TranslateFunctions} + methods returned by the original
 * useTranslation method from react-i18next like: `i18n` instance and `ready` flag.
 *
 * @class
 * @subcategory Hooks
 * @bundle
 * @hideconstructor
 * @returns {UseTranslationResponse}
 */
export const useTranslation = (): UseTranslationResponse => {
  // eslint-disable-next-line no-shadow
  const { i18n, ...rest } = originalUseTranslation()
  const translateFunctions = createFunctions(i18n)

  return {
    ...rest,
    i18n,
    ...translateFunctions,
  }
}

export default useTranslation
