

// Convert numbered pinyin format into tones
// The rules of where the tones are placed is as follows
// - 'a' or 'e' will always recieve the tone if they are present (never present together)
// - then, if 'ou' is present, the 'o' recieves the tone
// - otherwise, the last vowel recieves the tone
module.exports.pinyinNumberToAccent = function(pinyin) {
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