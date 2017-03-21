//=require libs/_10_masks.js

// Scroll
$(function() {
	$('a[href*="#"]:not([href="#"])').click(function() {
		if (location.pathname.replace(/^\//,'') == this.pathname.replace(/^\//,'') && location.hostname == this.hostname) {
			var target = $(this.hash);
			target = target.length ? target : $('[name=' + this.hash.slice(1) +']');
			if (target.length) {
				$('html, body').animate({
					scrollTop: target.offset().top -90
				}, 1000);
				$('#nav').toggleClass("open");
				return false;
			}
		}
	});
});

//Menu
$('.hamburger').click(function (ev) {
	console.log('click');
	ev.preventDefault();
	$('#nav').toggleClass("open");
});

//Mask
$(function() {
	$('.mask-phone').mask('(99) 9999-9999?9');
	$('.mask-phone-no-ddd').mask('9999-9999?9');
	$('.mask-ddd').mask('(99)');
	$('.mask-cep').mask('99999-999');
	$('.mask-cpf').mask('999.999.999-99');
});