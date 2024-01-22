import { HeaderModule } from './../shared/header/header.module';
import { FooterModule } from './../shared/footer/footer.module';
import { NgModule, NO_ERRORS_SCHEMA } from '@angular/core';
import { HttpClientModule } from '@angular/common/http';
import { NativeScriptCommonModule, NativeScriptFormsModule } from '@nativescript/angular';
import { GridViewModule } from 'nativescript-grid-view/angular';
import { AddAddressComponent } from './components/add-address.component';
import { AddAddressRoutingModule } from './add-address-routing.module';

@NgModule({
  bootstrap: [AddAddressComponent],
  imports: [
    NativeScriptCommonModule,
    NativeScriptFormsModule,
    HttpClientModule,
    AddAddressRoutingModule,
    GridViewModule,
    FooterModule,
    HeaderModule,
  ],
  declarations: [AddAddressComponent],
  schemas: [NO_ERRORS_SCHEMA],
})
export class AddAddressModule {}
