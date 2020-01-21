import { NgModule, NO_ERRORS_SCHEMA } from "@angular/core";
import { NgModalModule } from "../modals/ng-modal";
import { HttpClientModule } from "@angular/common/http";
import { NativeScriptCommonModule } from "nativescript-angular/common";
import { NativeScriptFormsModule } from "nativescript-angular/forms";
// import { GridViewModule } from "nativescript-grid-view/angular";
import { SetPasswordComponent } from "./components/set-password.component";
import { SetPasswordRoutingModule } from "./set-password-routing.module";


@NgModule({
    bootstrap: [
        SetPasswordComponent
    ],
    imports: [
        NativeScriptCommonModule,
        NativeScriptFormsModule,
        NgModalModule,
        HttpClientModule,
        SetPasswordRoutingModule,
        // GridViewModule
    ],
    declarations: [
        SetPasswordComponent
    ],
    schemas: [
        NO_ERRORS_SCHEMA
    ]
})


export class SetPasswordModule { }
