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
    maxTileSize: 9,
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
            gameView.spinAllTiles();
        }

        //eventBus.installHandler('gamePresenter.onTapTile', gamePresenter.onTapTile, '.tile', 'tap');
        eventBus.installHandler('gamePresenter.onTapTile', gamePresenter.onTapTile, '.tile', 'tap');
        //eventBus.installHandler('gamePresenter.onTapholdTile', gamePresenter.onTapholdTile, '.tile', 'taphold');
    },
    /**
     * Check if all tiles have the same value.
     */
    evaluateState: function() {
        var value, i, allMatch;

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
            alert('You won!');
        }
    },
    generateTiles: function() {
        var value, i, gridSquare, values;

        values = [];
        gamePresenter.tiles = [];

        gridSquare = gamePresenter.gridSize * gamePresenter.gridSize;

        for (i = 0; i < gridSquare; i++) {
            value = Math.floor((Math.random() * gamePresenter.maxTileSize));

            // Create a unique random value for the tile.
//            while (values.lastIndexOf(value) !== -1) {
//                value = Math.ceil((Math.random() * gamePresenter.maxTileSize));
//            }

            values.push(value);
            gamePresenter.tiles.push(new Tile(value, i, gamePresenter.maxTileSize));
        }
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
    /**
     * Update tile values.
     * @param {type} tileDiv
     * @param {type} decrement
     */
    updateTileValues: function(tileDiv, decrement) {
        // Update tiles that are to the left, right, above, and below.
        // Left: -1
        // Right: +1
        // Above: -gridSize
        // Below: +gridSize

        var value, index, classList, updatedTiles;

        value = parseInt($(tileDiv).text());
        classList = $(tileDiv).attr('class');

        index = parseInt(classList.substring(classList.indexOf('tile-') + 5, classList.indexOf('tile-') + 7));

        updatedTiles = [];

//        gamePresenter.tiles[index].incrementValue();
//        updatedTiles.push(gamePresenter.tiles[index]);

        // Edge detection:
        // Left edge: index % gamePresenter.gridSize !== 0
        // Right edge: (index + 1) % (gamePresenter.gridSize) !== 0
        // Top edge: index - gamePresenter.gridSize >= 0
        // Bottom edge: index + gamePresenter.gridSize < gamePresenter.tiles.length

        // Left tile.
        if (index - 1 >= 0 && index % gamePresenter.gridSize !== 0) {
            if (!decrement) {
                gamePresenter.tiles[index - 1].incrementValue();
            }
            else {
                gamePresenter.tiles[index - 1].decrementValue();
            }
            updatedTiles.push(gamePresenter.tiles[index - 1]);
        }

        // Right tile
        if (index + 1 < gamePresenter.tiles.length && (index + 1) % (gamePresenter.gridSize) !== 0) {
            if (!decrement) {
                gamePresenter.tiles[index + 1].incrementValue();
            }
            else {
                gamePresenter.tiles[index + 1].decrementValue();
            }
            updatedTiles.push(gamePresenter.tiles[index + 1]);
        }

        // Above tile
        if (index - gamePresenter.gridSize >= 0) {
            if (!decrement) {
                gamePresenter.tiles[index - gamePresenter.gridSize].incrementValue();
            }
            else {
                gamePresenter.tiles[index - gamePresenter.gridSize].decrementValue();
            }
            updatedTiles.push(gamePresenter.tiles[index - gamePresenter.gridSize]);
        }

        // Below tile
        if (index + gamePresenter.gridSize < gamePresenter.tiles.length) {
            if (!decrement) {
                gamePresenter.tiles[index + gamePresenter.gridSize].incrementValue();
            }
            else {
                gamePresenter.tiles[index + gamePresenter.gridSize].decrementValue();
            }
            updatedTiles.push(gamePresenter.tiles[index + gamePresenter.gridSize]);
        }

        // Upper Left
        // index - gridSize - 1
        // index % gamePresenter.gridSize !== 0
        // index - gamePresenter.gridSize >= 0
        if (index - 1 >= 0 && index % gamePresenter.gridSize !== 0 && index - gamePresenter.gridSize >= 0) {
            if (!decrement) {
                gamePresenter.tiles[index - gamePresenter.gridSize - 1].incrementValue();
            }
            else {
                gamePresenter.tiles[index - gamePresenter.gridSize - 1].decrementValue();
            }
            updatedTiles.push(gamePresenter.tiles[index - gamePresenter.gridSize - 1]);
        }

        // Upper Right
        // index - gridSize + 1
        // (index + 1) % (gamePresenter.gridSize) !== 0
        // index - gamePresenter.gridSize >= 0
        if (index + 1 < gamePresenter.tiles.length && (index + 1) % (gamePresenter.gridSize) !== 0 && index - gamePresenter.gridSize >= 0) {
            if (!decrement) {
                gamePresenter.tiles[index - gamePresenter.gridSize + 1].incrementValue();
            }
            else {
                gamePresenter.tiles[index - gamePresenter.gridSize + 1].decrementValue();
            }
            updatedTiles.push(gamePresenter.tiles[index - gamePresenter.gridSize + 1]);
        }

        // Below Left
        // index + gridSize - 1
        // index % gamePresenter.gridSize !== 0
        // index + gamePresenter.gridSize < gamePresenter.tiles.length
        if (index - 1 >= 0 && index % gamePresenter.gridSize !== 0 && index + gamePresenter.gridSize < gamePresenter.tiles.length) {
            if (!decrement) {
                gamePresenter.tiles[index + gamePresenter.gridSize - 1].incrementValue();
            }
            else {
                gamePresenter.tiles[index + gamePresenter.gridSize - 1].decrementValue();
            }
            updatedTiles.push(gamePresenter.tiles[index + gamePresenter.gridSize - 1]);
        }

        // Below Right
        // index + gridSize + 1
        // (index + 1) % (gamePresenter.gridSize) !== 0
        // index + gamePresenter.gridSize < gamePresenter.tiles.length
        if (index + 1 < gamePresenter.tiles.length && (index + 1) % (gamePresenter.gridSize) !== 0 && index + gamePresenter.gridSize < gamePresenter.tiles.length) {
            if (!decrement) {
                gamePresenter.tiles[index + gamePresenter.gridSize + 1].incrementValue();
            }
            else {
                gamePresenter.tiles[index + gamePresenter.gridSize + 1].decrementValue();
            }
            updatedTiles.push(gamePresenter.tiles[index + gamePresenter.gridSize + 1]);
        }

        // Update tiles on the view.
        gameView.updateTiles(updatedTiles);

        // Increment move count
        gamePresenter.incrementMoveCount();

        setTimeout(function() {
            // Evaluate Game Status.
            gamePresenter.evaluateState();
        }, 1800);
    },
    onTapTile: function(e) {
        gamePresenter.updateTileValues(e.currentTarget, false);
    },
    onTapholdTile: function(e) {
        gamePresenter.updateTileValues(e.currentTarget, true);
    }
};
