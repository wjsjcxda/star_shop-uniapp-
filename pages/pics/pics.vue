<template>
	<view class="pics">
		<scroll-view scroll-y="true" class="left">
			<view :class="active===index?'active':''" v-for="pic,index in picsCate" :key="pic.id"
				@click="leftClickHandle(index,pic.id)">
				{{pic.title}}
			</view>
		</scroll-view>
		<scroll-view scroll-y="true" class="right">
			<view class="item" v-for="img in secondData" :key="img.id">
				<image :src="img.img_url" @click="previewImg(img.img_url)"></image>
				<text>{{img.title}}</text>
			</view>
			<text v-if="secondData.length===0">不好意思，没有该项数据o(╥﹏╥)o</text>
		</scroll-view>
	</view>
</template>

<script>
	export default {
		data() {
			return {
				picsCate: [],
				active: 0,
				secondData: []
			}
		},
		methods: {
			//获取数据
			async getPicsCate() {
				const res = await this.$myRequest({
					url: '/api/getimgcategory'
				})
				this.picsCate = res.data.message
				this.leftClickHandle(0, this.picsCate[0].id)
			},
			//改变高亮项
			async leftClickHandle(index, id) {
				this.active = index
				// 获取右侧的数据
				const res = await this.$myRequest({
					url: '/api/getimages/' + id
				})
				this.secondData = res.data.message
			},
			//预览图片
			previewImg(img) {
				const urls = this.secondData.map(item => {
					return item.img_url
				})
				uni.previewImage({
					current: img,
					urls
				})
			}

		},
		onLoad() {
			this.getPicsCate()
		}
	}
</script>

<style lang="less">
	@shop-color: #4876FF;

	page {
		height: 100%;
	}

	.pics {
		height: 100%;
		display: flex;

		.left {
			width: 200rpx;
			height: 100%;
			border-right: 1px solid #eee;

			view {
				height: 60px;
				line-height: 60px;
				color: #333;
				text-align: center;
				font-size: 30rpx;
				border-top: 1px solid #eee;
			}

			.active {
				background: @shop-color;
				color: white;
			}
		}

		.right {
			height: 100%;
			width: 520rpx;
			margin: 10rpx auto;

			.item {
				img {
					width: 520rpx;
					height: 520rpx;
					border-radius: 5px;
				}

				text {
					font-size: 30rpx;
					line-height: 60rpx;
				}
			}
		}
	}
</style>
