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
    flipTile: function(index, value) {
        $('.tile-' + index).text('').addClass('flip');

        setTimeout(function() {
            $('.tile-' + index).removeClass('flip');

            setTimeout(function() {
                $('.tile-' + index).addClass('flipped').text(value);
                
                setTimeout(function() {
                    $('.tile-' + index).removeClass('flipped');
                }, 1250);
            }, 800);
        }, 800);
    },
    /**
     * Loads tiles into the view.
     * @param {type} gridSize
     * @param {type} tiles
     */
    loadTiles: function(gridSize, tiles) {
        var html, i, j, width, tile, index, value;

        $('#tile-container').empty();

        // - (gridSize * 5 * 2) - 10)
        width = ($(window).width() - (gridSize * 5 * 2) - 10) / gridSize;

        html = $('#tile-template').html();

        for (i = 0; i < gridSize * gridSize; i += gridSize) {
            for (j = 0; j < gridSize; j++) {
                value = tiles[i + j].getValue();
                index = tiles[i + j].getIndex();

                tile = $(html).width(width).height(width).css('line-height', width + 'px').addClass('tile-' + index).text(value).appendTo('#tile-container');
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
        $('#score').text('Moves: ' + count);
    },
    /**
     * Update displayed tiles.
     * @param {type} tiles
     */
    updateTiles: function(tiles) {
        var i, index, value;

        for (i = 0; i < tiles.length; i++) {
            index = tiles[i].getIndex();
            value = tiles[i].getValue();

            gameView.flipTile(index, value);
        }
    }
};