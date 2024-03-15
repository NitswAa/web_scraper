const { test, expect } = require('@jest/globals')
const { normalizeURL } = require('./crawl.js')

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
