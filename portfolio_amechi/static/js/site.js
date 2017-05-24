/* ===========================================================
 * Main Module
 * ===========================================================
 * Copyright 2016 Amechi Egbe.
 * http://www.amechiegbe.com
 *
 *
 * ========================================================== */

"use strict";

var MainModule = (function ( core, $ ) {

    core.utils = {
        googleEvents: function() {
            $('.home .home-text > .home-text-inner a').on('click', function( event ) {
                var $item = $(this);
                var $itemText = $item.text();

                try {
                    ga('send', 'event', 'click', $itemText + ' link was clicked!');  
                } catch(e) {
                    console.error($itemText + ' click not tracked.');
                }
            });
        }
    };

    //Return public methods
    return core;

})( MainModule || {}, jQuery );

