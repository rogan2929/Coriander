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
            width = ($(window).width() - ($(window).width() * 0.15)) / gridSize;
            margin = (width / 12);
            textSize = (width / 3.5);

            html = $('#tile-template').html();

            for (i = 0; i < gridSize * gridSize; i += gridSize) {
                for (j = 0; j < gridSize; j++) {
                    value = tiles[i + j].getValue();
                    index = tiles[i + j].getIndex();

                    tile = $(html).width(width).height(width).css('margin', margin + 'px').css('margin-right', margin / 1.75 + 'px').css('font-size', textSize + 'px').css('line-height', width + 'px').addClass('tile-' + index).text(value).addClass(gameView.colors[value - 1]).appendTo('#tile-container');
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
        var i, index, value, classList, color;

        // "Tag" the tiles that are going to be flipped, and strip them of their color.
        for (i = 0; i < tiles.length; i++) {
            $('.tile-' + tiles[i].getIndex()).addClass('flipme');
        }

        $('.flipme').addClass('flip').empty();

        // Add the color back in.
        for (i = 0; i < tiles.length; i++) {
            index = tiles[i].getIndex();
            value = tiles[i].getValue();

            classList = $('.tile-' + index).attr('class');

            color = classList.substring(classList.indexOf('color'), classList.indexOf('color') + 6);

            $('.tile-' + index).removeClass(color).addClass(gameView.colors[value - 1]);
        }

        setTimeout(function() {
            $('.flipme').removeClass('flip').removeClass('flipme');

            // Display new values and add new color classes.
            for (i = 0; i < tiles.length; i++) {
                index = tiles[i].getIndex();
                value = tiles[i].getValue();

                // Set the tile text.
                //gameView.setTileText('.tile-' + index, value);
                $('.tile-' + index).text(value);
            }

        }, constants.ANIMATION_LENGTH);
    },
    /**
     * Sets the tile text.
     * @param {type} tile
     * @param {type} value
     */
    setTileText: function(tile, value) {
        setTimeout(function() {
            $(tile).text(value);
        }, constants.ANIMATION_LENGTH);
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