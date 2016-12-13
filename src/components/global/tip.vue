<script type="text/ecmascript-6">
	/**
	 * Created by wcz on 2016/11/25.
	 */
	export default {
		data () {
			return {
				debtDays: 0,
				dateIn0to10: false,
				month: 1,
				lastMonth: 1,
				holdDays: 0,
				cookieTipReaded: false,
                username: ''
			}
		},
		computed: {
			isTipShow () {
				return this.dateIn0to10 && (!this.cookieTipReaded)
			}
		},
		mounted () {
			if (login_user) {
				this.username = login_user.userAccount;
				this.cookieTipReaded = Cookies.get(`cookieTipReaded_${this.username}`);

				if (login_user.type === 'level1-user' && isIbilling && (new Date().getYear() > 116)) {
					this.getBalance();
				}
				this.month    = new Date().getMonth();
				this.holdDays = this.getDays() - (new Date().getDate());
				console.log(login_user.type)
            }
		},
		methods: {
			getBalance () {
				this.$get('/balance?action=getBalance', {errmsg: '获取余额失败'}).then(res => {
					let data = res.data;
					if (res.success) {
						this.debtDays   = res.data.debtDays || 0;
						this.lastMonth  = data.t.month == 0 ? 12 : data.t.month;
						let outdateTime = (1 - (data.t.hours * 60 + data.t.minutes) / 1440);
						if (data.balance < 0 && this.debtDays >= 0 && this.debtDays <= 10) { // 欠费天数少于十天
							if (!Cookies.get(`cookieDebtStage1_${this.username}`)) {

								Cookies.set(`cookieDebtStage1_${this.username}`, 'readed', {expires: outdateTime});
								this.$msgbox({
									title: '提示',
									message: `您的${this.lastMonth}月账单已经更新，您的余额不足，请在1-10日内付款，避免影响业务`,
									confirmButtonText: '去查看',
								}).then(status => {
									if (status) {
										window.location = '/view/finance/overview.jsp';
									}
								})
							}


						} else if (this.debtDays > 10) { // 欠费十天以上
							if (!Cookies.get(`cookieDebtStage2_${this.username}`)) {
								Cookies.set(`cookieDebtStage2_${this.username}`, 'readed', {expires: outdateTime});
								this.$msgbox({
									title: '提示',
									message: `您的${this.lastMonth}月账单已经更新，您已逾期未充值，请尽快充值，在此期间您将不能进行物联网卡管理操作，同时下属的二级组织用户将无法登陆`,
									confirmButtonText: '确定',
								})
							}


						}

						if ( data.balance >= 0 && this.debtDays === 0) { // 未欠费 1-10号显示账单提示
							if (data.t.date <= 10) this.dateIn0to10 = true;
							if (!this.cookieTipReaded) Cookies.set(`cookieTipReaded_${this.username}`, 'readed', {expires: 10});
						}
					}
				})
			},
			checkBill () {
				Cookies.set(`cookieTipReaded_${this.username}`, 'readed', {expires: this.holdDays});
				window.location = '/view/finance/overview.jsp';
			},
			getDays(){
				let date = new Date();
				let y    = date.getFullYear();
				let m    = date.getMonth() + 1;
				if (m == 2) {
					return y % 4 == 0 ? 29 : 28;
				} else if (m == 1 || m == 3 || m == 5 || m == 7 || m == 8 || m == 10 || m == 12) {
					return 31;
				} else {
					return 30;
				}
			}
		},
	};
</script>

<template>
    <div class="tip">
        <div class="debtTip" v-if="isTipShow">
            <i class="iconfont">&#xe6e4;</i>
            您的{{lastMonth}}月账单已经更新，请及时
            <span class="link" @click="checkBill" href="/view/finance/overview.jsp">查看</span>
            <i @click="checkBill" class="el-icon-close"></i>
        </div>
    </div>
</template>

<style>
    .debtTip {
        position: fixed;
        bottom: 0;
        left: 0;
        width: 100%;
        font-size: 14px;
        color: #2f7cba;
        line-height: 20px;
        vertical-align: middle;
        padding: 5px 20px;
        background: #e5f6fd;
        border: 1px solid #bbe7ef;

    }

    .debtTip .link {
        color: #47b0f0;
        cursor: pointer;
        text-decoration: underline;
    }

    .debtTip > .iconfont {
        transform: translateY(-6px);
        margin-right: 5px;
    }

    .debtTip .el-icon-close {
        font-size: 12px;
        position: absolute;
        right: 10px;
        top: 50%;
        cursor: pointer;
        transform: translateY(-50%);
    }

    .debtTip .el-icon-close:hover {
        opacity: .8;
    }
</style>