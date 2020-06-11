/****************************** 사전지식 **********************************/




/****************************** 전역설정 **********************************/
mainSlide();


/****************************** 사용자함수 **********************************/
function mainSlide(){
var now = 0;
var $slide= $(".main-wrap").find(".banner").css("transition","all 0.5s").remove();
var last = $slide.length -1;

var css = {"position": "absolute", "top": "50%", "transform": "translateY(-50%)", "font-size": "5rem", "z-index": 900, "color": "#fff"};
var $btLeft = $('<i class="bt-lt fa fa-angle-left></i>').appendTo(".main-wrap").css(css);
var $btRight = $('<i class="bt-rt fa fa-angle-right></i>').appendTo(".main-wrap").css(css);
$btLeft.css("left", "2rem");
$btRight.css("right", "2rem");


function init() {
	$($slide[now]).appendTo('.main-wrap');
	now = (now == 2) ? now = 0 : now + 1;
	$($slide[now]).appendTo('.main-wrap').css({"opacity": 0, "transform": "scale(1.2)"});
}
function onClick() {
	$(".banner").eq(0).css({"opacity": 0, "transform": "scale(0.7)"});
	$(".banner").eq(1).css({"opacity": 1, "transform": "scale(1)"});
	setTimeout(init, 500);
}
$(".main-wrap").click(onClick);
init();
}

/****************************** 이벤트함수 **********************************/
function onResize(){
this.wid = $(this).innerWidth();
this.hei = $(this).innerHeight();
}

function onScroll(){
this.scTop = $(this).scrollTop();
if(this.scTop > this.hei){
	$(".header").css({"top":0, "bottom":"auto", "position":"fixed"})
}else{
	$(".header").css({"top":"auto", "bottom":"0", "position":"absolute"})
}
}




/****************************** 이벤트설정 **********************************/
$(window).resize(onResize).trigger("resize");
$(window).scroll(onScroll).trigger("scroll");