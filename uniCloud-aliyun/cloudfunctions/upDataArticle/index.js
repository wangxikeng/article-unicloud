'use strict';
const db = uniCloud.database()
exports.main = async (event, context) => {
	//event为客户端上传的参数
	let {
		id,
		title,
		author,
		content
	} = event
	const article = db.collection('article')
	return article.doc(id).update({
		title: title,
		author: author,
		content: content,
		posttime: Date.now()
	})
};