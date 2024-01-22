import { NgModule, NO_ERRORS_SCHEMA } from '@angular/core';
import { NgModalModule } from '../modals/ng-modal';
import { HttpClientModule } from '@angular/common/http';
import { NativeScriptCommonModule, NativeScriptFormsModule } from '@nativescript/angular';
import { GridViewModule } from 'nativescript-grid-view/angular';
import { LoginComponent } from './components/login.component';
import { LoginRoutingModule } from './login-routing.module';
// import '~/app/assets/constants/color-constant.scss';

@NgModule({
  bootstrap: [LoginComponent],
  imports: [
    NativeScriptCommonModule,
    NativeScriptFormsModule,
    NgModalModule,
    HttpClientModule,
    LoginRoutingModule,
    GridViewModule,
  ],
  declarations: [LoginComponent],
  schemas: [NO_ERRORS_SCHEMA],
})
export class LoginModule {}
