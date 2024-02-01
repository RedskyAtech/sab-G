import { FooterModule } from './../shared/footer/footer.module';
import { HeaderModule } from './../shared/header/header.module';
import { NgModule, NO_ERRORS_SCHEMA } from '@angular/core';
import { NgModalModule } from '../modals/ng-modal';
import { HttpClientModule } from '@angular/common/http';
import { NativeScriptCommonModule, NativeScriptFormsModule } from '@nativescript/angular';
// import { GridViewModule } from 'nativescript-grid-view/angular';
import { CongratulationsComponent } from './components/congratulations.component';
import { CongratulationsRoutingModule } from './congratulations-routing.module';

@NgModule({
  bootstrap: [CongratulationsComponent],
  imports: [
    NativeScriptCommonModule,
    NativeScriptFormsModule,
    NgModalModule,
    HttpClientModule,
    CongratulationsRoutingModule,
    // GridViewModule,
    HeaderModule,
    FooterModule,
  ],
  declarations: [CongratulationsComponent],
  schemas: [NO_ERRORS_SCHEMA],
})
export class CongratulationsModule { }
