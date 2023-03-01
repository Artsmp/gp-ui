import path from 'path';
import { defineConfig } from 'vite';
import Components from 'unplugin-vue-components/vite';
import { VantResolver } from 'unplugin-vue-components/resolvers';
import { GpResolver } from 'gupo-vant-ui/lib/resolver';

export default defineConfig({
    // 不能排除掉vant：https://github.com/vuejs/vitepress/issues/1465
    ssr: {
        noExternal: 'vant',
    },
    resolve: {
        alias: [
            {
                find: /^gupo-vant-ui(\/(es|lib))?$/,
                replacement: path.resolve(
                    __dirname,
                    '../../packages/gupo-vant-ui/src/index.ts'
                ),
            },
        ],
    },
    plugins: [
        {
            name: 'md-transform',
            enforce: 'pre',
            transform(code, id) {
                if (!id.endsWith('.md')) return code;
                const componentId = path.basename(id, '.md');
                if (componentId === 'index') return code;
                const scriptSetup = `const demos = import.meta.globEager('./examples/${componentId}/*.vue')`;
                console.log('scriptSetup: ', scriptSetup);

                return `
\n<script setup>
${scriptSetup}
</script>\n
 ${code}
`;
            },
        },
        {
            name: 'vitepress-layout-slots-fix',
            enforce: 'pre',
            transform(code, id) {
                if (id.includes('Layout.vue') && !id.endsWith('.css'))
                    return code.replace(
                        '<VPFooter />',
                        '<VPFooter />\n<slot name="layout-bottom" />'
                    );
            },
        },
        Components({
            include: [/\.vue$/, /\.vue\?vue/, /\.md$/],
            resolvers: [VantResolver(), GpResolver({ importStyle: 'scss' })],
            dts: false,
        }),
    ],
    css: {
        preprocessorOptions: {
            less: {
                javascriptEnabled: true,
            },
        },
    },
});
