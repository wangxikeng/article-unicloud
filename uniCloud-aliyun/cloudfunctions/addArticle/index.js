'use strict';
const db = uniCloud.database();
exports.main = async (event, context) => {
	const article = db.collection('article')
	const res = await article.add({
		...event,
		posttime: Date.now()
	})

	return res
};