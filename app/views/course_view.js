var Backbone = require("Backbone");
var _ = require('underscore');

//load model
var Course = require('../models/course.js');

//load collection
var Comments = require('../collections/comments.js');

//load views
var comments_view = require('./comments_view.js');
var loading_view = require('./loading_view.js');

var course_view = Backbone.View.extend({
	className:"course_view",
    template: _.template($("#course_template").html()),
    initialize:function(options){
    	this.options = options;
        this.course = new Course({id:this.options.id});
    },
    events:{
        "click .w_comment":"onWCommentClick",
        "click #course_like":"onLikeCourseClick",
        "click .more_comments":"onMoreCommentsClick"
    },
    onWCommentClick:function(e){
        
    },
    onLikeCourseClick:function(e){
       this.course.set("liked",true);
        Backbone.sync("update",this.course).done(function(res){
            console.log("res");
        })
    },
    onAddComments:function(){
        console.log("on add!!");
    },
    onMoreCommentsClick:function(e){
        var that = this;
        this.comments.getNextPage().done(function(){
            that.subview.render();
        })
    },
    render: function() {
    	var that = this;
        //add loading view
        this.loading_view = new loading_view();
        that.$el.html( this.loading_view.render().el );
        //fetch course data
    	this.course.fetch().done(function(){
            //add course view
    		that.$el.append(that.template(that.course.toJSON()));
            //load comments data
            var comments = new Comments([],{course_id:that.options.id});
            //save ref for comments view and collections
            that.comments = comments;
            var commentsView = new comments_view({collection:comments});
            that.subview = commentsView;
            comments.getFirstPage()
                .done(function(){
                    that.$(".comments").append( commentsView.render().el );
                    if(comments.hasNextPage()){
                        that.$el.append("<div class='more_comments'>展开更多评价</div>")
                    }
                    //remove loading view
                    that.loading_view.remove();
                })
                .fail(function(){
                    that.$(".comments").html(
                        "<div class='no_comments'>∑(っ °Д °;)っ<br>没有任何评价，快去添加第一条评价吧。<div>"
                        );
                })
    	});
        
        return this;
    }
})

module.exports = course_view;
