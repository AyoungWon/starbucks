/* 
refernce
-type: hori, vert, fade,scale,prd 
-container:슬라이드들이 담길 객체
*/


var Slide = (function(){
	function Slide(obj){
		this.obj = obj || {};
		this.type = obj.type || 'hori'
		this.container = $(obj.container) || $(".slide-wrap")

	};
	return Slide;
})();






var mainSlide = new Slide({
	type:"scale"
});
console.log(mainSlide);
