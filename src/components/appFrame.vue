<template>
    <div class="app" layout="column center-left">

        <header class="app__system-bar" layout="row center-justify">
            <div class="app__portrait"></div>
            <div class="app__logo-box">
                <div class="app__logo">
                    <router-link to="/finance/overview">
                        DASHBOARD<span class="SHINK">_</span>FE
                    </router-link>
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
	/**
	 * Created by wcz on 2016/10/20.
	 */

	import tools from './mixins/tools'

	export default{
		data () {
			return {}
		},
		computed: {},
		methods: {},
		mounted () {

		},
		watch: {}
	}
</script>