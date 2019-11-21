import { NgModule, NO_ERRORS_SCHEMA } from "@angular/core";
import { NgModalModule } from "../modals/ng-modal";
import { HttpClientModule } from "@angular/common/http";
import { NativeScriptCommonModule } from "nativescript-angular/common";
import { NativeScriptFormsModule } from "nativescript-angular/forms";
import { GridViewModule } from "nativescript-grid-view/angular";
import { MyOrdersComponent } from "./components/my-orders.component";
import { MyOrdersRoutingModule } from "./my-orders-routing.module";


@NgModule({
    bootstrap: [
        MyOrdersComponent
    ],
    imports: [
        NativeScriptCommonModule,
        NativeScriptFormsModule,
        NgModalModule,
        HttpClientModule,
        MyOrdersRoutingModule,
        GridViewModule
    ],
    declarations: [
        MyOrdersComponent
    ],
    schemas: [
        NO_ERRORS_SCHEMA
    ]
})

export class MyOrdersModule { }