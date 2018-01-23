
//================================слайдер====================================

$(function() {      
	var slider = $('.slider'),
		sliderContent = slider.html(),                     
		slideWidth = $('.slider-box').outerWidth(),         
		slideCount = $('.slider img').length,               
		prev = $('.slider-box .prev'),                      
		next = $('.slider-box .next'),                      
		slideNum = 1,                                       
	index =0,
	clickBullets=0,
		sliderInterval = 3300,                              
		animateTime = 1000,                                 
		course = 1,                                         // Направление движения слайдера (1 или -1)
		margin = - slideWidth;                              
 
	for (var i=0; i<slideCount; i++)                      // Цикл добавляет буллеты в блок .bullets
	{
		html=$('.bullets').html() + '<li></li>';          // К текущему содержимому прибавляется один буллет
		$('.bullets').html(html);                         // и добавляется в код
	}
	var  bullets = $('.slider-box .bullets li')          // Переменная хранит набор буллитов
 
 
	$('.slider-box .bullets li:first').addClass('active');  
	$('.slider img:last').clone().prependTo('.slider');   
	$('.slider img').eq(1).clone().appendTo('.slider');     
	$('.slider').css('margin-left', -slideWidth);         
 
	function nextSlide(){                                 
		interval = window.setInterval(animate, sliderInterval);
	}
 
	function animate(){
		if (margin==-slideCount*slideWidth-slideWidth  && course==1){     
			slider.css({'marginLeft':-slideWidth});          
			margin=-slideWidth*2;
		}else if(margin==0 && course==-1){                  
			slider.css({'marginLeft':-slideWidth*slideCount});
			margin=-slideWidth*slideCount+slideWidth;
		}else{                                              // Если условия выше не сработали,
			margin = margin - slideWidth*(course);            // значение margin устанавливается для показа следующего слайда
		}
		slider.animate({'marginLeft':margin},animateTime);  // Блок .slider смещается влево на 1 слайд.
 
		if (clickBullets==0){                              
		bulletsActive();                               
	}else{                                             
		slideNum=index+1;                            
	}
	}
 
	function bulletsActive(){
		if (course==1 && slideNum!=slideCount){       
		slideNum++;                                     
			$('.bullets .active').removeClass('active').next('li').addClass('active');
	}else if (course==1 && slideNum==slideCount){      
		slideNum=1;                                    
		$('.bullets li').removeClass('active').eq(0).addClass('active'); 
		return false;
	}else if (course==-1  && slideNum!=1){              // Если слайды скользят вправо и текущий слайд не последний
		slideNum--;                                     // Редактирунтся номер текущего слайда
			$('.bullets .active').removeClass('active').prev('li').addClass('active'); 
		return false;  
	}else if (course==-1  && slideNum==1){              
		slideNum=slideCount;                            
		$('.bullets li').removeClass('active').eq(slideCount-1).addClass('active'); 
	}
	}
 
	function sliderStop(){                                
		window.clearInterval(interval);
	}
 
	prev.click(function() {                              
		if (slider.is(':animated')) { return false; }       
		var course2 = course;                               
		course = -1;                                       
		animate();                                         
		course = course2 ;                                  
	});
	next.click(function() {                               
		if (slider.is(':animated')) { return false; }       
		var course2 = course;                               
		course = 1;                                       
		animate();                                          
		course = course2 ;                                 
	});
	bullets.click(function() {                            
		if (slider.is(':animated')) { return false; }      
	sliderStop();                                       
	index = bullets.index(this);                        
	if (course==1){                                    
		margin=-slideWidth*index;                      
	}else if (course==-1){                              
		margin=-slideWidth*index-2*slideWidth;
	}
	$('.bullets li').removeClass('active').eq(index).addClass('active');  
	clickBullets=1;                                     
	animate();
	clickBullets=0;
	});
 
	slider.add(next).add(prev).hover(function() {        
		sliderStop();                                      
	}, nextSlide);                                        
 
	nextSlide();                                         
});

//==============================аккордеон===========================

$(document).ready(function(){
	$('.accordion .acc-head').on('click', function() {
		$('.accordion .acc-body').not($(this).next()).slideUp(400);
		$(this).next().slideToggle(400);
});

//======================подсчет суммы характеристик=================

var $result = 0;
	$('input[type=checkbox]').click(function func() {
		if($(this).prop('checked')) {
		var $this = parseFloat($(this).attr('data-price'));
		$result += $this; 
		$('.price').html($result.toFixed(3) + ' Р.');
		} 
		if(!($(this).prop('checked'))) {
		var $this = parseFloat($(this).attr('data-price'));
		$result = $result - $this;
		$('.price').html($result.toFixed(3) + ' Р.');
		}
	})

	//====================Ежедневник TO-DO List=======================

$('.task-text .fa-check').click(function add(){
	if($('.input-task').val()){
		$('.task-list').append('<li>' + $('.input-task').val() + '<i class="fa fa-pencil" aria-hidden="true"></i><i class="fa fa-times" aria-hidden="true"></i>'+'</li>');
		$('.input-task').prop('placeholder', 'Введите задачу');
	} else {
		$('.input-task').prop('placeholder', 'Вы ничего не ввели');
	}
})

$('.input-task').keyup(function() {
	var $this = $(this);
  if($this.val().length > 40){
  $this.val($this.val().substr(0, 40));
	}
})

$('.task-text .fa-times').on('click', function del() {
	$('.input-task').val('');
})

$('.task-list').on('click','.fa-times', function remove() {
	$(this).closest('li').remove();
})

$('.task-list').on('click', '.fa-pencil', function red() {
	var $change = prompt('Введите новую задачу.', '');
	$(this).parent().replaceWith('<li>' + $change + '<i class="fa fa-pencil" aria-hidden="true"></i><i class="fa fa-times" aria-hidden="true"></i></li>')
	})

//=====================Декорирование меню в футере==================
$('.footer-nav a').mousemove(function(){
	$(this).prev().css('visibility', 'visible');
});
		
$('.footer-nav a').mouseout(function() {
	$(this).prev().css('visibility', 'hidden');
	});
});