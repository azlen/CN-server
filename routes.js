let fs = require('fs');

let hanzi = require('hanzi');
let { pinyinNumberToAccent } = require('./util/util.js');

let { dictionary, graphics } = require('./util/makemeahanzi.js');

hanzi.start();

//let mmah_dictionary = JSON.parse(fs.read('./data/makemeahanzi/dictionary.txt'));
//let mmah_graphics = JSON.parse(fs.read('./data/makemeahanzi/dictionary.txt'));


module.exports = function(app) {

	app.get("/", function(req, res) {
		let character = req.query.word;
		let d = hanzi.definitionLookup(character);

		let data = {
			'traditional': {
				'character': d[0].traditional,
				'strokes': graphics[d[0].traditional].strokes,
				'medians': graphics[d[0].traditional].medians,
			},
			'simplified': {
				'character': d[0].simplified,
				'strokes': graphics[d[0].simplified].strokes,
				'medians': graphics[d[0].simplified].medians,
			},
			'pinyinNumber': d[0].pinyin,
			'pinyinAccent': pinyinNumberToAccent(d[0].pinyin),
			'definition': d[0].definition,
			'definition2': dictionary[d[0].simplified].definition
		}

		//d.pinyin = pinyinNumberToAccent(d.pinyin);

	    res.send(data);
	});

};