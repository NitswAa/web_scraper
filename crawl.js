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

module.exports = {
	normalizeURL
}
