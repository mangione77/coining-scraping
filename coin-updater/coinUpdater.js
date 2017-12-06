const axios = require('axios')
require('dotenv').config()

const mongoose = require('mongoose')
mongoose.Promise = global.Promise
mongoose.connect(process.env.DB_URL, { useMongoClient: true })

const CoinService = new(require('./service/CoinService'))

get10Coins = () => {
	axios.get('https://api.coinmarketcap.com/v1/ticker/?convert=EUR&limit=10')
		.then(res => {
			res.data.map(coin => {
				let name = coin.name
				let symbol = coin.symbol
				let rank = coin.rank
				let price_usd = coin.price_usd
				let price_eur = coin.price_eur
				let market_cap_usd = coin.market_cap_usd
				let market_cap_eur = coin.market_cap_eur
				let total_supply = coin.total_supply
				let max_supply = coin.max_supply
				let percent_change_1h = coin.percent_change_1h
				let percent_change_24h = coin.percent_change_24h
				let percent_change_7d = coin.percent_change_7d
				let last_updated = coin.last_updated

				CoinService.createCoin(name,symbol,rank,price_usd,price_eur,market_cap_usd,market_cap_eur,total_supply,max_supply,percent_change_1h,percent_change_24h,percent_change_7d,last_updated)
					.then(res => {
						console.log('Coin created in DB! ' , res)
						mongoose.disconnect()
					})
					.catch(console.error)
			})
		})
		.catch(console.error)	
}


get10Coins()