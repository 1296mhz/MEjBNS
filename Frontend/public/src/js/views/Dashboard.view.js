/**
 * Created by cshlovjah on 16.01.18.
 */
define(['jquery', 'underscore', 'backbone',
        'DashboardModel', 'text!DashboardTemplate',
        'WebSiteTrafficView',
        'bootstrap'],
    function ($, _, Backbone,
              DashboardModel, DashboardTemplate,
              WebSiteTrafficView) {

        var DashboardView = Backbone.View.extend({
            initialize: function () {
                console.log("Initialize Dashboard view");
                _.bindAll(this, 'render', 'show', 'fetchModel', 'updateForm')

                // this.listenTo(this.model, 'change', this.render);
                // this.model.fetch();
                //app.bus.on('DashboardView:fetchModel', this.fetchModel)
            },
            el: this.el,
            model: new DashboardModel(),
            events: {},
            fetchModel: function () {
                "use strict";
                this.model.fetch();
            },
            render: function () {
                var compiledTemplate = _.template(DashboardTemplate);
                this.$el.empty();
                this.$el.append(compiledTemplate(this.model.toJSON()));
                this.updateForm();
                app.views.widgets.WebSiteTrafficView = new WebSiteTrafficView({ el: $('web-site-traffic')});
            },
            show: function () {
                $('content-section').children().removeClass();
                $('content-section').children().addClass('section-hide');
                this.$el.removeClass();
                app.views.widgets.WebSiteTrafficView.render();
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
        return DashboardView
    })