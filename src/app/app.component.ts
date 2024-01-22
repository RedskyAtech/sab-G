import { Component, NgZone } from '@angular/core';
import { RouterExtensions } from 'nativescript-angular/router/router-extensions';
import { ChildrenOutletContexts, Router, RouterLink, RouterOutlet } from '@angular/router';
import { UserService } from './services/user.service';
import { registerElement } from 'nativescript-angular/element-registry';
import { Color } from 'tns-core-modules/color/color';
import { Carousel, CarouselItem } from 'nativescript-carousel';
import { requestPermissions } from 'nativescript-permissions';
import { Folder, path, File } from 'tns-core-modules/file-system';
import * as Toast from 'nativescript-toast';
import { exit } from 'nativescript-exit';
import * as application from 'tns-core-modules/application';
import * as localstorage from 'nativescript-localstorage';

import { isAndroid } from 'tns-core-modules/platform';
import { knownFolders } from 'tns-core-modules/file-system';

declare const android: any;
registerElement('Carousel', () => Carousel);
registerElement('CarouselItem', () => CarouselItem);

@Component({
  selector: 'ns-app',
  moduleId: module.id,
  templateUrl: './app.component.html',
})
export class AppComponent {
  tries: number;
  folder: Folder;
  file: any;

  constructor(
    private routerExtensions: RouterExtensions,
    private userService: UserService,
    private ngZone: NgZone,
  ) {
    this.ngZone.run(async () => {
      if (localstorage.getItem('token')) {
        this.routerExtensions.navigate(['/home']);
      }
      if (isAndroid) {
        // this.androidBackBtn();
      } else {
        console.log('App is running on iOS');
      }
    });

    const permissions: Array<any> = new Array<any>();
    if (isAndroid) {
      permissions.push(android.Manifest.permission.READ_EXTERNAL_STORAGE);
      permissions.push(android.Manifest.permission.WRITE_EXTERNAL_STORAGE);
      // permissions.push(android.Manifest.permission.ACCESS_FINE_LOCATION);
    }

    requestPermissions(permissions, 'Application needs location access for its functioning.').then(
      () => {
        console.log('Permission Granted');
        const documentsFolder = knownFolders.documents();
        this.folder = documentsFolder.getFolder('sabG');
        this.file = this.folder.getFile('sabG.jpg');
      },
    );
  }

  // private androidBackBtn() {
  //   this.tries = 0;
  //   application.android.on(
  //     application.AndroidApplication.activityBackPressedEvent,
  //     (data: application.AndroidActivityBackPressedEventData) => {
  //       const screen = this.userService.currentPage;
  //       console.log('SCREEN::::', screen);
  //       if (screen == 'home') {
  //         data.cancel = this.tries++ > 1 ? false : true;
  //         if (this.tries == 1) {
  //           Toast.makeText('Press again to exit', 'short').show();
  //         }
  //         if (this.tries == 2) {
  //           exit();
  //         }
  //         setTimeout(() => {
  //           this.tries = 0;
  //         }, 1000);
  //       } else if (screen == 'login') {
  //         exit();
  //       } else {
  //         data.cancel = true;
  //         this.routerExtensions.back();
  //       }
  //     },
  //   );
  // }
}
