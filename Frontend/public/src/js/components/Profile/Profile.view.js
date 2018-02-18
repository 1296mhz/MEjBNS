/**
 * Created by cshlovjah on 12.01.18.
 */
define(['jquery', 'underscore', 'backbone', 'UserInfoModel', 'AvatarFileModel', 'text!ProfileTemplate', 'AdminBSB-Demo', 'bootstrap', 'jquery-validate' ],
    function ($, _, Backbone, UserInfoModel, AvatarFileModel, ProfileTemplate, AdminBSBDemo) {

        var ProfileView = Backbone.View.extend({
            initialize: function () {
                console.log("Initialize Profile view");

                _.bindAll(this, 'render','fetchModel', 'updateForm', 'saveFieldProfile');
                this.listenTo(this.model, 'change', this.render);
                app.bus.on('ProfileView:fetchModel', this.fetchModel);
                this.model.fetch();
            },
            el: this.el,
            model: this.model,
            events: {
                "focus .form-control": "focusControl",
                "focusout .form-control": "focusOutControl",
                "click #save-profile": "saveFieldProfile",
                "click #avatar-image": "openDialogSelectFile",
                "change #file-avatar": "sendFileAvatar"
            },
            fetchModel: function(){
                "use strict";
                console.log("Fetch from profile model");
                this.model.fetch();
            },
            openDialogSelectFile: function(e){
                "use strict";
                e.preventDefault()

                $("#file-avatar").trigger("click");
            },
            sendFileAvatar: function (event) {
                "use strict";
                event.preventDefault();
                var _this = this;

                var fileObject = $(':input[type="file"]')[0].files[0];
                var fileAjax = new AvatarFileModel();

                fileAjax.set('avatar', fileObject);
                fileAjax.save(null, {
                    success: function (result) {
                        app.bus.trigger('UserInfoView:fetchModel');
                        app.bus.trigger('ProfileView:fetchModel');
                        app.bus.trigger('Notify', { text: result.get('message'), color: 'bg-green' });
                    },
                    error: function (err) {
                        app.bus.trigger('Notify', { text: "Avatar update error!" , color: 'bg-red'});
                    }
                });
                fileAjax.on('progress', function (evt) {});
            },
            focusControl: function (e) {
                "use strict";
                var $this = e.target
                $($this.offsetParent).addClass('focused');
            },
            focusOutControl: function (e) {
                var $this = $(e.target);
                if ($this.parents('.form-group').hasClass('form-float')) {
                    if ($this.val() == '') {
                        $this.parents('.form-line').removeClass('focused');
                    }
                }
                else {
                    $this.parents('.form-line').removeClass('focused');
                }
                this.updateForm();
            },
            saveFieldProfile: function () {
                "use strict";

                var _obj = {};

                var _name = $('#profile-name-field').val();
                _obj.name = _name;

                this.model.save(_obj, {
                    patch: true,
                    success: function (result) {
                        app.bus.trigger('UserInfoView:fetchModel');
                        app.bus.trigger('Notify', { text: result.get('message'), color: 'bg-green' });
                    }, error: function (err) {
                        app.bus.trigger('Notify', { text: "Avatar update error!" , color: 'bg-red'});
                    }
                })
            },
            render: function () {
                var compiledTemplate = _.template(ProfileTemplate);
                this.$el.empty();
                this.$el.append(compiledTemplate(this.model.toJSON()));
                this.updateForm();
            },
            show: function(){
                $('content-section').children().removeClass();
                $('content-section').children().addClass('section-hide');
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
        return ProfileView
    })