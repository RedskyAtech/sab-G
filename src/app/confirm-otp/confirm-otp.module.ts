import { NgModule, NO_ERRORS_SCHEMA } from '@angular/core';
import { NgModalModule } from '../modals/ng-modal';
import { HttpClientModule } from '@angular/common/http';
import { NativeScriptCommonModule, NativeScriptFormsModule } from '@nativescript/angular';
// import { GridViewModule } from "nativescript-grid-view/angular";
import { ConfirmOtpComponent } from './components/confirm-otp.component';
import { ConfirmOtpRoutingModule } from './confirm-otp-routing.module';

@NgModule({
  bootstrap: [ConfirmOtpComponent],
  imports: [
    NativeScriptCommonModule,
    NativeScriptFormsModule,
    NgModalModule,
    HttpClientModule,
    ConfirmOtpRoutingModule,
    // GridViewModule
  ],
  declarations: [ConfirmOtpComponent],
  schemas: [NO_ERRORS_SCHEMA],
})
export class ConfirmOtpModule {}
