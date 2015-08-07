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

    core.menuApi = {

        navopen: false,
        
        tween: false,

        siteBody: $('body'),

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

            // close icon
            this.iconTimeline = new TimelineMax({ tweens:[

                TweenMax.fromTo(this.iconTline, .4, {y:'-3%'}, { rotation:-45, y:0, top:'50%', ease:Cubic.easeOut }),
                TweenMax.to(this.iconMline, .3, { width:'0%', opacity:0, ease:Cubic.easeOut }),
                TweenMax.fromTo(this.iconBline, .4, {y:'3%'}, { rotation:45, y:0, top:'50%', ease:Cubic.easeOut })
            
            ], paused:true });

            // nav open
            this.panelTimeline = new TimelineMax({ tweens:[
                TweenMax.to(this.panel, .7, {x:'0%', ease:Cubic.easeInOut }),
                new TimelineMax({ tweens:[
                    TweenMax.allFrom(this.menuItems, .35, { x:'100%', ease:Cubic.easeOut }, .06),
                    TweenMax.allFromTo(this.menuItems.find('a'), .35, { opacity:0 }, { opacity:1, ease:Cubic.easeOut }, .06)
                ], delay:.6 })
            ], paused:true,
                onStart:_.bind(function () {
                    this.menuHeader.css({position:'fixed'});
                    this.siteBody.css({overflow:'hidden'});
                    this.resize();
                }, this),
                onComplete:_.bind(function () {
                   
                    this.tween = false;
                
                }, this),
                onReverseComplete:_.bind(function () {
                    this.tween = false;
                    this.menuHeader.css({position:'relative',height:'0%'});
                    this.siteBody.css({overflow:'visible'});
                }, this) });

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
            var heightHeader = this.navopen ? winH : 0;

            this.menuHeader.css({height:heightHeader});
            this.menuContainer.css({height:winH});
        }

    },
    core.scrollTopApi = {

        elScroll: $('#scrollTop'),
        
        init:function() {
            this.scrollTop();
        },
        scrollTop:function() {
            
            var _self = this;
            
            _self.elScroll.on('click', function() {
                $('html, body').animate({
                    scrollTop:0
                }, 600);
                return false;
            });
        }
    }

    //Return Public Method
    return core;
    
})( MeechInitilazer || {}, jQuery, _ );




