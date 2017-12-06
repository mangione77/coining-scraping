const twit = require('twit')
require('dotenv').config()
const moment = require('moment')


const mongoose = require('mongoose')
mongoose.Promise = global.Promise
mongoose.connect(process.env.DB_URL, { useMongoClient: true })

const tweetService = new(require('./service/TweetDBService'))

const Twitter = new twit({
	consumer_key:process.env.CONSUMER_KEY,
	consumer_secret:process.env.CONSUMER_SECRET,
	access_token:process.env.ACCESS_TOKEN,
	access_token_secret:process.env.ACCESS_TOKEN_SECRET
})

let date = moment().format('YYYY MM DD')
let formatted = date.replace(/\s/g,"-")

Twitter.get('search/tweets', {q:`criptomonedas since:${formatted}`,count:10}, (err,data,response) => {
	if (err) 
		throw new Error
	 
	data.statuses.map(tweet => {
		let tweet_id = tweet.id
		let text = tweet.text
		let created_at = tweet.created_at
		let language = tweet.language
		let user = {
			'id':tweet.user.id,
			'name':tweet.user.name,
			'screen_name':tweet.user.screen_name,
			'followers':tweet.user.followers_count,
			'following':tweet.user.friends_count,
			'location':tweet.user.location,
			'timezone':tweet.user.time_zone,
			'description':tweet.user.description,
			'total_tweets':tweet.user.statuses_count,
			'profile_image':tweet.user.profile_image_url_https
		}

		tweetService.createTweet(tweet_id,text,created_at,language,user)
			.then((res) => {
				console.log('Tweet created! ', res)
				mongoose.disconnect()
			})
			.catch(console.error)
	})
	

})