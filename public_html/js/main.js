/* 
 * To change this license header, choose License Headers in Project Properties.
 * To change this template file, choose Tools | Templates
 * and open the template in the editor.
 */

"use strict";

window.onerror = function(msg, url, linenumber) {
    alert('Error message: ' + msg + '\nURL: ' + url + '\nLine Number: ' + linenumber);
    return true;
};

// http://stackoverflow.com/questions/6312993/javascript-seconds-to-time-with-format-hhmmss
String.prototype.toHHMMSS = function() {
    var sec_num = parseInt(this, 10); // don't forget the second param
    var hours = Math.floor(sec_num / 3600);
    var minutes = Math.floor((sec_num - (hours * 3600)) / 60);
    var seconds = sec_num - (hours * 3600) - (minutes * 60);

    if (hours < 10) {
        hours = "0" + hours;
    }
    if (minutes < 10) {
        minutes = "0" + minutes;
    }
    if (seconds < 10) {
        seconds = "0" + seconds;
    }
    var time = hours + ':' + minutes + ':' + seconds;
    return time;
};

$(document).on('pagebeforeshow', '#new-game', function(e) {
    newGamePresenter.init();
});

$(document).on('pagebeforeshow', '#game', function(e) {
    gamePresenter.init();
});

var eventBus = {
    handlers: {},
    /**
     * Register an event handler.
     * @param {type} name
     * @param {type} handler
     * @param {type} selector
     * @param {type} event
     */
    installHandler: function(name, handler, selector, event) {
        eventBus.handlers[name] = handler;
        $(selector).off(event).bind(event, function(e, args) {
            eventBus.handlers[name].call(eventBus, e, args);
        });
    }
};

/**
 * Model for the application.
 * @type type
 */
var model = {
};

/**
 * Presenter for #new-game
 * @type type
 */
var newGamePresenter = {
    /**
     * 
     */
    init: function() {
        eventBus.installHandler('newGamePresenter.onTapButtonReady', newGamePresenter.onTapButtonReady, '#button-ready', 'tap');
        newGameView.toggleButtonResume(!gamePresenter.newGame);
    },
    onTapButtonReady: function(e) {
        gamePresenter.newGame = true;
    }
};

/**
 * View for #new-game
 * @type type
 */
var newGameView = {
    /**
     * Enable/disable the resume button.
     * @param {type} enable
     */
    toggleButtonResume: function(enable) {
        if (enable) {
            $('#button-resume').removeClass('ui-state-disabled');
        }
        else {
            $('#button-resume').addClass('ui-state-disabled');
        }
    }
};

/**
 * Presenter for #game
 * @type type
 */
var gamePresenter = {
    gridSize: 4,
    moveCount: 0,
    newGame: true,
    values: null,
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
        eventBus.installHandler('gamePresenter.onSwipeDownTile', gamePresenter.onSwipeDownTile, '.tile', 'swipedown');
        eventBus.installHandler('gamePresenter.onSwipeLeftTile', gamePresenter.onSwipeLeftTile, '.tile', 'swipeleft');
        eventBus.installHandler('gamePresenter.onSwipeRightTile', gamePresenter.onSwipeRightTile, '.tile', 'swiperight');
        eventBus.installHandler('gamePresenter.onSwipeUpTile', gamePresenter.onSwipeUpTile, '.tile', 'swipeup');
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
    onSwipeDownTile: function(e) {
        
    },
    onSwipeLeftTile: function(e) {
        
    },
    onSwipeRightTile: function(e) {
        var distance;
        
        distance = e.swipestop.coords[0] - e.swipestart.coords[0];
        
        console.log(e);
        console.log(distance);
        
    },
    onSwipeUpTile: function(e) {
        
    },
    onTouchMoveTile: function(e) {
        // Here's how this will work.
        // 1. During touchmove, row or column will move.
        // 2. When touchstop fires, row or column will snap to place. Also increment moveCount.
        // 3. When snap is complete, row & col classes are updated on the tiles.
        // 4. Evaluate closeness to solution.

        //console.log($(e.currentTarget).attr('class'));

//        console.log('(' + e.originalEvent.changedTouches[0].clientX + ', ' + e.originalEvent.changedTouches[0].clientY + ')');
        //$(e.currentTarget).css('left', e.originalEvent.changedTouches[0].clientX + 'px');
    }
};

/**
 * View for #game.
 * @type type
 */
var gameView = {
    /**
     * Loads tiles into the view.
     * @param {type} gridSize
     * @param {type} values
     */
    loadTiles: function(gridSize, values) {
        var html, i, j, width, tile, row, col, left, top, vertGuide, horGuide;

        $('#tile-container').empty();

        // - (gridSize * 5 * 2) - 10)
        width = ($(window).width() - 20) / gridSize;

        html = $('#tile-template').html();

        row = 1;
        col = 1;

        for (i = 0; i < gridSize * gridSize; i += gridSize) {
            col = 0;
            
            horGuide = $($('#guideline-template').html());
            horGuide.addClass('horizontal').css('left', left).appendTo('#tile-container');

            for (j = 0; j < gridSize; j++) {

                left = col * width + 10 + 'px';
                top = row * width + 10 + 'px';

                tile = $(html).width(width).height(width).css('line-height', width + 'px').addClass('row' + row).addClass('col' + col).css('left', left).css('top', top).text(values[i + j]);

                $(tile).appendTo('#tile-container');
                
                vertGuide = $($('#guideline-template').html());
                vertGuide.addClass('vertical').css('left', left).appendTo('#tile-container');

                col++;
            }

            row++;
        }
    },
    showMoveCount: function(count) {
        if (count !== 1) {
            $('#score').text(count + ' Moves');
        }
        else {
            $('#score').text(count + ' Move');
        }
    }
};