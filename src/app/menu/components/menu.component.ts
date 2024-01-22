import { Component, OnInit, AfterContentInit, ViewChild } from '@angular/core';
import { Color } from 'tns-core-modules/color/color';
import { RouterExtensions } from '@nativescript/angular';
import { UserService } from '~/app/services/user.service';
import { ModalComponent } from '~/app/modals/modal.component';
import * as localstorage from 'nativescript-localstorage';
import { Page } from 'tns-core-modules/ui/page/page';
import { Values } from '~/app/values/values';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { slideInAnimation } from '~/app/route-animation';
import {images} from '~/app/assets/index';

declare const android: any;
declare const CGSizeMake: any;

@Component({
  selector: 'ns-menu',
  moduleId: module.id,
  templateUrl: './menu.component.html',
  styleUrls: ['./menu.component.scss'],
  animations: [slideInAnimation],
})
export class MenuComponent implements OnInit, AfterContentInit {
  @ViewChild('viewLogoutDialog', { static: false })
  viewLogoutDialog: ModalComponent;

  assets = {
    logoTransparentIcon: images.LOGO_TRANSPARENT_ICON,
    nextIcon: images.NEXT_ICON,
    homeIcon: images.HOME_ICON,
    orderIcon: images.MY_ORDER_ICON,
    faqIcon: images.FAQ_ICON,
    myProfileIcon: images.MY_PROFILE_ICON,
    logoutIcon: images.LOGOUT_ICON,
    profilePicIcon: images.PROFILE_ICON,
  };

  isLoading: boolean;
  renderingTimeout;
  profilePicture: string;
  userName: string;
  token: string;
  headers: HttpHeaders;
  userId: string;
  logoTransparentIcon:string = this.assets.logoTransparentIcon;
  nextIcon:string = this.assets.nextIcon;
  homeIcon:string = this.assets.homeIcon;
  myOrderIcon:string = this.assets.orderIcon;
  faqIcon:string = this.assets.faqIcon;
  myProfileIcon:string = this.assets.myProfileIcon;
  logoutIcon:string = this.assets.logoutIcon;

  constructor(
    private routerExtensions: RouterExtensions,
    private userService: UserService,
    private page: Page,
    private http: HttpClient,
  ) {
    this.page.actionBarHidden = true;
  }

  ngAfterContentInit(): void {}

  ngOnInit(): void {
    this.userService.activeScreen('menu');
    this.profilePicture = this.assets.profilePicIcon;
    this.userName = '';
    this.token = '';
    this.userId = '';
    if (localstorage.getItem('token') != null && localstorage.getItem('token') != undefined) {
      this.token = localstorage.getItem('token');
      this.headers = new HttpHeaders({
        'Content-Type': 'application/json',
        'x-access-token': this.token,
      });
      if (localstorage.getItem('userId') != null && localstorage.getItem('userId') != undefined) {
        this.userId = localstorage.getItem('userId');
      }
    }
    this.getProfile();
    this.page.on('navigatedTo', (data) => {
      if (data.isBackNavigation) {
        this.userService.activeScreen('menu');
        if (localstorage.getItem('token') != null && localstorage.getItem('token') != undefined) {
          this.token = localstorage.getItem('token');
          this.headers = new HttpHeaders({
            'Content-Type': 'application/json',
            'x-access-token': this.token,
          });
          if (
            localstorage.getItem('userId') != null &&
            localstorage.getItem('userId') != undefined
          ) {
            this.userId = localstorage.getItem('userId');
          }
        }
        this.getProfile();
      }
    });
  }

  // protected get shadowColor(): Color {
  //   return new Color('#888888');
  // }

  // protected get shadowOffset(): number {
  //   return 2.0;
  // }

