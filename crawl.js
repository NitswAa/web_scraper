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
		console.log(`Failed to normalize URL: ${urlString}`)
		console.log(e.message)
	}

	return url
}

function getURLsFromHTML(html, baseURL) {
	let urls = []

	let dom = new JSDOM(html)
	let anchors = dom.window.document.querySelectorAll("a")
	for (let i = 0; i < anchors.length; i++) {
		urls.push(baseURL + anchors[i].href)
	}

	return urls
}

async function crawlPage(baseURL, currentURL, visited) {

	try {
		if (new URL(currentURL).hostname !== new URL(baseURL).hostname) {
			console.log("We've left the base domain.")
			return visited
		}
	} catch (e) {
		console.log(`Couldn't resolve equality on ${currentURL}`)
		console.log(e.message)
		return visited
	}

	const normalized_url = normalizeURL(currentURL)

	if (normalized_url in visited) {
		console.log("URL already visited")
		visited[normalized_url] += 1
		return visited
	} else {
		visited[normalized_url] = 1
	}

	let page = null

	try {
		console.log(`Fetching resources at ${normalized_url}`)
		page = await fetch(currentURL)
	} catch (e) {
		console.log(e.message)
		return visited
	}

	if (page.status >= 400) {
		console.log(`${currentURL} returned an error.`)
		return visited
	}

	if (page.headers.get("content-type").split('; ')[0] !== "text/html") {
		console.log(`${currentURL} did not return html`)
		console.log(page.headers.get("content-type"))
		return visited
	}

	let html = ''

	for await (const chunk of page.body) {
		html += String.fromCharCode(...chunk)
	}

	const urls = getURLsFromHTML(html, baseURL)
	for (const url of urls) {
		visited = await crawlPage(baseURL, url, visited)
	}

	return visited
}

module.exports = {
	normalizeURL,
	getURLsFromHTML,
	crawlPage,
}
