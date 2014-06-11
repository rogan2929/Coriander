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
     * @param {type} tiles
     */
    loadTiles: function(gridSize, tiles) {
        var html, i, j, width, tile;

        $('#tile-container').empty();

        // - (gridSize * 5 * 2) - 10)
        width = ($(window).width() - (gridSize * 5 * 2) - 10) / gridSize;

        html = $('#tile-template').html();

        for (i = 0; i < gridSize * gridSize; i += gridSize) {
            for (j = 0; j < gridSize; j++) {
                tile = $(html).width(width).height(width).css('line-height', width + 'px').text(tiles[i + j]).appendTo('#tile-container');
            }
        }

        $('#tile-container').height(gridSize * (width + (1 * 2)) + 'px');
    },
    /**
     * Do a nice little effect upon loading and animate all the tiles.
     */
    spinAllTiles: function() {
        $('.tile').addClass('spin');

        setTimeout(function() {
            $('.tile').removeClass('spin');
        }, 800);
    },
    /**
     * Show how many moves have been done.
     * @param {type} count
     */
    showMoveCount: function(count) {
        $('#score').text('MOVES: ' + count);
    },
    /**
     * Update displayed tiles.
     * @param {type} tiles
     */
    updateTiles: function(tiles) {
        
    }
};