import { defineConfig } from 'vitepress';
import { nav } from './configs/nav';
import { sidebar } from './configs/sidebar';
import { mdPlugin } from './plugins';

export default defineConfig({
    title: 'GUPO-UI',
    description: 'Based on ant-design-vue',
    lastUpdated: true,
    themeConfig: {
        nav,
        sidebar,
    },
    markdown: {
        config: (md) => mdPlugin(md),
    },
});
