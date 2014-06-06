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
    values: [],
    /**
     * Entry point.
     */
    init: function() {
        if (gamePresenter.newGame) {
            gameView.loadTiles(gamePresenter.gridSize);
            gamePresenter.setMoveCount(0);
            gamePresenter.newGame = false;
            gamePresenter.generateValues();
        }

        eventBus.installHandler('gamePresenter.onTapTile', gamePresenter.onTapTile, '.tile', 'tap');
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
            while (createdValues.lastIndexOf(value) !== -1) {
                value = Math.ceil((Math.random() * gridSquare));
            }

            gamePresenter.values.push(value);
        }
    },
    /**
     * Increment the moveCount variable.
     */
    incrementMoveCount: function() {
        gamePresenter.setMoveCount(gamePresenter.moveCount + 1);
    },
    rotateTiles: function() {

    },
    /**
     * Setter for moveCount
     * @param {type} count
     */
    setMoveCount: function(count) {
        gamePresenter.moveCount = count;
        gameView.showMoveCount(count);
    },
    onTapTile: function(e) {
        gamePresenter.incrementMoveCount();
        gamePresenter.rotateTiles();
        gamePresenter.evaluateState();
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
        var html, i, j, width, tile, value, createdValues;

        $('#tile-container').empty();

        width = ($(window).width() - (gridSize * 5 * 2) - 10) / gridSize;

        html = $('#tile-template').html();

        createdValues = [];

        // 5x5 grid.
//        for (i = 0; i < gridSize; i++) {
//            for (j = 0; j < gridSize; j++) {
//                value = Math.ceil((Math.random() * gridSize * gridSize));
//
//                // Create a unique random value for the tile.
//                while (createdValues.lastIndexOf(value) !== -1) {
//                    value = Math.ceil((Math.random() * gridSize * gridSize));
//                }
//
//                createdValues.push(value);
//
//                // Create the tile and show it.
//                tile = $(html).width(width).height(width).css('line-height', width + 'px').text(value).appendTo('#tile-container');
//            }
//        }
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