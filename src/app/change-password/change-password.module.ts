import { NgModule, NO_ERRORS_SCHEMA } from "@angular/core";
import { NgModalModule } from "../modals/ng-modal";
import { HttpClientModule } from "@angular/common/http";
import { NativeScriptCommonModule } from "nativescript-angular/common";
import { NativeScriptFormsModule } from "nativescript-angular/forms";
import { GridViewModule } from "nativescript-grid-view/angular";
import { ChangePasswordComponent } from "./components/change-password.component";
import { ChangePasswordRoutingModule } from "./change-password-routing.module";


@NgModule({
    bootstrap: [
        ChangePasswordComponent
    ],
    imports: [
        NativeScriptCommonModule,
        NativeScriptFormsModule,
        NgModalModule,
        HttpClientModule,
        ChangePasswordRoutingModule,
        GridViewModule
    ],
    declarations: [
        ChangePasswordComponent
    ],
    schemas: [
        NO_ERRORS_SCHEMA
    ]
})


export class ChangePasswordModule { }
