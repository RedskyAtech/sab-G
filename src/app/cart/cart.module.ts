import { FooterModule } from './../shared/footer/footer.module';
import { HeaderModule } from './../shared/header/header.module';
import { NgModule, NO_ERRORS_SCHEMA } from "@angular/core";
import { NgModalModule } from "../modals/ng-modal";
import { HttpClientModule } from "@angular/common/http";
import { NativeScriptCommonModule } from "nativescript-angular/common";
import { NativeScriptFormsModule } from "nativescript-angular/forms";
import { GridViewModule } from "nativescript-grid-view/angular";
import { CartComponent } from "./components/cart.component";
import { CartRoutingModule } from "./cart-routing.module";


@NgModule({
    bootstrap: [
        CartComponent
    ],
    imports: [
        NativeScriptCommonModule,
        NativeScriptFormsModule,
        NgModalModule,
        HttpClientModule,
        CartRoutingModule,
        GridViewModule,
        HeaderModule,
        FooterModule
    ],
    declarations: [
        CartComponent
    ],
    schemas: [
        NO_ERRORS_SCHEMA
    ]
})

export class CartModule { }
