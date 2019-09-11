import { NgModule, NO_ERRORS_SCHEMA } from "@angular/core";
import { NgModalModule } from "../modals/ng-modal";
import { HttpClientModule } from "@angular/common/http";
import { NativeScriptCommonModule } from "nativescript-angular/common";
import { NativeScriptFormsModule } from "nativescript-angular/forms";
import { GridViewModule } from "nativescript-grid-view/angular";
import { HomeComponent } from "./components/home.component";
import { HomeRoutingModule } from "./home-routing.module";


@NgModule({
    bootstrap: [
        HomeComponent
    ],
    imports: [
        NativeScriptCommonModule,
        NativeScriptFormsModule,
        NgModalModule,
        HttpClientModule,
        HomeRoutingModule,
        GridViewModule
    ],
    declarations: [
        HomeComponent
    ],
    schemas: [
        NO_ERRORS_SCHEMA
    ]
})

export class HomeModule { }
