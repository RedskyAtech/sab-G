import { NgModule } from '@angular/core';
import { NativeScriptRouterModule } from '@nativescript/angular';
import { Routes } from '@angular/router';
import { CongratulationsComponent } from './components/congratulations.component';

const routes: Routes = [{ path: '', component: CongratulationsComponent }];

@NgModule({
  imports: [NativeScriptRouterModule.forChild(routes)],
  exports: [NativeScriptRouterModule],
})
export class CongratulationsRoutingModule {}
