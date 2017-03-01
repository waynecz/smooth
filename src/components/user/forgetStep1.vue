<script type="text/ecmascript-6">
	/**
	 * Created by wcz on 2016/12/1.
	 */
	import b from '../bus'
	export default {
		data () {
			return {
				forgetStep1Form: {
					userAccount: '',
					validCode: ''
                },
				rules: {
					userAccount: [
						{required: true, message: '请输入手机号或用户名', trigger: 'blur'},
					],
					validCode: [
						{required: true, message: '请输入验证码', trigger: 'blur'},
					]
				},
				imgSrc: '',
                errTip: ''
            }
		},
		computed: {},
		mounted () {
			this.imgSrc = `/captcha?action=image&t=${new Date().getTime()}`
		},
		methods: {
			forgetNextStep () {
				this.$refs.forgetStep1Form.validate(valid => {
					if (valid) {
						let postData = this.forgetStep1Form;
						this.$post(this.api.restStep1, postData, {cb: this.refreshImg}).then(res => {
							if (res.success) {
								this.errTip = '';
								b.$emit('changeCurrentView', 'step2');
								b.$emit('fillPhoneNumber', data.data.mobile);
							} else {
								this.errTip = res.message;
							}
						})
					}
				});
            },
			refreshImg () {
				this.imgSrc = `/captcha?action=image&t=${new Date().getTime()}`
			}
        },
	};
</script>

<template>
    <div class="signup__step1">
        <div class="sign__form">
            <el-form ref="forgetStep1Form" :rules="rules" :model="forgetStep1Form" label-width="0">
                <el-form-item prop="userAccount">
                    <el-input
                            v-model="forgetStep1Form.userAccount"
                            placeholder="请输入手机号或用户名"
                    ></el-input>
                </el-form-item>
                <el-form-item prop="validCode">
                    <el-input
                            v-model="forgetStep1Form.validCode"
                            placeholder="请输入验证码"
                            class="input--short"
                    ></el-input>
                    <img :src="imgSrc" class="img-code"  @click="refreshImg">
                </el-form-item>
            </el-form>
            <div class="sign__button" @click="forgetNextStep">下一步</div>
            <p class="sign__tip sign__tip--err">{{errTip}}</p>
        </div>
    </div>
</template>