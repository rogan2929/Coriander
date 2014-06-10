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
    gridSize: 4,
    moveCount: 0,
    newGame: true,
    values: null,
    touchStartOffset: null,
    /**
     * Entry point.
     */
    init: function() {
        if (gamePresenter.newGame) {
            gamePresenter.setMoveCount(0);
            gamePresenter.newGame = false;
            gamePresenter.generateValues();
            gameView.loadTiles(gamePresenter.gridSize, gamePresenter.values);
        }

        //eventBus.installHandler('gamePresenter.onTouchMoveTile', gamePresenter.onTouchMoveTile, '.tile', 'touchmove');
        //eventBus.installHandler('gamePresenter.onTouchStartTile', gamePresenter.onTouchStartTile, '.tile', 'touchstart');
//        eventBus.installHandler('gamePresenter.onSwipeDownTile', gamePresenter.onSwipeDownTile, '.tile', 'swipedown');
//        eventBus.installHandler('gamePresenter.onSwipeLeftTile', gamePresenter.onSwipeLeftTile, '.tile', 'swipeleft');
        eventBus.installHandler('gamePresenter.onSwipeRightTile', gamePresenter.onSwipeRightTile, '.tile', 'swiperight');
//        eventBus.installHandler('gamePresenter.onSwipeUpTile', gamePresenter.onSwipeUpTile, '.tile', 'swipeup');
    },
    /**
     * Evaluate the order of the tiles.
     */
    evaluateState: function() {

    },
    generateValues: function() {
        var value, i, gridSquare;

        gamePresenter.values = [];

        gridSquare = gamePresenter.gridSize * gamePresenter.gridSize;

        for (i = 0; i < gridSquare; i++) {
            value = Math.ceil((Math.random() * gridSquare));

            // Create a unique random value for the tile.
            while (gamePresenter.values.lastIndexOf(value) !== -1) {
                value = Math.ceil((Math.random() * gridSquare));
            }

            gamePresenter.values.push(value);
        }

        console.log(gamePresenter.values);
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
//    onSwipeDownTile: function(e) {
//        
//    },
//    onSwipeLeftTile: function(e) {
//        
//    },
    onSwipeRightTile: function(e) {
        console.log(e);
        
        //$(e.currentTarget).css('left', e.swipestop.coords[0] + 'px');
        $(e.currentTarget).animate({
            left: e.swipestop.coords[0] + 'px'
        }, 200);
    },
//    onSwipeUpTile: function(e) {
//        
//    },
    onTouchMoveTile: function(e) {
        // Here's how this will work.
        // 1. During touchmove, row or column will move.
        // 2. When touchstop fires, row or column will snap to place. Also increment moveCount.
        // 3. When snap is complete, row & col classes are updated on the tiles.
        // 4. Evaluate closeness to solution.

        $(e.currentTarget).css('left', e.originalEvent.changedTouches[0].clientX - gamePresenter.touchStartOffset.x + 'px');
        $(e.currentTarget).css('top', e.originalEvent.changedTouches[0].clientY - gamePresenter.touchStartOffset.y + 'px');
    },
    onTouchStartTile: function(e) {
        var x, y;
        
        x = e.originalEvent.targetTouches[0].clientX - parseInt($(e.currentTarget).css('left'));
        y = e.originalEvent.targetTouches[0].clientY - parseInt($(e.currentTarget).css('top'));
        
        gamePresenter.touchStartOffset = {
            x: x,
            y: y
        };
    }
};
