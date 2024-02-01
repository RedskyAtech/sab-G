import { Component, OnInit, AfterContentInit } from '@angular/core';
import { Color } from '@nativescript/core';
import { RouterExtensions } from '@nativescript/angular';
import { UserService } from '~/app/services/user.service';
import { Page } from '@nativescript/core';
import { HttpHeaders, HttpClient } from '@angular/common/http';
import * as localstorage from 'nativescript-localstorage';
import { Values } from '~/app/values/values';
import { slideInAnimation } from '~/app/route-animation';
import { images } from '~/app/assets/index';

declare const android: any;
declare const CGSizeMake: any;

@Component({
  selector: 'ns-profile',
  moduleId: module.id,
  templateUrl: './profile.component.html',
  styleUrls: ['./profile.component.scss'],
  animations: [slideInAnimation],
})
export class ProfileComponent implements OnInit, AfterContentInit {
  assets = {
    profilePic: images.PROFILE_ICON,
    passwordIcon: images.PASSWORD_ICON,
    shippingIcon: images.SHIPPING_ICON
  };

  // isRendering: boolean;
  isLoading: boolean;
  renderingTimeout;
  profilePicture: string;
  userName: string;
  phone: string;
  editButton: string;
  token: string;
  headers: HttpHeaders;
  userId: string;
  imageUrl: string;
  thumbnail: string;
  resizeUrl: string;
  resizeThumbnail: string;
  firstName: string;
  lastName: string;
  query: string = '';
  pageNo: number = 1;
  items: number = 10;
  dataForBadge: any = { showCartBadge: false, numberOnBadge: '' };

  passwordIcon: string = this.assets.passwordIcon;
  shippingIcon: string = this.assets.shippingIcon;

