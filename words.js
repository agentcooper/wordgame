var words = [
'cow|holy,india,kill,grass,meat,farm,pig,milk,animal,horns,moo',

'door|open,close,handle,window,enter,exit',

'jetpack|fly,back,flame,sky,up,rocket,future',

'dinosaur|rex,prehistoric,big,old',

'carpet|russia,magic,alladin,flying,wall,floor',

'pillow|fight,sleep,head,lay,bed,night',

'iphone|android,apple,jobs,cook,ive,ios',

'amsterdam|city,drug,weed,netherlands,holland,mushrooms,europe,live',

'spy|secret,agent,bond,government,hat',

'veteran|hero,soldier,military,old,war,person,man,fight',

'irony|humor,joke,drama,term,sarcasm',

'compass|direction,navigation,ship,needle,magnet,round',

'democracy|people,vote,power,law,citizen,government,greek,society,rule',

'marriage|husband,wife,people,live,together,ceremony,ring',

'space|rocket,sound,star,black,sky,up,ship,gagarin,fly,sun,planet',

'guitar|sound,instrument,play,beatles,rock,string,music,paul',

'internet|www,arpa,connect,browser,web,site,porn,tim,next,apple,explorer,chrome,firefox,opera,mosaic',

'keyboard|press,key,any,type,symbol,character,laptop,computer,book,letter,hands',

'bikini|naked,bottom,woman,sex,swim,nude,beach,body,under,wear,beauty,sand,sea,bra,wax',

'hell|heaven,god,bad,devil,dante,circle,seven,hot,religion,go,to,place,exist',

'japan|asia,weird,anime,country,place,strange',

'sudoku|game,square,number,grid,pencil,paper,pen,sum,equal',

'integral|differential,character,lambda,calculus,math,symbol,process',

'anime|cartoon,japanese,japan,manga,bleach,naruto,hentai',

'startup|facebook,social,network,money,company,new,small',

'programming|language,code,javascript,c,ruby,python,hack,programmer',

'videogame|computer,playstation,xbox,console,play,game,tv,nintendo,tetris,pacman'
];

module.exports = words.map(function(line) {
	var parts = line.split('|');

	return {
		value: parts[0],
		stopwords: parts[1].split(',')
	}
})
