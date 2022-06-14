<template>
	<view class="home">
		<swiper :indicator-dots="true" :autoplay="true" :interval="3000" :duration="1000">
			<swiper-item v-for="item in swipper" :key="item.id">
				<image :src="item.url" @click="preViewImg(item.url)"></image>
			</swiper-item>
		</swiper>
		<!-- 导航区 -->
		<view class="nav">
			<view class="nav_item" v-for="(item,index) in navs" :key="index" @click="navItem(item.path)">
				<view :class="item.icon"></view>
				<text>{{item.title}}</text>
			</view>
		</view>
		<!-- 推荐商品区 -->
		<view class="hot_goods">
			<view class="tit">推荐商品</view>
			<goodsList :goods="goods" @goodsItemClick='goGoodsDetail'></goodsList>
		</view>
	</view>
</template>

<script>
	import goodsList from '../../components/goods-list/goods-list.vue'
	export default {
		components:{goodsList},
		data() {
			return {
				swipper: [],
				goods: [],
				navs:[
					{
						icon:'iconfont icon-ziyuan',
						title:'启明星商城',
						path:'/pages/goods/goods'
					},
					{
						icon:'iconfont icon-guanyuwomen',
						title:'联系我们',
						path:'/pages/contact/contact'
					},
					{
						icon:'iconfont icon-tupian',
						title:'社区图片',
						path:'/pages/pics/pics'
					},
					{
						icon:'iconfont icon-shipin',
						title:'学习视频',
						path:'/pages/videos/videos'
					}
				]
			}
		},
		onLoad() {
			this.getSwipers()
			this.getHotGoods()
		},
		methods: {
			//获取轮播图的数据
			async getSwipers() {
				// uni.request({
				// 	url:'/api/getLunbo',
				// 	success:res=>{
				// 		console.log(res)
				// 		if(res.data.status !== 0){
				// 			return uni.showToast({
				// 				title:'获取数据失败'
				// 			})
				// 		}
				// 		this.swipper = res.data.message
				// 	}		
				// })

				const res = await this.$myRequest({
					url: '/api/getLunbo'
				})
				this.swipper = res.data.message
			},

			//获取热门商品列表数据
			async getHotGoods() {
				const res = await this.$myRequest({
					url: '/api/getgoods?pageindex=1'
				})
				this.goods = res.data.message
				this.goods.forEach((item) => {
					item.img_url = 'https://api.mtyqx.cn/tapi/random.php?time='
				})
			},
			
			//导航跳转
			navItem(url){
				uni.navigateTo({
					url
				})
			},
			//预览商品
			preViewImg(img){
				console.log(this.swipper)
				let imgs = this.swipper.map(item=>{
					return item.url
				})
				uni.previewImage({
					current:img,
					urls:imgs,
					indicator:'number'
				})
			},
			
			//导航到商品详情页
			goGoodsDetail(id){
				uni.navigateTo({
					url:'/pages/goods-detail/goods-detail?id='+id
				})
			}
		}
	}
</script>

<style lang="less">
	@shop-color: #4876FF;

	//轮播图
	.home {
		swiper {
			width: 750rpx;
			height: 380rpx;

			image {
				width: 100%;
				height: 100%;
			}
		}
	}

	// 导航区
	.nav {
		display: flex;

		.nav_item {
			width: 25%;
			text-align: center;

			view {
				width: 120rpx;
				height: 120rpx;
				background: @shop-color;
				border-radius: 50%;
				margin: 10px auto;
				line-height: 120rpx;
				color: #fff;
				font-size: 45rpx;
			}

			text {
				font-size: 30rpx;
			}
		}
	}

	//热点推荐
	.hot_goods {
		background: #eee;
		overflow: hidden;
		margin-top: 10px;

		.tit {
			height: 50px;
			line-height: 50px;
			color: @shop-color;
			text-align: center;
			letter-spacing: 20px;
			background: #fff;
			margin: 7px 0;
		}
	}

	//商品列表
	
</style>