  constructor(
    private routerExtensions: RouterExtensions,
    private userService: UserService,
    private page: Page,
    private http: HttpClient,
  ) {
    this.page.actionBarHidden = true;
    // this.isRendering = true;
  }
  ngAfterContentInit(): void { }
  ngOnInit(): void {
    this.isLoading = false;
    this.userService.activeScreen('profile');
    this.userService.headerLabel('My profile');
    this.profilePicture = this.assets.profilePic;
    this.userName = '';
    this.firstName = '';
    this.lastName = '';
    this.phone = '';
    this.editButton = 'Edit';
    this.token = '';
    this.userId = '';
    this.imageUrl = '';
    this.thumbnail = '';
    this.resizeUrl = '';
    this.resizeThumbnail = '';
    if (localstorage.getItem('token') != null && localstorage.getItem('token') != undefined) {
      this.token = localstorage.getItem('token');
      this.headers = new HttpHeaders({
        'Content-Type': 'application/json',
        'x-access-token': this.token,
      });
      if (localstorage.getItem('userId') != null && localstorage.getItem('userId') != undefined) {
        this.userId = localstorage.getItem('userId');
      }
      this.getCart();
    }
    this.getProfile();
    this.page.on('navigatedTo', (data) => {
      if (data.isBackNavigation) {
        this.userService.headerLabel('My profile');
        this.userService.activeScreen('profile');
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
        this.getCart();
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
  //       nativeGridMain.setElevation(5);
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

  // onHeaderLoaded(args: any) {
  //   const headerCard = <any>args.object;
  //   setTimeout(() => {
  //     if (headerCard.android) {
  //       const nativeGridMain = headerCard.android;
  //       const shape = new android.graphics.drawable.GradientDrawable();
  //       shape.setShape(android.graphics.drawable.GradientDrawable.RECTANGLE);
  //       shape.setColor(android.graphics.Color.parseColor('white'));
  //       shape.setCornerRadius(0);
  //       nativeGridMain.setBackgroundDrawable(shape);
  //       nativeGridMain.setElevation(5);
  //     } else if (headerCard.ios) {
  //       const nativeGridMain = headerCard.ios;
  //       nativeGridMain.layer.shadowColor = this.shadowColor.ios.CGColor;
  //       nativeGridMain.layer.shadowOffset = CGSizeMake(0, this.shadowOffset);
  //       nativeGridMain.layer.shadowOpacity = 0.5;
  //       nativeGridMain.layer.shadowRadius = 5.0;
  //       nativeGridMain.layer.shadowRadius = 5.0;
  //     }
  //     // this.changeDetector.detectChanges();
  //   }, 50);
  // }

  // onFooterLoaded(args: any) {
  //   const footerCard = <any>args.object;
  //   setTimeout(() => {
  //     if (footerCard.android) {
  //       const nativeGridMain = footerCard.android;
  //       const shape = new android.graphics.drawable.GradientDrawable();
  //       shape.setShape(android.graphics.drawable.GradientDrawable.RECTANGLE);
  //       shape.setColor(android.graphics.Color.parseColor('white'));
  //       shape.setCornerRadius(0);
  //       nativeGridMain.setBackgroundDrawable(shape);
  //       nativeGridMain.setElevation(5);
  //     } else if (footerCard.ios) {
  //       const nativeGridMain = footerCard.ios;
  //       nativeGridMain.layer.shadowColor = this.shadowColor.ios.CGColor;
  //       nativeGridMain.layer.shadowOffset = CGSizeMake(0, this.shadowOffset);
  //       nativeGridMain.layer.shadowOpacity = 0.5;
  //       nativeGridMain.layer.shadowRadius = 5.0;
  //       nativeGridMain.layer.shadowRadius = 5.0;
  //     }
  //     // this.changeDetector.detectChanges();
  //   }, 50);
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
              this.phone = res.data.phone;
              if (res.data.profile) {
                if (res.data.profile.firstName != undefined) {
                  this.firstName = res.data.profile.firstName;
                  this.userName = res.data.profile.firstName;
                  if (res.data.profile.lastName != undefined) {
                    this.userName = this.userName + ' ' + res.data.profile.lastName;
                    this.lastName = res.data.profile.lastName;
                  }
                }
                if (res.data.profile.image) {
                  this.profilePicture = res.data.profile.image.url;
                  if (this.profilePicture == '') {
                    this.profilePicture = this.assets.profilePic;
                  }
                  this.imageUrl = res.data.profile.image.url;
                  this.thumbnail = res.data.profile.image.thumbnail;
                  this.resizeUrl = res.data.profile.image.resize_url;
                  this.resizeThumbnail = res.data.profile.image.resize_thumbnail;
                }
              }
              this.isLoading = false;
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

  onEditClick() {
    this.routerExtensions.navigate(['/editProfile'], {
      queryParams: {
        imageUrl: this.imageUrl,
        thumbnail: this.thumbnail,
        resizeUrl: this.resizeUrl,
        resizeThumbnail: this.resizeThumbnail,
        firstName: this.firstName,
        lastName: this.lastName,
        phone: this.phone,
      },
    });
  }

  onChangePasswordClick() {
    this.routerExtensions.navigate(['/changePassword']);
  }

  onShippingClick() {
    this.routerExtensions.navigate(['/shipping']);
  }

  private getCart() {
    this.isLoading = true;
    this.query = `_id=${localstorage.getItem('cartId')}&pageNo=${this.pageNo}&items=${this.items}`;
    this.http
      .get(Values.BASE_URL + 'carts?' + this.query, {
        headers: this.headers,
      })
      .subscribe(
        (res: any) => {
          if (res != null && res != undefined) {
            if (res.isSuccess == true) {
              if (res.data.products.length > 0) {
                let productQuantity: number = 0;
                for (let item of res.data.products) {
                  productQuantity += parseInt(item.quantity);
                }
                this.dataForBadge.showCartBadge = true;
                this.dataForBadge.numberOnBadge = productQuantity;
              }
            }
          }
        },
        (error) => {
          this.isLoading = false;
          console.log('ERROR::::', error.error.error);
        },
      );
  }
}
