import { FooterModule } from './../shared/footer/footer.module';
import { HeaderModule } from './../shared/header/header.module';
import { NgModule, NO_ERRORS_SCHEMA } from '@angular/core';
import { NgModalModule } from '../modals/ng-modal';
import { HttpClientModule } from '@angular/common/http';
import { NativeScriptCommonModule, NativeScriptFormsModule } from '@nativescript/angular';
// import { GridViewModule } from "nativescript-grid-view/angular";
import { CategoriesComponent } from './components/categories.component';
import { CategoriesRoutingModule } from './categories-routing.module';
import { NativeScriptUIListViewModule } from 'nativescript-ui-listview/angular';

@NgModule({
  bootstrap: [CategoriesComponent],
  imports: [
    NativeScriptCommonModule,
    NativeScriptFormsModule,
    NgModalModule,
    HttpClientModule,
    CategoriesRoutingModule,
    // GridViewModule,
    HeaderModule,
    FooterModule,
    NativeScriptUIListViewModule,
  ],
  declarations: [CategoriesComponent],
  schemas: [NO_ERRORS_SCHEMA],
})
export class CategoriesModule {}
