import { FooterModule } from './../shared/footer/footer.module';
import { HeaderModule } from './../shared/header/header.module';
import { NgModule, NO_ERRORS_SCHEMA } from '@angular/core';
import { NgModalModule } from '../modals/ng-modal';
import { HttpClientModule } from '@angular/common/http';
import { NativeScriptCommonModule, NativeScriptFormsModule } from '@nativescript/angular';
// import { GridViewModule } from 'nativescript-grid-view/angular';
import { ChangePasswordComponent } from './components/change-password.component';
import { ChangePasswordRoutingModule } from './change-password-routing.module';

@NgModule({
  bootstrap: [ChangePasswordComponent],
  imports: [
    NativeScriptCommonModule,
    NativeScriptFormsModule,
    NgModalModule,
    HttpClientModule,
    ChangePasswordRoutingModule,
    // GridViewModule,
    HeaderModule,
    FooterModule,
  ],
  declarations: [ChangePasswordComponent],
  schemas: [NO_ERRORS_SCHEMA],
})
export class ChangePasswordModule { }
