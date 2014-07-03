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
    TRANSITION_LENGTH: 500,
    
    /**
     * Make them there button tiles all perdy.
     */
    configureButtonTiles: function() {
        var size, windowWidth, textSize, margin;
        
        windowWidth = $(window).width();
        
        size = ((windowWidth - (windowWidth * 0.40)) / 2);
        
        margin = size / 20;
        
        //textSize = size / 4;
        
        size += 'px';
        margin += 'px';

        //$('.button-tile').width(size).height(size).css('line-height', size).css('font-size', textSize);
        //$('.button-tile').width(size).height(size).css('font-size', textSize).css('margin', margin);
        $('.button-tile').width(size).height(size).css('margin', margin);
    },
    /**
     * Flip a button tile.
     * @param {type} tile
     */
    flipTile: function(tile) {
        var html, color, classList;
        
        html = $(tile).html();
        
        classList = $(tile).attr('class');

        color = classList.substring(classList.indexOf('color'), classList.indexOf('color') + 6);
        
        $(tile).removeClass(color);

        $(tile).empty().addClass('fade').addClass('flip');

        setTimeout(function() {
            $(tile).removeClass('flip');

            setTimeout(function() {
                $(tile).html(html).addClass(color);
            }, startView.TRANSITION_LENGTH);
        }, startView.TRANSITION_LENGTH);
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