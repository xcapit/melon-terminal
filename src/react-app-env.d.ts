/// <reference types="react-scripts" />

import 'styled-components';
import { Deployment } from '@melonproject/melonjs';
import { theme } from './components/App.styles';
import { NetworkEnum } from './types';

declare module 'console' {
  export = typeof import('console');
}

declare module 'styled-components' {
  type DerivedTheme = typeof theme;

  export interface DefaultTheme extends DerivedTheme {}
}

declare global {
  namespace NodeJS {
    interface ProcessEnv {
      SUBGRAPH: string;
      DEPLOYMENT: Deployment;
      NETWORK: NetworkEnum;
    }
  }
}
