<script lang="ts" setup>
import { computed, ref } from 'vue';
import { onClickOutside } from '@vueuse/core';

const props = defineProps<{
    visible: boolean;
}>();

const emitter = defineEmits(['update:visible']);

const visible = computed({
    get() {
        return props.visible;
    },
    set(v) {
        emitter('update:visible', v);
    },
});
const mobile = ref<HTMLDivElement>();
onClickOutside(mobile, () => {
    emitter('update:visible', false);
});
</script>

<template>
    <ClientOnly>
        <Teleport to=".Layout">
            <Transition name="modal">
                <div v-show="visible" class="modal-mask">
                    <div class="modal-container" ref="mobile">
                        <slot></slot>
                    </div>
                </div>
            </Transition>
        </Teleport>
    </ClientOnly>
</template>

<style scoped>
.modal-mask {
    position: fixed;
    z-index: 200;
    top: 0;
    left: 0;
    width: 100%;
    height: 100%;
    background-color: rgba(0, 0, 0, 0.5);
    display: flex;
    /* justify-content: center; */
    transition: opacity 0.3s ease;
}

.modal-container {
    transform: scale(1);
    width: 375px;
    height: 80%;
    max-height: 667px;
    margin: 0 auto;
    padding: 16px;
    background-color: var(--vp-c-bg);
    border-radius: 2px;
    box-shadow: 0 2px 8px rgba(0, 0, 0, 0.33);
    transition: all 0.3s ease;
}
.modal-enter-from,
.modal-leave-to {
    opacity: 0;
}

.modal-enter-from .modal-container,
.modal-leave-to .modal-container {
    transform: scale(1.1);
}
</style>
