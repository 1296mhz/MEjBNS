/**
 * Created by cshlovjah on 03.01.18.
 */
define(['underscore', 'backbone', 'backbone-singleton'], function (_, Backbone, BackboneSingleton) {
    "use strict";
    var AuthenticationService = function () {
        
        app.bus.on('AuthenticationService:saveToken', function (data) {
            console.log("saveToken")
            _saveToken(data)
        });

        app.bus.on('AuthenticationService:getToken', function () {
            app.bus.trigger('AuthenticationService:returnToken', _getToken())
        });

        app.bus.on('AuthenticationService:signin', function (loginData) {
            _loginRequest(loginData)
        });

        app.bus.on('AuthenticationService:signup', function (loginData) {
            _registerRequest(loginData)
        });

        app.bus.on('AuthenticationService:logout', function () {
            _removeToken();
        });

        app.bus.on('AuthenticationService:removeToken', function () {
            _removeToken();
        });
        
        var _loginRequest = function(loginData){
            var model = new UserLoginModel({
                email: loginData.email,
                password: loginData.password
            })

            model.save(null, { 
                success: function(data){
                    console.log("Токен получен")
                    app.bus.trigger('AuthenticationService:saveToken', data.get('token'))
                    // app.bus.trigger('MainRouter:changeUrl', 'index')
                    location.replace('/')
            },
                error: function(){
                    console.log("Ошибка")
                }
            })
        }

        var _registerRequest = function(registerData){

            var model = new UserRegisterModel({
                email: registerData.email,
                name: registerData.name,
                password: registerData.password
            })

            model.save(null, {
                success: function(data){
                    console.log("Токен получен")
                    app.bus.trigger('AuthenticationService:saveToken', data.get('token'))
                    // app.bus.trigger('MainRouter:changeUrl', 'index')
                    location.replace('/')

                },
                error: function(){
                    console.log("Ошибка")
                    // app.bus.trigger('MainRouter:changeUrl', 'register')
                    location.replace('/#signup')
                }
            })
        }

        var _saveToken = function (token) {
            window.localStorage.removeItem('ct');
            window.localStorage.setItem('ct', token)
        }

        var _getToken = function () {
            return window.localStorage.getItem('ct');
        };

        var _removeToken = function () {
            app.bus.trigger('MainRouter:changeUrl', 'login');
            return window.localStorage.removeItem('ct');
        };

        var _isLoggedIn = function () {
            var token = _getToken();

            if (token) {
                console.log("Token: ")

                var _token = token.split('.')[1]

                //var str = _token.replace(/\s/g, '');
                var payload = JSON.parse(atob(_token));
                return payload.exp > Date.now() / 1000;

            } else {
                return false;
            }
        };
        
        return {
            saveToken: _saveToken,
            getToken: _getToken,
            removeToken: _removeToken,
            isLoggedIn: _isLoggedIn,
            loginRequest: _loginRequest,
            registerRequest: _registerRequest
        }
    }

    _.extend(AuthenticationService, BackboneSingleton);

    return AuthenticationService;
})