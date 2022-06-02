import { ThemeOverride } from '@adminjs/design-system'

import { CurrentAdmin } from '../current-admin'

export type BrandingOptions = {
  logo?: string | false;
  companyName?: string;
  theme?: Partial<ThemeOverride>;
  withMadeWithLove?: boolean;
  favicon?: string;
}

export type BrandingOptionsFunction = (
  admin?: CurrentAdmin
) => BrandingOptions | Promise<BrandingOptions>
