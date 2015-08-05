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

    core.pageTransitionApi = {
       
        isAnimating: false,
        
        firstLoad: false,

        bodyTag: $('body'),

        loadingBar: $('.cd-loading-bar'),

        siteWrapper: $('#meechWrapper'),

        loadingContainer: $('.sqs-switch-content'),

        init: function() {
            this.trigger();
        },
        trigger: function() {
            var _self = this;
            
            _self.siteWrapper.on('click', '[data-type="page-transition"]', function( event ) {
                
                event.preventDefault();

                //shows the current route of the page
                var newPage = $(this).attr('href');

                if( !_self.isAnimating ) _self.changePage( newPage, true );
            
                
                _self.firstLoad = true;

            });

            
            //detect the 'popstate' event - e.g. user clicking the back button
            $(window).on('popstate', function() {
                
                if( _self.firstLoad ) {
                  /*
                  Safari emits a popstate event on page load - check if firstLoad is true before animating
                  if it's false - the page has just been loaded 
                  */
                  var newPageArray = location.pathname.split(),
                    //this is the url of the page to be loaded 
                    newPage = newPageArray[newPageArray.length - 1];
                  if( !_self.isAnimating ) _self.changePage(newPage, false);
                
                }
               
                _self.firstLoad = true;
            
            });
        },
        changePage: function( url, bool ) {
            var _self = this;

            _self.isAnimating = true;

            _self.bodyTag.addClass('page-is-changing');

            _self.loadingBar.on('webkitTransitionEnd otransitionend oTransitionEnd msTransitionEnd transitionend', function(){
                
                _self.loadNewContent( url, bool );
                
                _self.loadingBar.off('webkitTransitionEnd otransitionend oTransitionEnd msTransitionEnd transitionend');

            });

            if( !_self.transitionsSupported() ) isAnimating = false;

        },
        loadNewContent: function( url, bool ) {
            var _self = this;

            url = ( '' == url ) ? '/' : url;

            var newSection = 'sqs-page-' + url.slice(1),
                currentSection = $('<div class="'+ newSection +'"></div>');

                console.log(url, newSection);

                currentSection.load( url + ' .sqs-switch-content > *', function( event ) {

            
                    _self.loadingContainer.html(currentSection);
                    
                    //if browser doesn't support CSS transitions - dont wait for the end of transitions
                    var delay = ( _self.transitionsSupported() ) ? 1200 : 0;
                    
                    setTimeout(function(){

                        $('body').removeClass('page-is-changing');
                        
                        $('.cd-loading-bar').one('webkitTransitionEnd otransitionend oTransitionEnd msTransitionEnd transitionend', function(){
                          
                            _self.isAnimating = false;
                         
                            $('.cd-loading-bar').off('webkitTransitionEnd otransitionend oTransitionEnd msTransitionEnd transitionend');
                        
                        });

                        if( !_self.transitionsSupported() ) _self.isAnimating = false;
                    
                    }, delay);

                    if( url != window.location && bool ){
                        
                        //add the new page to the window.history
                        //if the new page was triggered by a 'popstate' event, don't add it
                        window.history.pushState({path: url},'',url);
                    }
                
                });
        },
        transitionsSupported: function() {
            return $('html').hasClass('csstransitions');
        }

    },
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
        },
        navigation: function() {



            // var routes = this.menuItems,
            //     homeRoute = '/home';


            // window.history.pushState({urlPath:homeRoute},"", homeRoute);

            // if( window.location.href + routes != homeRoute && !this.navopen ) return false;

            // // this.toggle();
            
            // console.log(routes);
        }

    },
    core.scrollTopApi = {

        elScroll: $('#scrollTop'),
        
        init:function() {
            this.scrollTop();
        },
        scrollTop:function() {
            
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
    }

    //Return Public Method
    return core;
    
})( MeechInitilazer || {}, jQuery, _ );




