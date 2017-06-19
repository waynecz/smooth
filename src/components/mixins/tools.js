import API from '../API/API'
export default {
	data () {
		return {
			api: API
		}
	},
	methods: {
		$post (url, data, option = {errmsg: '请求发生异常', cb: undefined}) {
			return new Promise((resolve, reject) => {
				if (option.loading) this[option.loading] = true;
				$.ajax({
					url,
					data,
					method: 'POST',
					dataType: 'json'
				}).done(data => {
					let lock = Object.prototype.toString.call(data) == '[object String]';
					let rst = lock ? JSON.parse(data) : data;
					if (!rst.success) {
						let message = rst.message || option.errmsg;
						message && this.msg(message, 'warning');
					}
					resolve(rst)
				}).fail(err => {
					this.msg(option.errmsg, 'error');
					reject(err)
				}).always(() => {
					option.cb && option.cb();
					if (option.loading) this[option.loading] = false;
				})
			})
		},
		$get (url, option = {errmsg: '请求发生异常'}, data = {}) {
			return new Promise((resolve, reject) => {
				if (option.loading) this[option.loading] = true;
				$.ajax({
					url,
					data,
					method: 'GET',
					dataType: 'json'
				}).done(data => {
					let lock = Object.prototype.toString.call(data) == '[object String]';
					let rst = lock ? JSON.parse(data) : data;
					if (!rst.success) this.msg(option.errmsg, 'warning');
					resolve(rst)
				}).fail(err => {
					this.msg(option.errmsg, 'error');
					reject(err)
				}).always(() => {
					if (option.loading) this[option.loading] = false;
				})
			})
		},
		msg (msg, type) {
			this.$message({
				message: msg,
				type: type
			})
		},
		throttle (fn, delay, immediate, debounce) {
			let curr      = +new Date(),//当前事件
				last_call = 0,
				last_exec = 0,
				timer     = null,
				diff, //时间差
				context,//上下文
				args,
				exec      = function () {
					last_exec = curr;
					fn.apply(context, args);
				};
			return function () {
				curr = +new Date();
				context = this,
					args = arguments,
					diff = curr - (debounce ? last_call : last_exec) - delay;
				clearTimeout(timer);
				if (debounce) {
					if (immediate) {
						timer = setTimeout(exec, delay);
					} else if (diff >= 0) {
						exec();
					}
				} else {
					if (diff >= 0) {
						exec();
					} else if (immediate) {
						timer = setTimeout(exec, -diff);
					}
				}
				last_call = curr;
			}
		},
	}
}