import { NgModule } from "@angular/core";
import { NativeScriptRouterModule } from "nativescript-angular/router";
import { Routes } from "@angular/router";
import { SearchComponent } from "./components/search.component";

const routes: Routes = [
    { path: "", component: SearchComponent },
];


@NgModule({
    imports: [NativeScriptRouterModule.forChild(routes)],
    exports: [NativeScriptRouterModule]
})


export class SearchRoutingModule { }
