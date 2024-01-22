import { NgModule, NO_ERRORS_SCHEMA } from '@angular/core';
import { NativeScriptModule, NativeScriptAnimationsModule } from '@nativescript/angular';
import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { NgModalModule } from './modals/ng-modal';
import { HttpClientModule } from '@angular/common/http';
import { UserService } from './services/user.service';
// import { NativeScriptMaterialBottomSheetModule } from 'nativescript-material-bottomsheet/angular';

@NgModule({
  bootstrap: [AppComponent],
  imports: [
    NativeScriptModule,
    AppRoutingModule,
    NgModalModule,
    HttpClientModule,
    NativeScriptAnimationsModule,
    // NativeScriptMaterialBottomSheetModule.forRoot(),
  ],
  declarations: [AppComponent],
  providers: [UserService],
  schemas: [NO_ERRORS_SCHEMA],
})
export class AppModule {}
