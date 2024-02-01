import { Component, OnInit, AfterContentInit } from "@angular/core";
import { Color } from "@nativescript/core";
import { RouterExtensions } from "@nativescript/angular";
import { UserService } from "~/app/services/user.service";
import { Page } from "@nativescript/core";
import * as localstorage from "nativescript-localstorage";
import { HttpHeaders, HttpClient } from "@angular/common/http";
import { Values } from "~/app/values/values";
import { slideInAnimation } from "~/app/route-animation";

declare const android: any;
declare const CGSizeMake: any;

@Component({
  selector: "ns-myOrders",
  moduleId: module.id,
  templateUrl: "./my-orders.component.html",
  styleUrls: ["./my-orders.component.scss"],
  animations: [slideInAnimation],
})
export class MyOrdersComponent implements OnInit, AfterContentInit {
  // isRendering: boolean;
  isLoading: boolean;
  renderingTimeout;
  orders;
  subtotal: string;
  savedRs: string;
  totalItems: string;
  deliveryCharges: string;
  total: string;
  dateTime: string;
  isCurrentButton: boolean;
  isPastButton: boolean;
  token: string;
  headers: HttpHeaders;
  query: string;
  pageNo: number;
  items: number;
  history: boolean;
  orderMessage: string;
  isOrders: boolean;
  dataForBadge: any = { showCartBadge: false, numberOnBadge: "" };

  constructor(
    private routerExtensions: RouterExtensions,
    private userService: UserService,
    private page: Page,
    private http: HttpClient
  ) {
    this.page.actionBarHidden = true;
    // this.isRendering = true;
    this.isCurrentButton = true;
    this.isPastButton = false;
  }
  ngAfterContentInit(): void { }
  ngOnInit(): void {
    this.orders = [];
    this.isLoading = false;
    this.subtotal = "125";
    this.savedRs = "5.00";
    this.totalItems = "5";
    this.deliveryCharges = "FREE";
    this.total = "120";
    this.dateTime = "22 Aug 9:30";
    this.userService.headerLabel("My orders");
    this.userService.showBack("visible");
    this.userService.activeScreen("myOrders");
    this.query = "";
    this.pageNo = 1;
    this.items = 10;
    this.history = false;
    this.orderMessage = "";
    this.isOrders = true;
    if (
      localstorage.getItem("token") != null &&
      localstorage.getItem("token") != undefined
    ) {
      this.token = localstorage.getItem("token");
      this.headers = new HttpHeaders({
        "Content-Type": "application/json",
        "x-access-token": this.token,
      });
      this.isLoading = true;
      this.getOrders();
      this.getCart();
    }
    this.page.on("navigatedTo", (data) => {
      if (data.isBackNavigation) {
        this.userService.headerLabel("My orders");
        this.userService.activeScreen("myOrders");
      }
    });
  }

  // protected get shadowColor(): Color {
  //   return new Color('#888888');
  // }

  // protected get shadowOffset(): number {
  //   return 2.0;
  // }

  // onAddressLoaded(args: any) {
  //   const addressCard = <any>args.object;
  //   setTimeout(() => {
  //     if (addressCard.android) {
  //       const nativeGridMain = addressCard.android;
  //       const shape = new android.graphics.drawable.GradientDrawable();
  //       shape.setShape(android.graphics.drawable.GradientDrawable.RECTANGLE);
  //       shape.setColor(android.graphics.Color.parseColor('white'));
  //       shape.setCornerRadius(20);
  //       nativeGridMain.setBackgroundDrawable(shape);
  //       nativeGridMain.setElevation(10);
  //     } else if (addressCard.ios) {
  //       const nativeGridMain = addressCard.ios;
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

  getOrders() {
    this.query = `_id=${localstorage.getItem("cartId")}&pageNo=${this.pageNo
      }&items=${this.items}&history=${this.history}`;
    // console.log(this.query);
    this.http
      .get(Values.BASE_URL + "orders?" + this.query, {
        headers: this.headers,
      })
      .subscribe(
        (res: any) => {
          if (res != null && res != undefined) {
            if (res.isSuccess == true) {
              if (res.data.orders.length > 0) {
                this.isOrders = true;
                this.orderMessage = "";
                console.trace("ORDERS::: in my-orders::", res);
                for (let i = 0; i < res.data.orders.length; i++) {
                  let status: string;
                  if (res.data.orders[i].status == "pending") {
                    status = "Waiting for progress";
                  } else if (res.data.orders[i].status == "rejected") {
                    status = "Order has been rejected.";
                  } else if (res.data.orders[i].status == "confirmed") {
                    status = "Order has been confirmed.";
                  } else {
                    status = "Order has been delivered.";
                  }
                  let date = res.data.orders[i].date;
                  const dateTime = new Date(date);
                  let hours = dateTime.getHours();
                  let ampm = "am";
                  if (hours > 12) {
                    hours = hours - 12;
                    ampm = "pm";
                  }
                  let finalHours = "";
                  if (hours < 10) {
                    finalHours = "0" + hours;
                  } else {
                    finalHours = hours.toString();
                  }
                  let minutes = dateTime.getMinutes().toString();
                  if (minutes.length < 2) {
                    minutes = "0" + minutes;
                  }
                  date =
                    dateTime.getDate().toString() +
                    "/" +
                    (dateTime.getMonth() + 1).toString() +
                    "/" +
                    dateTime.getFullYear().toString() +
                    " (" +
                    finalHours +
                    ":" +
                    minutes +
                    " " +
                    ampm +
                    ")";
                  this.orders.push({
                    id: res.data.orders[i]._id,
                    image: res.data.orders[i].products[0].image.url,
                    status: status,
                    quantity: res.data.orders[i].products.length,
                    grandTotal: res.data.orders[i].grandTotal,
                    date: date,
                    orderId: res.data.orders[i].orderId,
                  });
                }
                this.isLoading = false;
                this.pageNo = this.pageNo + 1;
                this.getOrders();
              } else {
                if (this.pageNo == 1) {
                  this.isOrders = false;
                  this.isLoading = false;
                  this.orderMessage = "There is no orders.";
                }
              }
            }
          }
        },
        (error) => {
          this.isLoading = false;
          console.log("ERROR::::", error.error.error);
        }
      );
  }

  onCurrentClick() {
    this.isCurrentButton = true;
    this.isPastButton = false;
    this.orders = [];
    this.history = false;
    this.pageNo = 1;
    this.isLoading = true;
    this.getOrders();
  }

  onPastClick() {
    this.isCurrentButton = false;
    this.isPastButton = true;
    this.orders = [];
    this.history = true;
    this.pageNo = 1;
    this.isLoading = true;
    this.getOrders();
  }

  onDetailsClick(item: any) {
    this.routerExtensions.navigate(["/orderDetails"], {
      queryParams: {
        orderId: item.id,
      },
    });
  }

  private getCart() {
    this.isLoading = true;
    this.query = `_id=${localstorage.getItem("cartId")}&pageNo=${this.pageNo
      }&items=${this.items}`;
    this.http
      .get(Values.BASE_URL + "carts?" + this.query, {
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
          console.log("ERROR::::", error.error.error);
        }
      );
  }
}
