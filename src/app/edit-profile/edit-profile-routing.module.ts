import { NgModule } from '@angular/core';
import { NativeScriptRouterModule } from 'nativescript-angular/router';
import { Routes } from '@angular/router';
import { EditProfileComponent } from './components/edit-profile.component';

const routes: Routes = [{ path: '', component: EditProfileComponent }];

@NgModule({
  imports: [NativeScriptRouterModule.forChild(routes)],
  exports: [NativeScriptRouterModule],
})
export class EditProfileRoutingModule {}
