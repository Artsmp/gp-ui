import '@vue/runtime-core';

declare module '@vue/runtime-core' {
    // GlobalComponents for Volar
    export interface GlobalComponents {
        GpBackTop: typeof import('../packages/gupo-ui/src/index')['BackTop'];
    }
}

export {};
