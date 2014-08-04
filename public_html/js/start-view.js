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
        var size, containerWidth;

        containerWidth = $(window).width();

        size = containerWidth / 2 - 2;

        $('.button-tile').width(size + 'px').height(size + 'px').css('margin-right', '-6px');
        
        $('.tile-container').height(containerWidth);
    },
    /**
     * Flip a button tile.
     * @param {type} tile
     */
    flipTile: function(tile) {
        var html;

        html = $(tile).html();

        // Add the animation class.
        $(tile).addClass('enable-transitions').addClass('flip-tile fadeout');

        // Listen for the animation end event and then remove the class.
        $(tile).one('webkitTransitionEnd otransitionend msTransitionEnd transitionend', function(e) {
            $(tile).removeClass('flip-tile fadeout');

            $(tile).one('webkitTransitionEnd otransitionend msTransitionEnd transitionend', function(e) {
                $(tile).removeClass('enable-transitions');
            });
        });
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