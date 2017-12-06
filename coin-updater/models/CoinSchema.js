const mongoose = require('mongoose')
const Schema = mongoose.Schema

const CoinSchema = new Schema({
	name:String,
	symbol:String,
	rank:Number,
	price_usd:Number,
	price_eur:Number,
	market_cap_usd:Number,
	market_cap_eur:Number,
	total_supply:Number,
	max_supply:Number,
	percent_change_1h:Number,
	percent_change_24h:Number,
	percent_change_7d:Number,
	last_updated:Number,

})

module.exports = mongoose.model('Coin', CoinSchema)