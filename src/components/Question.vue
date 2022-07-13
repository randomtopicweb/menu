<template>
    <div class="content">{{ random.content }}</div>
</template>

<script>



export default {
    name: 'App',
    components: {

    },
    props: {
        data_q: Array,
        random: Number
    }
}
</script>

<style>
/* .content {
    font-size: 60px;
    font-weight: bold;
    background-color: chocolate;
    height: 450px;
    text-align: center;
    line-height: 450px;
    word-break: break-all;
} */

#app {
    font-family: Avenir, Helvetica, Arial, sans-serif;
    -webkit-font-smoothing: antialiased;
    -moz-osx-font-smoothing: grayscale;
    text-align: center;
    color: #2c3e50;
    margin-top: 60px;
}
</style>