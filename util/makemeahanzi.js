let readLines = require('n-readlines');

/*
EXAMPLE ENTRY : {
	"character":"㕡",
	"definition":"gully, pool; a ditch carved by a torrential rain",
	"pinyin":["hé"],
	"decomposition":"⿰⿱？谷又",
	"etymology":{
		"type":"ideographic",
		"hint":"Water flowing through a gorge 谷"
	},
	"radical":"谷",
	"matches":[null,null,null,null,null,[0,1],[0,1],[0,1],[0,1],[0,1],[0,1],[0,1],[1],[1]]
}
*/
module.exports.dictionary = (function() {
	let out = {};
	let line, lineIterator = new readLines('./data/makemeahanzi/dictionary.txt');

	while (line = lineIterator.next()) {
		let entry = JSON.parse(line);

		out[entry.character] = entry;
	}

	return out;
})();

/*
EXAMPLE ENTRY: {
	"character":"乇",
	"strokes": ["M 412 631 Q 487 662 544 695 Q 593 717 635 728 Q 654 729 658 739 Q 661 751 647 763 Q 623 779 574 796 Q 556 803 542 801 Q 533 797 534 784 Q 534 745 338 635 Q 287 607 224 577 Q 220 567 226 564 Q 247 564 372 615 L 412 631 Z","M 459 399 Q 460 400 465 400 Q 679 433 786 433 Q 849 433 854 440 Q 861 455 847 466 Q 814 493 768 510 Q 752 514 726 505 Q 662 486 597 472 Q 513 459 463 448 L 409 438 Q 310 422 258 411 Q 194 396 98 389 Q 83 388 83 376 Q 83 363 104 349 Q 122 339 155 328 Q 167 324 185 334 Q 200 341 268 356 Q 331 375 409 390 L 459 399 Z","M 938 87 Q 911 144 892 245 Q 888 261 881 268 Q 872 275 869 258 Q 862 200 851 153 Q 847 122 822 102 Q 782 63 598 65 Q 528 72 501 86 Q 479 101 465 129 Q 447 171 459 399 L 463 448 Q 467 524 478 560 Q 487 582 456 605 Q 432 621 412 631 C 386 646 359 642 372 615 Q 403 552 405 547 Q 408 511 409 438 L 409 390 Q 402 140 420 102 Q 427 84 442 68 Q 503 -1 734 8 Q 837 12 915 46 Q 952 59 938 87 Z"],
	"medians": [[[645,744],[569,752],[439,667],[333,613],[228,571]],[[96,376],[163,361],[403,414],[754,472],[846,448]],[[383,606],[410,600],[439,565],[430,328],[434,155],[451,99],[483,67],[551,44],[636,36],[772,44],[816,54],[855,71],[880,89],[882,99],[878,259]]]
}
*/
module.exports.graphics = (function() {
	let out = {};
	let line, lineIterator = new readLines('./data/makemeahanzi/graphics.txt');

	while (line = lineIterator.next()) {
		let entry = JSON.parse(line);

		out[entry.character] = entry;
	}

	return out;
})();

