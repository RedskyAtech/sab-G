import { NgModule, NO_ERRORS_SCHEMA } from '@angular/core';
import { NgModalModule } from '../modals/ng-modal';
import { HttpClientModule } from '@angular/common/http';
import { NativeScriptCommonModule, NativeScriptFormsModule } from '@nativescript/angular';
// import { GridViewModule } from "nativescript-grid-view/angular";
import { HomeComponent } from './components/home.component';
import { HomeRoutingModule } from './home-routing.module';
import { HeaderModule } from '../shared/header/header.module';
import { FooterModule } from '../shared/footer/footer.module';
import { NativeScriptUIListViewModule } from 'nativescript-ui-listview/angular';

@NgModule({
  bootstrap: [HomeComponent],
  imports: [
    NativeScriptCommonModule,
    NativeScriptFormsModule,
    NgModalModule,
    HttpClientModule,
    HomeRoutingModule,
    // GridViewModule,
    HeaderModule,
    FooterModule,
    NativeScriptUIListViewModule,
  ],
  declarations: [HomeComponent],
  schemas: [NO_ERRORS_SCHEMA],
})
export class HomeModule {}
