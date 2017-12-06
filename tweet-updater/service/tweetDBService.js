const Tweets = require('../models/TweetSchema')

class TweetService {

	listTweets() {
		return Tweets.find()
			.then(tweets => {
				return tweets
			})

	}

	listTweetById(id) {
		return new Promise((resolve,reject) => {
			if (!id)
				throw new Error ('id cannot be an empty value')

			Tweets.findById(id, (err,tweet) => {
				if (err) return reject(err)

				resolve(tweet)	
			})	 
		})
	}

	createTweet(tweet_id,text,created_at,language,user) {
		return new Promise((resolve,reject) => {

			const tweet = new Tweets({tweet_id,text,created_at,language,user})

			tweet.save()
				.then(res => {
					resolve(res)
				})
				.catch(reject)
		})
	}

}

module.exports = TweetService