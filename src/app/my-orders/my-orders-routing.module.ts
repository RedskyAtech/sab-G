import { NgModule } from '@angular/core';
import { NativeScriptRouterModule } from '@nativescript/angular';
import { Routes } from '@angular/router';
import { MyOrdersComponent } from './components/my-orders.component';

const routes: Routes = [{ path: '', component: MyOrdersComponent }];

@NgModule({
  imports: [NativeScriptRouterModule.forChild(routes)],
  exports: [NativeScriptRouterModule],
})
export class MyOrdersRoutingModule {}
