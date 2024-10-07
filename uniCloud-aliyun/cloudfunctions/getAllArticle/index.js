'use strict';
// 获取数据库对象
const db = uniCloud.database();
exports.main = async (event, context) => {
	let {
		offset
	} = event
	console.log(event)
	//event为客户端上传的参数
	const article = db.collection('article')
	// 根据发布时间排序
	return article.limit(8).skip(offset).orderBy('posttime', 'desc').get()
};