$(window).load( function () {
//window.alert($(window).scrollTop());
var bodyheight = $("body").css('height');

///preload images for letters




woffset = 1000;//$("#mainContainer").offset().top;

letters = 'ABCDEFGHIJKLMNOPQRSTUVWXYZ';
letters = letters.split('');
lheights = [20];
activei = 20;
scrolli = 0;
scrollrest = Date.now();
qtop = $("#qbits").offset().top;
var curtimeout;
var mtimeout;

atop = $(".bannerhome[bid=1]").offset().top;

mtop = $("#moores").offset().top;

etop = $("#endBox").offset().top;


moorestart = 500;
moorebuffer = 150;
//timeouts = [];

ashown = false;
audiopre = 200;
bannerbottom = 60;
bannerheight = 275;
chapendoff = 170;
titlepad = 10;
reseth = 500;
///scroll list

mousehasmoved = false;
scrollI = {
	't1,0,205,s' : {
		
		'start' : {
			'position':'fixed',
			'top':'20px'
			},
		'end' : {
			'position':'absolute',
			'bottom' : '20px',
			'top' : 'auto'
			}
		},
	'block1,185,1000,s' : {
		'pre' : {
			'position':'absolute',
			'bottom' : 'auto',
			'top' : '0px'
			},
		'start' : {
			'position':'fixed',
			'top':'-185px'
			},
		'end' : {
			'position':'absolute',
			'bottom' : 'auto',
			'top' : '815px'
			}
		},
	
	'block2,1810,3000,s' : {
		'pre' : {
			'position':'absolute',
			'bottom' : 'auto',
			'top' : '1625px'
			},
		'start' : {
			'position':'fixed',
			'top':'-185px'
			},
		'end' : {
			'position':'absolute',
			'bottom' : 'auto',
			'top' : '2815'
			}
		},
	't2,1625,1825,s' : {
		'pre' : {
			'position' : 'absolute',
			'top' : '20px',
			'bottom' : 'auto'
			},
		'start' : {
			'position':'fixed',
			'top':'20px'
			},
		'end' : {
			'position':'absolute',
			'bottom' : '20px',
			'top' : 'auto'
			}
		}
	
	}


collapse = function () {
	var r = Math.floor(Math.random() * 2);
	var id = this.getAttribute('qid');
	$(qbits[id].getElementById('question')).css('opacity',0);
	if(r == 1) {
		var show = qbits[id].getElementById('one');
		var hide = qbits[id].getElementById('zero');
		var rgb = {
			'fill':'rgb(0,0,255)'
			}
		} else {
		var show = qbits[id].getElementById('zero');
		var hide = qbits[id].getElementById('one');
		var rgb = {
			'fill':'rgb(255,0,0)'
			}
		
		}
	$(show).css('opacity',1);
	$(hide).css('opacity',0);
	$(qbits[id].getElementById('circle')).css(rgb);
	//setTimeout(scrollCheck,3000);
	}

window.qbits = new Array();
for(var j = 0; j <= 2; j++) {
	qbits.push($('[qid='+j+']')[0].getSVGDocument()); 
	var mask = qbits[j].getElementById('mask');
	$(mask).css('cursor','pointer');
	var qid = j;
	mask.setAttributeNS('null','qid',j);
	$(mask).click( collapse );
	}
$(".cbit").click( function () {
	var val = $(this).attr("val");
	if(val == 0) {
		$(this).css('background-color',"blue");
		$(this).find('img[val=1]').show();
		$(this).find('img[val=0]').hide();
		$(this).attr('val',1);
		} else {
		$(this).css('background-color',"red");
		$(this).find('img[val=0]').show();
		$(this).find('img[val=1]').hide();
		$(this).attr('val',0);
		}
	});

////setup moore diagram
/*
var mproc = [];


chart = $("#moore")[0].getSVGDocument();

for(var i = 1; i <= 29; i++) {
	var el = chart.getElementById('i' + i);
	mproc.push(el);
	}
*/

bodyheight = parseInt(bodyheight.replace('px',''));

$.get('testpath.svg', function (svg) {
	curve = svg.getElementById('pathCurve');
	
	});

/*

$(".animHead").each( function () {
	var fheight = $(this).attr('fheight');
	$(this).css('height',fheight+"px");
	var dir = "fonts/"+fheight;
	var text = $(this).attr('htext');
	var chars = text.split('');
	var left=0;
	
	for(var i in chars) {
		var c = chars[i];
		
		if(c != ' ') {
			var img = new Image();
			img.src = dir + "/" + chars[i] + ".png";
			$(img).css({
				'left' : left+"px",
				'position' : 'absolute'
				});
			
			$(this).append(img);
			var leftadd = parseInt($(img).css('width').replace('px','')) - (fheight/15);
		} else {
			var leftadd=fheight/3;
		}
		left += leftadd;
		}
	});

*/

scrollCheck = function () {
	var sl = $("body").scrollTop();	
	if(!ashown) {
		if((sl > atop - 500)) {
			$("#mainContainer").animate({'opacity':1},1000);
			ashown=true;
			}
		}
	
	if(sl > etop - 300) {
		$("#endBox").animate({'opacity':1},1000);
		}
	
	//$("#scrollTop").html(sl);
	for(var i in banners) {
		var title = banners[i].find(".animHead");
		var htop = parseInt(banners[i].attr('hometop')); 
		var chapend = parseInt(banners[i].attr('chapend'));
		if((htop + bannerheight - bannerbottom) < sl) {
			banners[i].css({
				'position' : 'fixed',
				'top' : '-' + (bannerheight - bannerbottom)
				});
			} else if( (htop + bannerheight - bannerbottom) > sl ) {
				banners[i].css({
				'position' : 'absolute',
				'top' : htop
				});
			
			}
		if((chapend - chapendoff) < sl) {
			banners[i].css({
				'position' : 'absolute',
				'top' : chapend - (bannerheight - bannerbottom) - chapendoff
				});
			}
		if(htop < sl && (htop + bannerheight - bannerbottom) > sl) {
			title.css({
				"position" : "fixed",
				"top" : titlepad
				});
			} else if((htop + bannerheight - bannerbottom) < sl) {
				title.css({
				"position" : "absolute",
				"top" : bannerheight - bannerbottom + titlepad
				});
			} else if ( htop > sl ) {
				title.css({
				"position" : "absolute",
				"top" : titlepad
				
				});
				}
			//$("#scrollTop").html(title.css('bottom'));
		/*
		if(!atriggered[i]) {
			if((sl < htop) && sl > (htop - audiopre)) {
			
				for(var j in audios) {
					audios[j].stop();
					}			
				audios[i].play();
				atriggered[i] = true;
				$(banners[i]).find(".headquoteBox").animate(
					{'opacity':1},
					1000
					);
				//$(banners[i]).animate({'opacity' : '1'},500);
				
				}
			}
		*/
		}
	
	if(sl < reseth) {
		for(var i in atriggered) {
			atriggered[i] = false;
			}
		}
	
	
	if(Math.abs(qtop - sl) < 800) {
		qbitShift(sl);
		}
	
	sideInfoSel(sl);
	
	if((mtop - moorestart) < sl && (mtop - moorebuffer) > sl) {
		mooreGrow(sl);
		}
	}
cmp = function(a,b) {
	//return (a[1] > b[1]);
	return a.val - b.val;
	}
sideInfoSel = function (sl) {
	var selTop = sl + 250;
	var tp = [];
	for( var i in sLinkTop ) {
		var t = {
			'key' : i,
			'val' : Math.abs(selTop - scrollSide[i] - woffset)
			}
		
		tp.push(t);
		
		}
	
	tp.sort(cmp);
	var closest = tp[0].key;
	
	
	if(scrolli != closest && tp[0].val <= 70) {
		
		scrolli = closest;
		sLinkMouseover.call(tLinks[closest]);
		
		}
	//$("#scrollTop").html(5);
	/*
	if(scrolli == closest) {
		if((Date.now() - scrollrest) > 200) { 
			sLinkMouseover.call(tLinks[closest]);
			}
	} else {
		scrollrest = Date.now();
	}
	scrolli = closest;
	*/
	}


mooreGrow = function (sl) {
	var s = (sl - (mtop - moorestart))/((mtop - moorebuffer) - (mtop - moorestart));
	var w = s*301;
	$("#mooresLine").css("width",w);
	//$("#scrollTop").html(s);
	//	for( var i = 0; i < 29; i++) {
		
	//	}
	}
qbitShift = function (sl) {
	for(i in qbits) {
		
		var cir = qbits[i].getElementById('circle');
		var zero = qbits[i].getElementById('zero');
		var one = qbits[i].getElementById('one');
		var quest = qbits[i].getElementById('question');
		$(one).css('opacity',0);
		$(zero).css('opacity',0);
		$(quest).css('opacity',1);
		var blue = Math.floor(Math.sin((sl/30) + i*20)*128) + 128;
		var red = 256 - blue;
		//$("#scrollTop").html(Math.abs(qtop - sl));
		
		$(cir).css('fill',
			'rgb('+red+',0,'+blue+')'
			);
		
		}
	}


schrocatGame = function () {
	var gid=$(this).attr('gid');
	if(gid == 'start') {
		var r = Math.floor(Math.random() * 2);
		if(r == 1) {
			var ad = "dead";
		} else {
			var ad = "alive";
		}
		
		} else {
			var ad = 'start';
		}
	$(this).attr("gid",ad);
	$(this).css(
		{'background-image' : 'url(images/sc_'+ad+'_sm.png)'}
		);
	}

$("#schrocat_inner").click(schrocatGame);

sbarId = [
	'nyorker',
	'nytimes',
	'google',
	'mcgeoch',
	'dailymail',
	'soduku',
	'environment',
	'bitcoin',
	'uncertainty',
	'schrodinger',
	'shor',
	'rsa',
	'preskill',
	'preskill2',
	'ion',
	//'optimizer',
	'anealing',
	'barnatt',
	'tweet',
	'love',
	'pqencryption',
	'threat',
	'dwavemachine',
	'google2009',
	'aaronson',
	'nature',
	'qinternet',
	'losalamos',
	'coldfusion',

	]
sbarType = [
	'READ',
	'READ',
	'READ',
	'READ',
	'READ',
	'READ',
	'READ',
	'WATCH',
	'INVESTIGATE',
	'INVESTIGATE',
	'INVESTIGATE',
	"INVESTIGATE",
	"WATCH",
	"READ",
	"INVESTIGATE",
	//"READ",
	"INVESTIGATE",
	"WATCH",
	"RESPOND",
	"READ",
	"INVESTIGATE",
	"READ",
	"READ",
	"READ",
	"READ",
	"READ",
	"READ",
	"READ",
	"INVESTIGATE"

	]
sbarDesc = [
	"The New Yorker&rsquo;s article on Google&rsquo;s purchase of a quantum computer prototype",
	"NYT&rsquo;s take on Lockheed Martin&rsquo;s quantum computer",
	"Google's own announcement on it's purchase of D-Wave's quantum computer",
	"Catherine McGeoch's study on classical vs. quantum computing",
	"Daily Mail's claims for Google's quantum computer",
	"D-Wave's computer solves sodoku",
	"the environmental impact of large data centers",
	"Check out our Bitcoin Explainer",
	"Heisenberg's Uncertainty Principle",
	"Schroedinger's Cat",
	"Shor's algorithm",
	"RSA Encryption Algorithm",
"John Preskill's quantum computing lecture at Cal-Tech",
"John Preskill's explanation of quantum computing and entanglement",
"Trapped Ion Quantum Computing",
//"D-Wave's quantum optimizer",
"Quantum Annealing",
"Christopher Barnatt's summary of quantum computing",
"Join the Discussion",
"The future of Bitcoin and quantum computing",
"The field of post-quantum encryption",
"The threat of cyber warfare",
"D-wave machine vs. Classical computer",
"Google's research into quantum computing",
"MIT professor Scott Aaronson's musings on the future of quantum computing",
"Nature's overview of quantum biology",
"single-photon quantum memory, a preliminary step towards quantum internet",
"The Los Alamos lab that has been operating quantum internet for over two years",
"Cold Fusion"

	
	]
sbarLinks = [
"http://www.newyorker.com/online/blogs/elements/2013/05/a-quantum-leap-in-computing.html",
"http://www.nytimes.com/2013/03/22/technology/testing-a-new-class-of-speedy-computer.html?pagewanted=all&_r=1&",
"http://googleresearch.blogspot.com/2013/05/launching-quantum-artificial.html",
"http://dl.acm.org/citation.cfm?id=2482797",
"http://www.dailymail.co.uk/sciencetech/article-2325371/Google-Nasa-unveil-superfast-quantum-cure-diseases-stop-global-warming-learn-drive-car.html?ns_mchannel=rss&ns_campaign=1490",
"http://www.scientificamerican.com/article.cfm?id=first-commercial-quantum-computer",
"http://www.wired.com/wiredenterprise/2012/09/the-big-data-digital-divide/",
"http://pandodaily.com/2013/04/05/what-is-bitcoin-super-mario-bros-explains-it-all-in-a-one-minute-video/",
"http://en.wikipedia.org/wiki/Uncertainty_Principle",
"http://en.wikipedia.org/wiki/Schr%C3%B6dinger%27s_cat",
"http://en.wikipedia.org/wiki/Shor%27s_algorithm",
"http://en.wikipedia.org/wiki/RSA_%28algorithm%29",
"http://www.youtube.com/watch?feature=player_embedded&v=wCyIUNPVR8Y",
"http://www.caltech.edu/content/quantum-entanglement-and-quantum-computing",
"http://en.wikipedia.org/wiki/Trapped_ion_quantum_computer",
//"http://arstechnica.com/science/2013/05/d-waves-quantum-optimizer-pitted-against-traditional-computers/",
"http://en.wikipedia.org/wiki/Quantum_annealing",
"http://www.youtube.com/watch?v=sICXOwOwS4E",
"https://twitter.com/cdixon/status/321452013617549312",
"http://www.businessinsider.com/quantum-computers-and-bitcoin-2013-4",
"http://en.wikipedia.org/wiki/Post-quantum_cryptography",
"http://online.wsj.com/article/SB10001424127887324345804578424741315433114.html",
"http://www.newscientist.com/article/dn23519-commercial-quantum-computer-leaves-pc-in-the-dust.html",
"http://googleresearch.blogspot.com/2009/12/machine-learning-with-quantum.html",
"http://www.nytimes.com/2011/12/06/science/scott-aaronson-quantum-computing-promises-new-insights.html?pagewanted=all",
"http://www.nature.com/news/2011/110615/full/474272a.html",
"http://www.extremetech.com/extreme/155835-chinese-physicists-create-first-single-photon-quantum-memory-leading-to-quantum-internet",
"http://www.technologyreview.com/view/514581/government-lab-reveals-quantum-internet-operated-continuously-for-over-two-years/",
"http://en.wikipedia.org/wiki/Cold_fusion"
]

barOffsets = [
-70,//0
-30,//1
0,//2
40,//3
30,//4
-60,//5
0,//6
100,//7
-50,//8
50,//9
0,//10
0,//11
100,//12
0,//13
0,//14
//100,//15
150,//16
0,//17
0,//18
100,//19
150,//20
200,//21
0,//22
-150,//23
-150,//24
0,//25
100,//26
200,//27
-100];

sLinkTop = [];

sLinkMouseover = function () {
			var sc = $.makeArray($('.sideContentBox'));
			var si = $(this).attr('si');
			var noldai = activei; 
			var nactivei = si; 
			/*for(var i in sc) {
				$(sc[i]).animate({
					left:"-200"
					}, 300,function () {});
				} 
			*/
			$('#sideselector').animate({
						'top' : (sLinkTop[nactivei] + woffset)
						},200,function () {});
			if(noldai != nactivei) {
					clearTimeout(curtimeout);
					curtimeout = setTimeout(function () {
					oldai = activei ;
					activei = si;
					var oldel = $('.sideContentBox[si='+oldai+']');
					var el = $('.sideContentBox[si='+si+']');
					var nlink = $('.barlink[si='+si+']');
					var olink = $('.barlink[si='+oldai+']');
					
					nlink.animate({
						'background-color':"rgba(0,0,255,0.35)"
						},100);
					olink.animate({
						'background-color':"rgba(0,0,255,0.12)"
						},100);
					
					$(oldel).animate({
						left:'-200'
						},200,function () {
							$(el).animate({
							left:"0"
							}, 200,function () {});
							});
					},200);
				
				} 
			}

activateSide = function () {
	};


$(document).mousemove( function () {
	mousehasmoved=true;
	});

tLinks = [];

alignBarContent = function () {
	var sLinks = $.makeArray($(".barlink"));
	for(var i in sLinks) {
		var top = $(sLinks[i]).offset().top - woffset;
		var id = $(sLinks[i]).attr("sLink")
		var link = sbarLinks[i];
		$(sLinks[i]).attr('si',i);
		$(sLinks[i]).click(function () {
			var link = sbarLinks[$(this).attr('si')];
			window.open(link);
			});
		$(sLinks[i]).hover( function () {
			$(this).data("hovered", true);
			}, function () {
			$(this).data("hovered", false);	
				});
		
		$(sLinks[i]).mouseover( function () {
			var a = this;
			setTimeout(function () {
				if($(a).data('hovered')) {
					sLinkMouseover.call(a);
					}
				},100);
			});
		
		
		var cont = $("#sidebarClone").clone();
		cont.css("top",top);
		cont.find('.sideContentType').html(sbarType[i]);
		cont.find('.sideContentDesc').html(sbarDesc[i]);
		cont.css('background-image',"url('images/sidebar/" + id + ".jpg')");
		
		cont.attr('si',i);
		cont.click(function () {
			
			var link = sbarLinks[$(this).attr('si')];
			window.open(link);
			
			});
		
		
		
		var sn = $("#sidenoteClone").clone();
		
		sn.css("top",top);
		$("#sidebarinner").append(sn);
		$("#sidebarinner").append(cont);
		sLinkTop.push(top);
		tLinks.push(sLinks[i]);
		}
	//window.alert(sLinkTop);
	
	spaceSidebar();
	
	}
banners = [];
scrollSide = Array(sLinkTop.length);
spaceSidebar = function () {
	/*
	for(var i in sLinkTop) {
		var t = sLinkTop[i];
		var up = 0;
		var down = 0;
		for(var j = 0; j < i; j++) {
			down += (1/(Math.abs(t - sLinkTop[j]) + 1)) * 2000;
			}
		for(var j = i + 1; j < sLinkTop.length; j++) {
			up += (1/(Math.abs(t - sLinkTop[j]) + 1)) * 2000;
			}
		barOffsets[i] = ( t + down - up);
		}
		*/
	for(var i in sLinkTop) {
		scrollSide[i] = barOffsets[i] + sLinkTop[i];
		/*
		var el = $("#testnoteClone").clone();
		el.css('top',scrollSide[i]);
		el.html(i);
		$("#midbar").append(el);
		*/
		}
	}


alignBanners = function () {
	var bans = $.makeArray($(".banner"));
	for(var i in bans) {
		var bid = $(bans[i]).attr('bid');
		var home = $('.bannerhome[bid='+bid+']');
		var top = home.offset().top;
		var chapend = $('.chapend[bid='+bid+']').offset().top;
		
		$(bans[i]).css('top',top);
		$(bans[i]).attr('hometop',top);
		$(bans[i]).attr('chapend',chapend);
		$(bans[i]).css('opacity',1);
		
		banners.push($(bans[i]));
		}
	//$("#mainContainer").animate({'opacity':1},1000);
	window.scrollTo(0,0);
	//$("#sideselector").css('top',$(".bannerhome[bid=0]").offset().top);
	$("#intro").css("position","absolute");
	$("#scrolldown").animate({'opacity':1},1000);
	}



/*
$(window).scroll( function () {
	var sl = $("body").scrollTop();
	var stot = sl/200;
	var cl = curve.getTotalLength();
	var obj = $("#persistent");
	var plen = 1 - ((cl * stot) * - 1);
	var point = curve.getPointAtLength( plen );
	 
	
	
	obj.html(stot); 
	obj.css({
		'top' : point.y + 'px',
		'left' : point.x + 'px'
		});
	
	});
*/

///////////////////////////////////////AUDIO
/*

aextension = '.ogg';
audio_dir = 'audio/';
amimetype = "audio/ogg";
atriggered = [];
amute = false;
avolume = .7;

audioNames = [ 
"Prologue",
"The_Quantum_Frontier",
"Challenges",
"Hydrogen",
"The_Future"
];
alen = audioNames.length;

audios = [];



getAudioType = function () {
	var canplay = [];
	var types = ["audio/ogg","audio/mpeg","audio/wav"];
	var extensions = [".ogg",".mp3",".wav"];
	var a = document.createElement('audio');
	for ( i in types) {
		if(a.canPlayType && a.canPlayType(types[i]).replace(/no/, '')) {
			aextension = extensions[i];
			amimetype = types[i];
			
			break;
			}
		}
	Log(amimetype);
	}



function audio(ai) {
	
	//create media and source
	this.ai = ai;
	this.media = document.createElement('audio');
	this.src = document.createElement('source');
	this.loc = audio_dir + audioNames[ai] + aextension;
	
	$(this.src).attr('src', this.loc);
	$(this.src).attr('type', amimetype);
	$(this.media).append(this.src);
	this.media.preload = "auto";
	this.media.volume = avolume;
	this.media.addEventListener("ended",function() {
      		aplaying = false;
      		});
	
	
	this.play = function () {
		this.media.play();
		aplaying = true;
		//pulseMute();
		}
	this.stop = function () {
		this.media.pause();
		this.media.currentTime = 0;
		aplaying = false;
		}
	}
	

getAudioType = function () {
	var canplay = [];
	var types = ["audio/ogg","audio/mpeg","audio/wav"];
	var extensions = [".ogg",".mp3",".wav"];
	var a = document.createElement('audio');
	for ( i in types) {
		if(a.canPlayType && a.canPlayType(types[i]).replace(/no/, '')) {
			aextension = extensions[i];
			amimetype = types[i];
			break;
			}
		}
	
	}

createAudio = function () {
	for( var i = 0; i <= 4; i++) {
		var Audio = new audio(i);
		audios.push(Audio);
		
		$("#audioDummy").append(Audio.media)
		try {
		//window.alert(audios[i].media);
		
		} catch(err) {window.alert(err)}
		atriggered.push(false);
		}
}

toggleMute = function () {
	if(amute) {
		amute = false;
		$(this).css("background-image",'url(images/Speaker_Icon.png)');
		for(var i in audios) {
			audios[i].media.volume = avolume;
			} 
	} else {
		amute = true;
		$(this).css("background-image",'url(images/Mute_Icon.png)');
		for(var i in audios) {
			audios[i].media.volume = 0;
			} 

		}
	
	}



$("#mutebutton").click(toggleMute);


pulseMute = function () {
	var m = $("#mutebutton");
	if(aplaying) {
		
		var o = (m.css('opacity') > 0 ? 0 : 1);
		
		
		m.animate(
			{'opacity':o},
			600);
		clearTimeout(mtimeout);
		mtimeout = setTimeout(pulseMute, 600);
		
		} else {
		m.animate(
			{'opacity':1},
			400, pulseMute
			);
		
		}
	}
	


getAudioType();
createAudio();

*/


$(window).scroll(scrollCheck);
alignBarContent();
alignBanners();
scrollCheck();
});

