import { NgModule, NO_ERRORS_SCHEMA } from '@angular/core';
import { NgModalModule } from '../modals/ng-modal';
import { HttpClientModule } from '@angular/common/http';
import { NativeScriptCommonModule } from 'nativescript-angular/common';
import { NativeScriptFormsModule } from 'nativescript-angular/forms';
import { GridViewModule } from 'nativescript-grid-view/angular';
import { MenuComponent } from './components/menu.component';
import { MenuRoutingModule } from './menu-routing.module';

@NgModule({
  bootstrap: [MenuComponent],
  imports: [
    NativeScriptCommonModule,
    NativeScriptFormsModule,
    NgModalModule,
    HttpClientModule,
    MenuRoutingModule,
    GridViewModule,
  ],
  declarations: [MenuComponent],
  schemas: [NO_ERRORS_SCHEMA],
})
export class MenuModule {}
