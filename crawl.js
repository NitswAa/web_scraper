const { JSDOM } = require('jsdom')

function normalizeURL(urlString) {
	let url = null

	try {
		urlObj = new URL(urlString)
		url = urlObj.hostname + urlObj.pathname
		if (urlObj.pathname.length > 1 && url.slice(-1) === '/') {
			url = url.slice(0, -1)
		}
	} catch (e) {
		console.log(e.message)
	}

	return url
}

function getURLsFromHTML(html, baseURL) {
	let urls = []

	let dom = new JSDOM(html)
	let anchors = dom.window.document.querySelectorAll("a")
	for (let i = 0; i < anchors.length; i++) {
		urls.push(anchors[i].href)
	}

	return urls
}

async function crawlPage(url) {
	try {
		page = await fetch(url)
	} catch (e) {
		console.log(e.message)
		return
	}

	if (page.status >= 400) {
		console.log(`${url} returned an error.`)
		return
	}

	if (page.headers.get("content-type").split('; ')[0] !== "text/html") {
		console.log(`${url} did not return html`)
		console.log(page.headers.get("content-type"))
		return
	}

	output = ''

	for await (const chunk of page.body) {
		output += String.fromCharCode(...chunk)
	}

	console.log(output)
}

module.exports = {
	normalizeURL,
	getURLsFromHTML,
	crawlPage,
}
