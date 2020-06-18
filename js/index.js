/******************* 사전지식 ********************/
/*
function a() {

}
function b() {
	return "B";
}
var fnA = a();
var fnB = b();
console.log(fnA, fnB);

var css = {"position": "absolute", "top": "50%", "transform": "translateY(-50%)", "font-size": "5rem", "z-index": 900, "color": "#fff"};
var $btLeft = $('<i class="bt-lt fa fa-angle-left"></i>').appendTo(".main-wrap").css(css);
var $btRight = $('<i class="bt-rt fa fa-angle-right"></i>').appendTo(".main-wrap").css(css);
$btLeft.css("left", "2rem");
$btRight.css("right", "2rem");
*/

/******************* 전역설정 ********************/
//Slide.scale(".main-wrap", ".banner", onComplete);
//Slide.scale(".main-wrap2", ".banner", onComplete);

//var slide = new Slide(".main-wrap", ".banner", "scale", onComplete);



/******************* 사용자 함수 ********************/
/* function onComplete(prevSlide, nextSlide, container) {
	$(prevSlide).find(".slogan").css({"opacity": 0, "transform": "scale(0.5)"});
	$(prevSlide).find(".writer").css({"opacity": 0, "transform": "translateY(5vw)"});
	$(nextSlide).find(".slogan").css({"opacity": 1, "transform": "scale(1)"});
	$(nextSlide).find(".writer").css({"opacity": 1, "transform": "translateY(0)"});
} */
/******************* 슬라이드 직접 코딩 ********************/
var mainNow = 0;
var mainSlide = $(".main-wrap > .banner");
var mainLast = mainSlide.length - 1;
var mainTitles = [
	"Coffee should be black as hell, <br>strong as death and sweet as love.",
	"What goes best with a cup of coffee? <br>Another cup!",
	"There's nothing sweeter <br>than a cup of bitter coffee."
];
var mainWriters = [
	"Turkish Proverb", "Henry Rollins", "Rian Aditia"
];
$(".main-wrap").find(".slogan").html(mainTitles[mainNow]);
$(".main-wrap").find(".writer > span").html(mainWriters[mainNow]);
mainInit();

function mainInit() {
	// 1. 화면의 모든 슬라이드(.banner)를 지운다.
	// 2. 현재 나타나야 되는 슬라이드(.banner.eq(mainNow))를 붙인다. 

	$(".main-wrap > .banner").remove();
	$(mainSlide[mainNow]).appendTo(".main-wrap");

}

function mainAni() {
	// 1. 바뀐 mainNow번째 그림을 scale(1.3), opacity: 0 인 상태로 화면에 붙일것
	// 2. 붙인 그림을 animation시킬것(css값 변경)
	// 3. 애니메이션이 완료되면 mainInit()을 실행하여 원상태로 만들것
	// 4. 글씨들이 사라지는 애니메이션이 된 후, 바로 다음 글씨내용으로 바꿔서 나타낸다. 
	var slide = $(mainSlide[mainNow]).appendTo(".main-wrap").css({
		"transform": "scale(1.3)",
		"opacity": 1
	});
	setTimeout(function () {
		slide.css({
			"transform": "scale(1)",
			"opacity": 1
		});
	}, 0);
	setTimeout(mainInit, 500);
	$(".main-wrap").find(".slogan").css({
		"transform": "scale(0.8)",
		"opacity": 0
	});
	$(".main-wrap").find(".writer").css({
		"transform": "translateY(50px)",
		"opacity": 0
	});
	setTimeout(function () {
		$(".main-wrap").find(".slogan").html(mainTitles[mainNow]);
		$(".main-wrap").find(".writer > span").html(mainWriters[mainNow]);
		$(".main-wrap").find(".slogan").css({
			"transform": "scale(1)",
			"opacity": 1
		});
		$(".main-wrap").find(".writer").css({
			"transform": "translateY(0)",
			"opacity": 1
		});
	}, 1000);
}

function onMainPrev() {
	mainNow = (mainNow == 0) ? mainLast : mainNow - 1;
	mainAni();
}

function onMainNext() {
	mainNow = (mainNow == mainLast) ? 0 : mainNow + 1;
	mainAni();
}
$(".main-wrap > .bt-prev").click(onMainPrev);
$(".main-wrap > .bt-next").click(onMainNext);


/******************* 슬라이드 직접코딩2 ********************/

var prdNow = 0;
var prdLast = 0;
var prds = [];
var prdArr = [];
var prdSize = 6; //보이는 갯수에 따라 수시로 변함
var prdWid = 0;
var prdLeft = 0;
var prdNext = 0;
$(".prd-wrapper > .bt-left").click(onPrdLeft);
$(".prd-wrapper > .bt-right").click(onPrdRight);

$.get("../json/prds.json", onPrdLoad);

function onPrdLoad(r) {
	prdLast = r.prds.length - 1;
	console.log(r.prds)
	var html = '';
	for (var i in r.prds) {
		html = '<li class="prd">';
		html += '<div class="prd-img"><img src="' + r.prds[i].src + '" class="img"></div>';
		html += '<div class="prd-title">' + r.prds[i].title + '</div>';
		html += '<div class="prd-price">' + r.prds[i].price + '</div>';
		html += '</li>';
		prds.push($(html));
	}
	prdInit();
}

function prdInit() {


	prdArr = [];
	prdArr[1] = prdNow;
	prdArr[0] = (prdNow == 0) ? prdLast : prdNow - 1;
	//순서에 맞는 배열 만들기
	for (var i = 2; i < prdSize; i++) {
		prdArr[i] = (prdArr[i - 1] == prdLast) ? 0 : prdArr[i - 1] + 1;
	}
	//배열에 데이터 넣기
	for (var i = 0; i < prdArr.length; i++) $(prds[prdArr[i]]).clone().appendTo(".prd-wrap");
}

