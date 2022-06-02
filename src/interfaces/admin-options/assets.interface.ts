import { CurrentAdmin } from '../current-admin'

export interface CoreScripts {
  'app.bundle.js': string;
  'components.bundle.js': string;
  'design-system.bundle.js': string;
  'global.bundle.js': string;
}

export type Assets = {
  styles?: Array<string>;
  scripts?: Array<string>;
  coreScripts?: CoreScripts;
}

export type AssetsFunction = (admin?: CurrentAdmin) => Assets | Promise<Assets>
