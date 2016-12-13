<script type="text/ecmascript-6">
	/**
	 * Created by wcz on 2016/11/29.
	 */
	import navbar from '../control/navbar.vue'
	import step1 from './forgetStep1.vue'
	import step2 from './forgetStep2.vue'
	import b from '../bus'

	export default {
		data () {
			return {
				currentView: 'step1',
				phoneNumber: ''
            }
		},
		computed: {},
		created () {
			b.$on('changeCurrentView', view => {
				this.currentView = view;
			});

			b.$on('fillPhoneNumber', number => {
				this.phoneNumber = number
			})
		},
		mounted () {

		},
		methods: {},
		components: {
			step1,
			step2,
			navbar
		}
	};
</script>

<template>
    <div class="forget">
        <navbar></navbar>
        <div class="l-row">
            <h1 class="title title--user">重置密码</h1>
        </div>
        <transition name="fade" mode="out-in">
            <keep-alive>
                <component :is="currentView" :phone-number="phoneNumber"></component>
            </keep-alive>
        </transition>
    </div>
</template>