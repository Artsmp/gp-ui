// ref https://github.com/vuejs/vitepress/blob/main/src/node/markdown/plugins/highlight.ts
import escapeHtml from 'escape-html';
import prism from 'prismjs';
import path from 'path';
import fs from 'fs';
import mdContainer from 'markdown-it-container';

function wrap(code: string, lang: string): string {
    if (lang === 'text') {
        code = escapeHtml(code);
    }
    return `<pre v-pre style="margin: 0;"><code>${code}</code></pre>`;
}
// 语法高亮
export const highlight = (str: string, lang: string) => {
    if (!lang) {
        return wrap(str, 'text');
    }
    lang = lang.toLowerCase();
    const rawLang = lang;
    if (lang === 'vue' || lang === 'html') {
        lang = 'markup';
    }
    if (lang === 'md') {
        lang = 'markdown';
    }
    if (lang === 'ts') {
        lang = 'typescript';
    }
    if (lang === 'py') {
        lang = 'python';
    }
    if (prism.languages[lang]) {
        const code = prism.highlight(str, prism.languages[lang], lang);
        return wrap(code, rawLang);
    }
    return wrap(str, 'text');
};
