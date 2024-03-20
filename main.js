const { argv } = require('node:process')
const { crawlPage } = require('./crawl.js')
const { printReport } = require('./report.js')

function main() {
	if (argv.length < 3 || argv.length > 3) {
		throw new SyntaxError("Exactly one argument referencing the initial url to visit required.")
	}
	initial_url = argv[2]

	// Test url validity
	new URL(initial_url)
	console.log(`Web Crawler starting at : ${initial_url}`)

	crawlPage(initial_url, initial_url, {}).then((result) => printReport(result))
}

main()
