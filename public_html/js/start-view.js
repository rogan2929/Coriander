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
        var size, windowWidth, textSize, margin;
        
        windowWidth = $(window).width();
        
        size = ((windowWidth - (windowWidth * 0.40)) / 2);
        
        margin = size / 12;
        
        //textSize = size / 4;

        $('.button-tile').width(size).height(size + 'px').css('margin', margin + 'px').css('margin-right', margin / 3 + 'px');
    },
    /**
     * Flip a button tile.
     * @param {type} tile
     */
    flipTile: function(tile) {
        var html;
        
        html = $(tile).html();

        $(tile).addClass('flip-tile');
        
        setTimeout(function() {
            //$(tile).removeClass('flip');
        }, constants.ANIMATION_LENGTH);
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