<template>
	<view class="goods-list">
		<goodsList :goods="goods" @goodsItemClick='goDetail'></goodsList>
		<view class="isOver" v-if="flag">
			------我是有底线的------
		</view>
	</view>
</template>

<script>
	import goodsList from '../../components/goods-list/goods-list.vue'
	export default {
		components:{goodsList},
		data() {
			return {
				pageindex:1,
				goods:[],
				flag:false
			}
		},
		methods:{
			//获取商品列表的数据
			async getGoodsList(callBack){
				const res = await this.$myRequest({
					url:'/api/getgoods?pageindex='+this.pageindex
				})
				this.goods = [...this.goods,...res.data.message]
				this.goods.forEach((item) => {
					item.img_url = 'https://cdn.seovx.com/d/?mom=302'
				})
				if(callBack){
					callBack()
				}
			},
			//导航到商品详情页
			goDetail(id){
				uni.navigateTo({
					url:'/pages/goods-detail/goods-detail?id='+id
				})
			}
		},
		onLoad(){
			this.getGoodsList()
		},
		onReachBottom(){
			if(this.goods.length<this.pageindex*10) return this.flag = true
			this.pageindex++
			this.getGoodsList()
		},
		onPullDownRefresh(){
			this.pageindex = 1
			this.goods = []
			this.flag = false
			setTimeout(()=>{
				this.getGoodsList(()=>{
					uni.stopPullDownRefresh()
				})
			},1000)
		}

	}
</script>

<style lang="less">
	.goods-list{
		background: #eee;
	}
	.isOver{
		width: 100%;
		height: 50px;
		line-height: 50px;
		text-align: center;
		background: #fff;
		font-size: 28rpx;
	}
</style>
