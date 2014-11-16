var words = [
'cow|milk,animal,horns,moo',

'door|open,close,handle',

'jetpack|fly,back,flame,sky',

'dinosaur|rex,prehistoric,big,old',

'carpet|russia,magic,alladin,flying,wall,floor',

'pillow|fight,sleep,head,lay,bed,night',

'iphone|android,apple,jobs,cook,ive,ios',

'amsterdam|city,drug,weed,netherlands,holland,mushrooms,europe',

'spy|secret,agent,bond,government,hat',

'veteran|old,war,person,man,fight',

'irony|humor,joke,drama,term',

'compass|navigation,ship,needle,magnet,round',

'democracy|people,vote,power,law,citizen,government,greek,society,rule',

'marriage|husband,wife,people,live,together,ceremony,ring',

'space|rocket,sound,star,black,sky,up,ship,gagarin,fly,sun,planet',

'guitar|sound,instrument,play,beatles,rock,string,music,paul',

'internet|www,arpa,connect,browser,web,site,porn,tim,next,apple,explorer,chrome,firefox,opera,mosaic',

'keyboard|press,key,any,type,symbol,character,laptop,computer,book,letter,hands',

'bikini|bottom,woman,sex,swim,nude,beach,body,under,wear,beauty,sand,sea,bra,wax',

'hell|god,bad,devil,dante,circle,seven,hot,religion,go,to,place,exist',

'japan|weird,anime,country,place',

'sudoku|game,square,number,grid,pencil,paper,pen,sum,equal',

'integral|character,lambda,calculus,math,symbol,process',

'anime|cartoon,japanese,japan,manga,bleach,naruto,hentai',

'startup|facebook,social,network,money',

'dota|video,game,videogame,cybersport,international',

'juice|fruit,water,drink,squeeze',

'metal|death,music,guitar,metallica,rock,metalhead',

'life|alive,death,body,birth',

'orange|fruit,vitamin',

'programming|code,javascript,c,ruby,python,hack,programmer',

'videogame|computer,playstation,xbox,console,play,game,tv'
];

module.exports = words.map(function(line) {
	var parts = line.split('|');

	return {
		value: parts[0],
		stopwords: parts[1].split(',')
	}
})
