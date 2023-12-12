import { NgModule, NO_ERRORS_SCHEMA } from '@angular/core';
import { NativeScriptCommonModule } from 'nativescript-angular/common';
import { FooterComponent } from './components/footer.component';

@NgModule({
  imports: [NativeScriptCommonModule],
  declarations: [FooterComponent],
  schemas: [NO_ERRORS_SCHEMA],
  exports: [FooterComponent],
})
export class FooterModule {}
