const Posts = require('../models/PostSchema')

class PostService {

	listPosts() {
		return Posts.find()
				.then(posts => {
					return posts
				})
	}

	listById(id) {
		return new Promise((resolve,reject) => {
			if (!id)
				throw new Error ('id cannot be empty')
		
		Posts.findById(id, (err,post) => {
			if (err) return reject(err)

				resolve(post)	
			})
			
		})
	}

	createPost(title,img,link) {
		return new Promise((resolve, reject) => {

		const post = new Posts({title,img,link})

		post.save()
			.then(post => {
				resolve(post)
			})
			.catch(reject)			
		})
	}

}

module.exports = PostService