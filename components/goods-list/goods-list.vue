<template>
	<view class="goods_list">
		<view class="goods" v-for="good in goods" :key="good.id" @click="navigator(good.id)">
			<image :src='good.img_url'></image>
			<view class="price">
				<text>￥{{good.sell_price}}</text>
				<text>￥{{good.market_price}}</text>
			</view>
			<view class="name">
				{{good.title}}
			</view>
		</view>
	</view>
</template>

<script>
	export default {
		props:['goods'],
		methods:{
			navigator(id){
				this.$emit('goodsItemClick',id)
			}
		}
	}
</script>

<style lang="less">
	@shop-color: #4876FF;
	.goods_list {
		padding: 0 15rpx;
		display: flex;
		flex-wrap: wrap;
		justify-content: space-between;
	
		.goods {
			background: #fff;
			margin: 10rpx 0;
			width: 355rpx;
			padding: 15rpx;
			box-sizing: border-box;
	
			image {
				width: 80%;
				height: 150px;
				display: block;
				margin: 0 auto;
			}
	
			.price {
				color: @shop-color;
				font-size: 36rpx;
				margin:20rpx 0 5rpx 0;
				text:nth-child(2) {
					color: #ccc;
					font-size: 28rpx;
					margin-left: 17rpx;
					text-decoration: line-through;
				}
			}
	
			.name {
				font-size: 28rpx;
				line-height: 50rpx;
				padding-top: 15rpx;
				padding-bottom: 10rpx;
			}
		}
	}
</style>