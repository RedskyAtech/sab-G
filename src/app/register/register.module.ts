import { NgModule, NO_ERRORS_SCHEMA } from '@angular/core';
import { NgModalModule } from '../modals/ng-modal';
import { HttpClientModule } from '@angular/common/http';
import { NativeScriptCommonModule, NativeScriptFormsModule } from '@nativescript/angular';
import { GridViewModule } from 'nativescript-grid-view/angular';
import { RegisterComponent } from './components/register.component';
import { RegisterRoutingModule } from './register-routing.module';

@NgModule({
  bootstrap: [RegisterComponent],
  imports: [
    NativeScriptCommonModule,
    NativeScriptFormsModule,
    NgModalModule,
    HttpClientModule,
    RegisterRoutingModule,
    GridViewModule,
  ],
  declarations: [RegisterComponent],
  schemas: [NO_ERRORS_SCHEMA],
})
export class RegisterModule {}
