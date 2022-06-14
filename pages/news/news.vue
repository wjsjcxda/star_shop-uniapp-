<template>
	<view class="news">
		<newsList :news='news' @itemClick='goDetail'></newsList>
	</view>
</template>

<script>
	import newsList from '../../components/news-item/news-item.vue'
	export default {
		components:{newsList},
		data() {
			return {
				news: []
			};
		},
		methods: {
			async getNews() {
				const res = await this.$myRequest({
					url: '/api/getnewslist'
				})
				this.news = res.data.message
			},
			goDetail(id){
				uni.navigateTo({
					url:'/pages/news-detail/news-detail?id='+id
				})
			}
		},
		onLoad() {
			this.getNews()
		}
	}
</script>

<style lang="less">

	.news {
		
	}
</style>
