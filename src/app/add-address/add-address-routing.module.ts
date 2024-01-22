import { NgModule } from '@angular/core';
import { NativeScriptRouterModule } from '@nativescript/angular';
import { Routes } from '@angular/router';
import { AddAddressComponent } from './components/add-address.component';

const routes: Routes = [{ path: '', component: AddAddressComponent }];

@NgModule({
  imports: [NativeScriptRouterModule.forChild(routes)],
  exports: [NativeScriptRouterModule],
})
export class AddAddressRoutingModule {}
