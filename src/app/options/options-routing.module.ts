import { NgModule } from "@angular/core";
import { NativeScriptRouterModule } from "nativescript-angular/router";
import { Routes } from "@angular/router";
import { OptionsComponent } from "./components/options.component";

const routes: Routes = [
    { path: "", component: OptionsComponent },
];


@NgModule({
    imports: [NativeScriptRouterModule.forChild(routes)],
    exports: [NativeScriptRouterModule]
})


export class OptionsRoutingModule { }
