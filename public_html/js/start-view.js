/* 
 * To change this license header, choose License Headers in Project Properties.
 * To change this template file, choose Tools | Templates
 * and open the template in the editor.
 */

/**
 * View for #start
 * @type type
 */
var startView = {
    /**
     * Make them there button tiles all perdy.
     */
    configureButtonTiles: function() {
        var size, windowWidth, textSize;
        
        windowWidth = $(window).width();
        
        size = ((windowWidth - (windowWidth * 0.30)) / 2) - 20;
        
        textSize = size / 5;
        
        size += 'px';

        //$('.button-tile').width(size).height(size).css('line-height', size).css('font-size', textSize);
        $('.button-tile').width(size).height(size).css('font-size', textSize);
    },
    /**
     * Flip a button tile.
     * @param {type} tile
     */
    flipTile: function(tile) {
        var html;
        
        html = $(tile).html();
        
        $(tile).html('').addClass('fade').addClass('flip');

        setTimeout(function() {
            $(tile).removeClass('flip');

            setTimeout(function() {
                $(tile).html(html);
            }, 500);
        }, 500);
    },
    
    navigateTo: function(page) {
        $('body').pagecontainer('change', '#' + page);
    },
    /**
     * Enable/disable the resume button.
     * @param {type} enable
     */
    toggleButtonResume: function(enable) {
        if (enable) {
            $('#tile-game').removeClass('ui-state-disabled');
        }
        else {
            $('#tile-game').addClass('ui-state-disabled');
        }
    }
};