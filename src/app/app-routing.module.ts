import { NgModule } from "@angular/core";
import { NativeScriptRouterModule } from "nativescript-angular/router";
import { Routes, PreloadAllModules } from "@angular/router";

const routes: Routes = [
    { path: "", redirectTo: "/login", pathMatch: "full" },
    { path: "login", loadChildren: "./login/login.module#LoginModule" },
    { path: "register", loadChildren: "./register/register.module#RegisterModule" },
    { path: "forgotPassword", loadChildren: "./forgot-password/forgot-password.module#ForgotPasswordModule" },
    { path: "changePassword", loadChildren: "./change-password/change-password.module#ChangePasswordModule" },
    { path: "confirmOtp", loadChildren: "./confirm-otp/confirm-otp.module#ConfirmOtpModule" },
    { path: "shipping", loadChildren: "./shipping/shipping.module#ShippingModule" },
    { path: "addAddress", loadChildren: "./add-address/add-address.module#AddAddressModule" },
    { path: "congratulations", loadChildren: "./congratulations/congratulations.module#CongratulationsModule" },
    { path: "menu", loadChildren: "./menu/menu.module#MenuModule" },
    { path: "profile", loadChildren: "./profile/profile.module#ProfileModule" },
    { path: "editProfile", loadChildren: "./edit-profile/edit-profile.module#EditProfileModule" },
    { path: "cart", loadChildren: "./cart/cart.module#CartModule" },
    { path: "products", loadChildren: "./products/products.module#ProductsModule" },
    { path: "search", loadChildren: "./search/search.module#SearchModule" },
    { path: "orderDetails", loadChildren: "./order-details/order-details.module#OrderDetailsModule" },
    { path: "myOrders", loadChildren: "./my-orders/my-orders.module#MyOrdersModule" },
    { path: "home", loadChildren: "./home/home.module#HomeModule" },
    { path: "categories", loadChildren: "./categories/categories.module#CategoriesModule" },
    { path: "setPassword", loadChildren: "./set-password/set-password.module#SetPasswordModule" },
    { path: "faq", loadChildren: "./faq/faq.module#FaqModule" }
];

@NgModule({
    imports: [NativeScriptRouterModule.forRoot(
        <any>routes, { preloadingStrategy: PreloadAllModules })],
    exports: [NativeScriptRouterModule]
})


export class AppRoutingModule { }
