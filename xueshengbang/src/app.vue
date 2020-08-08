<template>
    <div id="app">
        <keep-alive v-if="$route.meta.keepAlive">
            <router-view></router-view>
        </keep-alive>
        <router-view v-if="!$route.meta.keepAlive"></router-view>
    </div>
</template>
<script>
export default {
    
}
</script>
<style scoped>
*{
    font-family: -apple-system, BlinkMacSystemFont, 'Segoe UI', Roboto, Oxygen, Ubuntu, Cantarell, 'Open Sans', 'Helvetica Neue', sans-serif;
}
</style>