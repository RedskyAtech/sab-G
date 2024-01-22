import { NgModule } from '@angular/core';
import { NativeScriptRouterModule } from '@nativescript/angular';
import { Routes } from '@angular/router';
import { OrderDetailsComponent } from './components/order-details.component';

const routes: Routes = [{ path: '', component: OrderDetailsComponent }];

@NgModule({
  imports: [NativeScriptRouterModule.forChild(routes)],
  exports: [NativeScriptRouterModule],
})
export class OrderDetailsRoutingModule {}
