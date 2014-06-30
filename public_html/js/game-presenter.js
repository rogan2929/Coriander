/* 
 * To change this license header, choose License Headers in Project Properties.
 * To change this template file, choose Tools | Templates
 * and open the template in the editor.
 */

/**
 * An enum for difficulty levels.
 * @type type
 */
var sizes = {
    small: 'small',
    regular: 'regular',
    medium: 'medium',
    large: 'large'
};

/**
 * Presenter for #game
 * @type type
 */
var gamePresenter = {
    // Constants
    MIN_TILE_SIZE: 1,
    MAX_TILE_SIZE: 4,
    SAVE_STATE_TIME: 5000,
    TAP_TIMEOUT: 600,
    // Class variables
    gridSize: 3,
    moveCount: 0,
    gridName: null,
    tiles: null,
    tapTimeout: null,
    saveStateInterval: null,
    victoryAchieved: null,
    /**
     * Entry point.
     */
    init: function() {
        gameView.init();

        if (startPresenter.getNewGame()) {
            gamePresenter.setMoveCount(0);
            startPresenter.setNewGame(false);
            gamePresenter.generateTiles();

            switch (gamePresenter.gridSize) {
                case 3:
                    gamePresenter.gridName = sizes.small;
                    break;
                case 4:
                    gamePresenter.gridName = sizes.regular;
                    break;
                case 5:
                    gamePresenter.gridName = sizes.medium;
                    break;
                case 6:
                    gamePresenter.gridName = sizes.large;
                    break;
            }
        }

        gamePresenter.victoryAchieved = false;

        gameView.loadTiles(gamePresenter.gridSize, gamePresenter.tiles);

        // Immediate save the game state and then start the interval.
        gamePresenter.saveState();

        // Auto save every ten seconds.
        gamePresenter.saveStateInterval = setInterval(gamePresenter.saveState, gamePresenter.SAVE_STATE_TIME);

        eventBus.installHandler('gamePresenter.onTapTile', gamePresenter.onTapTile, '.tile', 'tap');
        eventBus.installHandler('gamePresenter.onTapHoldTile', gamePresenter.onTapHoldTile, '.tile', 'taphold');
        eventBus.installHandler('gamePresenter.onTapButtonShuffle', gamePresenter.onTapButtonShuffle, '#button-shuffle', 'tap');
    },
    /**
     * Clears the save state interval.
     */
    clearIntervals: function() {
        clearInterval(gamePresenter.saveStateInterval);
        gamePresenter.saveStateInterval = null;
    },
    /**
     * Check if all tiles have the same value.
     */
    evaluateState: function() {
        var value, i, allMatch, score, topScore;

        allMatch = true;

        value = gamePresenter.tiles[0].getValue();

        for (i = 1; i < gamePresenter.tiles.length; i++) {
            if (gamePresenter.tiles[i].getValue() !== value) {
                allMatch = false;
                break;
            }
        }

        if (allMatch) {
            // Do a victory dance, or something.
            //alert('You won!');
            score = new Score(gamePresenter.moveCount, gamePresenter.gridName);
            topScore = model.getTopScore(gamePresenter.gridName);

            // If a new top score has been reached.
            if (score.moves < topScore || topScore === null) {
                model.saveTopScore(score);
                victoryPresenter.setNewRecord(true);
            }
            else {
                victoryPresenter.setNewRecord(false);
            }

            // Clear the save timer.
            gamePresenter.clearIntervals();

            // Delete saved gamestate.
            model.clearGameState();

            gamePresenter.victoryAchieved = true;

            victoryPresenter.setScore(score);
            $('body').pagecontainer('change', '#victory');
        }
    },
    /**
     * Begins flipping calculations.
     * @param {type} target
     * @param {type} hold
     */
    flipTiles: function(target, hold) {
        var value, index, classList;

        if (gamePresenter.tapTimeout === null) {
            // Implement some throttling on tile tapping. This prevents glitches during animations.
            gamePresenter.tapTimeout = setTimeout(gamePresenter.tapTimeoutFunction, gamePresenter.TAP_TIMEOUT);

            value = parseInt($(target).text());
            classList = $(target).attr('class');

            index = parseInt(classList.substring(classList.indexOf('tile-') + 5, classList.indexOf('tile-') + 7));

            gamePresenter.updateTileValues(index, hold);
        }
    },
    /**
     * Generate tile values and colors.
     */
    generateTiles: function() {
        var value, i, gridSquare, values;

        values = [];
        gamePresenter.tiles = [];

        gridSquare = gamePresenter.gridSize * gamePresenter.gridSize;

        for (i = 0; i < gridSquare; i++) {
            value = Math.ceil((Math.random() * gamePresenter.MAX_TILE_SIZE));

            values.push(value);
            gamePresenter.tiles.push(new Tile(value, i, gamePresenter.MIN_TILE_SIZE, gamePresenter.MAX_TILE_SIZE));
        }
    },
    /**
     * Increment the moveCount variable.
     */
    incrementMoveCount: function() {
        gamePresenter.setMoveCount(gamePresenter.moveCount + 1);
    },
    /**
     * Saves the current gameState to local storage.
     */
    saveState: function() {
        var gameState;

        if (!gamePresenter.victoryAchieved) {
            gameState = new GameState(gamePresenter.tiles, gamePresenter.gridSize, new Score(gamePresenter.moveCount, gamePresenter.gridName));

            model.saveGameState(gameState);
        }
    },
    /**
     * Setter for gameState.
     * @param {GameState} gameState
     */
    setGameState: function(gameState) {
        var i;

        gamePresenter.tiles = [];

        for (i = 0; i < gameState.tiles.length; i++) {
            gamePresenter.tiles.push(new Tile(gameState.tiles[i].value, gameState.tiles[i].index, gameState.tiles[i].min, gameState.tiles[i].max));
        }

        gamePresenter.gridSize = gameState.gridSize;
        gamePresenter.setMoveCount(gameState.score.moves);
        gamePresenter.gridName = gameState.score.size;
    },
    /**
     * Setter for gridSize
     * @param {type} gridSize
     */
    setGridSize: function(gridSize) {
        gamePresenter.gridSize = gridSize;
    },
    /**
     * Setter for moveCount
     * @param {type} count
     */
    setMoveCount: function(count) {
        gamePresenter.moveCount = count;
        gameView.showMoveCount(count);
    },
    /**
     * Shuffles all the tiles.
     */
    shuffleTiles: function() {
        var i;

        // Call our handy shuffle function. This is just brill.
        gamePresenter.tiles.shuffle();

        for (i = 0; i < gamePresenter.tiles.length; i++) {
            gamePresenter.tiles[i].setIndex(i);
        }

        // Load the tiles in the new order.
        gameView.loadTiles(gamePresenter.gridSize, gamePresenter.tiles);
    },
    /**
     * Timeout function.
     */
    tapTimeoutFunction: function() {
        clearTimeout(gamePresenter.tapTimeout);
        gamePresenter.tapTimeout = null;
    },
    /**
     * Update tile values.
     * @param {type} index
     * @param {type} alt
     */
    updateTileValues: function(index, alt) {
        // Update tiles that are to the left, right, above, and below.
        // Left: -1
        // Right: +1
        // Above: -gridSize
        // Below: +gridSize

        var updatedTiles;

        updatedTiles = [];

        if (!alt) {
            gamePresenter.tiles[index].incrementValue();
            updatedTiles.push(gamePresenter.tiles[index]);
        }

        // Left tile.
        if (index - 1 >= 0 && index % gamePresenter.gridSize !== 0) {
            gamePresenter.tiles[index - 1].incrementValue();
            updatedTiles.push(gamePresenter.tiles[index - 1]);
        }

        // Right tile
        if (index + 1 < gamePresenter.tiles.length && (index + 1) % (gamePresenter.gridSize) !== 0) {
            gamePresenter.tiles[index + 1].incrementValue();
            updatedTiles.push(gamePresenter.tiles[index + 1]);
        }

        // Above tile
        if (index - gamePresenter.gridSize >= 0) {
            gamePresenter.tiles[index - gamePresenter.gridSize].incrementValue();
            updatedTiles.push(gamePresenter.tiles[index - gamePresenter.gridSize]);
        }

        // Below tile
        if (index + gamePresenter.gridSize < gamePresenter.tiles.length) {
            gamePresenter.tiles[index + gamePresenter.gridSize].incrementValue();
            updatedTiles.push(gamePresenter.tiles[index + gamePresenter.gridSize]);
        }

//        gamePresenter.tiles[index].incrementValue();
//        updatedTiles.push(gamePresenter.tiles[index]);
//
//        if (alt) {
//            // Indicates the user held.
//
//            // Upper Left
//            // index - gridSize - 1
//            // index % gamePresenter.gridSize !== 0
//            // index - gamePresenter.gridSize >= 0
//            if (index - 1 >= 0 && index % gamePresenter.gridSize !== 0 && index - gamePresenter.gridSize >= 0) {
//                gamePresenter.tiles[index - gamePresenter.gridSize - 1].incrementValue();
//                updatedTiles.push(gamePresenter.tiles[index - gamePresenter.gridSize - 1]);
//            }
//
//            // Upper Right
//            // index - gridSize + 1
//            // (index + 1) % (gamePresenter.gridSize) !== 0
//            // index - gamePresenter.gridSize >= 0
//            if (index + 1 < gamePresenter.tiles.length && (index + 1) % (gamePresenter.gridSize) !== 0 && index - gamePresenter.gridSize >= 0) {
//                gamePresenter.tiles[index - gamePresenter.gridSize + 1].incrementValue();
//                updatedTiles.push(gamePresenter.tiles[index - gamePresenter.gridSize + 1]);
//            }
//
//            // Below Left
//            // index + gridSize - 1
//            // index % gamePresenter.gridSize !== 0
//            // index + gamePresenter.gridSize < gamePresenter.tiles.length
//            if (index - 1 >= 0 && index % gamePresenter.gridSize !== 0 && index + gamePresenter.gridSize < gamePresenter.tiles.length) {
//                gamePresenter.tiles[index + gamePresenter.gridSize - 1].incrementValue();
//                updatedTiles.push(gamePresenter.tiles[index + gamePresenter.gridSize - 1]);
//            }
//
//            // Below Right
//            // index + gridSize + 1
//            // (index + 1) % (gamePresenter.gridSize) !== 0
//            // index + gamePresenter.gridSize < gamePresenter.tiles.length
//            if (index + 1 < gamePresenter.tiles.length && (index + 1) % (gamePresenter.gridSize) !== 0 && index + gamePresenter.gridSize < gamePresenter.tiles.length) {
//                gamePresenter.tiles[index + gamePresenter.gridSize + 1].incrementValue();
//                updatedTiles.push(gamePresenter.tiles[index + gamePresenter.gridSize + 1]);
//            }
//        }
//        else {
//            // Left tile.
//            if (index - 1 >= 0 && index % gamePresenter.gridSize !== 0) {
//                gamePresenter.tiles[index - 1].incrementValue();
//                updatedTiles.push(gamePresenter.tiles[index - 1]);
//            }
//
//            // Right tile
//            if (index + 1 < gamePresenter.tiles.length && (index + 1) % (gamePresenter.gridSize) !== 0) {
//                gamePresenter.tiles[index + 1].incrementValue();
//                updatedTiles.push(gamePresenter.tiles[index + 1]);
//            }
//
//            // Above tile
//            if (index - gamePresenter.gridSize >= 0) {
//                gamePresenter.tiles[index - gamePresenter.gridSize].incrementValue();
//                updatedTiles.push(gamePresenter.tiles[index - gamePresenter.gridSize]);
//            }
//
//            // Below tile
//            if (index + gamePresenter.gridSize < gamePresenter.tiles.length) {
//                gamePresenter.tiles[index + gamePresenter.gridSize].incrementValue();
//                updatedTiles.push(gamePresenter.tiles[index + gamePresenter.gridSize]);
//            }
//        }

        // Edge detection:
        // Left edge: index % gamePresenter.gridSize !== 0
        // Right edge: (index + 1) % (gamePresenter.gridSize) !== 0
        // Top edge: index - gamePresenter.gridSize >= 0
        // Bottom edge: index + gamePresenter.gridSize < gamePresenter.tiles.length


        // Update tiles on the view.
        gameView.updateTiles(updatedTiles);

        // Increment move count
        gamePresenter.incrementMoveCount();

        setTimeout(function() {
            // Evaluate Game Status.
            gamePresenter.evaluateState();
        }, gamePresenter.TAP_TIMEOUT + 100);
    },
    onTapButtonShuffle: function(e) {
        if (gamePresenter.tapTimeout === null) {
            // Implement some throttling on tile tapping. This prevents glitches during animations.
            gamePresenter.tapTimeout = setTimeout(gamePresenter.tapTimeoutFunction, gamePresenter.TAP_TIMEOUT);

            // Shuffle the tiles and increment move count.
            gamePresenter.shuffleTiles();
            gamePresenter.incrementMoveCount();
        }
    },
    onTapTile: function(e) {
        gamePresenter.flipTiles(e.currentTarget, false);
    },
    onTapHoldTile: function(e) {
        gamePresenter.flipTiles(e.currentTarget, true);
    }
};
