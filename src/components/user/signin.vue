<script type="text/ecmascript-6">
	/**
	 * Created by wcz on 2016/11/29.
	 */
	import navbar from '../control/navbar.vue'

	export default {
		data () {
			return {
				imgSrc: '',
				signinForm: {
					userAccount: '',
					password: '',
					code: ''
				},
				rules: {
					userAccount: [
						{required: true, message: '请输入用户名', trigger: 'blur'},
					],
					password: [
						{required: true, message: '请输入密码', trigger: 'blur'},
					]
				},
				errTip: '',
				codeShow: false,
                isIbilling: false
			}
		},
		mounted () {
			this.imgSrc = `/captcha?action=image&t=${new Date().getTime()}`
			this.isIbilling = window.isIbilling;
		},
		methods: {
			signIn () {
				this.$refs.signinForm.validate(valid => {
					if (valid) {
						let postData = this.signinForm;
						this.$post(this.api.login, postData, {errmsg: '', cb: this.refreshImg}).then(res => {
							if (res.success) {
								this.errTip = '';
								if (res.data && res.data.type == "end-user") {
									window.location = '/view/management/user-dev.jsp';
								} else {
									window.location = '/view/devices/devices.jsp';
								}
							} else {
								this.errTip = res.message;
								if (res.message.indexOf("验证码") != -1) {
									this.codeShow = true;
								}
							}
						})
					}
				});
			},
            refreshImg () {
				this.imgSrc = `/captcha?action=image&t=${new Date().getTime()}`
            }
		},
        components: {
			navbar
        }
	};
</script>

<template>
    <div class="signin">
        <navbar></navbar>
        <div class="l-row">
            <h1 class="title title--user title--high">欢迎登录</h1>
        </div>
        <div class="sign__form">
            <el-form ref="signinForm" :rules="rules" :model="signinForm" label-width="0">
                <el-form-item prop="userAccount">
                    <el-input
                            v-model="signinForm.userAccount"
                            placeholder="请输入手机号 / 账户名"
                    ></el-input>
                </el-form-item>
                <el-form-item prop="password">
                    <el-input
                            v-model="signinForm.password"
                            placeholder="请输入密码"
                            type="password"
                    ></el-input>
                </el-form-item>
                <el-form-item v-if="codeShow">
                    <el-input
                            v-model="signinForm.code"
                            placeholder="请输入验证码"
                            class="input--short"
                    ></el-input>
                    <img :src="imgSrc" class="img-code" @click="refreshImg">
                </el-form-item>
            </el-form>
            <div class="sign__button" @click="signIn">立即登录</div>
            <p class="sign__tip" v-if="isIbilling">
                <span>没有账号?</span>
                <a class="sign__link sign__link--attention" href="/view/signup.jsp">立即注册 </a>
                <a class="sign__link" href="/view/forget.jsp"> 忘记密码?</a>
            </p>
            <p class="sign__tip sign__tip--err">{{errTip}}</p>
        </div>
    </div>
</template>