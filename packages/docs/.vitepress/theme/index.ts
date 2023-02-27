import DefaultTheme from 'vitepress/theme';

import 'prism-theme-vars/base.css';
import './style.css';

import Demo from '../components/demo.vue';

export default {
    ...DefaultTheme,
    enhanceApp: async ({ app }) => {
        app.component('Demo', Demo);
    },
};
