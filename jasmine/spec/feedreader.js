/* feedreader.js
 *
 * This is the spec file that Jasmine will read and contains
 * all of the tests that will be run against your application.
 */

/* We're placing all of our tests within the $() function,
 * since some of these tests may require DOM elements. We want
 * to ensure they don't run until the DOM is ready.
 */
$(function() {
    /* This is our first test suite - a test suite just contains
    * a related set of tests. This suite is all about the RSS
    * feeds definitions, the allFeeds variable in our application.
    */
    describe('RSS Feeds', function() {
        /* This is our first test - it tests to make sure that the
         * allFeeds variable has been defined and that it is not
         * empty. Experiment with this before you get started on
         * the rest of this project. What happens when you change
         * allFeeds in app.js to be an empty array and refresh the
         * page?
         */
        it('are defined', function() {
            /* tests expect 'allFeeds' to be defined
            and have a length of greater than 0 */
            expect(allFeeds).toBeDefined();
            expect(allFeeds.length).not.toBe(0);
        });


        it('URLs are defined and not empty', function() {
            /*for loop goes through all indices of 'allFeeds'
            to check that each item is defined and 
            has a length of greater than 0*/
            for (var i = allFeeds.length - 1; i >= 0; i--) {
                expect(allFeeds[i].url).toBeDefined();
                expect(allFeeds[i].url.length).not.toBe(0);
            }
         });

         it('allFeeds object has a non-empty, defined name', function(){
            /*for loop goes through all indices of 'allFeeds'
            to check that a name has been defined for each, and
            each name has a length greater than 0*/
            for (var i = allFeeds.length - 1; i >= 0; i--) {
                expect(allFeeds[i].name).toBeDefined();
                expect(allFeeds[i].name.length).not.toBe(0);
            }
         })
    });


    describe('The menu', function(){
         /* 'body' is defined to make code easier to read.
         test expects for the body to have a default class of 'menu-hidden'*/ 
         let body = document.getElementsByTagName('body')[0];
         it('Menu element is hidden by default', function(){
            expect($(body).hasClass('menu-hidden')).toBe(true);
            /*ref: https://api.jquery.com/hasclass/ */

         });
          /* 'icon' is defined to make code easier to read.

            '$(icon).click()' simulates a mouse-click
            (ref: 'https://www.w3schools.com/jsref/met_html_click.asp')

            tests check that class 'menu-hidden' is appropriately toggled
            given the body's initial class state: T --> F, F --> T.
           */
          let icon = document.getElementsByClassName('menu-icon-link')[0];

          it('Menu changes visibility when icon is clicked', function(){
            $(icon).click(function(){
                $(body).classList.toggle('menu-hidden');
            });
            if($(body).hasClass('menu-hidden') == true){
                expect($(body).is('menu-hidden')).toBe(false);
            } else {
                expect($(body).is('menu-hidden')).toBe(true);
            }
          })
          /*ref: https://learn.jquery.com/using-jquery-core/faq/how-do-i-test-whether-an-element-has-a-particular-class/ */
          /*ref: https://www.w3schools.com/howto/howto_js_toggle_class.asp*/
    });
    describe('Initial Entries', function(){
         /*loads feed at index 0 and announces once it has finished */
         beforeEach(function(done){
            loadFeed(0, function(){
                done();
            });
         });

         it('There is at least a single .entry element within the .feed container', function(){
            expect(('.feed .entry').length).not.toBe(0);
         });
    });

    describe('New Feed Selection', function(){
        /*assume that there are at least 2 feeds that need to load*/
        var firstLink,
            secondLink;
        /*since loadFeed is asynchronous, a beforeEach is necessary*/ 
        beforeEach(function(done){
            /*load the first feed at index 0*/
            loadFeed(0, function(){
                /*set the firstLink to the entry link of the first feed loaded*/
                firstLink = document.querySelector('.entry-link').innerHTML;
                /*once the firstLink is set, load the second feed at index 1*/
                loadFeed(1, function(){
                    /*set the secondLink*/
                    secondLink = document.querySelector('.entry-link').innerHTML;
                    /*once both links have been set, announces that it has finished running*/
                    done();
                });
            });
        });

        /*test compares first and second link to make sure that 
        both have loaded and content has changed. 

        If content has not changed, 
        then firstLink and secondLink would be identical*/
        it('Content actually changes when a new feed is loaded', function(){
            expect(firstLink==secondLink).not.toBe(true);
        });
    });
}());
