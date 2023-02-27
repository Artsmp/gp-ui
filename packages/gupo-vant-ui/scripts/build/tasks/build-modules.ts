import path from 'path';
import { rollup } from 'rollup';
import vue from '@vitejs/plugin-vue';
import vueJsx from '@vitejs/plugin-vue-jsx';
import { nodeResolve } from '@rollup/plugin-node-resolve';
import esbuild from 'rollup-plugin-esbuild';
import {
    compRoot,
    generateExternal,
    generatePaths,
    outputCjs,
    outputEsm,
    target,
} from '../utils';

export async function buildModules() {
    const input = [path.resolve(compRoot, 'index.ts')];

    const bundle = await rollup({
        input,
        plugins: [
            vue(),
            vueJsx(),
            nodeResolve(),
            esbuild({ target, sourceMap: true }),
        ],
        treeshake: false,
        external: generateExternal({ full: true }),
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
}
