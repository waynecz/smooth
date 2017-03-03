<template>
    <div class="app" layout="column center-center">
        <h1>Smooth</h1>
    </div>
</template>

<script type="text/ecmascript-6">

    export default{
        data () {
            return {}
        },
        mounted () {
            this.sample()
        },
        methods: {
            async sample () {
                await this.api.sample();
                await this.sleep(2);
                await this.api.sample();
                await this.sleep(3);
                await this.api.sample();
            },
            sleep (t) {
                return new Promise((resolve, reject) => {
                    setTimeout(() => {
                        resolve()
                    }, t * 1000);
                })
            }
        }
    }
</script>

<style lang="scss">
    @import "../sass/index.scss";

    .app {
        height: 100vh;
        background: #41b883;
        box-shadow: 0 0 0 20px #35495e inset;
    }

    h1 {
        font-size: 80px;
        color: #f6f6f6;
        text-shadow: 0 1px 0 #ccc,
        0 2px 0 #c9c9c9,
        0 3px 0 #bbb,
        0 4px 0 #b9b9b9,
        0 5px 0 #aaa,
        0 6px 1px rgba(0, 0, 0, .1),
        0 0 5px rgba(0, 0, 0, .1),
        0 1px 3px rgba(0, 0, 0, .3),
        0 3px 5px rgba(0, 0, 0, .2),
        0 5px 10px rgba(0, 0, 0, .25),
        0 10px 10px rgba(0, 0, 0, .2),
        0 20px 20px rgba(0, 0, 0, .15);
    }
</style>