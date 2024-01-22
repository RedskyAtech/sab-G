import { Component, OnInit, AfterContentInit } from '@angular/core';
import { Color } from 'tns-core-modules/color/color';
import { RouterExtensions } from '@nativescript/angular';
import { UserService } from '~/app/services/user.service';
import { HttpHeaders, HttpClient } from '@angular/common/http';
import * as localstorage from 'nativescript-localstorage';
import { ActivatedRoute } from '@angular/router';
import { Values } from '~/app/values/values';
import { Page } from 'tns-core-modules/ui/page/page';
import { slideInAnimation } from '~/app/route-animation';

declare const android: any;
declare const CGSizeMake: any;

@Component({
  selector: 'ns-orderDetails',
  moduleId: module.id,
  templateUrl: './order-details.component.html',
  styleUrls: ['./order-details.component.scss'],
  animations: [slideInAnimation],
})
export class OrderDetailsComponent implements OnInit, AfterContentInit {
  // isRendering: boolean;
  isLoading: boolean;
  renderingTimeout;
  orderedProducts;
  subtotal: string;
  savedRs: string;
  totalItems: string;
  deliveryCharges: string;
  total: string;
  date: string;
  token: string;
  headers: HttpHeaders;
  id: string;
  address: string;
  name: string;
  city: string;
  apartment: string;
  contactNumber: string;
  orderStatus: string;
  orderId: string;
  query: string = '';
  pageNo: number = 1;
  items: number = 10;
  dataForBadge: any = { showCartBadge: false, numberOnBadge: '' };

  constructor(
    private routerExtensions: RouterExtensions,
    private userService: UserService,
    private route: ActivatedRoute,
    private http: HttpClient,
    private page: Page,
  ) {
    this.page.actionBarHidden = true;
    // this.isRendering = true;
  }
  ngAfterContentInit(): void {}
  ngOnInit(): void {
    this.orderedProducts = [];
    this.isLoading = false;
    this.subtotal = '';
    this.savedRs = '5.00';
    this.totalItems = '';
    this.deliveryCharges = 'FREE';
    this.total = '';
    this.date = '';
    this.userService.headerLabel('Order details');
    this.userService.activeScreen('orderDetails');
    this.address = '';
    this.name = '';
    this.city = '';
    this.apartment = '';
    this.contactNumber = '';
    this.orderStatus = '';
    this.orderId = '';
    this.route.queryParams.subscribe((params) => {
      this.id = params['orderId'];
    });
    if (localstorage.getItem('token') != null && localstorage.getItem('token') != undefined) {
      this.token = localstorage.getItem('token');
      this.headers = new HttpHeaders({
        'Content-Type': 'application/json',
        'x-access-token': this.token,
      });
      this.getOrderDetails();
      this.getCart();
    }
  }

  // protected get shadowColor(): Color {
  //   return new Color('#888888');
  // }

  // protected get shadowOffset(): number {
  //   return 2.0;
  // }

  // onPriceCardLoaded(args: any) {
  //   const priceCard = <any>args.object;
  //   setTimeout(() => {
  //     if (priceCard.android) {
  //       const nativeGridMain = priceCard.android;
  //       const shape = new android.graphics.drawable.GradientDrawable();
  //       shape.setShape(android.graphics.drawable.GradientDrawable.RECTANGLE);
  //       shape.setColor(android.graphics.Color.parseColor('white'));
  //       shape.setCornerRadius(20);
  //       nativeGridMain.setBackgroundDrawable(shape);
  //       nativeGridMain.setElevation(10);
  //     } else if (priceCard.ios) {
  //       const nativeGridMain = priceCard.ios;
  //       nativeGridMain.layer.shadowColor = this.shadowColor.ios.CGColor;
  //       nativeGridMain.layer.shadowOffset = CGSizeMake(0, this.shadowOffset);
  //       nativeGridMain.layer.shadowOpacity = 0.5;
  //       nativeGridMain.layer.shadowRadius = 5.0;
  //       nativeGridMain.layer.shadowRadius = 5.0;
  //     }
  //     // this.changeDetector.detectChanges();
  //   }, 50);
  // }

  // onOrderLoaded(args: any) {
  //   const orderCard = <any>args.object;
  //   setTimeout(() => {
  //     if (orderCard.android) {
  //       const nativeGridMain = orderCard.android;
  //       const shape = new android.graphics.drawable.GradientDrawable();
  //       shape.setShape(android.graphics.drawable.GradientDrawable.RECTANGLE);
  //       shape.setColor(android.graphics.Color.parseColor('white'));
  //       shape.setCornerRadius(20);
  //       nativeGridMain.setBackgroundDrawable(shape);
  //       nativeGridMain.setElevation(5);
  //     } else if (orderCard.ios) {
  //       const nativeGridMain = orderCard.ios;
  //       nativeGridMain.layer.shadowColor = this.shadowColor.ios.CGColor;
  //       nativeGridMain.layer.shadowOffset = CGSizeMake(0, this.shadowOffset);
  //       nativeGridMain.layer.shadowOpacity = 0.5;
  //       nativeGridMain.layer.shadowRadius = 5.0;
  //       nativeGridMain.layer.shadowRadius = 5.0;
  //     }
  //     // this.changeDetector.detectChanges();
  //   }, 10);
  // }

