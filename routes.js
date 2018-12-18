let hanzi = require('hanzi')

hanzi.start();

// Convert numbered pinyin format into tones
// The rules of where the tones are placed is as follows
// - 'a' or 'e' will always recieve the tone if they are present (never present together)
// - then, if 'ou' is present, the 'o' recieves the tone
// - otherwise, the last vowel recieves the tone
function pinyinNumberToAccent(pinyin) {
	if( typeof pinyin !== 'string' ) {
		throw 'Error: Pinyin must be of type String';
	}

	var tones = {
		'a': 'āáǎàa',
		'e': 'ēéěèe',
		'i': 'īíǐìi',
		'o': 'ōóǒòo',
		'u': 'ūúǔùu',
	}
	var toneNumber = Number(pinyin.slice(-1));
	var pinyinWithTone = pinyin.slice(0, -1);

	if( pinyin.indexOf('e') !== -1 || pinyin.indexOf('a') !== -1 ) {
		pinyinWithTone = pinyinWithTone.replace('e', tones['e'][toneNumber-1]);
		pinyinWithTone = pinyinWithTone.replace('a', tones['a'][toneNumber-1]);
	} else if ( pinyin.indexOf('ou') !== -1 ) {
		pinyinWithTone = pinyinWithTone.replace('o', tones['o'][toneNumber-1]);
	} else {
		var lastVowel = pinyinWithTone[pinyinWithTone.search(/[aeiou][^aeiou]*$/)];
		pinyinWithTone = pinyinWithTone.replace(lastVowel, tones[lastVowel][toneNumber-1]);
	}

	return pinyinWithTone;
}

module.exports = function(app) {

	app.get("/", function(req, res) {
		let character = '你';
		let d = hanzi.definitionLookup(character);

		let data = {
			'traditional': d[0].traditional,
			'simplified': d[0].simplified,
			'pinyinNumber': d[0].pinyin,
			'pinyinAccent': pinyinNumberToAccent(d[0].pinyin),
			'definition': d[0].definition
		}

		//d.pinyin = pinyinNumberToAccent(d.pinyin);

	    res.send(data);
	});

};