let readLines = require('n-readlines');

let sentences = (function() {
	let out = {};
	let line, lineIterator = new readLines('./data/tatoeba/sentences.txt');

	while (line = lineIterator.next()) {
		let [index, lang, sentence] = line.match(/(\d+) (\w+) (.*)/);

		if (lang === 'cmn' || lang === 'eng') {
			out[index] = [lang, sentence];
		}
		out[index] = sentence
	}

	return out;
})();

sentences = (function() {
	let out = {};
	let line, lineIterator = new readLines('./data/tatoeba/links.txt');

	while (line = lineIterator.next()) {
		let [index, lang, sentence] = line.match(/(\d+) (\w+) (.*)/);

		if (lang === 'cmn' || lang === 'eng') {
			out[index] = [lang, sentence];
		}
		out[index] = sentence
	}

	return out;
})();