<script lang="ts" setup>
import { ref } from 'vue';
import { showToast } from 'vant';

const count = ref(0);
const loading = ref(false);
const onRefresh = () => {
    setTimeout(() => {
        showToast('刷新成功');
        loading.value = false;
        count.value++;
    }, 1000);
};
</script>

<template>
    <van-pull-refresh
        v-model="loading"
        style="height: 100%"
        @refresh="onRefresh"
    >
        <p style="pointer-events: none">刷新次数: {{ count }}</p>
    </van-pull-refresh>
</template>

<style lang="scss" scoped></style>
