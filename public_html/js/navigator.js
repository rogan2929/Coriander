/* 
 * To change this license header, choose License Headers in Project Properties.
 * To change this template file, choose Tools | Templates
 * and open the template in the editor.
 */

/**
 * Navigtator object for the application. Controls page navigation.
 * @type type
 */
var navigator = {
    /**
     * Init the navigator object.
     * @param {type} customLeftSwipe
     * @param {type} customRightSwipe
     */
    register: function(customLeftSwipe, customRightSwipe) {
        // Check if caller is going to provide its own page swipe handlers.

        if (customLeftSwipe) {
            eventBus.installHandler('navigator.onSwipeLeftPage', customLeftSwipe, '.ui-page .swiper', 'swipeleft');
        }
        else {
            eventBus.installHandler('navigator.onSwipeLeftPage', navigator.onSwipeLeftPage, '.ui-page .swiper', 'swipeleft');
        }

        if (customRightSwipe) {
            eventBus.installHandler('navigator.onSwipeRightPage', customRightSwipe, '.ui-page .swiper', 'swiperight');
        }
        else {
            eventBus.installHandler('navigator.onSwipeRightPage', navigator.onSwipeRightPage, '.ui-page .swiper', 'swiperight');
        }
    },
    onSwipeLeftPage: function(e) {
        // Prevent event from bubbling up the DOM and transition to the "next" page.
        $('body').pagecontainer('change', $(e.currentTarget).parent('.ui-page').data('swipeleft'), {transition: 'slide'});
    },
    onSwipeRightPage: function(e) {
        // Prevent event from bubbling up the DOM and transition to the "previous" page.
        $('body').pagecontainer('change', $(e.currentTarget).parent('.ui-page').data('swiperight'), {transition: 'slide', reverse: true});
    },
    navigateTo: function(page) {
        $('body').pagecontainer('change', page);
    }
};