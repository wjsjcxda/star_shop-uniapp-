import App from './App'

// #ifndef VUE3
import Vue from 'vue'
import {
	myRequest
} from './util/api.js'

Vue.prototype.$myRequest = myRequest

//在全局追加一个全局过滤器（格式化时间）
Vue.filter('formatDate', (date) => {
	const newDate = new Date(date)
	const year = newDate.getFullYear()
	const month = newDate.getMonth().toString().padStart(2, 0)
	const day = newDate.getDate().toString().padStart(2, 0)
	const hours = newDate.getHours()
	const minutes = newDate.getMinutes()
	const seconds = newDate.getSeconds()
	return (year + '-' + month + '-' + day + '  ' + hours + ':' + minutes + ':' + seconds)
})

Vue.config.productionTip = false


App.mpType = 'app'
const app = new Vue({
	...App
})
app.$mount()
// #endif

// #ifdef VUE3
import {
	createSSRApp
} from 'vue'
export function createApp() {
	const app = createSSRApp(App)
	return {
		app
	}
}
// #endif
