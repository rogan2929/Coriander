/* 
 * To change this license header, choose License Headers in Project Properties.
 * To change this template file, choose Tools | Templates
 * and open the template in the editor.
 */

/**
 * View for #new-game
 * @type type
 */
var newGameView = {
    /**
     * Draws a border around the 'selected' tile.
     * @param {type} tile
     */
    selectTile: function(tile) {
        $('#new-game .button-tile').removeClass('selected');
        $(tile).addClass('selected');
    }
};