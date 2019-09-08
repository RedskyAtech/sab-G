import { NgModule, NO_ERRORS_SCHEMA } from "@angular/core";
import { NgModalModule } from "../modals/ng-modal";
import { HttpClientModule } from "@angular/common/http";
import { NativeScriptCommonModule } from "nativescript-angular/common";
import { NativeScriptFormsModule } from "nativescript-angular/forms";
import { GridViewModule } from "nativescript-grid-view/angular";
import { ProductsComponent } from "./components/products.component";
import { ProductsRoutingModule } from "./products-routing.module";


@NgModule({
    bootstrap: [
        ProductsComponent
    ],
    imports: [
        NativeScriptCommonModule,
        NativeScriptFormsModule,
        NgModalModule,
        HttpClientModule,
        ProductsRoutingModule,
        GridViewModule
    ],
    declarations: [
        ProductsComponent
    ],
    schemas: [
        NO_ERRORS_SCHEMA
    ]
})

export class ProductsModule { }
