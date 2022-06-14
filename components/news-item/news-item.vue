<template>
	<view>
		<view class="news_item" @click='navigater(info.id)' v-for="info in news" :key="info.id">
			<image :src="info.img_url"></image>
			<view class="right">
				<view class="tit">
					{{info.title}}
				</view>
				<view class="info">
					<text>发表时间:{{info.add_time | formatData}}</text>
					<text>浏览次数:{{info.click}}</text>
				</view>
			</view>
		</view>
	</view>
</template>

<script>
	export default{
		props:['news'],
		filters:{
			formatData(date){
				const newDate = new Date(date)
				const year = newDate.getFullYear()
				const month = newDate.getMonth().toString().padStart(2,0)
				const day = newDate.getDate().toString().padStart(2,0)
				const hours = newDate.getHours()
				const minutes = newDate.getMinutes()
				const seconds = newDate.getSeconds()
				return (year+'-'+month+'-'+day+'  '+hours+':'+minutes+':'+seconds)
			}
		},
		methods:{
			navigater(id){
				this.$emit("itemClick",id)
			}
		}
	}
</script>

<style lang="less">
	@shop-color: #4876FF;
	.news_item {
		display: flex;
		padding: 10rpx 20rpx;
		border-bottom: 1px solid @shop-color;

		image {
			min-width: 200rpx;
			max-width: 200rpx;
			height: 150rpx;
		}

		.right {
			margin-left: 10rpx;
			display: flex;
			flex-direction: column;
			justify-content: space-between;

			.tit {
				font-size: 30rpx;
			}

			.info {
				font-size: 24rpx;

				text:nth-child(2) {
					margin-left: 30rpx;
				}
			}
		}

	}
</style>
