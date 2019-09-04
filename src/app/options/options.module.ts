import { NgModule, NO_ERRORS_SCHEMA } from "@angular/core";
import { NgModalModule } from "../modals/ng-modal";
import { HttpClientModule } from "@angular/common/http";
import { NativeScriptCommonModule } from "nativescript-angular/common";
import { NativeScriptFormsModule } from "nativescript-angular/forms";
import { GridViewModule } from "nativescript-grid-view/angular";
import { OptionsComponent } from "./components/options.component";
import { OptionsRoutingModule } from "./options-routing.module";


@NgModule({
    bootstrap: [
        OptionsComponent
    ],
    imports: [
        NativeScriptCommonModule,
        NativeScriptFormsModule,
        NgModalModule,
        HttpClientModule,
        OptionsRoutingModule,
        GridViewModule
    ],
    declarations: [
        OptionsComponent
    ],
    schemas: [
        NO_ERRORS_SCHEMA
    ]
})


export class OptionsModule { }
