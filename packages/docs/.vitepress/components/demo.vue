<script lang="ts" setup>
import { computed, onMounted, ref, watch } from 'vue';
import { useClipboard } from '@vueuse/core';
import UnExpand from './icons/UnExpand.vue';
import Expand from './icons/Expand.vue';
import CopySuccess from './icons/CopySuccess.vue';
import Copy from './icons/Copy.vue';

const props = defineProps<{
    demos: object;
    source: string;
    path: string;
    rawSource: string;
    description?: string;
}>();

const decodedDescription = computed(() =>
    decodeURIComponent(props.description!)
);
const decodedSource = computed(() => decodeURIComponent(props.source!));

const formatPathDemos = computed(() => {
    const demos = {};

    console.log('props.demos: ', props.demos);
    Object.keys(props.demos).forEach((key) => {
        console.log('key: ', key);
        console.log(
            '=====>',
            key.replace('./examples/', '').replace('.vue', '')
        );
        console.log(props.path);

        demos[key.replace('./examples/', '').replace('.vue', '')] =
            props.demos[key].default;
    });

    return demos;
});

const showSource = ref(false);
const copySuccess = ref(false);
const { isSupported, copied, copy } = useClipboard();
const handleCopy = () => {
    copy(decodeURIComponent(props.rawSource));
    if (isSupported.value && copied.value) {
        copySuccess.value = true;
        const timer = setTimeout(() => {
            copySuccess.value = false;
            clearTimeout(timer);
        }, 2000);
    }
};

const $source = ref<HTMLDivElement>();
const sourceWrapOriginHeight = ref(0);
const changeHeight = () => {
    if (showSource.value) {
        $source.value.style.height = sourceWrapOriginHeight.value + 'px';
    } else {
        $source.value.style.height = '0px';
    }
};
onMounted(() => {
    sourceWrapOriginHeight.value = $source.value.clientHeight;
    changeHeight();
});

watch(showSource, changeHeight);
</script>

<template>
    <div>
        <p v-html="decodedDescription" />
        <div class="doc-demo">
            <ClientOnly>
                <div class="doc-demo__show">
                    <component
                        :is="formatPathDemos[props.path]"
                        v-if="formatPathDemos[props.path]"
                        v-bind="$attrs"
                    />
                </div>
            </ClientOnly>
            <div class="doc-demo__opt" :class="showSource && 'show'">
                <div class="doc-demo__opt--wrapper">
                    <Expand
                        @click="showSource = true"
                        v-if="!showSource"
                        class="icon-btn"
                    ></Expand>
                    <UnExpand @click="showSource = false" v-else />
                    <Copy
                        v-if="!copied"
                        class="icon-btn"
                        @click="handleCopy"
                    ></Copy>
                    <CopySuccess v-else class="icon-btn"></CopySuccess>
                </div>
            </div>
            <div class="doc-demo__code--wrapper" ref="$source">
                <div class="doc-demo__code" v-html="decodedSource" />
            </div>
        </div>
    </div>
</template>

<style lang="less" scoped>
.doc-demo {
    border: 1px solid #9ca3af;

    .doc-demo__show {
        padding: 16px;
    }

    .doc-demo__opt {
        display: flex;
        align-items: center;
        justify-content: end;
        padding: 8px;
        border: 1px dashed transparent;
        border-top-color: #a29d9d;
        border-right-width: 0;
        border-left-width: 0;

        &.show {
            border-color: #a29d9d;
        }

        .doc-demo__opt--wrapper {
            display: flex;
            gap: 16px;
            align-items: center;

            .icon-btn {
                cursor: pointer;
            }
        }
    }

    .doc-demo__code--wrapper {
        overflow: hidden;
        transition: 0.3s;

        .doc-demo__code {
            padding: 16px;
            overflow: auto;
        }
    }
}
</style>
