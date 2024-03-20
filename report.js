// Sorts in DESCENDING order, based on value of key
function compare_visited(a, b) {
	if (a[1] > b[1]) {
		return -1
	} else if (a[1] < b[1]) {
		return 1
	} else {
		return 0
	}
}

function printReport(visited) {

	console.log("---------------------------")
	console.log("Preparing report...")
	console.log("---------------------------\n")

	sorted = Object.entries(visited).toSorted(compare_visited)

	for (const [key, value] of sorted) {
		console.log(`- ${key} is internally referenced ${value} times.`)
	}

	console.log("---------------------------")
	console.log("Report complete")
	console.log("---------------------------\n")
}

module.exports = {
	printReport,
}
