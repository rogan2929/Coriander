/* 
 * To change this license header, choose License Headers in Project Properties.
 * To change this template file, choose Tools | Templates
 * and open the template in the editor.
 */

/**
 * View for #more-options
 * @type type
 */
var moreOptionsView = {
    /**
     * Draws a border around the 'selected' tile.
     * @param {type} tile
     */
    selectTile: function(tile) {
        $('#more-options .button-tile').removeClass('selected');
        $(tile).addClass('selected');
    },
    /**
     * Sets the slider's displayed value and refreshes it.
     * @param {type} value
     */
    setSliderColorCountValue: function(value) {
        $('#slider-color-count').val(value).slider('refresh');
    }
};