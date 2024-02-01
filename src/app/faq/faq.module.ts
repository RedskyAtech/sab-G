import { HeaderModule } from '../shared/header/header.module';
import { FooterModule } from '../shared/footer/footer.module';
import { NgModule, NO_ERRORS_SCHEMA } from '@angular/core';
import { HttpClientModule } from '@angular/common/http';
import { NativeScriptCommonModule, NativeScriptFormsModule } from '@nativescript/angular';
import { } from 'nativescript-grid-view/angular';
import { FaqRoutingModule } from './faq-routing.module';
import { FaqComponent } from './components/faq.component';

@NgModule({
  bootstrap: [FaqComponent],
  imports: [
    NativeScriptCommonModule,
    NativeScriptFormsModule,
    HttpClientModule,
    FaqRoutingModule,
    // GridViewModule,
    FooterModule,
    HeaderModule,
  ],
  declarations: [FaqComponent],
  schemas: [NO_ERRORS_SCHEMA],
})
export class FaqModule { }
