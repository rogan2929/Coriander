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
    large: 'large',
    huge: 'huge'
};

/**
 * Presenter for #game
 * @type type
 */
var gamePresenter = {
    // Constants
    MIN_TILE_SIZE: 1,
    SAVE_STATE_TIME: 5000,
    // Class variables
    gridSize: 3,
    moveCount: 0,
    gridName: null,
    tiles: null,
    tapTimeout: null,
    saveStateInterval: null,
    victoryAchieved: null,
    gameMode: null,
    maxTileSize: 4,
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
                    gamePresenter.gridName = sizes.large;
                    break;
                case 6:
                    gamePresenter.gridName = sizes.huge;
                    break;
            }
        }

        gamePresenter.victoryAchieved = false;

        gameView.clearTiles();
        gameView.loadTiles(gamePresenter.gridSize, gamePresenter.tiles);

        // Immediate save the game state and then start the interval.
        gamePresenter.saveState();

        // Auto save every ten seconds.
        gamePresenter.saveStateInterval = setInterval(gamePresenter.saveState, gamePresenter.SAVE_STATE_TIME);

        eventBus.installHandler('gamePresenter.onTapTile', gamePresenter.onTapTile, '.tile', 'tap');
        eventBus.installHandler('gamePresenter.onTapHoldTile', gamePresenter.onTapHoldTile, '.tile', 'taphold');
        eventBus.installHandler('gamePresenter.onTapButtonShuffle', gamePresenter.onTapButtonShuffle, '#button-shuffle', 'tap');
        eventBus.installHandler('gamePresenter.onTapButtonMain', gamePresenter.onTapButtonMain, '#button-main', 'tap');
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
            gamePresenter.tapTimeout = setTimeout(gamePresenter.tapTimeoutFunction, constants.TAP_TIMEOUT);

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
            value = Math.ceil((Math.random() * gamePresenter.maxTileSize));

            values.push(value);
            gamePresenter.tiles.push(new Tile(value, i, gamePresenter.MIN_TILE_SIZE, gamePresenter.maxTileSize));
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
            gameState = new GameState(gamePresenter.tiles,
                    gamePresenter.gridSize,
                    new Score(gamePresenter.moveCount, gamePresenter.gridName),
                    gamePresenter.gameMode,
                    gamePresenter.maxTileSize
                    );

            model.saveGameState(gameState);
        }
    },
    setGameMode: function(mode) {
        gamePresenter.gameMode = mode;
    },
    /**
     * Setter for gameState.
     * @param {GameState} gameState
     */
    setGameState: function(gameState) {
        var i, tiles;

        gamePresenter.tiles = [];

        tiles = gameState.tiles;

        for (i = 0; i < gameState.tiles.length; i++) {
            gamePresenter.tiles.push(new Tile(tiles[i].value, tiles[i].index, tiles[i].min, tiles[i].max));
        }

        gamePresenter.gridSize = gameState.gridSize;
        gamePresenter.setMoveCount(gameState.score.moves);
        gamePresenter.gridName = gameState.score.size;
        gamePresenter.gameMode = gameState.mode;
        gamePresenter.maxTileSize = gameState.maxTileSize;

        // Check for valid game mode.
        if (!gamePresenter.gameMode) {
            gamePresenter.gameMode = 0;
        }

        // Check for valid max tile size. (Needed for update.)
        if (!gamePresenter.maxTileSize) {
            gamePresenter.maxTileSize = 4;
        }
    },
    /**
     * Setter for gridSize
     * @param {type} gridSize
     */
    setGridSize: function(gridSize) {
        gamePresenter.gridSize = gridSize;
    },
    /**
     * Setter for maxTileSize
     * @param {type} maxTileSize
     */
    setMaxTileSize: function(maxTileSize) {
        gamePresenter.maxTileSize = maxTileSize;
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
        gameView.clearTiles();
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

        if (!alt && gamePresenter.gameMode === 0) {
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

        // Update tiles on the view.
        gameView.updateTiles(updatedTiles);

        // Increment move count
        gamePresenter.incrementMoveCount();

        setTimeout(function() {
            // Evaluate Game Status.
            gamePresenter.evaluateState();
        }, constants.TAP_TIMEOUT + 100);
    },
    onTapButtonMain: function(e) {
        navigator.navigateTo('main.html', true);
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
        if (gamePresenter.gameMode === 0) {
            gamePresenter.flipTiles(e.currentTarget, true);
        }
    }
};
