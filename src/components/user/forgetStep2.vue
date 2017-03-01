<script type="text/ecmascript-6">
	/**
	 * Created by wcz on 2016/11/30.
	 */


	export default {
		props: {
			phoneNumber: {
				default: ''
			}
		},
		data () {
			let checkPassword = (rule, value, callback) => {
				let passReg = /^[a-zA-Z0-9]{6,16}$/gi;
				let enwordReg = /[a-zA-Z]+/gi;

				if (value === '') {
					callback(new Error('请输入密码'));
				} else {
					if (!passReg.test(value) ) {
						return callback(new Error('密码格式错误，由6-16位数字英文组成'))
					} else if (!enwordReg.test(value)) {
						return callback(new Error('密码格式错误，由6-16位数字英文组成'))
					} else {
						callback();
                    }
				}
			};
			let validatePass2 = (rule, value, callback) => {
				if (value === '') {
					callback(new Error('请再次输入密码'));
				} else if (value !== this.forgetStep2Form.newPass) {
					callback(new Error('两次输入密码不一致!'));
				} else {
					callback();
				}
			};
			return {
				forgetStep2Form: {
					smsCode: '',
					newPass: '',
					newPassConfirm: ''
				},
				carriers: {cmcc: false, chinanet: false, unicom: false, anyway: false},
				rules: {
					smsCode: [
						{required: true, message: '请输入验证码', trigger: 'blur'},
					],
					newPass: [
						{validator: checkPassword, trigger: 'blur'},
					],
					newPassConfirm: [
						{validator: validatePass2,  trigger: 'blur'},
					]

				},
				smsCodeDisabled: false,
				timing: 60,
				errTip: '',
				doneTip: ''
			}
		},
		computed: {
			buttonText () {
				return this.smsCodeDisabled ? `重新获取(${this.timing})` : '获取验证码';
			}
		},
		mounted () {
			this.getSmsCode();
			this.smsCodeDisabled = true;
		},
		methods: {
			signUp () {
				this.$refs.forgetStep2Form.validate(valid => {
					if (valid) {
						
						let postData = this.forgetStep2Form;
						this.$post(this.api.restStep2, postData, {errmsg: '重置密码出现错误'}).then(res => {
							if (res.success) {
								this.errTip = '';
								this.doneTip = '密码设置成功，即将跳转到登录界面';
								this.msg('密码设置成功，即将跳转到登录界面', 'success');
								setTimeout(() => {
									window.location = '/views/index.jsp'
								}, 3000)
							} else {
								this.errTip = res.message;
							}
						})
					}
				})


			},
			getSmsCode () {
				if (!this.smsCodeDisabled) {
					let postData = {
						t: new Date().getTime(),
						channel: 'findpass'
					};
					this.$post(this.api.smsCode, postData, {errmsg: '获取验证码出错'}).then(res => {
						if (res.success) {
							this.smsCodeDisabled = true;
						}
					})
				}

			},
			startTimeing () {
				let timer = setInterval(() => {
					if (this.timing > 0) {
						this.timing --
					} else {
						this.timing = 60;
						clearInterval(timer)
					}
				}, 1000)
			}
		},
		watch: {
			smsCodeDisabled (val) {
				if (val) {
					this.startTimeing();
					setTimeout(() => {
						this.smsCodeDisabled = false
					}, 60000)

				}
			}
		}
	};
</script>

<template>
    <div class="signup__step1">
        <div class="sign__form">

            <el-form ref="forgetStep2Form" :rules="rules" :model="forgetStep2Form" label-width="0">
                <el-form-item prop="username">
                    <p class="sign__tip sign__tip--lg">验证码已发送至您的手机：{{phoneNumber}}</p>
                </el-form-item>
                <el-form-item prop="smsCode">
                    <el-input
                            v-model="forgetStep2Form.smsCode"
                            placeholder="请输入手机短信验证码"
                            class="input--short sms"
                    ></el-input>
                    <span class="sign__button sign__button--inline" :class="{'sign__button--disabled': smsCodeDisabled}" @click="getSmsCode">{{buttonText}}</span>
                </el-form-item>
                <el-form-item prop="newPass">
                    <el-input
                            v-model="forgetStep2Form.newPass"
                            type="password"
                            placeholder="请输入密码"
                    ></el-input>
                </el-form-item>
                <el-form-item prop="newPassConfirm">
                    <el-input
                            v-model="forgetStep2Form.newPassConfirm"
                            type="password"
                            placeholder="请再次输入密码"
                    ></el-input>
                </el-form-item>
            </el-form>

            <div class="sign__button" @click="signUp">完成修改</div>
            <p class="sign__tip sign__tip--done">{{doneTip}}</p>
            <p class="sign__tip sign__tip--err">{{errTip}}</p>
        </div>
    </div>
</template>