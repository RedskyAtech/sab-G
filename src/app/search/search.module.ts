import { FooterModule } from '../shared/footer/footer.module';
import { HeaderModule } from '../shared/header/header.module';
import { NgModule, NO_ERRORS_SCHEMA } from '@angular/core';
import { NgModalModule } from '../modals/ng-modal';
import { HttpClientModule } from '@angular/common/http';
import { NativeScriptCommonModule } from 'nativescript-angular/common';
import { NativeScriptFormsModule } from 'nativescript-angular/forms';
import { GridViewModule } from 'nativescript-grid-view/angular';
import { SearchRoutingModule } from './search-routing.module';
import { SearchComponent } from './components/search.component';
import { NativeScriptUIListViewModule } from 'nativescript-ui-listview/angular';

@NgModule({
  bootstrap: [SearchComponent],
  imports: [
    NativeScriptCommonModule,
    NativeScriptFormsModule,
    NgModalModule,
    HttpClientModule,
    SearchRoutingModule,
    GridViewModule,
    HeaderModule,
    FooterModule,
    NativeScriptUIListViewModule,
  ],
  declarations: [SearchComponent],
  schemas: [NO_ERRORS_SCHEMA],
})
export class SearchModule {}
