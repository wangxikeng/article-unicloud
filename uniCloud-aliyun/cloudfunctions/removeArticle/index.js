'use strict';
const db = uniCloud.database()
exports.main = async (event, context) => {
	//event为客户端上传的参数
	let {
		id
	} = event
	const article = db.collection('article')
	return article.doc(id).remove()
};