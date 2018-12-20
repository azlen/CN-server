let readLines = require('n-readlines');

let data = (function() {
	let out = {};
	let line, lineIterator = new readLines('./data/makemeahanzi/dictionary.txt');

	while (line = lineIterator.next()) {
		let entry = JSON.parse(line);

		out[entry.character] = entry;
	}

	return out;
})();