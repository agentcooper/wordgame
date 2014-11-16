var words = [
  'cow|milk,animal,horns,moo',
  'door|open,close,handle',
  'jetpack|fly,back,flame'
];

module.exports = words.map(function(line) {
	var parts = line.split('|');

	return {
		value: parts[0],
		stopwords: parts[1].split(',')
	}
})
