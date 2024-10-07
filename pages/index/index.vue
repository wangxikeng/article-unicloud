<template>
	<view class="home">

		<view class="content">
			<view @click="goDetail(item._id)" class="item" v-for="item in listArr" :key="item._id">
				<view class="text">
					<view class=title>{{item.title}}</view>
					<view class="info">
						<text>{{item.author}}</text>
						<uni-dateformat :date="item.posttime" format="MM-dd" :threshold="[60000,
								3600000]"></uni-dateformat>
						<text>删除</text>
					</view>
				</view>
				<view class="pic">
					<image mode="aspectFit" src="../../static/logo.png"></image>
				</view>
			</view>
		</view>
		<view @click='goAdd' class="goAdd">
			<uni-icons type="plusempty" size="30" color="#eee"></uni-icons>
		</view>
	</view>
</template>

<script>
	export default {
		data() {
			return {
				listArr: []
			}
		},

		onLoad() {

		},
		onPullDownRefresh() {
			this.listArr = []
			this.getData()
		},
		onShow() {
			this.getData()
		},
		//触底加载
		onReachBottom() {
			this.getData()
		},
		methods: {
			// 点击跳转
			goAdd() {
				uni.navigateTo({
					url: '/pages/add/add'
				})
			},
			// 获取数据
			getData() {
				uniCloud.callFunction({
					name: 'getAllArticle',
					data: {
						offset: this.listArr.length
					}
				}).then((res) => {
					let tem = this.listArr
					this.listArr = [...tem, ...res.result.data]
					uni.stopPullDownRefresh()
				})
			},

			// 点击进入详情页
			goDetail(id) {
				uni.navigateTo({
					url: `/pages/detail/detail?id=${id}`,
				})
			}
		}
	}
</script>

<style lang="scss" scoped>
	.home {
		.content {
			padding: 30rpx;

			.item {
				display: flex;
				justify-content: space-between;
				padding: 20rpx 0;
				border-bottom: 1rpx solid #eee;

				.text {
					flex: 1;
					display: flex;
					flex-direction: column;
					justify-content: space-between;
					text-align: justify;

					.title {
						display: -webkit-box;
						-webkit-box-orient: vertical;
						-webkit-line-clamp: 2;
						/* 限制为两行 */
						overflow: hidden;
						text-overflow: ellipsis;
						font-size: 40rpx;
						color: #333;
					}

					.info {
						font-size: 28rpx;
						color: #888;

						text {
							padding-right: 20rpx;
						}
					}
				}

				.pic {
					width: 260rpx;
					height: 180rpx;

					image {
						width: 100%;
						height: 100%;
					}


				}
			}
		}

		.goAdd {
			position: fixed;
			right: 20rpx;
			bottom: 100rpx;
			width: 100rpx;
			height: 100rpx;
			font-size: 50rpx;
			background-color: #41A863;
			color: #fff;
			display: flex;
			justify-content: center;
			align-items: center;
			border-radius: 50%;
			box-shadow: 0 0 20rpx rgba(43, 153, 57, 0.7);
		}
	}
</style>