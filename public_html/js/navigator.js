/* 
 * To change this license header, choose License Headers in Project Properties.
 * To change this template file, choose Tools | Templates
 * and open the template in the editor.
 */


var navigator = {
    navigateTo: function(page, refresh) {
        if (!refresh) {
            $('body').pagecontainer('change', '#' + page);
        }
        else {
            $('html').fadeOut(400, function() {
                $(location).attr('href', page);
            });
        }
    }
};