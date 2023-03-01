<template>
    <van-action-bar>
        <van-action-bar-icon icon="chat-o" text="客服" @click="onClickIcon" />
        <van-action-bar-icon icon="cart-o" text="购物车" @click="onClickIcon" />
        <van-action-bar-icon icon="shop-o" text="店铺" @click="onClickIcon" />
        <van-action-bar-button
            type="danger"
            text="立即购买"
            @click="onClickButton"
        />
    </van-action-bar>
</template>

<script lang="ts">
import { showToast } from 'vant';

export default {
    setup() {
        const onClickIcon = () => showToast('点击图标');
        const onClickButton = () => showToast('点击按钮');
        return {
            onClickIcon,
            onClickButton,
        };
    },
};
</script>
