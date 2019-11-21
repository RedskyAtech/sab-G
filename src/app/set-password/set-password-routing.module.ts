import { NgModule } from "@angular/core";
import { NativeScriptRouterModule } from "nativescript-angular/router";
import { Routes } from "@angular/router";
import { SetPasswordComponent } from "./components/set-password.component";

const routes: Routes = [
    { path: "", component: SetPasswordComponent },
];


@NgModule({
    imports: [NativeScriptRouterModule.forChild(routes)],
    exports: [NativeScriptRouterModule]
})


export class SetPasswordRoutingModule { }
