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
    { path: "home", loadChildren: "./home/home.module#HomeModule" },
];

@NgModule({
    imports: [NativeScriptRouterModule.forRoot(
        <any>routes, { preloadingStrategy: PreloadAllModules })],
    exports: [NativeScriptRouterModule]
})


export class AppRoutingModule { }
