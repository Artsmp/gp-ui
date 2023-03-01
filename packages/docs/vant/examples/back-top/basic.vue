<script lang="ts" setup></script>

<template>
    <div class="outer">
        <div class="inner">
            <van-cell-group>
                <van-cell
                    v-for="item in 100"
                    :key="item"
                    title="单元格"
                    value="内容"
                    label="滚动容器试试！注意观察右下角~"
                />
            </van-cell-group>
        </div>
        <GpBackTop target=".outer"></GpBackTop>
    </div>
</template>

<style scoped>
.outer {
    height: 100%;
    overflow-y: auto;
}
</style>
