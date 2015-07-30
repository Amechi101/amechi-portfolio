/**

    Site: The Meech
    Version: 1.0.0
    Author: Amechi Egbe
    Website: http://amechiegbe.com
    Email: amechiegbe@gmail.com
 
 **/

"use strict";

//To avoid namespace collision
var MeechInitilazer = (function ( core, $, _ ) {

    /***
     *Public Access
     ****/
    core.scrollTopApi = {

        elScroll: $('#scrollTop'),

        init:function() {
            this.scrollUp();
        },
        scrollUp:function() {

            var _self = this;
            
            $(window).scroll(function() {
                
                if( $(this).scrollTop() > 100 ) {
                    _self.elScroll.fadeIn();
                } else {
                    _self.elScroll.fadeOut();
                }
            
            });

            _self.elScroll.on('click', function() {
                
                $('html, body').animate({
                    scrollTop:0
                }, 600);
               
                return false;
            });

        }    
    },
    core.menuApi = {

        navopen: false,
        
        tween: false,

        menuHeader: $('#meechHeader'),
        
        menuIcon: $('#nav-icon'),

        menuContainer: $('.nav-cont'),

        panel: $('#panel'),

        menuItems: $('#main-nav li'),
        
        init:function() {
            this.create();
            this.toggle();
        },
        create: function() {
        
            this.iconTline = $('<span class="line tline" />').css({top:'20%'}).appendTo(this.menuIcon);
            this.iconMline = $('<span class="line mline" />').css({top:'50%'}).appendTo(this.menuIcon);
            this.iconBline = $('<span class="line bline" />').css({top:'80%'}).appendTo(this.menuIcon);
            
            this.menuIcon.append($('<div class="icon-bounds" >'));

            // close icons
            this.iconTimeline = new TimelineMax({ tweens:[

                TweenMax.fromTo(this.iconTline, .4, {y:'-3%'}, { rotation:-45, y:0, top:'50%',background:'#FFFFFF', ease:Cubic.easeOut }),
                TweenMax.to(this.iconMline, .3, { width:'0%', opacity:0, ease:Cubic.easeOut }),
                TweenMax.fromTo(this.iconBline, .4, {y:'3%'}, { rotation:45, y:0, top:'50%',background:'#FFFFFF', ease:Cubic.easeOut })
            
            ], paused:true });


            // nav open
            this.panelTimeline = new TimelineMax({ tweens:[
                TweenMax.to(this.panel, .7, {x:'0%', ease:Cubic.easeInOut }),
                new TimelineMax({ tweens:[
                    TweenMax.allFrom(this.menuItems.find('a'), .35, { y:'100%', ease:Cubic.easeOut }, .06),
                    TweenMax.allFromTo(this.menuItems.find('a'), .35, { opacity:0 }, { opacity:1, ease:Cubic.easeOut }, .06)
                ], delay:.6 })
            ], paused:true,
                onStart:_.bind(function () {
                    this.menuHeader.css({position:'fixed'});
                    this.resize();
                }, this),
                onComplete:_.bind(function () {
                   
                    this.tween = false;
                
                }, this),
                onReverseComplete:_.bind(function () {
                    this.tween = false;
                    
                    this.menuHeader.css({position:'relative',height:'0%'});

                
                }, this) });

            this.panel.data('timeline', this.panelTimeline);
            this.resize();

        },
        toggle:function() {

            var _self = this;

            _self.menuIcon.on('click', function( event ) {
                var target = _.isUndefined( event ) ? _self.menuIcon : $(event.currentTarget);

                if( target.attr('id') == 'nav-icon') {
                    if (!_self.navopen) {
                       
                        _self.navopen = true;
                        _self.tween = true;
                        
                        _self.iconTimeline[_self.navopen ? 'play' : 'reverse']();
                        _self.panelTimeline[_self.navopen ? 'play' : 'reverse']();
                        
                        TweenMax.set(_self.menuIcon, {rotation:0});
                        
                        } else {
                            
                            _self.navopen = !_self.navopen;
                            _self.tween = true;
                            
                            _self.iconTimeline.reverse();
                            _self.panelTimeline.reverse();
                            
                            TweenMax.set(_self.menuIcon, {rotation:0});

                        }
                    }
            });
        },
        resize : function () {

            var winH = $(window).height();
            var h = this.navopen ? winH : 0;

            this.menuHeader.css({height:h});
            this.menuContainer.css({height:winH});
        }

    }

    //Return Public Method
    return core;
    
})( MeechInitilazer || {}, jQuery, _ );



