import { NgModule, NO_ERRORS_SCHEMA } from '@angular/core';
import { NgModalModule } from '../modals/ng-modal';
import { HttpClientModule } from '@angular/common/http';
import { NativeScriptCommonModule } from 'nativescript-angular/common';
import { NativeScriptFormsModule } from 'nativescript-angular/forms';
import { GridViewModule } from 'nativescript-grid-view/angular';
import { ForgotPasswordComponent } from './components/forgot-password.component';
import { ForgotPasswordRoutingModule } from './forgot-password-routing.module';

@NgModule({
  bootstrap: [ForgotPasswordComponent],
  imports: [
    NativeScriptCommonModule,
    NativeScriptFormsModule,
    NgModalModule,
    HttpClientModule,
    ForgotPasswordRoutingModule,
    GridViewModule,
  ],
  declarations: [ForgotPasswordComponent],
  schemas: [NO_ERRORS_SCHEMA],
})
export class ForgotPasswordModule {}
