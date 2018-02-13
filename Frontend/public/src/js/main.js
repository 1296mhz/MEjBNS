/**
 * Created by cshlovjah on 03.01.18.
 */
require.config({
    //baseUrl: "src/app/",
    "paths": {
        //Framework
        // "jquery": 'framework/bower_components/jquery/dist/jquery.min',
        "jquery": "framework/plugins/jquery/jquery",
        "underscore": "framework/bower_components/underscore/underscore-min",
        "backbone": "framework/bower_components/backbone/backbone-min",
        "backbone-singleton": "framework/classes/backbone-singleton",
        "text": "framework/bower_components/text/text",
        "AppSandbox": "framework/sandbox/app",
        'socketio': 'http://localhost:3032/socket.io/socket.io',

        //Plugins
        "bootstrap": "framework/plugins/bootstrap/js/bootstrap",
        "waves": "framework/plugins/node-waves/waves",
        "jquery-validate": "framework/plugins/jquery-validation/jquery.validate",
        "jquery-slimscroll": "framework/plugins/jquery-slimscroll/jquery.slimscroll",
        "jquery-sparkline": "framework/plugins/jquery-sparkline/jquery.sparkline",
        "bootstrap-notify": "framework/plugins/bootstrap-notify/bootstrap-notify",
        "jquery-countTo": "framework/plugins/jquery-countto/jquery.countTo",
        "backbone-model-file-upload": "framework/bower_components/backbone-model-file-upload/backbone-model-file-upload",
        "AdminBSB-Admin": "framework/adminbsb/admin",
        "AdminBSB-Demo": "framework/adminbsb/demo",

        //Application
        "app": "app",
        "ModelsInit": "init/models",
        "CollectionsInit": "init/collections",
        "ViewsInit": "init/views",
        "router": "router",
        // "myAppRouter": "routers/myApp",

        //Services
        // "AuthenticateService": "services/Authenticate.service",
        "SocketioService": "services/Socketio.service",
        //Start --- Index
        //Views
        "IndexView": "components/Index/Index.view",

        //Templates
        "IndexTemplate": "components/Index/index.html",
        //End --- Index

        //Start --- Navbar
        //Models
        "NavbarModel": "components/Index/Navbar.model",
        //Views
        "NavbarView": "components/Index/Navbar.view",
        //Templates
        "NavbarTemplate": "components/Index/navbar.html",
        //End -- Navbar

        //Start --- Left Sidebar
        //Models
        "LeftSidebarModel": "components/LeftSideBar/LeftSidebar.model",
        "UserInfoModel": "components/LeftSideBar/UserInfo.model",
        "LeftSidebarMenuItemModel": "components/LeftSideBar/LeftSidebarMenuItem.model",
        "LeftSidebarFooter": "components/LeftSideBar/LeftSidebarFooter.model",

        //Collections
        "LeftSidebarMenuCollection": "components/LeftSideBar/LeftSidebarMenu.collection",

        //Views
        "LeftSidebarView": "components/LeftSideBar/LeftSidebar.view",
        "UserInfoView": "components/LeftSideBar/UserInfo.view",
        "LeftSidebarMenuView": "components/LeftSideBar/LeftSidebarMenu.view",
        "LeftSidebarMenuItemView": "components/LeftSideBar/LeftSidebarMenuItem.view",
        "LeftSidebarFooterView": "components/LeftSideBar/LeftSidebarFooter.view",

        //Templates
        "LeftSidebarTemplate": "components/LeftSideBar/left-side-bar.html",
        "UserInfoTemplate": "components/LeftSideBar/user-info.html",
        "LeftSidebarMenuTemplate": "components/LeftSideBar/left-sidebar-menu.html",
        "LeftSidebarMenuItemTemplate": "components/LeftSideBar/left-side-bar-menu-item.html",
        "LeftSideBarFooterTemplate": "components/LeftSideBar/left-side-bar-footer.html",
        //End -- Left Sidebar


        "AvatarFileModel": "components/Profile/AvatarFile.model",
        "DashboardModel": "components/Dashboard/Dashboard.model",
        "WebSiteTrafficModel": "components/Dashboard/WebSiteTraffic.model",

        //Right sidebar panel
        "RightSidebarView": "components/RightSideBar/RightSidebar.view",

        //Work area
        "DashboardView": "components/Dashboard/Dashboard.view",
        "ProfileView": "components/Profile/Profile.view",
        "CustomerAccountView": "components/CustomerAccount/CustomerAccount.view",
        "NotifyView": "components/Index/Notify.view",

        //Views widgets
        "WebSiteTrafficView": "components/Dashboard/WebSiteTraffic.view",

        //Templates
        "RightSidebarTemplate": "components/RightSideBar/rightsidebar.html",
        "SignInTemplate": "views/templates/sign-in.html",
        "SignUpTemplate": "views/templates/sign-up.html",
        "LogoutTemplate": "views/templates/logout.html",
        "DashboardTemplate": "components/Dashboard/dashboard.html",
        "ProfileTemplate": "components/Profile/profile.html",
        "CustomerAccountTemplate": "components/CustomerAccount/customer-account.html",
        "NotifyTemplate": "components/Index/notify.html",

        //Tempaltes widgets
        "WebSiteTrafficTemplate": "components/Dashboard/web-site-traffic.html"
    },
    "shim": {
        "bootstrap": ["jquery"],
        "jquery-slimscroll": ["jquery"],
    }
});

require([
    // Load our app module and pass it to our definition function
    'app',
], function (App) {
    console.log("App init");
    App.initialize();
});