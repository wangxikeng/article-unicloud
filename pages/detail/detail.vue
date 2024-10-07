<template>
	<view class='detail'>
		<view v-if='isLoad'>
			<view class="title">{{articleDetail.title}}</view>
			<view class="info">
				<text>{{articleDetail.author}}</text>
				<uni-dateformat :date="articleDetail.posttime" :threshold="[60000, 3600000]"
					format="yyyy-MM-dd"></uni-dateformat>
			</view>
			<view class="content">
				{{articleDetail.content}}
			</view>
			<view class="btnGroup">
				<button size="mini" @click="goEdit">修改</button>
				<button size="mini" type="warn" @click="onRemove">删除</button>
			</view>
		</view>
		<view v-else>
			<uni-load-more status="loading"></uni-load-more>
		</view>
	</view>
</template>

<script>
	export default {
		data() {
			return {
				articleDetail: {},
				isLoad: false,
				id: 0
			};
		},
		onLoad(e) {
			this.id = e.id

		},
		onShow() {
			this.getDetail(this.id)
		},
		methods: {
			// 获取详情
			getDetail(id) {
				uniCloud.callFunction({
					name: 'getDetail',
					data: {
						id: id
					}
				}).then((res) => {
					this.articleDetail = res.result.data[0]
					this.isLoad = true
					uni.setNavigationBarTitle({
						title: this.articleDetail.title
					})
				}).catch((err) => {
					uni.showToast({
						title: '参数错误',
						icon: 'error',
						duration: 2000
					})
					uni.reLaunch({
						url: '/pages/index/index'
					})
				})
			},
			// 删除
			onRemove() {
				uni.showModal({
					title: '提示',
					content: '是否删除',
					success: (res) => {
						if (res.confirm) {
							this.removeFn()
						} else if (res.cancel) {
							uni.showToast({
								title: '取消成功'
							})
						}
					}

				})
			},
			removeFn() {
				uniCloud.callFunction({
					name: 'removeArticle',
					data: {
						id: this.id
					}
				}).then((res) => {
					uni.showToast({
						title: '删除成功'
					})
					let timer = setTimeout(() => {
						uni.reLaunch({
							url: '/pages/index/index'
						})
						timer = null
					}, 2000)
				})
			},

			// 跳转到修改页
			goEdit() {
				uni.navigateTo({
					url: `/pages/edit/edit?id=${this.id}`
				})
			}
		}
	}
</script>

<style lang="scss" scoped>
	.detail {
		padding: 30rpx;

		.title {
			font-size: 50rpx;
			color: #000;
			text-align: justify;
		}

		.info {
			font-size: 30rpx;
			color: #666;
			padding: 20rpx 0 60rpx;

			text {
				margin-right: 20rpx;
			}
		}

		.content {
			font-size: 36rpx;
			line-height: 1.7em;
		}

		.btnGroup {
			padding: 50rpx 0;

			button {
				margin-right: 50rpx;
			}
		}
	}
</style>