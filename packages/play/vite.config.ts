import path from 'path';
import { defineConfig } from 'vite';
import vue from '@vitejs/plugin-vue';
import Components from 'unplugin-vue-components/vite';
import { VantResolver } from 'unplugin-vue-components/resolvers';
import { GpResolver } from 'gupo-vant-ui/es/resolver';

// https://vitejs.dev/config/
export default defineConfig({
    plugins: [
        vue(),
        Components({
            // eslint-disable-next-line n/no-path-concat
            include: `${__dirname}/**`,
            resolvers: [VantResolver(), GpResolver({ importStyle: 'scss' })],
            dts: false,
        }),
    ],
    resolve: {
        alias: [
            {
                find: /^gupo-vant-ui(\/(es|lib))?$/,
                replacement: path.resolve(
                    __dirname,
                    '../../packages/gupo-vant-ui/src'
                ),
            },
        ],
    },
});
