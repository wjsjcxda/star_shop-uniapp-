<template>
	<view class='contact'>
		<image class='img' src='https://cdn.seovx.com/ha/?mom=302'></image>
		<view class="info">
			<view @click="phone">联系电话：18384362623（点击拨打）</view>
			<view>联系地址：成都武侯区</view>
		</view>
		<map class="map" :scale='scale' :longitude='longitude' :latitude='latitude' :markers='markers'></map>
	</view>
</template>

<script>
	export default {
		data() {
			return {
				longitude: 104.078332,
				latitude: 30.609171,
				scale: 20,
				markers: [{
					longitude: 104.078332,
					latitude: 30.609171,
					iconPath: '../../static/logo.jpg',
					width: 30,
					height: 30
				}]
			};
		},
		methods: {
			phone() {
				uni.makePhoneCall({
					phoneNumber: '18384362623'
				});
			}
		}
	}
</script>

<style lang="less">
	.contact {
		.img {
			width: 750rpx;
			height: 320rpx;
		}

		.info {
			padding: 10rpx 20rpx;
			font-size: 30rpx;

			view {
				line-height: 80rpx;
				border-bottom: 1px solid #eee;
			}
		}

		.map {
			width: 750rpx;
			height: 750rpx;
		}

	}
</style>
