<template>
	<view class="goods_detail">
		<swiper :indicator-dots="true" :autoplay="true" :interval="3000" :duration="1000">
			<swiper-item v-for="(img,index) in swiper_detail" :key="index">
				<image :src="img.src"></image>
			</swiper-item>
		</swiper>
		<view class="box1">
			<view class="price">
				<text>￥{{detail_info.sell_price}}</text>
				<text>￥{{detail_info.market_price}}</text>
			</view>
			<view class="goods_name">
				{{detail_info.title}}
			</view>
		</view>
		<view class="line"> </view>
		<view class="box2">
			<view>货号：{{detail_info.goods_no}}</view>
			<view>库存：{{detail_info.stock_quantity}}</view>
		</view>
		<view class="line"> </view>
		<view class="box3">
			<view class="tit">详情介绍</view>
			<rich-text :nodes="content"></rich-text>
		</view>
		<view class="goods_nav">
			<uni-goods-nav :fill="true" :options="options" :buttonGroup="buttonGroup" @click="onClick"
				@buttonClick="buttonClick" />
		</view>
	</view>
</template>

<script>
	import uniGoodsNav from '../../components/uni-goods-nav/uni-goods-nav.vue'
	export default {
		components: {
			uniGoodsNav
		},
		data() {
			return {
				id: 0,
				swiper_detail: [],
				detail_info: {},
				content: '',
				options: [{
					icon: 'headphones',
					text: '客服'
				}, {
					icon: 'shop',
					text: '店铺',
					info: 2,
					infoBackgroundColor: '#007aff',
					infoColor: "red"
				}, {
					icon: 'cart',
					text: '购物车',
					info: 2
				}],
				buttonGroup: [{
						text: '加入购物车',
						backgroundColor: '#ff0000',
						color: '#fff'
					},
					{
						text: '立即购买',
						backgroundColor: '#ffa200',
						color: '#fff'
					}
				]
			}
		},
		methods: {
			//获取商品图片
			async getSwipers(id) {
				const res = await this.$myRequest({
					url: '/api/getthumimages/' + this.id
				})
				this.swiper_detail = res.data.message
			},
			//获取商品信息
			async getDetailInfo() {
				const res = await this.$myRequest({
					url: '/api/goods/getinfo/' + this.id
				})
				this.detail_info = res.data.message[0]
			},
			//获取详细内容
			async getDetailContent() {
				const res = await this.$myRequest({
					url: '/api/goods/getdesc/' + this.id
				})
				this.content = res.data.message[0].content
			},
			onClick(e) {
				uni.showToast({
					title: `点击${e.content.text}`,
					icon: 'none'
				})
			},
			buttonClick(e) {
				console.log(e)
				this.options[2].info++
			}
		},
		
		onLoad(options) {
			this.id = options.id
			this.getSwipers()
			this.getDetailInfo()
			this.getDetailContent()
		}
	}
</script>

<style lang="scss">
	.goods_detail {
		swiper {
			height: 750rpx;

			image {
				width: 100%;
				height: 100%;
			}
		}

		.box1 {
			padding: 10px;

			.price {
				font-size: 35rpx;
				color: $shop-color;
				line-height: 80rpx;

				text:nth-child(2) {
					color: #ccc;
					font-size: 28rpx;
					text-decoration: line-through;
					margin-left: 20rpx;
				}
			}

			.good_name {
				font-size: 32rpx;
				line-height: 60rpx;
			}
		}

		.line {
			height: 10rpx;
			width: 750rpx;
			background: #eee;
		}

		.box2 {
			padding: 0 10px;
			font-size: 32rpx;
			line-height: 70rpx;
		}

		.box3 {
			.tit {
				font-size: 30rpx;
				padding-left: 10px;
				border-bottom: 1px solid #eee;
				line-height: 70rpx;
			}

			.content {
				padding: 10px;
				font-size: 20rpx;
				color: #333;
				line-height: 50rpx;

			}
		}

		.goods_nav {
			position: fixed;
			bottom: 0;
			width: 100%;
		}
	}
</style>
