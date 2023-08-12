import { mergeConfig } from 'vite';
import baseConfig from './vite.config.base';

export default mergeConfig(
  {
    mode: 'development',
    server: {
      open: true,
      port: 5678,
      fs: {
        strict: true,
      },
    },
    plugins: [

    ],
  },
  baseConfig
);