  // onOptionsLoaded(args: any) {
  //   const optionsCard = <any>args.object;
  //   setTimeout(() => {
  //     if (optionsCard.android) {
  //       const nativeGridMain = optionsCard.android;
  //       const shape = new android.graphics.drawable.GradientDrawable();
  //       shape.setShape(android.graphics.drawable.GradientDrawable.RECTANGLE);
  //       shape.setColor(android.graphics.Color.parseColor('white'));
  //       shape.setCornerRadius(20);
  //       nativeGridMain.setBackgroundDrawable(shape);
  //       nativeGridMain.setElevation(10);
  //     } else if (optionsCard.ios) {
  //       const nativeGridMain = optionsCard.ios;
  //       nativeGridMain.layer.shadowColor = this.shadowColor.ios.CGColor;
  //       nativeGridMain.layer.shadowOffset = CGSizeMake(0, this.shadowOffset);
  //       nativeGridMain.layer.shadowOpacity = 0.5;
  //       nativeGridMain.layer.shadowRadius = 5.0;
  //       nativeGridMain.layer.shadowRadius = 5.0;
  //     }
  //     // this.changeDetector.detectChanges();
  //   }, 50);
  // }

  // onLogoutDialogLoaded(args) {
  //   const logoutDialog = <any>args.object;
  //   setTimeout(() => {
  //     if (logoutDialog.android) {
  //       const nativeImageView = logoutDialog.android;
  //       const shape = new android.graphics.drawable.GradientDrawable();
  //       shape.setShape(android.graphics.drawable.GradientDrawable.OVAL);
  //       shape.setColor(android.graphics.Color.parseColor('#6D7CF1'));
  //       nativeImageView.setElevation(20);
  //     } else if (logoutDialog.ios) {
  //       const nativeImageView = logoutDialog.ios;
  //       nativeImageView.layer.shadowColor = this.shadowColor.ios.CGColor;
  //       nativeImageView.layer.shadowOffset = CGSizeMake(0, this.shadowOffset);
  //       nativeImageView.layer.shadowOpacity = 0.5;
  //       nativeImageView.layer.shadowRadius = 5.0;
  //     }
  //   }, 400);
  // }

  getProfile() {
    this.isLoading = true;
    this.http
      .get(Values.BASE_URL + 'users/' + this.userId, {
        headers: {
          'Content-Type': 'application/json',
          'x-access-token': this.token,
        },
      })
      .subscribe(
        (res: any) => {
          if (res != null && res != undefined) {
            if (res.isSuccess == true) {
              console.trace('PROFILE:::', res);
              this.isLoading = false;
              if (res.data.profile) {
                if (res.data.profile.firstName != undefined) {
                  this.userName = res.data.profile.firstName;
                  if (res.data.profile.lastName != undefined) {
                    this.userName = this.userName + ' ' + res.data.profile.lastName;
                  }
                }
                if (res.data.profile.image) {
                  this.profilePicture = res.data.profile.image.url;
                  if (this.profilePicture == '') {
                    this.profilePicture = this.assets.profilePicIcon;
                  }
                }
              }
            }
          }
        },
        (error) => {
          this.isLoading = false;
          if (error.error.error == undefined) {
            alert('May be your network connection is low.');
          } else {
            console.log('ERROR::::', error.error.error);
          }
        },
      );
  }

  onNextClick() {
    this.routerExtensions.navigate(['/home']);
  }

  onHomeClick() {
    this.routerExtensions.navigate(['/home']);
  }

  onMyOrdersClick() {
    this.routerExtensions.navigate(['/myOrders']);
  }

  onFAQClick() {
    this.routerExtensions.navigate(['/faq']);
  }

  onProfileClick() {
    this.routerExtensions.navigate(['/profile']);
  }

  onOutsideClick() {
    this.viewLogoutDialog.hide();
  }

  onLogout() {
    this.viewLogoutDialog.show();
  }

  onCancelLogoutDialog() {
    this.viewLogoutDialog.hide();
  }

  onLogoutDialog() {
    this.viewLogoutDialog.hide();
    localstorage.removeItem('token');
    localstorage.removeItem('userId');
    this.routerExtensions.navigate(['/login']);
  }
}
