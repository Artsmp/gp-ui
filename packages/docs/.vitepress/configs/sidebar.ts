import type { DefaultTheme } from 'vitepress';

export const sidebar: DefaultTheme.Sidebar = {
    '/vant/': [
        {
            text: '基础组件',
            items: [
                { text: '首页', link: '/vant/index' },
                { text: '返回顶部', link: '/vant/back-top' },
            ],
        },
    ],
    '/antdv/': [
        {
            text: '基础组件',
            items: [{ text: '首页', link: '/antdv/index' }],
        },
    ],
};
