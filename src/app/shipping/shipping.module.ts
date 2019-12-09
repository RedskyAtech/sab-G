import { FooterModule } from './../shared/footer/footer.module';
import { HeaderModule } from './../shared/header/header.module';
import { NgModule, NO_ERRORS_SCHEMA } from "@angular/core";
import { NgModalModule } from "../modals/ng-modal";
import { HttpClientModule } from "@angular/common/http";
import { NativeScriptCommonModule } from "nativescript-angular/common";
import { NativeScriptFormsModule } from "nativescript-angular/forms";
import { GridViewModule } from "nativescript-grid-view/angular";
import { ShippingComponent } from "./components/shipping.component";
import { ShippingRoutingModule } from "./shipping-routing.module";


@NgModule({
    bootstrap: [
        ShippingComponent
    ],
    imports: [
        NativeScriptCommonModule,
        NativeScriptFormsModule,
        NgModalModule,
        HttpClientModule,
        ShippingRoutingModule,
        GridViewModule,
        HeaderModule,
        FooterModule
    ],
    declarations: [
        ShippingComponent
    ],
    schemas: [
        NO_ERRORS_SCHEMA
    ]
})

export class ShippingModule { }