function onPrdLeft() {
	prdWid = $(".prd-wrap > .prd").innerWidth();
	prdLeft = 0;
	prdNow = (prdNow == 0) ? prdLast : prdNow - 1;
	prdAni();
}

function onPrdRight() {
	prdWid = $(".prd-wrap > .prd").innerWidth();
	prdLeft = -prdWid * 2 + "px";
	prdNow = (prdNow == prdLast) ? 0 : prdNow + 1;
	prdAni();
}

function prdAni() {
	$(".prd-wrap").stop().animate({
		"left": prdLeft
	}, 500, function () {
		$(".prd-wrap").empty().css({
			"left": -prdWid + "px"
		});
		prdInit();
	});

}
/******************* location 동적 생성 ********************/
$.get("../json/locations.json", onLocationLoad);

function onLocationLoad(r) {
	var html = '';
	for (var i in r.locs) {
		html  = '<li class="store">';
		html += '<div class="photo"><img src="'+r.locs[i].src+'" class="img"></div>';
		html += '<p class="cont">'+r.locs[i].cont+'</p>';
		html += '<div class="addr">';
		html += '<i class="fa fa-map-marker-alt"></i>';
		html += '<span class="rc">Address: '+r.locs[i].addr+'</span>';
		html += '</div>';
		html += '<div class="time">';
		html += '<i class="fa fa-clock"></i>';
		html += '<span class="rc">Open: '+r.locs[i].time+'</span>';
		html += '</div>';
		html += '<div class="tel">';
		html += '<i class="fa fa-phone"></i>';
		html += '<span class="rc">Phone: '+r.locs[i].tel+'</span>';
		html += '</div>';
		html += '<button data-lat="'+r.locs[i].lat+'" data-lon="'+r.locs[i].lon+'" class="bt-map bt-yellow">See on Map</button>';
		html += '</li>';
		$(".store-wrap").append(html);
	}
	$(".store-wrap").find(".bt-map").click(onMapOpen);
	$(".modal-map").find(".bt-close").click(onMapClose);
	$(".modal-map").click(onMapClose);
	$(".modal-map .modal-wrap").click(onModalWrap);
	$(".modal-map").on("mousewheel", onModalWheel);
	$(".modal-map").on("DOMMouseScroll", onModalWheel);
}

function onModalWheel(e) {
	e.stopPropagation();
	e.preventDefault();
}

function onModalWrap(e) {
	e.stopPropagation();
}

function onMapOpen() {
	$(".modal-map").css({"display": "flex", "opacity": 0}).stop().animate({"opacity": 1}, 500);
	var lat = $(this).data("lat");
	var lon = $(this).data("lon");
	var container = document.getElementById('map');
	var options = {center: new kakao.maps.LatLng(lat, lon), level: 2};
	var map = new kakao.maps.Map(container, options);

var markerPosition  = new kakao.maps.LatLng(lat, lon); 
var marker = new kakao.maps.Marker({
    position: markerPosition
});
marker.setMap(map);
}

function onMapClose() {
	$(".modal-map").stop().animate({
		"opacity": 0
	}, 500, function () {
		$(this).css("display", "none");
	});
}


/******************* menu 동적 생성 ********************/
$.get("../json/menus.json", onMenuLoad);

function onMenuLoad(r) {
	var html = '';
	for (var i in r.menus) {
		html = '<li class="menu">';
		html += '<div class="menu-img"><img src="' + r.menus[i].src + '" class="img"></div>';
		html += '<h3 class="menu-title rc">' + r.menus[i].title + '</h3>';
		html += '<div class="menu-price rc">' + r.menus[i].price + '</div>';
		html += '</li>';
		$(".menus").append(html);
	}
}




/******************* 이벤트 함수 ********************/
function onResize() {
	this.wid = $(this).innerWidth();
	this.hei = $(this).innerHeight();
	if (wid > 992) {
		prdSize = 6;
		prdWid = '16.67%';
		prdNext = '-'
	} else if (wid > 767) {
		prdSize = 6;
		prdWid = '16.67%'
	} else if (wid > 479) {
		prdSize = 6;
		prdWid = '16.67%'
	} else if (wid >= 479) {
		prdSize = 6;
		prdWid = '16.67%'
	}

	/* 	prdWid = $(".prd-wrap > .prd").innerWidth();
		$(".prd-wrap").css("left",-prdWid+"px"); */
}

function onScroll() {
	//header의 위치
	this.scTop = $(this).scrollTop();
	if (scTop > hei) {
		$(".header").css({
			"top": 0,
			"bottom": "auto",
			"position": "fixed"
		});
	} else {
		$(".header").css({
			"top": "auto",
			"bottom": 0,
			"position": "absolute"
		});
	}
	// .loc-wrap의 background-position-y값 변화
	var locHei = $(".loc-wrap").innerHeight();
	var locStart = $(".loc-wrap").offset().top;
	var locEnd = locStart + locHei + hei;
	var locGap = 0;
	var speed = 400;
	//console.log(scTop + hei,locStart,locEnd);
	if (scTop + hei > locStart && scTop + hei < locEnd) {
		locGap = (speed / 2) - Math.round((scTop + hei - locStart) / (locEnd - locStart) * speed); //150 ~ -150
		$(".loc-wrap").css("background-position-y", locGap + "%");

	}
}
/******************* 이벤트 설정 ********************/
$(window).resize(onResize).trigger("resize");
$(window).scroll(onScroll).trigger("scroll");