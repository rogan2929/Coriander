/* 
 * To change this license header, choose License Headers in Project Properties.
 * To change this template file, choose Tools | Templates
 * and open the template in the editor.
 */

// MobileInit is fired BEFORE jQM is loaded.
$(document).bind('mobileinit', function() {
    $.event.special.tap.emitTapOnTaphold = false;
    $.event.special.tap.tapholdThreshold = 500;
    $.mobile.defaultPageTransition = 'flip';
    
    alert(window.device.platform);
});