const mongoose = require('mongoose')
const Schema = mongoose.Schema

const TweetSchema = new Schema ({
	tweet_id:Number,
	text:String,
	created_at:Date,
	language:String,
	hashtags:Array,
	mentions:Array,
	user: {
		user_id:Number,
		name:String,
		screen_name:String,
		followers:Number,
		following:Number,
		location:String,
		timezone:String,
		description:String,
		total_tweets:Number,
		profile_image:String
	}

})

module.exports = mongoose.model('Tweet', TweetSchema)