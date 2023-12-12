import { NgModule } from '@angular/core';
import { NativeScriptRouterModule } from 'nativescript-angular/router';
import { Routes } from '@angular/router';
import { ConfirmOtpComponent } from './components/confirm-otp.component';

const routes: Routes = [{ path: '', component: ConfirmOtpComponent }];

@NgModule({
  imports: [NativeScriptRouterModule.forChild(routes)],
  exports: [NativeScriptRouterModule],
})
export class ConfirmOtpRoutingModule {}
