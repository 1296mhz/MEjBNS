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
        "IndexView": "views/containerApplication/Index.view",

        //Templates
        "IndexTemplate": "views/templates/index.html",
        //End --- Index

        //Start --- Navbar
        //Models
        "NavbarModel": "models/Navbar.model",
        //Views
        "NavbarView": "views/containerApplication/Navbar.view",
        //Templates
        "NavbarTemplate": "views/templates/navbar.html",
        //End -- Navbar

        //Start --- Left Sidebar
        //Models
        "LeftSidebarModel": "models/LeftSidebar.model",
        "UserInfoModel": "models/UserInfo.model",
        "LeftSidebarMenuItemModel": "models/LeftSidebarMenuItem.model",
        "LeftSidebarFooter": "models/LeftSidebarFooter.model",

        //Collections
        "LeftSidebarMenuCollection": "collections/LeftSidebarMenu.collection",

        //Views
        "LeftSidebarView": "views/containerApplication/LeftSidebar.view",
        "UserInfoView": "views/containerApplication/UserInfo.view",
        "LeftSidebarMenuView": "views/containerApplication/LeftSidebarMenu.view",
        "LeftSidebarMenuItemView": "views/containerApplication/LeftSidebarMenuItem.view",
        "LeftSidebarFooterView": "views/containerApplication/LeftSidebarFooter.view",

        //Templates
        "LeftSidebarTemplate": "views/templates/left-side-bar.html",
        "UserInfoTemplate": "views/templates/user-info.html",
        "LeftSidebarMenuTemplate": "views/templates/left-sidebar-menu.html",
        "LeftSidebarMenuItemTemplate": "views/templates/containerApplication/left-side-bar-menu-item.html",
        "LeftSideBarFooterTemplate": "views/templates/left-side-bar-footer.html",
        //End -- Left Sidebar


        "AvatarFileModel": "models/AvatarFile.model",
        "DashboardModel": "models/Dashboard.model",
        "WebSiteTrafficModel": "models/WebSiteTraffic.model",

        //Right sidebar panel
        "RightSidebarView": "views/containerApplication/RightSidebar.view",

        //Work area
        "DashboardView": "views/Dashboard.view",
        "ProfileView": "views/Profile.view",
        "CustomerAccountView": "views/CustomerAccount.view",
        "NotifyView": "views/containerApplication/Notify.view",

        //Views widgets
        "WebSiteTrafficView": "views/widgets/WebSiteTraffic.view",

        //Templates
        "RightSidebarTemplate": "views/templates/rightsidebar.html",
        "SignInTemplate": "views/templates/sign-in.html",
        "SignUpTemplate": "views/templates/sign-up.html",
        "LogoutTemplate": "views/templates/logout.html",
        "DashboardTemplate": "views/templates/dashboard.html",
        "ProfileTemplate": "views/templates/profile.html",
        "CustomerAccountTemplate": "views/templates/customer-account.html",
        "NotifyTemplate": "views/templates/notify.html",

        //Tempaltes widgets
        "WebSiteTrafficTemplate": "views/templates/widgets/web-site-traffic.html"
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