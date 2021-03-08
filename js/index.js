
/******************* 슬라이드 코딩 ********************/
var mainNow = 0;
var mainSlide = $(".main-wrap > .banner");
var mainLast = mainSlide.length - 1;
var mainPromoTitles = [
	"스타벅스에서 꿈처럼 <br>달콤한 봄의 맛을 즐겨보세요",
	"COSTRARICA NARAMJO <br>코스타리카 나랑호",
	"회원 계정에 등록된 스타벅스 카드로 결제시, <br>1만원당 별 1개 즉시 추가 적립"
];
var mainPromoPeriod = [
	"기간: 2021년 2월 16일 ~2021년 3월 15일", "기간: 2021년 2월 23일 ~2021년 4월 5일", "기간: 2021년 1월 1일 ~2021년 12월 31일"
];
$(".main-wrap").find(".slogan").html(mainPromoTitles[mainNow]);
$(".main-wrap").find(".writer > span").html(mainPromoPeriod[mainNow]);
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
		$(".main-wrap").find(".slogan").html(mainPromoTitles[mainNow]);
		$(".main-wrap").find(".writer > span").html(mainPromoPeriod[mainNow]);
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
var prdNow = 0,
	prdSize = 6,
	prdLast, prdLeft, prdTar;
var prds = [],
	prdArr = [];
$(".prd-wrapper > .bt-left").click(onPrdLeft);
$(".prd-wrapper > .bt-right").click(onPrdRight);

$.get("../json/prds.json", onPrdLoad);

function onPrdLoad(r) {
	prdLast = r.prds.length - 1;
	var html = '';
	for (var i in r.prds) {
		html = '<li class="prd">';
		html += '	<div class="prd-img"><img src="' + r.prds[i].src + '" class="img"></div>';
		html += '	<div class="prd-title">' + r.prds[i].title + '</div>';
		html += '	<div class="prd-price">' + r.prds[i].titleEng + '</div>';
		html += '</li>';
		prds.push($(html));
	}
	prdInit();
}

function prdInit() {
	prdArr = [];
	prdArr[1] = prdNow;
	prdArr[0] = (prdNow == 0) ? prdLast : prdNow - 1;
	for (var i = 2; i < prdSize; i++) prdArr[i] = (prdArr[i - 1] == prdLast) ? 0 : prdArr[i - 1] + 1;
	for (var i = 0; i < prdArr.length; i++) $(prds[prdArr[i]]).clone().appendTo(".prd-wrap");
}

function onPrdLeft() {
	prdTar = 0;
	prdNow = (prdNow == 0) ? prdLast : prdNow - 1;
	prdAni();
}

function onPrdRight() {
	prdTar = prdLeft * 2 + "%";
	prdNow = (prdNow == prdLast) ? 0 : prdNow + 1;
	prdAni();
}

function prdAni() {
	$(".prd-wrap").stop().animate({
		"left": prdTar
	}, 500, function () {
		$(this).empty().css({
			"left": prdLeft + "%"
		});
		prdInit();
	});
}

/******************* location 동적 생성 ********************/
$.get("../json/locations.json", onLocationLoad);

