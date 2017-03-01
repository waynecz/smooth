<template>
    <div class="app" layout="column center-left">

        <header class="app__system-bar" layout="row center-justify">
            <div class="app__portrait"></div>
            <div class="app__logo-box">
                <div class="app__logo">ns
                </div>
            </div>
            <div class="app__system-select" self="right">
            </div>
        </header>
        <section class="app__content" layout="row">
            <router-view></router-view>
        </section>
    </div>
</template>

<script type="text/ecmascript-6">

    export default{
        data () {
            return {

            }
        },
        mounted () {
        },
    }
</script>

<style lang="scss">
    @import "../sass/index.scss";
</style>