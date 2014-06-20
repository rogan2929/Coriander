/* 
 * To change this license header, choose License Headers in Project Properties.
 * To change this template file, choose Tools | Templates
 * and open the template in the editor.
 */

"use strict";

//window.onerror = function(msg, url, linenumber) {
//    alert('Error message: ' + msg + '\nURL: ' + url + '\nLine Number: ' + linenumber);
//    return true;
//};

// http://stackoverflow.com/questions/6274339/how-can-i-shuffle-an-array-in-javascript
Array.prototype.shuffle = function() {
    var counter = this.length, temp, index;

    // While there are elements in the array
    while (counter > 0) {
        // Pick a random index
        index = (Math.random() * counter--) | 0;

        // And swap the last element with it
        temp = this[counter];
        this[counter] = this[index];
        this[index] = temp;
    }
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

$(document).on('pagebeforeshow', '#start', function(e) {
    startPresenter.init();
});

$(document).on('pagebeforeshow', '#new-game', function(e) {
    newGamePresenter.init();
});

$(document).on('pagebeforeshow', '#high-scores', function(e) {
    highScoresPresenter.init();
});

$(document).on('pagebeforeshow', '#game', function(e) {
    gamePresenter.init();
});

$(document).on('pagehide', '#game', function(e) {
    gamePresenter.clearSaveStateInterval();
    gamePresenter.saveState();
});

$(document).on('pagebeforeshow', '#victory', function(e) {
    victoryPresenter.init();
});