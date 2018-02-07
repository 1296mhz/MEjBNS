/**
 * Created by cshlovjah on 17.01.18.
 */
define(['jquery', 'underscore', 'backbone',  'text!CustomerAccountTemplate', 'AdminBSB-Demo', 'bootstrap', 'jquery-validate' ],
    function ($, _, Backbone, CustomerAccountTemplate, AdminBSBDemo) {

        var CustomerAccountView = Backbone.View.extend({
            initialize: function () {
                console.log("Initialize Profile view");
                _.bindAll(this, 'render');
                // this.listenTo(this.model, 'change', this.render);
                // app.bus.on('ProfileView:fetchModel', this.fetchModel);
                //  app.bus.on('ProfileView:render', this.render())
                // this.model.fetch();
            },
            el: this.el,
            //model: this.model,
            events: {},
            fetchModel: function(){
                "use strict";
                console.log("Fetch from profile model");
                this.model.fetch();
            },

            render: function () {
                var compiledTemplate = _.template(CustomerAccountTemplate);
                this.$el.empty();
                //this.model.toJSON()
                this.$el.append(compiledTemplate());

            },
            show: function(){
                this.$el.removeClass();
            },
            updateForm: function () {
                "use strict";
                var $fC = this.$el.find('.form-control');

                $fC.each(function () {
                    if ($(this).val() !== '') {
                        $(this).parents('.form-line').addClass('focused');
                    }
                });
            }

        })
        return CustomerAccountView
    })