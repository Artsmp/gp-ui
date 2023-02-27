<script lang="ts" setup></script>

<template>
    <div class="outer">
        <div class="inner">
            <div v-for="item in 100" :key="item">
                滚动容器试试！注意观察右下角~
            </div>
        </div>
        <GpBackTop target=".outer"></GpBackTop>
    </div>
</template>

<style scoped>
.outer {
    height: 200px;
    overflow-y: auto;
}
</style>