function onLocationLoad(r) {
	var html = '';
	for (var i in r.locs) {
		html = '<li class="store">';
		html += '<p class="store-name">' + r.locs[i].store + '</p>';
		html += '<div class="photo"><img src="' + r.locs[i].src + '" class="img"></div>';
		html += '<p class="cont">' + r.locs[i].cont + '</p>';
		html += '<div class="addr">';
		html += '<i class="fa fa-map-marker-alt"></i>';
		html += '<span class="rc">Address: ' + r.locs[i].addr + '</span>';
		html += '</div>';
		html += '<div class="time">';
		html += '<i class="fa fa-clock"></i>';
		html += '<span class="rc">Open: ' + r.locs[i].time + '</span>';
		html += '</div>';
		html += '<div class="tel">';
		html += '<i class="fa fa-phone"></i>';
		html += '<span class="rc">Phone: ' + r.locs[i].tel + '</span>';
		html += '</div>';
		html += '<button data-lat="' + r.locs[i].lat + '" data-lon="' + r.locs[i].lon + '" class="bt-map bt-yellow">See on Map</button>';
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
	$(".modal-map").css({
		"display": "flex",
		"opacity": 0
	}).stop().animate({
		"opacity": 1
	}, 500);
	var lat = $(this).data("lat");
	var lon = $(this).data("lon");
	var container = document.getElementById('map');
	var options = {
		center: new kakao.maps.LatLng(lat, lon),
		level: 2
	};
	var map = new kakao.maps.Map(container, options);

	var markerPosition = new kakao.maps.LatLng(lat, lon);
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


/******************* menu 동적 생성  ********************/


function onMenuLoad(r) {
	var html = '';
	for (var i in r.menus) {
		html = '<li class="menu">';
		html += '<div class="menu-img"><img src="' + r.menus[i].src + '" class="img"></div>';
		html += '<h3 class="menu-title rc">' + r.menus[i].title + '</h3>';
	//	html += '<div class="menu-price rc">' + r.menus[i].price + '</div>';
		html += '</li>';
		$(".menus").append(html);
	}
}



/******************* news 동적생성 & 슬라이드********************/

var newsNow = 0,
	newsSize = 5,
	newsLast, newsLeft, newsTar;
var newss = [],
	newsArr = [];
$(".news-wrapper > .bt-left").click(onNewsLeft);
$(".news-wrapper > .bt-right").click(onNewsRight);

$.get("../json/news.json", onnewsLoad);

function onnewsLoad(r) {
	newsLast = r.news.length - 1;
	var html = '';
	for (var i in r.news) {
		html = '<li class="news">';
		html += '<div class="news-img">';
		html += '<img src="' + r.news[i].src + '" class="img">';
		html += '<div class="badge-tag">';
		for (var j in r.news[i].badge) {
			html += '<div class="badge">' + r.news[i].badge[j] + '</div>';
		}
		html += '</div>';
		html += '<div class="badge-date">';
		html += '<div class="month">' + moment(r.news[i].date).format('MMM') + '</div>';
		html += '<div class="day">' + moment(r.news[i].date).format('DD') + '</div>';
		html += '</div>';
		html += '</div>';
		html += '<div class="news-title">' + r.news[i].title + '</div>';
		html += '<div class="news-tag">';
		for (var j in r.news[i].tag) {
			html += '<span class="tag">' + r.news[i].tag[j] + '</span>';
		}
		html += '</div>';
		html += '<div class="news-cont">' + r.news[i].cont + '</div>';
		html += '<button class="bt-ghost bt-more">Read more <span>▶</span></button>';
		html += '</li>';
		newss.push($(html));
	}
	newsInit();
}

function newsInit() {
	newsArr = [];
	newsArr[1] = newsNow;
	newsArr[0] = (newsNow == 0) ? newsLast : newsNow - 1;
	for (var i = 2; i < newsSize; i++) newsArr[i] = (newsArr[i - 1] == newsLast) ? 0 : newsArr[i - 1] + 1;
	for (var i = 0; i < newsArr.length; i++) $(newss[newsArr[i]]).clone().appendTo(".news-wrap");
}

function onNewsLeft() {
	newsTar = 0;
	newsNow = (newsNow == 0) ? newsLast : newsNow - 1;
	newsAni();
}

function onNewsRight() {
	newsTar = newsLeft * 2 + "%";
	newsNow = (newsNow == newsLast) ? 0 : newsNow + 1;
	newsAni();
}

function newsAni() {
	$(".news-wrap").stop().animate({
		"left": newsTar
	}, 500, function () {
		$(this).empty().css({
			"left": newsLeft + "%"
		});
		newsInit();
	});
}


/******************* press 동적생성********************/

$.get("../json/press.json", onPressLoad);

function onPressLoad(r) {
	var html;
	for (var i in r.press) {
		html = '<li class="press">';
		html += '<div class="logo"><img src="' + r.press[i].logo + '" alt="로고"></div>';
		html += '<div class="cont">' + r.press[i].content + '</div>';
		html += '<div class="writer rc">' + r.press[i].writer + '</div>';
		html += '</li>';
		$(".press-ul").append(html);
	}
}



/******************* 이벤트 함수 ********************/
function onResize() {
	wid = $(this).innerWidth();
	hei = $(this).innerHeight();
	if (wid > 991) {
		prdLeft = -25;
		newsLeft = -33.3333;
		onNaviHide();
	} else if (wid > 767) {
		prdLeft = -33.3333;
		newsLeft = -50;
	} else if (wid > 479) {
		prdLeft = -50;
		newsLeft = -100;
	} else if (wid <= 479) {
		prdLeft = -100;
		newsLeft = -100;
	}
	$(".prd-wrap").css("left", prdLeft + "%");
	$(".news-wrap").css("left", newsLeft + "%");
}

function onScroll() {
	// header 위치
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

	// .loc-wrap의 background-position-y 변화
	var locStart = $(".loc-wrap").offset().top;
	var locHei = $(".loc-wrap").innerHeight();
	var locEnd = locStart + locHei + hei;
	var locGap = 0;
	var speed = 400;
	if (scTop + hei > locStart && scTop + hei < locEnd) {
		locGap = (speed / 2) - Math.round((scTop + hei - locStart) / (locEnd - locStart) * speed);
		$(".loc-wrap").css("background-position-y", locGap + "%");
	}
	// .loc-wrap의 background-position-y 변화
	var pressStart = $(".press-wrap").offset().top;
	var pressHei = $(".press-wrap").innerHeight();
	var pressEnd = pressStart + pressHei + hei;
	var pressGap = 0;
	var pressSpeed = 200;
	if (scTop + hei > pressStart && scTop + hei < pressEnd) {
		pressGap = (speed / 2) - Math.round((scTop + hei - pressStart) / (pressEnd - pressStart) * pressSpeed);
		$(".press-wrap").css("background-position-y", pressGap + "%");
	}

//.bt-top show/hide
(scTop > hei) ? $(".bt-top").show() : $(".bt-top").hide();
}

function onTop(){
	$("html,body").stop().animate({"scrollTop":0},500);
}


function onNaviShow() {
	$(".navi-mo").css("display","block");
	setTimeout(function(){
		$(".navi-mo").css("background-color","rgba(0,0,0,0.6)")
		$(".header .bt-close").css("opacity",1);
		$(".navi-mo").find(".navi-wing").css("right",0);
	},0);

}
function onNaviHide() {
	$(".navi-mo").css("background-color","transperant");
	$(this).stop().animate({"opacity":0},500,function(){
		$(".navi-mo").find(".navi-wing").css("right","-320px");
		setTimeout(function(){
			$(".navi-mo").css("display","none");
		},500)

	});
}


function onCategoryClick() {
	console.log(this.id)
	var category = this.id
	$(".menus").html('')
	$.get(`../json/${category}.json`, onMenuLoad);
	$(".menu-wrapper .category").css({"background-color":"#fff", "color":"black"})
	$(this).css({"background-color":"black", "color":"#fff"})
	
}

/******************* 이벤트 설정 ********************/
$(window).resize(onResize).trigger("resize");
$(window).scroll(onScroll).trigger("scroll");
$(window).ready(function() {
	$("#espresso").click()
})
$(".bt-top").click(onTop);
$(".header .navi-bars").click(onNaviShow);
$(".header .bt-close").click(onNaviHide);
$(".menu-wrapper .category").click(onCategoryClick)