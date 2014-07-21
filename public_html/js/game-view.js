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

        gameView.colors.push('color1');
        gameView.colors.push('color2');
        gameView.colors.push('color3');
        gameView.colors.push('color4');
        gameView.colors.push('color5');
        gameView.colors.push('color6');
        gameView.colors.push('color7');
        gameView.colors.push('color8');
    },
    clearTiles: function() {
        $('#tile-container .tile').remove();
    },
    /**
     * Loads tiles into the view.
     * @param {type} gridSize
     * @param {type} tiles
     */
    loadTiles: function(gridSize, tiles) {
        var html, i, j, width, tile, index, value, margin, textSize;

        $('#tile-container').fadeOut(constants.ANIMATION_LENGTH / 2, function() {
            width = ($(window).width() - ($(window).width() * 0.20)) / gridSize;
            margin = (width / 12);
            textSize = (width / 3.5);

            html = $('#tile-template').html();

            for (i = 0; i < gridSize * gridSize; i += gridSize) {
                for (j = 0; j < gridSize; j++) {
                    value = tiles[i + j].getValue();
                    index = tiles[i + j].getIndex();

                    tile = $(html).width(width).height(width).css('margin', margin + 'px').css('font-size', textSize + 'px').css('line-height', width + 'px').addClass('tile-' + index).addClass(gameView.colors[value - 1]);
                    
                    $(tile).children('.tileface').text(value);
                    
                    $(tile).appendTo('#tile-container');
                }
            }

            $('#tile-container').height(gridSize * (width + (margin)) + 'px').fadeIn(constants.ANIMATION_LENGTH / 2, function() {
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
     * Flip tiles that have been udpated.
     * @param {type} tiles
     */
    flipTiles: function(tiles) {
        var i, index, value;

        // "Tag" the tiles that are going to be flipped.
        for (i = 0; i < tiles.length; i++) {
            index = tiles[i].getIndex();

            $('.tile-' + index).addClass('flipme').removeClass(function(index, css) {
                return (css.match(/\bcolor\S+/g) || []).join(' ');
            });
        }

        // Flip the tile.
        $('.flipme').addClass('enable-transitions').addClass('flip-tile fadeout');

        // Clean up after the animation is run.
        $('.flipme').one('webkitTransitionEnd otransitionend msTransitionEnd transitionend', function(e) {
            for (i = 0; i < tiles.length; i++) {
                index = tiles[i].getIndex();
                value = tiles[i].getValue();

                $('.tile-' + index).addClass(gameView.colors[value - 1]).children('.tileface').text(value);
            }

            $('.flipme').removeClass('flip-tile fadeout');

            $('.flipme').one('webkitTransitionEnd otransitionend msTransitionEnd transitionend', function(e) {
                $('.flipme').removeClass('enable-transitions').removeClass('flipme');
            });
        });
    },
    /**
     * Update displayed tiles.
     * @param {type} tiles
     */
    updateTiles: function(tiles) {
        gameView.playFlipEffect();
        gameView.flipTiles(tiles);
    }
};