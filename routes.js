let fs = require('fs');

let hanzi = require('hanzi');
let { pinyinNumberToAccent } = require('./util/util.js');

let { dictionary, graphics } = require('./util/makemeahanzi.js');

hanzi.start();

//let mmah_dictionary = JSON.parse(fs.read('./data/makemeahanzi/dictionary.txt'));
//let mmah_graphics = JSON.parse(fs.read('./data/makemeahanzi/dictionary.txt'));

// ⿱⿳⿻⿰⿲⿺⿸⿹⿴⿵⿶⿷

function getDecomposition(char) {
	let decomposition = dictionary[char].decomposition.split('');

	let nested = [];

	let ideographicDescriptionCharacters = {
		"⿱": 2,
		"⿳": 3,
		"⿻": 2,
		"⿰": 2,
		"⿲": 3,
		"⿺": 2,
		"⿸": 2,
		"⿹": 2,
		"⿴": 2,
		"⿵": 2,
		"⿶": 2,
		"⿷": 2,
	}

	let componentIndex = 0;
	let queue = [[1, nested]];
	for (let i = 0; i < decomposition.length; i++) {
		let char = decomposition[i];

		let obj = queue[0][1];

		queue[0][0] -= 1;
		
		if(queue[0][0] === 0) {
			queue.shift();
		}


		if (Object.keys(ideographicDescriptionCharacters).indexOf(char) !== -1) {
			let newObj = [];
			obj.push([char, newObj]);

			let maxSlots = ideographicDescriptionCharacters[char];
			queue.unshift([maxSlots, newObj])
		} else {
			obj.push(componentIndex);
			componentIndex++;
		}

	}
	console.log(JSON.stringify(nested));
	
	let components = decomposition.filter(x=>"⿱⿳⿻⿰⿲⿺⿸⿹⿴⿵⿶⿷".split('').indexOf(x)===-1);

	/*let groups = [];
	components.forEach(function(component, componentIndex) {
		let numberOfStrokes = graphics[component].strokes.length;

		for(let i = 0; i < numberOfStrokes; i++) {
			groups.push(componentIndex);
		}
	});*/
	let matches = dictionary[char].matches;

	let groups = [];
	for (let i = 0; i < matches.length; i++) {
		let indexes = matches[i];

		let pos;
		if (nested[0].constructor === Array) {
			pos = nested[0][1];
		} else {
			pos = nested;
		}

		indexes.forEach(function(index) {
			pos = pos[index];
			if (pos.constructor === Array) {
				pos = pos[1];
			}
		});

		groups.push(pos);
	}


	return {
		'components': components,
		'groups': groups,
		'radical': dictionary[char].radical,
	}
}


module.exports = function(app) {

	app.get("/", function(req, res) {
		let character = req.query.word;
		let d = hanzi.definitionLookup(character);

		let decompositionSimplified = getDecomposition(d[0].simplified);
		let decompositionTraditional = getDecomposition(d[0].traditional);

		let data = {
			'traditional': {
				'character': d[0].traditional,
				'strokes': graphics[d[0].traditional].strokes,
				'medians': graphics[d[0].traditional].medians,

				'components': decompositionTraditional.components,
				'groups': decompositionTraditional.groups,
				'radical': decompositionTraditional.radical,
			},
			'simplified': {
				'character': d[0].simplified,
				'strokes': graphics[d[0].simplified].strokes,
				'medians': graphics[d[0].simplified].medians,
				
				'components': decompositionSimplified.components,
				'groups': decompositionSimplified.groups,
				'radical': decompositionSimplified.radical,
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