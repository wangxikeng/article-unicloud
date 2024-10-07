<template>
	<view class="add">
		<form @submit="onSubmit">
			<view class="item">
				<input v-model="formValue.title" type="text" name="title" placeholder="请输入标题" />
			</view>
			<view class="item">
				<input v-model.trim="formValue.author" type="text" name="author" placeholder="请输入作者名称" />
			</view>
			<view class="item">
				<textarea v-model="formValue.content" name="content" placeholder="请输入详细的内容"></textarea>
			</view>
			<view class="item">
				<button form-type="reset">重置</button>
				<button form-type="submit" type="primary" :disabled="isDisable(formValue)">提交</button>
			</view>
		</form>
	</view>
</template>

<script>
	export default {
		data() {
			return {
				formValue: {
					title: '',
					author: '',
					content: ''
				}
			};
		},
		methods: {
			// 点击提交
			onSubmit(e) {
				let detail = e.detail.value
				uniCloud.callFunction({
					name: 'addArticle',
					data: detail
				}).then(res => {
					uni.showToast({
						title: '发布成功'
					})
					let timer = setTimeout(() => {
						uni.reLaunch({
							url: '/pages/index/index'
						})
						timer = null
					}, 2000)
				})
			},

			// 表单验证
			isDisable(obj) {
				// 依次判断内容是否为空
				for (let key in obj) {
					if (!obj[key]) {
						return true
					}
				}
			}
		}
	}
</script>

<style lang="scss" scoped>
	.add {
		padding: 30rpx;

		.item {
			padding-bottom: 20rpx;

			input,
			textarea {
				height: 80rpx;
				border: 1rpx solid #eee;
				padding: 0 20rpx;
			}

			textarea {
				box-sizing: border-box;
				height: 200rpx;
				width: 100%;
			}

			button {
				margin-bottom: 20rpx;
			}
		}
	}
</style>