import path from 'path';
import { defineConfig } from 'vite';
import vue from '@vitejs/plugin-vue';
// import Components from 'unplugin-vue-components/vite';
// import { GpResolver } from 'gupo-ui/src/resolver';

// https://vitejs.dev/config/
export default defineConfig({
    plugins: [
        vue(),
        // Components({
        //     // eslint-disable-next-line n/no-path-concat
        //     include: `${__dirname}/**`,
        //     resolvers: [GpResolver({ importStyle: 'scss' })],
        //     dts: false,
        // }),
    ],
    resolve: {
        alias: [
            {
                find: /^gupo-ui(\/(es|lib))?$/,
                replacement: path.resolve(
                    __dirname,
                    '../../packages/gupo-ui/src'
                ),
            },
        ],
    },
});
