/* 
 * To change this license header, choose License Headers in Project Properties.
 * To change this template file, choose Tools | Templates
 * and open the template in the editor.
 */

/**
 * Presenter for #game
 * @type type
 */
var gamePresenter = {
    // Constants
    gridSize: 4,
    maxTileSize: 10,
    // Class variables
    moveCount: 0,
    newGame: true,
    tiles: null,
    /**
     * Entry point.
     */
    init: function() {
        if (gamePresenter.newGame) {
            gamePresenter.setMoveCount(0);
            gamePresenter.newGame = false;
            gamePresenter.generateTiles();
            gameView.loadTiles(gamePresenter.gridSize, gamePresenter.tiles);
        }

        //eventBus.installHandler('gamePresenter.onTapTile', gamePresenter.onTapTile, '.tile', 'tap');
        eventBus.installHandler('gamePresenter.onTapTile', gamePresenter.onTapTile, '.tile', 'tap');
        eventBus.installHandler('gamePresenter.onTapholdTile', gamePresenter.onTapholdTile, '.tile', 'taphold');
    },
    /**
     * Evaluate the order of the tiles.
     */
    evaluateState: function() {

    },
    generateTiles: function() {
        var value, i, gridSquare, values;

        values = [];
        gamePresenter.tiles = [];

        gridSquare = gamePresenter.gridSize * gamePresenter.gridSize;

        for (i = 0; i < gridSquare; i++) {
            value = Math.ceil((Math.random() * gamePresenter.maxTileSize));

            // Create a unique random value for the tile.
//            while (values.lastIndexOf(value) !== -1) {
//                value = Math.ceil((Math.random() * gamePresenter.maxTileSize));
//            }

            values.push(value);
            gamePresenter.tiles.push(new Tile(value));
        }

        console.log(gamePresenter.tiles);
    },
    /**
     * Increment the moveCount variable.
     */
    incrementMoveCount: function() {
        gamePresenter.setMoveCount(gamePresenter.moveCount + 1);
    },
    /**
     * Setter for moveCount
     * @param {type} count
     */
    setMoveCount: function(count) {
        gamePresenter.moveCount = count;
        gameView.showMoveCount(count);
    },
//    onTapTile: function(e) {
//        var target, text;
//
//        target = e.currentTarget;
//        text = $(target).text();
//
//        $(target).text('').addClass('flip');
//
//        setTimeout(function() {
//            $(target).removeClass('flip');
//
//            setTimeout(function() {
//                $(target).text(text);
//            }, 800);
//        }, 800);
//    },
    onTapTile: function(e) {
        // Update tiles that are to the left, right, above, and below.
        // Left: -1
        // Right: +1
        // Above: -gridSize
        // Below: +gridSize
        alert('tap');
    },
    onTapholdTile: function(e) {
        alert('taphold');
    }
};
