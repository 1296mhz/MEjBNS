/**
 * Created by cshlovjah on 03.01.18.
 */
require.config({
    "paths": {
        //Library
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

        //Services
        "SocketioService": "services/Socketio.service",

        //Index
        "IndexView": "components/Index/Index.view",
        "IndexTemplate": "components/Index/index.html",
        "NavbarModel": "components/Index/Navbar.model",
        "NavbarView": "components/Index/Navbar.view",
        "NavbarTemplate": "components/Index/navbar.html",
        "NotifyView": "components/Index/Notify.view",
        "NotifyTemplate": "components/Index/notify.html",
        //Index

        //LeftSidebar
        "LeftSidebarModel": "components/LeftSideBar/LeftSidebar.model",
        "UserInfoModel": "components/LeftSideBar/UserInfo.model",
        "LeftSidebarMenuItemModel": "components/LeftSideBar/LeftSidebarMenuItem.model",
        "LeftSidebarFooter": "components/LeftSideBar/LeftSidebarFooter.model",
        "LeftSidebarMenuCollection": "components/LeftSideBar/LeftSidebarMenu.collection",
        "LeftSidebarView": "components/LeftSideBar/LeftSidebar.view",
        "UserInfoView": "components/LeftSideBar/UserInfo.view",
        "LeftSidebarMenuView": "components/LeftSideBar/LeftSidebarMenu.view",
        "LeftSidebarMenuItemView": "components/LeftSideBar/LeftSidebarMenuItem.view",
        "LeftSidebarFooterView": "components/LeftSideBar/LeftSidebarFooter.view",
        "LeftSidebarTemplate": "components/LeftSideBar/left-side-bar.html",
        "UserInfoTemplate": "components/LeftSideBar/user-info.html",
        "LeftSidebarMenuTemplate": "components/LeftSideBar/left-sidebar-menu.html",
        "LeftSidebarMenuItemTemplate": "components/LeftSideBar/left-side-bar-menu-item.html",
        "LeftSideBarFooterTemplate": "components/LeftSideBar/left-side-bar-footer.html",
        //LeftSidebar

        //RightSidebar
        "RightSidebarView": "components/RightSideBar/RightSidebar.view",
        "RightSidebarTemplate": "components/RightSideBar/rightsidebar.html",
        //RightSidebar

        //Dashboard
        "AvatarFileModel": "components/Profile/AvatarFile.model",
        "DashboardModel": "components/Dashboard/Dashboard.model",
        "DashboardView": "components/Dashboard/Dashboard.view",
        "DashboardTemplate": "components/Dashboard/dashboard.html",
        "WebSiteTrafficModel": "components/Dashboard/WebSiteTraffic.model",
        "WebSiteTrafficView": "components/Dashboard/WebSiteTraffic.view",
        "WebSiteTrafficTemplate": "components/Dashboard/web-site-traffic.html",
        //Dashboard

        //Profile
        "ProfileView": "components/Profile/Profile.view",
        "ProfileTemplate": "components/Profile/profile.html",
        //Profile

        //CustomerAccount
        "CustomerAccountView": "components/CustomerAccount/CustomerAccount.view",
        "CustomerAccountTemplate": "components/CustomerAccount/customer-account.html",
        //CustomerAccount

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