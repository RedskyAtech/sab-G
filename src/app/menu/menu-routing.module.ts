import { NgModule } from "@angular/core";
import { NativeScriptRouterModule } from "nativescript-angular/router";
import { Routes } from "@angular/router";
import { MenuComponent } from "./components/menu.component";

const routes: Routes = [
    { path: "", component: MenuComponent },
];


@NgModule({
    imports: [NativeScriptRouterModule.forChild(routes)],
    exports: [NativeScriptRouterModule]
})


export class MenuRoutingModule { }
