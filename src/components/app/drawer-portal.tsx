import React, { useEffect, ReactNode, useState } from 'react'
import { createPortal } from 'react-dom'
import { createRoot } from 'react-dom/client'
import { Drawer, DEFAULT_DRAWER_WIDTH, theme } from '@adminjs/design-system'
import { ThemeProvider } from 'styled-components'

/**
 * @alias DrawerPortalProps
 * @memberof DrawerPortal
 */
export type DrawerPortalProps = {
  /**
   * The drawer content
   */
  children: ReactNode;

  /**
   * Optional drawer width
   */
  width?: number | string | Array<number | string>;
}

const DRAWER_PORTAL_ID = 'drawerPortal'

/**
 * Shows all of its children in a Drawer on the right.
 * Instead of rendering it's own {@link Drawer} component it reuses
 * the global Drawer via React Portal.
 *
 * ### Usage
 *
 * ```
 * import { DrawerPortal } from 'adminjs'
 * ```
 *
 * @component
 * @subcategory Application
 */
export const DrawerPortal: React.FC<DrawerPortalProps> = ({ children, width }) => {
  const [drawerElement, setDrawerElement] = useState<HTMLElement | null>(
    window.document.getElementById(DRAWER_PORTAL_ID),
  )
  const portal = window.document.getElementById(DRAWER_PORTAL_ID)
  useEffect(() => {
    if (!drawerElement) {
      const DrawerWrapper = (
        <Drawer id={DRAWER_PORTAL_ID} className="hidden" theme={theme} />
      )
      const innerWrapper = window.document.createElement('div')
      const root = createRoot(window.document.body.appendChild(innerWrapper))
      root.render(DrawerWrapper)
    }
  }, [])

  useEffect(() => {
    setDrawerElement(portal)
  }, [portal])

  useEffect(() => {
    if (drawerElement) {
      drawerElement.classList.remove('hidden')
      if (width) {
        drawerElement.style.width = Array.isArray(width) ? width[0].toString() : width.toString()
      }
      return (): void => {
        drawerElement.style.width = DEFAULT_DRAWER_WIDTH
        drawerElement.classList.add('hidden')
      }
    }
    return (): void => undefined
  }, [drawerElement])

  if (!drawerElement) {
    return null
  }

  return createPortal(
    children,
    drawerElement,
  )
}

export default DrawerPortal

{ /* <ThemeProvider theme={theme}>
  <Drawer id={DRAWER_PORTAL_ID} className="hidden" />
</ThemeProvider>   */ }
