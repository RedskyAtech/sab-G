import { FooterModule } from './../shared/footer/footer.module';
import { HeaderModule } from './../shared/header/header.module';
import { NgModule, NO_ERRORS_SCHEMA } from '@angular/core';
import { NgModalModule } from '../modals/ng-modal';
import { HttpClientModule } from '@angular/common/http';
import { NativeScriptCommonModule, NativeScriptFormsModule } from '@nativescript/angular';
// import { GridViewModule } from 'nativescript-grid-view/angular';
import { EditProfileComponent } from './components/edit-profile.component';
import { EditProfileRoutingModule } from './edit-profile-routing.module';

@NgModule({
  bootstrap: [EditProfileComponent],
  imports: [
    NativeScriptCommonModule,
    NativeScriptFormsModule,
    NgModalModule,
    HttpClientModule,
    EditProfileRoutingModule,
    // GridViewModule,
    HeaderModule,
    FooterModule,
  ],
  declarations: [EditProfileComponent],
  schemas: [NO_ERRORS_SCHEMA],
})
export class EditProfileModule { }
