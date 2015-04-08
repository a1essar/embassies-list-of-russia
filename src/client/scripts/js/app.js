/*
*
* */

define([
    'domReady',
    'underscore',
    'backbone',
    'jquery',
    'jquery.mobile-1.4.5',
    'text!../../json/config.json',
    'views/data.js',
    'velocity'
],  function ( domReady, _, Backbone, $, jqueryMobile, config, data, Velocity) {
    'use strict';

    console.log('%cfile: app.js', 'color: #C2ECFF');

    /** private */
    var _this;
    var _defaults = JSON.parse(config);

    /** constructor
     * @return {boolean}
     */
    function App(){
        console.log('%ctrace: App -> constructor', 'color: #ccc');

        _this = this;

        /** public */
        this.options = _.extend({

            },
            _defaults
        );

        var routes = {
            'country?:page': 'country',
            '*actions': 'page'
        };

        var router = Backbone.Router.extend({
            routes: routes
        });

        router = new router;

        // Prevents all anchor click handling
        $.mobile.linkBindingEnabled = false;

        // Disabling this will prevent jQuery Mobile from handling hash changes
        $.mobile.hashListeningEnabled = false;

        $.mobile.addBackBtn = true;

        domReady(function () {
            console.log('%ctrace: App -> constructor -> domReady', 'color: #ccc');

            $(function() {
                $('[data-role="header"], [data-role="footer"]').toolbar();
            });

            router.on('route:country', _this.country);
            router.on('route:page', _this.page);

            /* call when all routes init end */
            Backbone.history.start({pushState: false});
        });
    }

    var page = function page(page){
        if(!page){
            var title = document.querySelectorAll('.js__title')[0];
            title.innerHTML = data.title;

            var buttonBack = document.querySelectorAll('.js__button-back')[0];

            Velocity(buttonBack, {
                opacity: 0
            }, {
                duration: 300
            });

            var panel = document.querySelectorAll('.js__panel')[0];
            panel.href = '#rightpanel1';

            $.mobile.silentScroll(0);
        }
    };

    var country = function country(page){
        var content = document.querySelectorAll('.js__content')[0];
        content.innerHTML = data.ambassies[page].content;

        var title = document.querySelectorAll('.js__title')[0];
        title.innerHTML = data.ambassies[page].title;

        var buttonBack = document.querySelectorAll('.js__button-back')[0];

        Velocity(buttonBack, {
            opacity: 1
        }, {
            duration: 300,
            begin: function(){
                buttonBack.style.opacity = 0;
            }
        });

        var panel = document.querySelectorAll('.js__panel')[0];
        panel.href = '#rightpanel2';

        $.mobile.silentScroll(0);

        /*$.mobile.changePage( "#categories" , { reverse: false, changeHash: false } );*/
    };

    var moduleApi = function moduleApi(){
        this.country = country;
        this.page = page;
    };

    App.prototype = new moduleApi();

    return App;
});