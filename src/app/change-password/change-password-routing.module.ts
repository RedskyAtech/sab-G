import { NgModule } from '@angular/core';
import { NativeScriptRouterModule } from '@nativescript/angular';
import { Routes } from '@angular/router';
import { ChangePasswordComponent } from './components/change-password.component';

const routes: Routes = [{ path: '', component: ChangePasswordComponent }];

@NgModule({
  imports: [NativeScriptRouterModule.forChild(routes)],
  exports: [NativeScriptRouterModule],
})
export class ChangePasswordRoutingModule {}
