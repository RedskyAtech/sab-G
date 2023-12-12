import { User } from '~/app/models/user.model';
import { Component, OnInit, AfterContentInit } from '@angular/core';
import { Color } from 'tns-core-modules/color/color';
import { TextField } from 'tns-core-modules/ui/text-field';
import { RouterExtensions } from 'nativescript-angular/router/router-extensions';
import { UserService } from '~/app/services/user.service';
import * as Toast from 'nativescript-toast';
import { Page } from 'tns-core-modules/ui/page/page';
import { Address } from '~/app/models/address.model';
import { Values } from '~/app/values/values';
import * as localstorage from 'nativescript-localstorage';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { slideInAnimation } from '~/app/route-animation';

declare const android: any;
declare const CGSizeMake: any;

@Component({
  selector: 'ns-shipping',
  moduleId: module.id,
  templateUrl: './shipping.component.html',
  styleUrls: ['./shipping.component.scss'],
  animations: [slideInAnimation],
})
export class ShippingComponent implements OnInit, AfterContentInit {
  // isRendering: boolean;
  isLoading: boolean;
  cityText: string;
  cityHint: string;
  cityBorderColor: string;
  cityBorderWidth: string;
  addressLineText: string;
  addressLineHint: string;
  addressLineBorderColor: string;
  addressLineBorderWidth: string;
  apartmentText: string;
  apartmentHint: string;
  apartmentBorderColor: string;
  apartmentBorderWidth: string;
  floorText: string;
  floorHint: string;
  floorBorderColor: string;
  floorBorderWidth: string;
  addAddressButton: string;
  forgotPassword: string;
  renderingTimeout;
  user: User;
  address: Address;
  token: string;
  query: string = '';
  pageNo: number = 1;
  items: number = 10;
  headers: HttpHeaders;
  dataForBadge: any = { showCartBadge: false, numberOnBadge: '' };

  constructor(
    private routerExtensions: RouterExtensions,
    private userService: UserService,
    private page: Page,
    private http: HttpClient,
  ) {
    this.page.actionBarHidden = true;
    // this.isRendering = true;
  }
  ngAfterContentInit(): void {}
  ngOnInit(): void {
    this.isLoading = false;
    this.cityText = '';
    this.cityHint = 'City';
    this.cityBorderColor = '#707070';
    this.cityBorderWidth = '1';
    this.addressLineText = '';
    this.addressLineHint = 'Address line';
    this.addressLineBorderColor = '#707070';
    this.addressLineBorderWidth = '1';
    this.apartmentText = '';
    this.apartmentHint = 'Apartment';
    this.apartmentBorderColor = '#707070';
    this.apartmentBorderWidth = '1';
    this.floorText = '';
    this.floorHint = 'Floor';
    this.floorBorderColor = '#707070';
    this.floorBorderWidth = '1';
    this.addAddressButton = 'Add Address';
    this.forgotPassword = 'Forgot password?';
    this.userService.headerLabel('Address');
    this.userService.activeScreen('shipping');
    this.user = new User();
    this.address = new Address();
    this.user.address = new Address();
    this.token = '';
    if (localstorage.getItem('token') != null && localstorage.getItem('token') != undefined) {
      this.token = localstorage.getItem('token');
      this.headers = new HttpHeaders({
        'Content-Type': 'application/json',
        'x-access-token': this.token,
      });
      this.getAddress();
      this.getCart();
    }
  }

  // protected get shadowColor(): Color {
  //   return new Color('#888888');
  // }

  // protected get shadowOffset(): number {
  //   return 2.0;
  // }

  getAddress() {
    this.isLoading = true;
    this.http
      .get(Values.BASE_URL + 'users/' + localstorage.getItem('userId'), {
        headers: {
          'Content-Type': 'application/json',
          'x-access-token': this.token,
        },
      })
      .subscribe(
        (res: any) => {
          if (res != null && res != undefined) {
            if (res.isSuccess == true) {
              console.trace(res);
              this.isLoading = false;
              if (res.data.profile.address) {
                this.addAddressButton = 'Update address';
              }
              // this.houseNoText = res.data.profile.address.houseNo;
              this.apartmentText = res.data.profile.address.apartmentName;
              this.cityText = res.data.profile.address.city;
              this.addressLineText = res.data.profile.address.addressLine;
              this.floorText = res.data.profile.address.floor;
              // this.streetText = res.data.profile.address.streetDetails;
              // this.areaText = res.data.profile.address.areaDetails;
              // this.landmarkText = res.data.profile.address.landmark;
              this.isLoading = false;
            }
          }
        },
        (error) => {
          this.isLoading = false;
          console.log('ERROR::::', error.error.error);
        },
      );
  }

  // onShippingLoaded(args: any) {
  //   const shippingCard = <any>args.object;
  //   setTimeout(() => {
  //     if (shippingCard.android) {
  //       const nativeGridMain = shippingCard.android;
  //       const shape = new android.graphics.drawable.GradientDrawable();
  //       shape.setShape(android.graphics.drawable.GradientDrawable.RECTANGLE);
  //       shape.setColor(android.graphics.Color.parseColor('white'));
  //       shape.setCornerRadius(20);
  //       nativeGridMain.setBackgroundDrawable(shape);
  //       nativeGridMain.setElevation(10);
  //     } else if (shippingCard.ios) {
  //       const nativeGridMain = shippingCard.ios;
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
  //   const headerCard: any = args.object;
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
  //   const footerCard:any = args.object;
  //   setTimeout((): any => {
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

  public cityTextField(args) {
    const textField: TextField = args.object;
    this.cityText = textField.text;
    this.cityBorderColor = '#23A6DB';
    this.cityBorderWidth = '2';
  }

  public addressLineTextField(args) {
    const textField: TextField = args.object;
    this.addressLineText = textField.text;
    this.addressLineBorderColor = '#23A6DB';
    this.addressLineBorderWidth = '2';
  }
  public apartmentTextField(args) {
    const textField: TextField = args.object;
    this.apartmentText = textField.text;
    this.apartmentBorderColor = '#23A6DB';
    this.apartmentBorderWidth = '2';
  }
  public floorTextField(args) {
    const textField: TextField = args.object;
    this.floorText = textField.text;
    this.floorBorderColor = '#23A6DB';
    this.floorBorderWidth = '2';
  }

  onAddAddress() {
    this.isLoading = true;
    if (this.apartmentText != '') {
      this.user.address.apartmentName = this.apartmentText;
    }
    if (this.cityText != '') {
      this.user.address.city = this.cityText;
    }
    if (this.addressLineText != '') {
      this.user.address.addressLine = this.addressLineText;
    }
    if (this.floorText != '') {
      this.user.address.floor = this.floorText;
    }
    console.log(this.user);
    this.http
      .put(Values.BASE_URL + 'users/' + localstorage.getItem('userId'), this.user, {
        headers: {
          'Content-Type': 'application/json',
          'x-access-token': this.token,
        },
      })
      .subscribe(
        (res: any) => {
          if (res != null && res != undefined) {
            if (res.isSuccess == true) {
              // console.log('ADDRESS:::', res);
              Toast.makeText('Profile address is successfully added!!!', 'long').show();
              this.isLoading = false;
              this.routerExtensions.navigate(['/profile']);
            }
          }
        },
        (error) => {
          this.isLoading = false;
          console.log('ERROR::::', error.error.error);
        },
      );
  }

  onCancelClick() {
    this.routerExtensions.back();
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
