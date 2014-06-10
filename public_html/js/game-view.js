/* 
 * To change this license header, choose License Headers in Project Properties.
 * To change this template file, choose Tools | Templates
 * and open the template in the editor.
 */


/**
 * View for #game.
 * @type type
 */
var gameView = {
    /**
     * Loads tiles into the view.
     * @param {type} gridSize
     * @param {type} values
     */
    loadTiles: function(gridSize, values) {
        var html, i, j, width, tile;

        $('#tile-container').empty();

        // - (gridSize * 5 * 2) - 10)
        width = ($(window).width() - (gridSize * 5 * 2) - 10) / gridSize;

        html = $('#tile-template').html();

        for (i = 0; i < gridSize * gridSize; i += gridSize) {
            for (j = 0; j < gridSize; j++) {
                tile = $(html).width(width).height(width).css('line-height', width + 'px').text(values[i + j]).appendTo('#tile-container');
            }
        }
        
        var height = (width + (1 * 2));
        console.log(height);
        
        $('#tile-container').height(gridSize * height + 'px');
    },
    showMoveCount: function(count) {
        $('#score').text('Moves: ' + count);
    }
};