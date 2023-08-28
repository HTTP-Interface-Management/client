import { mergeConfig } from 'vite';
import baseConfig from './vite.config.base';

export default mergeConfig(
  {
    mode: 'development',
    server: {
      origin: 'http://localhost',
      port: 8080,
      proxy: {
        '/api': {
          target: 'http://47.99.45.81:3000',
          changeOrigin: true,
          rewrite: (path: any) => path.replace(/^\/api/, ''),
        },
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
