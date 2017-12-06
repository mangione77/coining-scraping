const axios = require('axios')
const cheerio = require('cheerio')
require('dotenv').config()
//connect to DB
const mongoose = require('mongoose')
mongoose.Promise = global.Promise
mongoose.connect(process.env.DB_URL, { useMongoClient: true })

//service to post data into the DB
const postService = new(require('./service/PostService.js'))

axios.get("https://criptonoticias.com")
	.then(response => {

	// load the response into cheerio
	let $ = cheerio.load(response.data)

	// select all news divs
	let noticias = $("div.main-post")
			
	// iterate over the news and extract the info
	for (let i=0; i<noticias.length;i++) {
	let noticia = noticias.get(i)
	let link = $(noticia).children().find("a").attr("href")
	let title = $(noticia).children().find("h2").text()
	let img = $(noticia).children().find("img").attr("src")
			
	// post the results in DB
	postService.createPost(title,img,link)
		.then(() => {mongoose.disconnect()})
		.catch(console.error)
	// answer
	console.log('created')

		}

	})
	.catch(console.error)

