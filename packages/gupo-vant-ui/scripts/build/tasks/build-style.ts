import { dest, src } from 'gulp';
import gulpSass from 'gulp-sass';
import dartSass from 'sass';
import autoprefixer from 'gulp-autoprefixer';
import cleanCss from 'gulp-clean-css';
import glob from 'fast-glob';
import { rollup } from 'rollup';
import path from 'path';
import esbuild from 'rollup-plugin-esbuild';

import {
    compRoot,
    generatePaths,
    output,
    outputCjs,
    outputEsm,
} from '../utils';

export const buildStyle = async () => {
    await Promise.all([
        scssCopy(),
        buildScss(),
        buildScssFull(),
        buildStyleModules(),
    ]);
};

// 对外提供原始的scss文件
const scssCopy = async () => {
    await new Promise((resolve) => {
        src(`${compRoot}/**/*.scss`)
            .pipe(dest(outputEsm))
            .pipe(dest(outputCjs))
            .on('end', resolve);
    });
};
/** 按模块编译 scss */
const buildScss = async () => {
    const sass = gulpSass(dartSass);
    await new Promise((resolve) => {
        src(`${compRoot}/**/style/*.scss`)
            .pipe(sass.sync()) // 编译
            .pipe(autoprefixer({ cascade: false })) // 兼容
            .pipe(cleanCss()) // 压缩
            .pipe(dest(outputEsm)) // es
            .pipe(dest(outputCjs)) // lib
            .on('end', resolve); // 监听流完成
    });
};
/** 打包全量样式 */
const buildScssFull = async () => {
    const sass = gulpSass(dartSass);
    await new Promise((resolve) => {
        src(`${compRoot}/*.scss`)
            .pipe(sass.sync()) // 编译
            .pipe(autoprefixer({ cascade: false })) // 兼容
            .pipe(cleanCss()) // 压缩
            .pipe(dest(output)) // dist
            .on('end', resolve); // 监听流完成
    });
};

/** 用于按需打包样式 */
const buildStyleModules = async () => {
    const input = [
        // style
        ...(await glob(`${compRoot}/**/style/*.ts`)),
        path.resolve(compRoot, 'resolver.ts'),
    ];

    const bundle = await rollup({
        input,
        plugins: [
            esbuild({
                sourceMap: true,
            }),
        ],
        external: [/./],
        treeshake: false,
    });

    await Promise.all([
        bundle.write({
            format: 'esm',
            dir: outputEsm,
            exports: undefined,
            preserveModules: true,
            preserveModulesRoot: 'src',
            sourcemap: true,
            entryFileNames: `[name].mjs`,
        }),
        bundle.write({
            format: 'cjs',
            dir: outputCjs,
            exports: 'named',
            preserveModules: true,
            preserveModulesRoot: 'src',
            sourcemap: true,
            entryFileNames: `[name].js`,
            paths: generatePaths(),
        }),
    ]);
};
