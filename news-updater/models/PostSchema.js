const mongoose = require('mongoose')
const Schema = mongoose.Schema

const PostSchema = new Schema({
	title: String,
	img:String,
	link:String
})

module.exports = mongoose.model('Post', PostSchema)