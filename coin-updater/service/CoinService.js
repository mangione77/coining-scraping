const Coin = require('../models/CoinSchema')

class CoinService {

	createCoin(name,symbol,rank,price_usd,price_eur,market_cap_usd,market_cap_eur,total_supply,max_supply,percent_change_1h,percent_change_24h,percent_change_7d,last_updated) {
		return new Promise((resolve,reject) => {
			const _Coin = new Coin({name,symbol,rank,price_usd,price_eur,market_cap_usd,market_cap_eur,total_supply,max_supply,percent_change_1h,percent_change_7d,percent_change_7d,last_updated})

			_Coin.save()
				.then(res => {
					resolve(res)
				})
				.catch(reject)
		})
	}
}

module.exports = CoinService