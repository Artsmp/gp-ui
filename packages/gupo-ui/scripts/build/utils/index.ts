import { resolve } from 'path';

export const PKG_NAME = 'gupo';
export const PKG_CAMEL_CASE_NAME = 'GuPo';

export const target = 'esNext';

// root
export const root = resolve(__dirname, '../../../');
export const compRoot = resolve(root, 'src');

// output
export const output = resolve(root, 'dist');
export const outputEsm = resolve(root, 'es');
export const outputCjs = resolve(root, 'lib');

// package
export const compPackage = resolve(root, 'package.json');

export const getCompPackage = () => {
    // eslint-disable-next-line @typescript-eslint/no-var-requires
    const { version, dependencies, peerDependencies } = require(compPackage);
    return {
        version,
        dependencies: Object.keys(dependencies),
        peerDependencies: Object.keys(peerDependencies),
    };
};

export const generateExternal = (options: { full: boolean }) => {
    const { dependencies, peerDependencies } = getCompPackage();

    const packages: string[] = peerDependencies;

    if (options.full) {
        packages.push(...dependencies);
    }

    return (id: string) => {
        return packages.some(
            (pkg) => id === pkg || (options.full && id.startsWith(`${pkg}/`))
        );
    };
};

export const generatePaths = () => {
    const paths = [
        ['lodash-es', 'lodash'],
        ['vant/es', 'vant/lib'],
    ];

    return (id: string) => {
        for (const [oldPath, newPath] of paths) {
            if (id.startsWith(oldPath)) {
                return id.replace(oldPath, newPath);
            }
        }

        return '';
    };
};
