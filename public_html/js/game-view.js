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
    TRANSITION_LENGTH: 300,
    colors: null,
    /**
     * Initialize the view.
     */
    init: function() {
        gameView.colors = [];

        gameView.colors.push('color1');
        gameView.colors.push('color2');
        gameView.colors.push('color3');
        gameView.colors.push('color4');
        gameView.colors.push('color5');
        gameView.colors.push('color6');
        gameView.colors.push('color7');
        gameView.colors.push('color8');
    },
    /**
     * Do a nice little effect upon loading and animate all the tiles.
     */
    animateAllTiles: function() {
        $('.tile').addClass('flip');

        setTimeout(function() {
            $('.tile').removeClass('flip');
        }, gameView.TRANSITION_LENGTH);
    },
    /**
     * Loads tiles into the view.
     * @param {type} gridSize
     * @param {type} tiles
     */
    loadTiles: function(gridSize, tiles) {
        var html, i, j, width, tile, index, value;

        $('#tile-container').fadeOut(gameView.TRANSITION_LENGTH / 2, function() {
            $('#tile-container .tile').remove();

            // - (gridSize * 5 * 2) - 10)
            width = ($(window).width() - (gridSize * 5 * 2) - 10) / gridSize;

            html = $('#tile-template').html();

            for (i = 0; i < gridSize * gridSize; i += gridSize) {
                for (j = 0; j < gridSize; j++) {
                    value = tiles[i + j].getValue();
                    index = tiles[i + j].getIndex();

                    tile = $(html).width(width).height(width).css('line-height', width + 'px').addClass('tile-' + index).text(value).addClass(gameView.colors[value - 1]).appendTo('#tile-container');
                }
            }

            $('#tile-container').height(gridSize * (width + (5 * 2)) + 'px').fadeIn(gameView.TRANSITION_LENGTH / 2, function() {
                gameView.animateAllTiles();
                // Re-register event hookups.
                eventBus.installHandler('gamePresenter.onTapTile', gamePresenter.onTapTile, '.tile', 'tap');
                eventBus.installHandler('gamePresenter.onTapHoldTile', gamePresenter.onTapHoldTile, '.tile', 'taphold');
            });
        });
    },
    /**
     * Play the associated flipping sound.
     */
    playFlipEffect: function() {
//        var flipeffect = new Audio('flip.mp3');
//        flipeffect.play();
    },
    /**
     * Show how many moves have been done.
     * @param {type} count
     */
    showMoveCount: function(count) {
        $('#score').text('Flips: ' + count);
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
            $('.tile-' + index).removeClass(gameView.colors[i]);
        }

        $('.tile-' + index).text('').addClass('flip');

        setTimeout(function() {
            $('.tile-' + index).removeClass('flip');

            setTimeout(function() {
                $('.tile-' + index).addClass(gameView.colors[value - 1]).text(value);
            }, gameView.TRANSITION_LENGTH);
        }, gameView.TRANSITION_LENGTH);

        //$('.tile-' + index).text(value).addClass(gameView.colors[value]);
    },
    /**
     * Update displayed tiles.
     * @param {type} tiles
     */
    updateTiles: function(tiles) {
        var i;
        
        gameView.playFlipEffect();

        for (i = 0; i < tiles.length; i++) {
            gameView.switchTileColor(tiles[i]);
        }
    }
};