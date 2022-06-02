import React from 'react'
import { Box, MadeWithLove } from '@adminjs/design-system'
import { useSelector } from 'react-redux'

import { BrandingOptions } from '../../../interfaces/admin-options'
import allowOverride from '../../../hoc/allow-override'
import { ReduxState } from '../../../store'

const SidebarFooter: React.FC = () => {
  const branding = useSelector<ReduxState, BrandingOptions>((state) => state.branding)

  return (
    <Box mt="lg" mb="md">
      {branding.withMadeWithLove && <MadeWithLove />}
    </Box>
  )
}

export default allowOverride(SidebarFooter, 'SidebarFooter')
