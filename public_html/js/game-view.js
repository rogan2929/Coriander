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
    colors: null,
    /**
     * Initialize the view.
     */
    init: function() {
        gameView.colors = [];

        gameView.colors.push('color0');
        gameView.colors.push('color1');
        gameView.colors.push('color2');
        gameView.colors.push('color3');
        gameView.colors.push('color4');
    },
    /**
     * Do a nice little effect upon loading and animate all the tiles.
     */
    animateAllTiles: function() {
        $('.tile').addClass('spin');

        setTimeout(function() {
            $('.tile').removeClass('spin');
        }, 500);
    },
    /**
     * Loads tiles into the view.
     * @param {type} gridSize
     * @param {type} tiles
     */
    loadTiles: function(gridSize, tiles) {
        var html, i, j, width, tile, index, value;

        $('#tile-container').fadeOut(300, function() {
            $('#tile-container .tile').remove();

            // - (gridSize * 5 * 2) - 10)
            width = ($(window).width() - (gridSize * 5 * 2) - 10) / gridSize;

            html = $('#tile-template').html();

            for (i = 0; i < gridSize * gridSize; i += gridSize) {
                for (j = 0; j < gridSize; j++) {
                    value = tiles[i + j].getValue();
                    index = tiles[i + j].getIndex();

                    tile = $(html).width(width).height(width).css('line-height', width + 'px').addClass('tile-' + index).text(value).addClass(gameView.colors[value]).appendTo('#tile-container');
                }
            }

            $('#tile-container').height(gridSize * (width + (5 * 2)) + 'px').fadeIn(300, function() {
                gameView.animateAllTiles();
                // Re-register event hookups.
                eventBus.installHandler('gamePresenter.onTapTile', gamePresenter.onTapTile, '.tile', 'tap');
            });
        });
    },
    /**
     * Show how many moves have been done.
     * @param {type} count
     */
    showMoveCount: function(count) {
        $('#score').text('Moves: ' + count);
    },
    /**
     * Switch a tile's color.
     * @param {Tile} tile
     */
    switchTileColor: function(tile) {
        var i, index, value, delta;

        index = tile.getIndex();
        value = tile.getValue();
        delta = tile.getDelta();

        for (i = 0; i < gameView.colors.length; i++) {
            $('.tile-' + index).removeClass('fade').removeClass(gameView.colors[i]);
        }

        $('.tile-' + index).text('').addClass('fade').addClass('flip');

        setTimeout(function() {
            $('.tile-' + index).removeClass('flip');

            setTimeout(function() {
                $('.tile-' + index).addClass(gameView.colors[value]).text(value);
            }, 500);
        }, 500);

        //$('.tile-' + index).text(value).addClass(gameView.colors[value]);
    },
    /**
     * Update displayed tiles.
     * @param {type} tiles
     */
    updateTiles: function(tiles) {
        var i;

        for (i = 0; i < tiles.length; i++) {
            gameView.switchTileColor(tiles[i]);
        }
    }
};