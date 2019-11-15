import { NgModule, NO_ERRORS_SCHEMA } from "@angular/core";
import { NgModalModule } from "../modals/ng-modal";
import { HttpClientModule } from "@angular/common/http";
import { NativeScriptCommonModule } from "nativescript-angular/common";
import { NativeScriptFormsModule } from "nativescript-angular/forms";
import { GridViewModule } from "nativescript-grid-view/angular";
import { CategoriesComponent } from "./components/categories.component";
import { CategoriesRoutingModule } from "./categories-routing.module";


@NgModule({
    bootstrap: [
        CategoriesComponent
    ],
    imports: [
        NativeScriptCommonModule,
        NativeScriptFormsModule,
        NgModalModule,
        HttpClientModule,
        CategoriesRoutingModule,
        GridViewModule
    ],
    declarations: [
        CategoriesComponent
    ],
    schemas: [
        NO_ERRORS_SCHEMA
    ]
})

export class CategoriesModule { }
