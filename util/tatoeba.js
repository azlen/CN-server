var fs = require('fs');
var parse = require('csv-parse');

fs.readFile('./data/tatoeba/sentences.csv', function (err, data) {
	parse(data, {}, function(err, rows) {
		if (err) {
			throw err;
		} else {
			console.log(rows[0]);
		}
	})
})