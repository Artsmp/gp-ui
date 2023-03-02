import type { DefaultTheme } from 'vitepress';

export const nav: DefaultTheme.NavItem[] = [
    { text: '指南', link: '/guide' },
    { text: 'vant-组件', link: '/vant/back-top', activeMatch: '/vant/.*' },
    { text: 'antdv-组件', link: '/antdv/button', activeMatch: '/antdv/.*' },
];
