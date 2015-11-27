var Backbone = require("Backbone");
var util = require("../util/util");

//load views
var main_view = require("../views/main_view");
var search_view = require("../views/search_view");


var SiteRouter = Backbone.Router.extend({
    routes: {
        '': 'main',
        'login': 'login',
        'search': 'search',
        'search_result': 'search_result',
        'course/:id(/)': 'course'
    },
    initialize : function($container){
        //console.log($container, defaultView)
        this.$container = $container;
    },
    switchView: function(view) {
        if (this.currentView) {
            this.currentView.remove();
        }
        this.$container.append( view.render().el )
        this.currentView = view;
    },
    main: function() {
        console.log('you have reached home');
        var view = new main_view();
        this.switchView(view);
    },
    login: function() {
        console.log('you have reached login');
    },
    search: function() {
        console.log('you have reached search');
        var view = new search_view();
        this.switchView(view);
    },
    search_result: function() {
        console.log('you have reached search result');
    },
    course: function(id) {
        console.log('you have reached course' + id);
    }
});

module.exports = SiteRouter;
