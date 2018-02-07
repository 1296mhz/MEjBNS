/**
 * Created by cshlovjah on 11.01.18.
 */
define(['jquery', 'underscore', 'backbone', 'text!UserInfoTemplate', 'AdminBSB-Demo', 'bootstrap', 'jquery-validate'],
    function ($, _, Backbone, UserInfoTemplate, AdminBSBDemo) {

        var UserInfoView = Backbone.View.extend({
            initialize: function () {
                console.log("Initialize UserInfo view");
                _.bindAll(this, 'render', 'fetchModel');
                this.listenTo(this.model,'change', this.render);
                this.fetchModel();
                app.bus.on('UserInfoView:fetchModel', this.fetchModel);
            },
            el: this.el,
            model: this.model,
            events: {
                "click #profile-link": "profileLink"
            },
            fetchModel: function(){
                this.model.fetch();
            },
            profileLink: function(){
                console.log("click");
            },
            render: function () {
                var compiledTemplate = _.template(UserInfoTemplate );
                this.$el.empty();
                this.$el.append(compiledTemplate(this.model.toJSON()));
            }
        });
        return UserInfoView
    })