<template>
    <div class="top-navbar" v-if="show">
        <div class="navbar-back" @click="$emit('back')">
            <svg width="24" height="24" viewBox="0 0 24 24" fill="none">
                <path d="M15 18L9 12L15 6" stroke="#333" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"/>
            </svg>
        </div>
        <div class="navbar-title">{{ title }}</div>
        <div class="navbar-right"></div>
    </div>
</template>
<script>
export default {
    name: 'TopNavbar',
    props: {
        title: { type: String, default: '' },
        transparent: { type: Boolean, default: false },
        show: { type: Boolean, default: true },
    },
    emits: ['back'],
};
</script>
<style lang="scss">
.top-navbar {
    display: flex;
    align-items: center;
    justify-content: space-between;
    height: 0.88rem;
    padding: 0 0.24rem;
    background: #fff;
    position: sticky;
    top: 0;
    z-index: 100;
    .navbar-back {
        width: 0.6rem;
        height: 0.6rem;
        display: flex;
        align-items: center;
        justify-content: center;
        cursor: pointer;
    }
    .navbar-title {
        font-size: 0.34rem;
        font-weight: 600;
        color: #222;
    }
    .navbar-right {
        width: 0.6rem;
    }
}
</style>
