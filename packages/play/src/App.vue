<script lang="ts" setup></script>

<template>
    <div class="outer">
        <div class="inner">
            <p v-for="item in 200" :key="item">{{ item }}</p>
            <GpBackTop target=".outer" />
        </div>
    </div>
</template>

<style lang="scss" scoped>
.outer {
    height: 500px;
    overflow-y: auto;
    .inner {
        height: 15000px;
        background-color: pink;
    }
}
</style>
