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

function showAdBanner(element) {
    var script = "<script>" +
            "RequestAd_({" +
                "s: 'f2ffd94193a7f381bfbdf6dc81250ede'," + 
                "m: 'test'," +
                "adspace_width: '320'," +
                "adspace_height: '50'," +
                "adspace_strict: '0'," +
                "backfillhtml: ''," +
                "prependclickcontent: ''," +
                "trackingpixelurl: ''" +
            "});" +
        "</script>";

    //alert(script);

    //var script = "<script>alert('test');</script>";

    //$(element).append(script);
}

$(document).on('pagebeforeshow', '#start', function(e) {
    startPresenter.init();

    // Put any delayed tasks here.
    setTimeout(function() {
        // Force ads to open in the system browser.
        $('a').not('.ui-btn').tap(function(e) {
            var url;

            e.preventDefault();

            url = $(e.currentTarget).attr('href');

            if (window.plugins) {
                window.plugins.ChildBrowser.showWebPage(url, {showLocationBar: true});
            }
            else {
                window.open(url, '_blank');
            }
        });
        
        // Show the "Rate / Give Feedback" button.
        $('#tile-rate').fadeIn();
    }, 2000);
});

$(document).on('pagebeforeshow', '#new-game', function(e) {
    newGamePresenter.init();
});

$(document).on('pagebeforeshow', '#more-options', function(e) {
    moreOptionsPresenter.init();
});

$(document).on('pagebeforeshow', '#high-scores', function(e) {
    highScoresPresenter.init();
});

$(document).on('pagebeforeshow', '#game', function(e) {
    showAdBanner('#game .ad-bar');
    gamePresenter.init();
});

$(document).on('pagebeforehide', '#game', function(e) {
    gamePresenter.clearIntervals();
    gamePresenter.saveState();
});

$(document).on('pagebeforeshow', '#victory', function(e) {
    victoryPresenter.init();
});