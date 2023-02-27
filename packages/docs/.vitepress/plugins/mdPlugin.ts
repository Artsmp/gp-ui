import MarkdownIt from 'markdown-it';
import mdContainer from 'markdown-it-container';
import Token from 'markdown-it/lib/token';
import type Renderer from 'markdown-it/lib/renderer';
import { readFileSync } from 'fs';
import { resolve } from 'path';
import { highlight } from './highlight';

interface ContainerOpts {
    marker?: string | undefined;
    validate?(params: string): boolean;
    render?(
        tokens: Token[],
        index: number,
        options: any,
        env: any,
        self: Renderer
    ): string;
}

export const mdPlugin = (md: MarkdownIt) => {
    md.use(mdContainer, 'demo', {
        validate(params) {
            return !!params.trim().match(/^demo\s*(.*)$/);
        },
        render(tokens, idx) {
            const m = tokens[idx].info.trim().match(/^demo\s*(.*)$/);
            if (tokens[idx].nesting === 1) {
                // 1 means the tag is opening
                // 获取描述
                const description = m && m[1] ? m[1] : '';
                const sourceFileToken = tokens[idx + 2];
                let source = '';
                // 获取自定义块中的文件路径和内容
                const srcFile = sourceFileToken.children?.[0].content ?? '';
                if (sourceFileToken.type === 'inline') {
                    source = readFileSync(
                        resolve(__dirname, '../../', `${srcFile}.vue`),
                        'utf-8'
                    );
                }

                if (!source) throw new Error(`未识别路径: ${srcFile}`);
                return `
          <Demo :demos="demos" source="${encodeURIComponent(
              highlight(source, 'vue')
          )}" path="${
                    srcFile.split('examples/')[1]
                }" raw-source="${encodeURIComponent(
                    source
                )}" description="${encodeURIComponent(
                    MarkdownIt().render(description)
                )}">
        `;
            } else {
                return '</Demo>';
            }
        },
    } as ContainerOpts);
};
