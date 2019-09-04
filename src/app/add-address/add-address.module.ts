import { NgModule, NO_ERRORS_SCHEMA } from "@angular/core";
import { NgModalModule } from "../modals/ng-modal";
import { HttpClientModule } from "@angular/common/http";
import { NativeScriptCommonModule } from "nativescript-angular/common";
import { NativeScriptFormsModule } from "nativescript-angular/forms";
import { GridViewModule } from "nativescript-grid-view/angular";
import { AddAddressComponent } from "./components/add-address.component";
import { AddAddressRoutingModule } from "./add-address-routing.module";


@NgModule({
    bootstrap: [
        AddAddressComponent
    ],
    imports: [
        NativeScriptCommonModule,
        NativeScriptFormsModule,
        NgModalModule,
        HttpClientModule,
        AddAddressRoutingModule,
        GridViewModule
    ],
    declarations: [
        AddAddressComponent
    ],
    schemas: [
        NO_ERRORS_SCHEMA
    ]
})

export class AddAddressModule { }
