noName = function(){

    /**** default settings ****/
    this.defaults = {
        /*** slider ***/
        'slider': {
            'selector': $('#f_slider'),
            'mainSelector': $('.slider', this.selector),
            'width': 900,
			'height' : 400,
            'delay': 1800,
			'openEasing' : 'easeInOutBack',
			'closeEasing' : 'easeInOutCubic',
			'easingDelay' : 350,
			'callfn' : function(){
				
			}
        },
        /*** top menu ***/
        'menu': {
			'selector' : $('#top_menu .menu')
		},
		/*** works ***/
		'works' : {
			'imagewidth' : 230,
			'imageheight' : 230
		},
		/*** contact page ***/
		'contact' :{
			'mapid' : [45.810076, 15.977769]
			
		},
		/*** Twitter ***/
		'twitter': {
			'username': 'lac0306',
			'limit': 10,
			'autoplay' : false,
			'delay' : 8000
		}
    }
}

noName.prototype = {
	
    _init: function( o ){
       
	    // TOP NAVIGATION MENU
		this._menu();
		
		// Homepage slider 
		this._fn_sldr( o );
		
		// home page ajax 
		this._loadIndex();
		
		//Run shortcode
		this._accordion();
		this._toggle();
		this._tabs();
		this._tweet();
    	
	},
	
    _fn_sldr: function(options){
		
		var _self = this, 
			op  = $.extend({}, _self.defaults.slider, options),
			$t  = op.selector, 
			$tS = op.mainSelector,
			$SS = $('ul',$tS),
			$Sl = $('li', $SS),
			$sl = $Sl.length;
		
		_self._op     = op;
		_self.img     = $($t).children('img').css('opacity' , 0);
		_self.Slider  = $t;
		
		$tS.css({'height' : op.height});
		
		_self.S_l     = $Sl;
		_self.S_t     = $sl;
		_self.S_w     = $t.width();
		_self.S_h     = $t.height();
		_self.S_o     = true;
		_self.S_s     = 0;
		_self.S_r     = 0;
		_self.S_a     = true;
		_self.TimeOut = '';

		// prev next item 
		if(_self.S_t > 0){
			
			_self._prevnext();
			
		}
		
		// toggle slider
		_self._toggleSlider();
		
		// loading background image
		if (_self.img.length > 0) {
		
			_self.resizeImage();
		
		}
		
		$Sl.each(function(i){
			
			var _t = $(this);
			
			_t.css({
				'display': 'block',
				'width': 960
			});
			
			var _row    = _t.children('.row'),
				_row_el = _row.children(); 
			
			_row.each(function( r ){
				var _re = $(this);
				
				_re.css({
					'width' :  $.browser.safari ? _re[0].clientWidth  : _re[0].clientWidth - 1 + 'px', 
					'height' : _re[0].clientHeight + 'px',
					'position' : 'relative',
					'overflow' : 'hidden'
				});
					
			});
			
			_row_el.each(function(i){
				
				var __t = $(this),
					_tp = __t.position();
				
				__t.data('anim_position',{
					
					'stop' : _tp.top,
					'sleft' :_tp.left
					
				}).css({					
					'opacity': '0.0',
					'position': 'relative',
					'visibility' : 'hidden'
				
				});
				
				if (i == _row_el.length - 1) {
				
					_self._anim_open();
				
				}
				__t.css({'top' : _tp.top + 'px', 'left' : (i % 2 == 0) ? '-100px' :'100px'});
			});
			
		});
		
    },
	
	_anim_open : function(){
			
			var _self         = this;
				action        = _self.S_l.eq( _self.S_s ),
				action_child  = $('.row', action),
				a_c           = action_child.children(),
				a_l           = a_c.length,
				a_s           = 0;
			
			_self.S_a  = false;
			_self.S_r  = _self.S_s;
			
			action.show().siblings('li').hide();
			
			a_c.each(function( x ){
			
				var _tc = $(this);
				
				_tc
				.css({'visibility' : 'visible','position' : 'absolute'})
				.delay( x * 200 )
				.animate({
						left : _tc.data('anim_position').sleft,
						top : _tc.data('anim_position').stop,
						opacity : '1.0'
					}, 
					{
						duration: _self._op.easingDelay,
						easing: _self._op.openEasing,
						complete : function(){
							
							if(++a_s == a_l){
								
								_self.S_s = (_self.S_s == _self.S_t - 1) ? 0 : _self.S_s + 1;
								_self.S_a = true;
								clearTimeout( _self.TimeOut );
								
								_self.TimeOut = setTimeout(function(){
									
									_self._anim_close();
									
								},_self._op.delay);
								
							}
							
						}
					}
				);
				
			});
			
	},
	
	_anim_close : function(){
	
		var _self         = this,
		
			action        = _self.S_l.eq( _self.S_r ),
			action_child  = $('.row', action),
			a_c           = action_child.children(),
			a_l           = a_c.length,
			a_s           = 0,
			a_r           = 'margin-right margin-left opacity'.split(' ');
			
		_self.S_a = false;
			
		a_c.each(function( x ){
		
			var _tc = $(this),
			
			a_t    = a_r[ Math.floor( Math.random() * a_r.length ) ],
			a_t_n  = {};
			
			switch( a_t ){
				
				case 'margin-left' : a_t_n = {
					
					left : '-100px',
					"opacity" : '0.0'
					
				}
				break;
				case 'margin-right' : a_t_n = {
					
					left : '100px',
					"opacity" : '0.0'
					
				}
				break;
				case 'opacity' : a_t_n = {
					
					"opacity" : '0.0'
					
				}
								
			}
			
			_tc
			.delay( x * 200 )
			.animate( a_t_n , 
				{
					duration: _self._op.easingDelay,
					easing: _self._op.closeEasing,
					complete : function(){
												
						if(++a_s == a_l){							
							
							_self._anim_open();
							
						}
						
					}
				}
			);
			
		});
	
	},
	
	_prevnext : function(){
		
		var _self = this,
		
			p_n = $('<div />', {
				
				'class' : 'sn',
				'html' : '<span class="prev"></span><span class="next"></span>'
				
			});			
			
		_self.defaults.menu.selector.append( p_n );
		
		$('span', p_n).bind('click', function(){
			
			var _t = $(this);
			
			if ( _self.S_a === true ) {
				
				clearTimeout(_self.TimeOut);
				_self._anim_close();
				
				if (_t.is('.prev')) {
					
					_self.S_s = _self.S_r == 0  ? _self.S_t - 1 : _self.S_r-1;	
												
				}					
				
			}
			
		});
		
		// mouseover stop animation
		_self.Slider.bind({
			
			'mousemove' : function(){
				
				clearTimeout( _self.TimeOut );
			},
			'mouseleave' : function(){
				
				_self.TimeOut = setTimeout(function(){
									
					_self._anim_close();
								
				},_self._op.delay);
				
			}
			
		});
		
	},
	
	_toggleSlider : function(){
		
		var _self = this;
		
		_self.ts = $('<div />',{
			'id' : 'toggle_slider',
			'html' : '<span class="close"></span><span class="open"></span>'
		});
		
		
		_self.defaults.menu.selector.append(_self.ts);
		
		$('span', _self.ts).bind('click', function(event, callfn){
			
			var _this = $(this);
			
			if(_this.is('.close')){
				
				_self.Slider.animate({
					opacity : 0,
					height : 0
				},{
					duration : 800,
					easing : 'easeInOutExpo',
					complete : function(){
						
						if(typeof callfn === 'function'){
							
							callfn();
							
						}
						
						_this
						.css({'visibility' : 'hidden','opacity' : 0})
						.parent()
						.find('.open')
						.css({'visibility' : 'visible', 'opacity' : 0})
						.animate({
							'opacity': 1
						},500);
						
						_self.S_o = false;
						_self.randImg();
					}
				});
				
			}else {
				
				_self.Slider.animate({
					opacity : 1,
					height : _self.S_h,
					marginTop : 0
				},{
					duration : 800,
					easing : 'easeInOutExpo',
					complete : function(){
						
						if(typeof callfn === 'function'){
							
							callfn();
							
						}
						
						_self.S_o = true;
						
						_this.animate({
							'opacity': 1
						},500,function(){
							
							$(this).animate({opacity : 0},500, function(){
								
								$(this)
								.css({'visibility' : 'hidden'})
								.parent()
								.find('.close')
								.css({'visibility' : 'visible'})
								.animate({opacity : 1},500);
								
							});
						});
						
					}
				});
			}
			
		});
	},
	
    _menu: function(){
		
		var _self = this,
		
			tm = this.defaults.menu.selector,
			ta = $('li', tm),
			tl = tm.children('li').addClass('menu-first-child'),
			_nletter = $('input#newslatter'),
			_nlForm = $('form#form_newslatter');
		
		$.each(ta, function(i){
		
			var lt = $(this), 
				lw = lt.width(), 				
				ma = $('a:first', lt),
				mt = ma.text(),
				asp = $('<span />',{
					'html' : mt
				});
				
			if (lt.is('.menu-first-child')) {
				ma.html(asp);
				var lh = ma.height();
				
				ma.css({
					'height': lh + 'px',
					'overflow': 'hidden'
				});
			}
        
			lt.hover(function(){
				
				$('a span:first', this)
				.stop()
				.animate({
					marginTop: '-'+ $(this).outerHeight() +'px'
				}, 200, 'easeInOutExpo').siblings('span').animate({opacity : '1.0'},800);
				
				$('ul:first', this).slideDown(300);
				
			}, function(){
				
				$('a span:first', this)
				.stop()
				.animate({
					marginTop: '0'
        		}, 200, 'easeInOutCubic').siblings('span').animate({opacity : '0.0'},200);
				
				$('ul:first', this).slideUp(300);
				
    		});
        	
			$('span', ma).clone().addClass('mover').css('opacity' , '0.0').appendTo(ma);
			tm.css({'visibility' :'visible', 'opacity' : '0.0'})
			.animate({opacity : '1.0'},500);
			
		});
		
		$('.logo').click(function(){document.location.href = './';});
		
		var _lv = _nletter.attr('placeholder'),
			_lb = $('<button />',{
				'id' : 'letterSubmit',
				'text' : 'Submit'
			});
		_nletter.val(_lv).on('focus',function(){
			var $this = $(this);
			if($this.val() === _lv){
				$this.val('');
			}
			$($this).before(_lb);
			
		}).on('blur',function(){
			var $this = $(this);
			if($this.val() === ''){
				$this.val(_lv);
				_lb.remove();
			}
		});
		
		_nlForm.on('submit', function(e){
			if(_lv.val() === ''){
				e.preventDefault();
			}
		});
			
    },
	
    _loadIndex: function(){
    	
		var _self  = this,
			_link  = $('.link_wrap'),
			_acall = $('#content').css({'display' : 'none'}),
			_h_t   = $('.page_title'),
			_h2    = $('h2', _h_t),
			_h_h   = $('.title', _h2),
			_h_l   = $('.loading_link');
			
			_ldashed = $('<div />',{
				
				'class' : 'ldashed'
			});
		
		$('img:first', _link).css({'margin-top' : '80px'});
		$('img:eq(1)', _link).css({'opacity' : '0.0','display' : 'inline'});
		
		_link.each(function(i){
			var _this = $('img:first', this);
			
			_this.delay(i * 55).animate({marginTop : 0},500, 'easeInOutBack');
			
		});
		
		_link.bind(
			{
				'mouseenter': function(){
				
					var _t  = $(this), 
						_th = $('h2', _t), 
						_ti = $('img', _t),
						_ac = $('span.call_ajax', _t),
						_thd = {
							'_t' : {
								'w' : _t.outerWidth(),
								'h' : _t.outerHeight()
							}
						};
						
					_t.data('position', _thd);
					
					_t.stop().animate({marginTop : '-10px'},300);
					//_ac.animate({bottom : '22px'},300);
					_ti.eq(1).stop().animate({opacity : '1.0'},300);

					  
				},
				'mouseleave' : function(){
					
					var _t   = $(this), 
						_th  = $('h2', _t),
						_ti  = $('img', _t),
						_ac = $('span.call_ajax', _t);
						
					if (!_t.is('.link_wrap_active')) {
						_t.stop().animate({
							marginTop: '0'
						}, 300);
						_ti.eq(1).stop().animate({
							opacity: '0.0'
						}, 300);
						
						
					}
					
				},
				'click' : function(e){
			
					var _this  = $(this),
						A_Call = function(){
									
									var _url = _this.data('link'),
										_text = $('h2',_this).text();
							    	
									_h_h.text(_text);
									
									switch(_url){
										
										/* WORKS PAGE */
										case 'works' : 
											
											NoNameAjax('about.html', function(){
												
												_self._worksPage();												
										
											});									
											
										break;
										
										/* BLOG PAGE */
										case 'blog' : 
											 
											NoNameAjax('blog.html', function(){
											
												_self._blogPage();
											
											});									
											
										break;	
										
										/* SERVICES PAGE */	
										case '' : 
											 
											NoNameAjax('', function(){
														
													_self._focustitle();
																				
											});									
											
										break;	
										
										/* OUR TEAM PAGE */
										case 'team' : 
											 
											NoNameAjax('team.html', function(){
														
													
																				
											});									
											
										break;																		

										/* CONTACT PAGE */
										case 'contact' : 
											 
											NoNameAjax('contactenos.html', function(){
														
														
											});									
											
										break;																
									}								
						
						        }
					
					if (_self.S_o) {
						
						$('span.close',_self.ts).trigger('click',[A_Call]);
					
					}else{
						
						A_Call();
						
					}
										
					_h_t.fadeIn(500);
					_h_l.fadeIn(200);
					
					_link.removeClass('link_wrap_active').not(_this).trigger('mouseleave');
					_this.addClass('link_wrap_active');					
					e.preventDefault();
			}
			
		});
		
		var NoNameAjax = function(url, callfn){
			
						
			_acall.fadeOut(500,function(){
			
				_acall.load(url+' #inside', function(response, status, xhr){
					
					if (status == 'error') {
						
						var msg = "Oprostite, došlo je do greške: ";
						_acall.html(msg + xhr.status + ' ' + xhr.statusText);
					
					}else{
						
						if(typeof callfn === 'function'){
							
							callfn.call(this);
							
						}
											
					}
					
					$(this).fadeIn(500);
					_h_l.fadeOut(200);
					
				});
			
			});
		}
		
		/* Ajax menu window scroll */
		_self._ajax_scroll();	
		
    },
	
	_ajax_scroll : function(){
		
		var _self = this,
			_am   = $('#to-top-menu'),
			_st   = $('.page_title'),
			_ct;
		
		$(window).scroll(function(){
			
			if (_st.is(':visible')) {
				
				clearTimeout(_ct);
				
				_ct = setTimeout(function(){
				
					var _stn = _st.offset().top;
					if (_stn <= $(window).scrollTop()) {
					
						_am.fadeIn(500);
						
					}else{
						_am.fadeOut(500);
					}
					
				}, 500);
			}
		});
		_am.bind('click',function(){
			
			var _linktop  = $('.link_wrap').offset().top;
			
			$('body, html').animate({
				
				scrollTop  : _linktop
				
			},500);
			
		});
			
	},
	
	_works : function(){
		
		var _self = this,
			
			_f    = $('#works_filter'),
			_t    = $('#work_items'),
			_l    = $('li', _t),
			_pd   = _t.data('id'),
			_tc   = _t.clone(),
			_dv   = '',
			_dd   = '',
			_ap   = {
				duration : 500,
				easing : 'easeInOutQuad'
			};
			
			$('li', _f).on('click', function(e){
				
				var _fb = $(this),
					_fd = _fb.data('id');
					
				_fb.parent().find('a').removeClass('active');
				$('a', _fb).addClass('active');
				
					
				if(_fd == 'term-all'){
					
					_dv =  $('li', _tc);
					
				}else{
					
					_dv = _tc.find('li[data-value*="'+ _fd +'"]');
					
				}
				
				_dd = _dv.sorted({
					
					'list' : 4 
					 
				});
				
				_t.quicksand(_dd, _ap, function(){
					
					_self._workhover();
					
				});
				

				e.preventDefault();
				
			});
			
			_self._workhover();
					
	},
	_workhover : function(){
		
		var _self   = this,
			_wi     = $('#work_items').children('li'),
			_wf     = $('figure', _wi),
			_wv     = $('.work_view', _wf),
			_wc     = $('#view_work_container'),
			
			_wcpne  = $('<div />',{
				'id'   : 'work_prev_next',
				'html' : '<span class="prev"></span><span class="next"></span><span class="close"></span>'
			});
		
		_wf.each(function(){
			
			$(this).css({
				'width' : _self.defaults.works.imagewidth + 'px',
				'height' : _self.defaults.works.imageheight + 'px',
				'overflow' : 'hidden',
				'position' : 'relative' 
			});
			$('.work_title', this).css({'background-color' : 'rgba(0,0,0,0.8)'});
		});
		
		_wf.bind({
			'mouseover': function(){
			
				var _img     = $('img', this),
					_overlay = $('.work_overlay', this);
				
				_overlay.fadeIn()
				.children('.work_title')
				.stop()
				.animate({opacity : '1.0'}, 500,'easeInOutExpo');
				
				

				_img.css({
					'position': 'relative'
				})
				.stop()
				.animate({
					marginTop: '-30px',
					marginLeft: '-30px',
					width: _self.defaults.works.imagewidth + 60,
					height: _self.defaults.works.imageheight + 60
				}, {
					duration: 300,
					easing: 'easeInOutCubic',
					complete: function(){
					
					}
				});

				
			},
			'mouseleave': function(){
				
				var _img     = $('img', this),
					_overlay = $('.work_overlay', this),
					_oheight = _overlay.innerHeight(); 
					
				
				_overlay.children('.work_title')
				.stop()
				.animate({opacity : '0.0'}, 500,function(){
					_overlay.fadeOut();
				});

				
				_img.css({
					'position': 'relative'
				})
				.stop()
				.animate({
					marginTop: '0',
					marginLeft: '0',
					width: _self.defaults.works.imagewidth,
					height: _self.defaults.works.imageheight
				}, {
					duration: 300,
					easing: 'easeInOutCubic',
					complete: function(){
					
					}
				});	
				
			}
		});
		
		/* view work */
		
		_wv.bind('click', function(){
			
			var  $this = $(this),
				_wid = $this.data('id'),
				_swcs = $('.page_title').offset().top,
				_li   = $('.loading_link');
			
			_li.fadeIn();
			
			_wc.animate({opacity : '0.0'}, 500);			
			
			_wc.load('works_view.html #works-'+ _wid, function(response, status, xhr){
				
				var _wch  = _wc.height(),
					_wci  = $('img', _wc),
					_rs   = $('section',_wc),
					_wcpn = $('.works_right', _rs),
					_rh   = _rs.height() + 50;
				
				
				_wcpn.append( _wcpne );
				
				_wcpne.find('span').bind('click', function(){
					
					var _t = $(this);
					
					if (_t.is('.close')) {
						_wc.animate({
							opacity: '0.0',
							height: 0
						
						}, 500, function(){
						
							$(this).html('');
							
						});
						
					}
					else 
						if (_t.is('.next')) {
						
							
							var _did = $this.parents('li:first').next('li').find('div.work_view');
							
							_did.trigger('click');
							
							
						}
						else 
							if (_t.is('.prev')) {
							
								var _did = $this.parents('li:first').prev('li').find('div.work_view');
							
								_did.trigger('click');
							
							}
						
				});
				
				if (_rs.is('.w-image')) {
					
					$.when(_self._loadingImage(_wci)).done(function(){
					
						_wc.animate({
							opacity: '1.0',
							height : _rh
						}, {
							duration: 300,
							easing: 'easeInOutSine',
							complete: function(){
								
								$('body, html').animate({ scrollTop : _swcs }, 500);
								
								/*** work slider **/
								_self._workslider();
									
							}
						});
						
						_li.fadeOut();
						
					});
				
				}else{
					
					_wc.animate({
							opacity: '1.0',
							height : _rh
						}, {
							duration: 300,
							easing: 'easeInOutSine',
							complete: function(){
								
								$('body, html').animate({ scrollTop : _swcs }, 500);
											
							}
					});
						
					_li.fadeOut();
					
				}
			 	
				
				
			});
			
		});
		
	},
	
	_workslider : function(){
		
		var _self = this,
			_ws   = $('.works_slider'),
			_wsl  = $('li', _ws),
			_wsi  = $('img', _wsl),
			_wsa  = $('a', _wsl),
			_wsil = _wsi.length,
			_wss  = 0,
			_wsn  = 0,
			
			_wsc  = $('<div />', {
				'id' : 'work_slider_nav'
			}),
			
			_wsp = $('<div />', {
				'class' : 'work_preview'				
			}),
			
			_wspt = $('<div />', {
				'class' : 'work_preview_zoom'				
			}),
			
			_wspn = $('<div />',{
				'id' : 'work_slider_pn',
				'html' : '<span class="ws-prev"></span><span class="ws-next"></span>'
			});
			
			if(_wsa.size() > 0){
				
				_wsa.append( _wsp.css({'display' : 'inline', 'opacity' : '0.0'}) )
				.append( _wspt.css({'display' : 'inline', 'opacity' : '0.0','top' : '-58px', 'right' : '-58px'}) );
				
				_wsa.bind({
					'mouseover' : function(){
						
						$('.work_preview', this)
						.stop()
						.animate({opacity : '0.3'},500);
						
						$('.work_preview_zoom', this)
						.stop()
						.animate({top : 0, right : 0, opacity : '1.0'},500);
						
												
					},
					'mouseleave' : function(){
						
						$('.work_preview', this)
						.stop()
						.animate({opacity : '0.0'},500);
						
						$('.work_preview_zoom', this)
						.stop()
						.animate({top : '-58px', right : '-58px', opacity : '0.0'},500);
					
					}
				});			
						
			}
			
			
			if( _wsil > 1 ){
				
				for (_wss; _wss < _wsil; _wss++) {
					
					_wsc.append('<span />');
					
				}
				
				_ws.append(_wsc);
				
				_wsc.children('span:first').addClass('active');
				
				$('img', _ws).hide();
				$('a', _ws).hide();
				
				$('img:eq(0)', _ws).fadeIn().parent('a:first').fadeIn();
				
				_wsc.children('span').bind('click', function(){
					
					var _s = $(this), 
						_ind = _s.index();
						
						_wsn = _ind;
					
					_s.addClass('active').siblings('span').removeClass('active');
					
					
					
					var _activeImage   =  $('img:eq('+ _ind +')', _ws),
						_siblingsImage =  $('img:not(:eq('+ _ind +'))', _ws);
					
					_activeImage.fadeIn(500).parent('a:first').fadeIn();
					_siblingsImage.fadeOut(500).parent('a:first').hide();				
				});
				
				_ws.append( _wspn );
				
				_ws.hover(function(){
					_wspn.fadeIn();
				},function(){
					_wspn.fadeOut();
				});
				
				$('span', _wspn).on('click', function(){
					var $s = $(this);
					
					if($s.is('.ws-next')){
						
						var _runid = (_wsn + 1) >= _wsil ? 0 : _wsn + 1;
						_wsc.children('span').eq( _runid ).trigger('click');
												
						
					}else{
						var _runid = _wsn == 0 ? _wsil - 1 : _wsn - 1;
						_wsc.children('span').eq( _runid ).trigger('click');
					}					
				});
			}
			
			$("a[rel^='prettyPhoto']", _ws).prettyPhoto({
				social_tools : ''
			});
				
	
	},
	
	resizeImage : function(){
	
		var _self = this,
			$loading = $('<div />',{
							'class' : 'loading',
							'html' : '<span> Učitavanje slike pozadine... </span>',
							'style' : 'opacity : 0.6'
							});		
	
		_self.Slider.append($loading);
		
		$.when(this.loadingImage()).done(function(){
			
			_self.randImg(function(){
				
				$loading.fadeOut(500,function(){$(this).remove();})
				
			});
	
		})
	
	},
	
	_focustitle : function(){
		
		var _self = this,
			_ft   = $('.page_title'),
			_ftp  = _ft.offset().top;
			
			$('body, html').animate({
				scrollTop : _ftp
			}, 800);
	},
	
	_loadingImage : function( _imgs ){
		
		var loaded = 0,
			total  = _imgs.length;
			
			return $.Deferred(
				
				function(dfr){
				
					_imgs.each(function(i){
						
						var _image = $(this);
						
						$('<img />').load(function(){
														
							if(++loaded === total){
								dfr.resolve();
							}
							
						}).attr('src',_image.attr('src'));
					})
					
			}).promise();
			
	},
	
	loadingImage : function(){
		
		var _self  = this,
			loaded = 0,
			total  = _self.img.length;
			
			return $.Deferred(
				
				function(dfr){
				
					_self.img.each(function(i){
						
						var _image = $(this);
						
						$('<img />').load(function(){
							
							var i_w  = _image.width(),
								i_h  = _image.height(),
								ratio = i_h / i_w,
								n_i_h = _self.S_w * ratio; 
														
							if(++loaded === total){
								dfr.resolve();
							}
							_image.css({'width' : _self.S_w +'px', 'height' : n_i_h + 'px'});
							
						}).attr('src',_image.attr('src'));
					})
					
			}).promise();
	},
	
	randImg : function(callfn){
		
		var _self = this,
			_n = Math.floor( Math.random() * _self.img.length);
		
		_self.img.animate({opacity : 0},500).eq( _n ).animate({opacity : 1},500, function(){
			
			if(typeof callfn === 'function'){
				
				callfn();
								
			}
			
		});
	},
	
	_tooltip : function( el, settings ){
		
		var _self = this,
		
			_body = $('body'),
			
			_ttip = $('<span />',{
				'class' : 'tooltip',
				'html' : settings.text + '<span class="arrow" />'				
			}).css({'opacity' : 0});
			
		el.bind({
			'mouseover' : function(){
				
				_body.append( _ttip );
				
				var _t_h = _ttip.outerHeight() + 10,
					_t_w = _ttip.outerWidth(),
					_t_t = el.offset().top - _t_h,
					_t_l = el.offset().left + (el.width() / 2) - (_t_w / 2);
				
				_ttip.css({'left' : _t_l, 'top' : _t_t});
				
				
				_ttip.animate({opacity : '1.0'},300,'easeInOutExpo')
			},
			'mouseleave' : function(e){
				
				_ttip.animate({opacity : 0, marginTop : 0},300,'easeInOutBounce',function(){$(this).remove();})
			}
		})
	},
	
	_worksPage : function(){
		
		var _self = this,
			_t    = $('#work_items'),
			_l    = $('li', _t).css({'margin-top' : 150,'opacity' : 0,'visibility' : 'visible'}),
			_ct   = _l.length -1;
			
		_l.each(function( x ){
			var _ts = $(this);
			
			_ts.delay( x * 120 )
			.animate({
				opacity : '1.0', 
				marginTop : 0
				}, {
					duration: 300,
					easing: 'easeInOutCubic',
					complete: function(){
					
						if (x == _ct) {
						
							_self._works();
							_self._focustitle();
							
						}
					}
				});
		});		
	},
	_blogPage :  function(){
											
		var _self = this,
			_p   = $('#posts'),
			_pp  = $('.postbox', _p),
			_pi  = $('img', _pp);
			
		$.when(_self._loadingImage( _pi )).done(function(){
			
			_p.masonry({
			  	itemSelector: '.postbox'											  	
			});
			
			_pp
			.css({'margin-top' : 250, 'opacity' : '0.0','visibility' : 'visible'})
			.each(function(x){
				
				$(this).delay( x * 120)
				.animate({
					marginTop : 0,
					opacity : '1.0'
				},{
					duration : 300,
					easing : 'easeInOutCubic',
					complete : function(){
						if ( (_pp.length - 1) == x) {
							_self._focustitle();
						}
					}
				});
				
			});
			var morebutton = $('<a />', {
				'text' : '',
				'class' : '',
				'href' : '#'
			});
			_p.after(morebutton);
			morebutton.on('click',function(e){
				
				var $posts = $('<div />');
				
				$posts.load('blog.html #inside',function(){
					var newposts = $('div.postbox', $posts),
						newpi = $('img', newposts); 
					
					$.when(_self._loadingImage( newpi )).done(function(){
												
						_p.append( newposts ).masonry( 'appended', newposts );
						newposts.css({'margin-top' : 250, 'opacity' : '0.0','visibility' : 'visible'})
						.each(function(x){
					
							$(this).delay( x * 120)
							.animate({
								marginTop : 0,
								opacity : '1.0'
							},{
								duration : 300,
								easing : 'easeInOutCubic',
								complete : function(){
									$('body, html').animate({
										scrollTop : newposts.eq(0).offset().top
									}, 500);
								}
							});						
						});
					});
				});
				e.preventDefault();
			});
		});
												
	},
	_contactPage : function(){
		
		var _self  = this,
			_form  = $('#form');
		
		/*** google maps **/
		var latlng = new google.maps.LatLng(_self.defaults.contact.mapid[0], _self.defaults.contact.mapid[1]);
	    var myOptions = {
	      zoom: 8,
	      center: latlng,
	      mapTypeId: google.maps.MapTypeId.ROADMAP
	    };
	    var map = new google.maps.Map(document.getElementById("map_canvas"), myOptions);
		
		/** form **/
		_form.bind('submit',function(e){
			var _fv = {
				
				'fn' : $('#firstname', _form),
				'ln' : $('#lastname', _form),
				'eml' : $('#email', _form),
				'cmn' : $('#y_comments', _form)
				
			},
			_mt = /^([a-zA-Z0-9_\.\-])+\@(([a-zA-Z0-9\-])+\.)+([a-zA-Z0-9]{2,4})+$/;
			
			
			if (_fv.fn.val() == "") {
			
				_fv.fn.addClass('inputError').focus().keyup(function(){
					$(this).removeClass('inputError')
				});
				
			}
			else 
				if (_fv.ln.val() == "") {
				
					_fv.ln.addClass('inputError').focus().keyup(function(){
						$(this).removeClass('inputError')
					});
					
				}
				else 
					if (!_mt.test(_fv.eml.val())) {
					
						_fv.eml.addClass('inputError').focus().keyup(function(){
							if (_mt.test($(this).val())) {
							
								$(this).removeClass('inputError');
							}
						});
						
					}
					else 
						if (_fv.cmn.val() == "") {
						
							_fv.cmn.addClass('inputError').focus().keyup(function(){
								$(this).removeClass('inputError')
							});
							
						}
						else {
							

							var _form  = $('#form'), 
								_mform = $('.the-form'),
								_over  = $('<div />',{
									'class' : 'over'
								});
								
							_form.css({'position' : 'relative'});
							_over
							.css({
								'opacity' : '0.7'
							})
							.appendTo(_form);

							$.ajax({
								type : 'post',
								dataType : 'json',
								data : _form.serialize(),
								url : 'sendform.php',
								success : function( r ){
									
									if( r.sent ){
										
										_over.animate({
											opacity : 0
										},500,function(){
											$(this).remove();
											_form.slideUp(500,function(){
											
												_mform.html('<p class="message_box_green">Vaša poruka je uspješno poslana.</p>');
											
											});
										});
										
									}else{
										
										_over.animate({
											
											opacity : 0
										
										},500,function(){
											$(this).remove();
											_form.slideUp(500,function(){
											
												_mform.html('<p class="message_box_red">'+r.error+'</p>');
											
											});
										});
										
									}
									
								}
							})
							
						}
			
			e.preventDefault();
		});
		
		
	}
	,
	_toggle : function(){
		
		var _self = this,
			_ta = $('.toggle');
			
		_ta.each(function(i,v){
			
			var _toggle = $(this),
				_toggleTitle = _toggle.children('h3'),
				_toggleContent = _toggle.children('div');
			
			_toggleTitle.addClass('toggle-title').append('<span />');
			_toggleContent.addClass('toggle-content');
			
			_toggleTitle.each(function(){
				
				var _toggleLink = $(this);
				
				_toggleLink.bind('click', function(){
					
					var _toggleContentActive = $(this).next('div.toggle-content');
					
					$(this).toggleClass('toggle-title-active');
					$('span',this).toggleClass('negative');
					_toggleContentActive.slideToggle(500);
					
				});
				
				if( _toggleLink.data('value') == 'active' ){
						
					_toggleLink.trigger('click').removeAttr('data-value');
						
				}
				
			});
			
		});
		
		
	},
	
	_accordion : function(){
		
		var _self = this,
			_accordion = $('.accordion');
			
			_accordion.each(function(i,v){
				var _a  = $(this),
					_at = _a.children('h3'),
					_ac = _a.children('div');
				
				_at.addClass('accordion-title');
				_ac.addClass('accordion-content');
					
				_at.each(function(){
					
					var _an = $(this);
					
					_an.bind('click', function(){
					
						var _aa = $(this);
						if (!_aa.is('.accordion-title-active')) {
							
							_a.children('div').slideUp(500);
							_a.children('h3').removeClass('accordion-title-active');
							
							_aa.addClass('accordion-title-active').next('div.accordion-content').slideDown(500);
						}
					});
					
					
					if( _an.data('value') == 'active' ){
						
						_an.trigger('click').removeAttr('data-value');
						
					}
					
				});
				
			});
		
	},
	
	_tabs : function(){
		
		var _self = this,
			_tabs = $('.tabs');
			
			if(_tabs.length > 0){
				
				_tabs.each(function(x){
					
					var _tabsContainer   = $(this),
						_tabsUl = _tabsContainer.children('ul:first'),
						_tabsContent =  _tabsContainer.children('div');
					
					_tabsUl.addClass('tabs-nav').after('<span class="clear" />');
					
					_tabsContent.each(function(i,v){
						
						$(this).attr('id', 'tabs-'+ x +'-'+ i).addClass('tabs-content');
						
					});	
					
					$('li', _tabsUl).bind('click',function(){
						
						var _id = $(this).index();
						
						$(this).addClass('tabs-active').siblings('li').removeClass('tabs-active');
							
							var activeTabs = _tabsContent.eq(_id);
						
						 	activeTabs.fadeIn(500).siblings('.tabs-content').hide();
						 								
							
						
					});
									 
					$('li:eq(0)', _tabsUl).trigger('click');
					
				});
				
				
			}
						
		
	},
	_tweet : function(){
		
		var _self = this,
			_to =  _self.defaults.twitter,
			_tc = $('.tweet');
			
			_tc.each(function(i){
				
				var _rt = $(this);
				
				_rt.tweet({
					username : _to.username,
					count : _to.limit,					
					template : '{join}{text}{time}'
				}).bind('loaded',function(){
					
					var _tul        = $('ul',_rt),
						_tli        = $('li', _tul),
						_tlfirst    = _tli.eq(0).height(),
						_tsize      = _tli.size(),
						_tcwidth    = _rt.width(),
						_tcontainer = _tcwidth * _tsize,
						_ss = 1,
						_tp = 0,
						Q = new Array();
						
					_tli.css({'width' : _tcwidth - 40});
					_rt.css({'width' : _tcwidth, 'overflow' : 'hidden'});
					_tul.css({'width' : _tcontainer, 'height' : _tlfirst});
					
					var twitnav = $('<div />',{
						'class' : 'tweetnav',
						'html' : '<span class="username"><span class="tweet-arrow"></span><a href="http://twitter.com/'+  _to.username +'">@'+  _to.username +'</a></span> <div class="tweet-navigation"><span class="tweet-prev"></span><span class="tweet-next"></span></div>',
						'id' : 'tweet_nav_' + i
					});
					
					_rt.after(twitnav);
					
					var _nvg = $('#tweet_nav_'+i);
					
					$('.tweet-navigation span.tweet-next', _nvg).bind('click',function(){
						
						if( _ss != _tsize ){
							_tp = (_tcwidth - 20) * _ss;								
															
							_tul.animate({
								marginLeft: '-' + _tp + 'px'									
							}, 500,'easeInOutExpo');
							
							_rt.animate({
								height : _tli.eq(_ss).innerHeight() + 40 +'px'
							},300);								
							
							_ss++;
						}
												
					});
					
					$('.tweet-navigation span.tweet-prev', _nvg).bind('click',function(){
												
						if (_ss > 1) {
							_tp = _tp - (_tcwidth - 20);
							
							_tul.animate({
								marginLeft: '-' + _tp + 'px'									
							}, 500,'easeInOutExpo');
							
							_rt.animate({
								height : _tli.eq(_ss - 2).innerHeight() + 40 +'px'
							},300);								
							
							_ss--;
						}
					});
					
					if(_to.autoplay === true){
						
						var run_time = function(){
							
							Q[i] = setInterval(function(){
								
								if (_ss == _tsize) {
									
									_ss = 1;
								}
								
								$('.tweet-navigation span.tweet-next', _nvg).trigger('click');
								
							}, _to.delay)
							
							
						}
																									
						run_time();						
						
						_rt.bind({
							'mousemove': function(){
								clearInterval(Q[i]);
							},
							'mouseleave': function(){
								run_time();
							}
						});
				
					}
										
				});
				_rt.after('<span class="clear" />');
				
				
			});
	},
	
	_c : function(){
		if (!$.browser.msie) {
			
			console.log(arguments);
			
		}
		
	}
}

$(window).load(function(){
	var n = new noName();
		n._init();
});

(function($){
    $.fn.sorted = function(customOptions){
        var options = {
            reversed: false,
            list: 4,
            by: function(a){
                return a.text();
            }
        };
        $.extend(options, customOptions);
        $data = $(this);
        arr = $data.get();
        arr.sort(function(a, b){
            var valA = options.by($(a));
            var valB = options.by($(b));
            if (options.reversed) {
                return (valA < valB) ? 1 : (valA > valB) ? -1 : 0;
            }
            else {
                return (valA < valB) ? -1 : (valA > valB) ? 1 : 0;
            }
            
        });
        if (options.list != 1) {
            var x = 1;
            $.each(arr, function(i, v){
                if (x == options.list) {
                    $(v).addClass('last');
                    x = 0;
                }
                else {
                    $(v).removeClass('last')
                }
                x++;
            });
        }
        return $(arr);
    };
})(jQuery);