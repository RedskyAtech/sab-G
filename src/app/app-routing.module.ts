import { NgModule } from "@angular/core";
import { NativeScriptRouterModule } from "nativescript-angular/router";
import { Routes, PreloadAllModules } from "@angular/router";

const routes: Routes = [
    { path: "", redirectTo: "/products", pathMatch: "full" },
    { path: "login", loadChildren: "./login/login.module#LoginModule" },
    { path: "register", loadChildren: "./register/register.module#RegisterModule" },
    { path: "forgotPassword", loadChildren: "./forgot-password/forgot-password.module#ForgotPasswordModule" },
    { path: "changePassword", loadChildren: "./change-password/change-password.module#ChangePasswordModule" },
    { path: "confirmOtp", loadChildren: "./confirm-otp/confirm-otp.module#ConfirmOtpModule" },
    { path: "shipping", loadChildren: "./shipping/shipping.module#ShippingModule" },
    { path: "addAddress", loadChildren: "./add-address/add-address.module#AddAddressModule" },
    { path: "congratulations", loadChildren: "./congratulations/congratulations.module#CongratulationsModule" },
    { path: "options", loadChildren: "./options/options.module#OptionsModule" },
    { path: "profile", loadChildren: "./profile/profile.module#ProfileModule" },
    { path: "editProfile", loadChildren: "./edit-profile/edit-profile.module#EditProfileModule" },
    { path: "cart", loadChildren: "./cart/cart.module#CartModule" },
    { path: "products", loadChildren: "./products/products.module#ProductsModule" },
    { path: "home", loadChildren: "./home/home.module#HomeModule" },
];

@NgModule({
    imports: [NativeScriptRouterModule.forRoot(
        <any>routes, { preloadingStrategy: PreloadAllModules })],
    exports: [NativeScriptRouterModule]
})


export class AppRoutingModule { }
