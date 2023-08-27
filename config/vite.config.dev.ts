import { mergeConfig } from 'vite';
import baseConfig from './vite.config.base';

export default mergeConfig(
  {
    mode: 'development',
    server: {
      open: true,
      port: 5678,
      proxy: {
        '/api': '47.99.45.81:3000',
        rewrite: (path: any) => path.replace(/^\/api/, ''),
      },
      fs: {
        strict: true,
      },
    },
    plugins: [

    ],
  },
  baseConfig
);
