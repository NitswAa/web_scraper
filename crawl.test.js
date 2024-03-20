const { test, expect } = require('@jest/globals')
const { normalizeURL, getURLsFromHTML } = require('./crawl.js')

/*
	normalizeURL tests
*/

test('NormU removes protocol', () => {
	expect(normalizeURL('https://blog.boot.dev/path')).toBe('blog.boot.dev/path')
})

test('NormU removes trailing slashes', () => {
	expect(normalizeURL('https://blog.boot.dev/path/')).toBe('blog.boot.dev/path')
})

test('NormU removes post-path elements', () => {
	expect(normalizeURL('https://blog.boot.dev/path?query=false#id=cringe')).toBe('blog.boot.dev/path')
})

test('NormU accepts pathless URLs', () => {
	expect(normalizeURL('https://blog.boot.dev/')).toBe('blog.boot.dev/')
})

test('NormU return objects are identical', () => {
	expect(normalizeURL('http://blog.boot.dev/path/')).toBe(normalizeURL('https://blog.boot.dev/path'))
})

/*
	getURLsFromHTML tests
*/

test('Empty HTML returns no URLs', () => {
	expect(getURLsFromHTML('')).toStrictEqual([])
})

test('Extracts url from anchor tag', () => {
	expect(getURLsFromHTML('<a href="http://blah.blah.com/hello/">Link</a>', 'http://blah.blah.com')).toStrictEqual(["http://blah.blah.com/hello/"])
})

test('Extracts mutliple urls from body', () => {
	html = `<html><body>
<p>Lorem ipsum</p>
<a href="https://test.com/test1">Link 1</a>
<a href="https://test.com/test2/deeper">Link 2</a>
	</body></html>`
	result = ["https://test.com/test1", "https://test.com/test2/deeper"]
	expect(getURLsFromHTML(html, "https://test.com")).toStrictEqual(result)
})


