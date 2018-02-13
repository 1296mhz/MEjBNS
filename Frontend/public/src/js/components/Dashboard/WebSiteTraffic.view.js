/**
 * Created by cshlovjah on 21.01.18.
 */
define(['jquery','underscore', 'backbone', 'WebSiteTrafficModel', 'text!WebSiteTrafficTemplate', 'jquery-sparkline'],
    function($,  _, Backbone, WebSiteTrafficModel, WebSiteTrafficTemplate){

        var WebSiteTrafficView = Backbone.View.extend({
            initialize: function () {
                console.log("Initialize Web site traffic widget view");
                _.bindAll(this, 'render', 'fetchModel', 'setModel')
                this.listenTo(this.model, 'change', this.render);
                app.bus.on('webTraffic', function(data){this.setModel(data)}, this)
            },
            el: this.el,
            model: new WebSiteTrafficModel(),
            events: {},
            fetchModel: function (data) {
                "use strict";
                console.log(data)
                this.model.fetch();
            },
            setModel: function(data){
                this.model.set({ count: data.count, bar: data.bar })
            },
            render: function () {
                var compiledTemplate = _.template(WebSiteTrafficTemplate);
                this.$el.empty();
                this.$el.append(compiledTemplate(this.model.toJSON()));

                this.$el.find('.chart.chart-bar').sparkline(undefined, {
                    type: 'bar',
                    barColor: '#fff',
                    negBarColor: '#fff',
                    barWidth: '4px',
                    height: '34px'
                });
            }
        });
        return WebSiteTrafficView
});