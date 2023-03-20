
import { defineConfig, loadEnv } from 'vite';

export default ({mode}) => {
    process.env = { ...process.env, ...loadEnv(mode, process.cwd()) };
    const isProd = process.env.NODE_ENV === 'production';
    const isDev = process.env.NODE_ENV === 'development';

    return defineConfig({
        base: './',
        server: {
            port: 9004,
            host: true
        },
        build: {
            assetsInlineLimit: 0,
            sourcemap: !isProd,
            target: isProd ? 'es2015' : 'esnext',
            minify: isProd ? 'terser' : false,
            commonjsOptions: {
                transformMixedEsModules: true
            }
        }
    })
}