  // onPrductImageLoaded(args: any) {
  //   const productImage = <any>args.object;
  //   setTimeout(() => {
  //     if (productImage.android) {
  //       const nativeGridMain = productImage.android;
  //       const shape = new android.graphics.drawable.GradientDrawable();
  //       shape.setShape(android.graphics.drawable.GradientDrawable.RECTANGLE);
  //       shape.setColor(android.graphics.Color.parseColor('white'));
  //       shape.setCornerRadius(20);
  //       nativeGridMain.setBackgroundDrawable(shape);
  //       nativeGridMain.setElevation(5);
  //     } else if (productImage.ios) {
  //       const nativeGridMain = productImage.ios;
  //       nativeGridMain.layer.shadowColor = this.shadowColor.ios.CGColor;
  //       nativeGridMain.layer.shadowOffset = CGSizeMake(0, this.shadowOffset);
  //       nativeGridMain.layer.shadowOpacity = 0.5;
  //       nativeGridMain.layer.shadowRadius = 5.0;
  //       nativeGridMain.layer.shadowRadius = 5.0;
  //     }
  //     // this.changeDetector.detectChanges();
  //   }, 10);
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

  getOrderDetails() {
    this.isLoading = true;
    this.http
      .get(Values.BASE_URL + 'orders/' + this.id, {
        headers: this.headers,
      })
      .subscribe(
        (res: any) => {
          if (res != null && res != undefined) {
            if (res.isSuccess == true) {
              console.trace('ORDER DETAILS:::', res);
              this.isLoading = false;
              if (res.data.status == 'rejected') {
                this.orderStatus = 'Order has been rejected.';
              } else if (res.data.status == 'confirmed') {
                this.orderStatus = 'Order has been confirmed.';
              } else if (res.data.status == 'delivered') {
                this.orderStatus = 'Order has been delivered.';
              } else {
                this.orderStatus = 'Waiting for progress.';
              }
              const dateTime = new Date(res.data.date);
              let hours = dateTime.getHours();
              let ampm = 'am';
              if (hours > 12) {
                hours = hours - 12;
                ampm = 'pm';
              }
              let finalHours = '';
              if (hours < 10) {
                finalHours = '0' + hours;
              } else {
                finalHours = hours.toString();
              }
              let minutes = dateTime.getMinutes().toString();
              if (minutes.length < 2) {
                minutes = '0' + minutes;
              }
              this.date =
                dateTime.getDate().toString() +
                '/' +
                (dateTime.getMonth() + 1).toString() +
                '/' +
                dateTime.getFullYear().toString() +
                ' (' +
                finalHours +
                ':' +
                minutes +
                ' ' +
                ampm +
                ')';
              this.orderId = res.data.orderId;
              console.log('products in ordered list: ', res.data.products);
              for (let i = 0; i < res.data.products.length; i++) {
                const name =
                  res.data.products[i].name.charAt(0).toUpperCase() +
                  res.data.products[i].name.slice(1);
                this.orderedProducts.push({
                  image: res.data.products[i].image.url,
                  name: name,
                  price: res.data.products[i].price,
                  total: res.data.products[i].total,
                  weightValue: res.data.products[i].dimensions.value,
                  weightUnit: res.data.products[i].dimensions.unit,
                  quantity: res.data.products[i].quantity,
                });
              }
              if (res.data.deliveryCharge > 0) {
                this.deliveryCharges = res.data.deliveryCharge;
              }
              this.subtotal = (res.data.grandTotal - res.data.deliveryCharge).toString();
              this.totalItems = res.data.products.length;
              this.total = res.data.grandTotal;
              this.address = res.data.deliveryAddress.addressLine;
              if (res.data.deliveryAddress.firstName != undefined) {
                this.name = res.data.deliveryAddress.firstName;
              }
              if (
                res.data.deliveryAddress.firstName != undefined &&
                res.data.deliveryAddress.lastName != undefined
              ) {
                this.name =
                  res.data.deliveryAddress.firstName + ' ' + res.data.deliveryAddress.lastName;
              }
              this.city = res.data.deliveryAddress.city;
              if (res.data.deliveryAddress.apartmentName != undefined) {
                this.apartment = res.data.deliveryAddress.apartmentName;
              }
              if (
                res.data.deliveryAddress.apartmentName != undefined &&
                res.data.deliveryAddress.floor != undefined
              ) {
                this.apartment =
                  res.data.deliveryAddress.apartmentName +
                  '(' +
                  res.data.deliveryAddress.floor +
                  'th floor)';
              }
              this.contactNumber = res.data.deliveryAddress.contactNumber;
            }
          }
        },
        (error) => {
          this.isLoading = false;
          console.log('ERROR::::', error.error.error);
        },
      );
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
