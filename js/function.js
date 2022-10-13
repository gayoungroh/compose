
const $gnb = $('#wrap > header > .container > nav > .gnb');
const $lnbs = $('#wrap > header > .container > nav > .gnb > li > .lnb');
const $bg_lnb = $('.bg_lnb');

//와우
$(window).on('load',function(){
	new WOW().init();
});

//네비게이션 호버시 풀 배경
{
const navFadeIn = function(){
	$bg_lnb.stop().slideDown(500);
	$lnbs.stop().slideDown(500);
};

const navFadeOut = function(){
	$lnbs.stop().slideUp(500);
	$bg_lnb.stop().slideUp(500);
};

$gnb.on('mouseenter', function(){
	navFadeIn();
});

$gnb.on('mouseleave', function(){
	navFadeOut();
});


$bg_lnb.on('mouseenter', function(){
	navFadeIn();
});

$bg_lnb.on('mouseleave', function(){
	navFadeOut();
});

}

//슬라이드 구문 원버튼 재생/정지버튼
{
const $indicator = $('#cont > .cont1 > .slides > .slides-pagination > li > a ');
const $container = $('#cont > .cont1 > .slides > .slides-container');

const $btnPrev = $('#cont > .cont1 > .slides > .slides-navigation.prev');
const $btnNext = $('#cont > .cont1 > .slides > .slides-navigation.next');

const $btnAuto = $('#cont > .cont1 > .slides > .btn_auto');

let nowIdx = 0;
let intervalKey = null;

const moveFn = function(){
	$container.stop().animate({
		left:-(100*nowIdx) + '%'},900);
	$indicator.eq(nowIdx).parent().addClass('on').siblings().removeClass('on');
};

$indicator.on('click', function(evt){
	evt.preventDefault();

	nowIdx = $indicator.index(this);
	moveFn();
});



$btnPrev.on('click',function(evt){
	evt.preventDefault();

	nowIdx<1 ? nowIdx=4 : nowIdx--;
	moveFn();
});

$btnNext.on('click',function(evt){
	evt.preventDefault();

	nowIdx<4 ? nowIdx++ : nowIdx=0;
	moveFn();
});

const autoPlay = function(){
	intervalKey = setInterval(function(){
		$btnNext.trigger('click'); 
	},2000);
};

autoPlay();

$btnAuto.on('click',function(evt){
	evt.preventDefault();

	if($(this).hasClass('pause')){
		autoPlay();
		$(this).removeClass('pause');
	}else{
		clearInterval(intervalKey);
		$(this).addClass('pause');
	}
});
}

//해더 스크롤 home 지나면 배경색/폰트색 변경
$(function(){
	const $header = $('header');
	const $cont = $('#cont');
	const $window = $(window);
	let contOffsetTop = $cont.offset().top;


	$window.resize(function(){
		contOffsetTop = $cont.offset().top;
	});

	$window.on('scroll', function(){
		const scrolled = $window.scrollTop() >= contOffsetTop; 

		$header.toggleClass('down', scrolled);
	});
});

//pc 버전 햄버거 버튼 클릭시 풀 네비게이션 나오게
$('.btn>a').on('click',function(){
	$('.full-nav').slideDown(800);
});

$('.fullnav-close').on('click',function(){
	$('.full-nav').slideUp(800);
});

// 모바일 햄버거 버튼 클릭시 네비게이션 나오게
$('.button>a').on('click',function(){
	$('.m-nav').animate({width :'toggle'},600);
});

$('.mnav-close').on('click',function(){
	$('.m-nav').animate({width :'toggle'},600);
});


// 모바일 햄버거 버튼 클릭시 배경 어둡게
$('.button>a').on('click',function(){
	$('.mbg').css('display','block');
});

$('.mnav-close').on('click',function(){
	$('.mbg').css('display','none');
});
