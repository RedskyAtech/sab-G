import { Component, OnInit, AfterContentInit } from "@angular/core";
import { Color } from "tns-core-modules/color/color";
import { RouterExtensions } from 'nativescript-angular/router/router-extensions';
import { UserService } from "~/app/services/user.service";
import { Page } from "tns-core-modules/ui/page/page";
import * as localstorage from "nativescript-localstorage";
import { HttpHeaders, HttpClient } from "@angular/common/http";
import { Values } from "~/app/values/values";

declare const android: any;
declare const CGSizeMake: any;

@Component({
    selector: "ns-myOrders",
    moduleId: module.id,
    templateUrl: "./my-orders.component.html",
    styleUrls: ['./my-orders.component.css']
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
    constructor(private routerExtensions: RouterExtensions, private userService: UserService, private page: Page, private http: HttpClient) {
        this.page.actionBarHidden = true;
        // this.isRendering = true;
        this.isCurrentButton = true;
        this.isPastButton = false;
    }
    ngAfterContentInit(): void {
        // this.renderingTimeout = setTimeout(() => {
        //     this.isRendering = true;
        // }, 5000)
    }
    ngOnInit(): void {
        this.orders = [];
        this.isLoading = false;
        this.subtotal = "125";
        this.savedRs = "5.00";
        this.totalItems = "5";
        this.deliveryCharges = "FREE";
        this.total = "120"
        this.dateTime = "22 Aug 9:30"
        this.userService.headerLabel("My orders");
        this.userService.showBack("visible");
        this.userService.activeScreen("myOrders");
        this.query = "";
        this.pageNo = 1;
        this.items = 10;
        this.history = false;
        this.orderMessage = "";
        this.isOrders = true;
        // this.waitingProducts.push(
        //     { image: "res://onion", date: "22 Aug 9:30", quantity: "3", price: "95", orderStatus: "Waiting for progress" },
        //     { image: "res://lady_finger", date: "22 Aug 2:30", quantity: "4", price: "105", orderStatus: "Waiting for progress" },
        //     { image: "res://potato", date: "22 Aug 4:15", quantity: "5", price: "170", orderStatus: "Waiting for progress" },
        //     { image: "res://tomato", date: "22 Aug 9:30", quantity: "6", price: "200", orderStatus: "Waiting for progress" },
        //     { image: "res://palak", date: "22 Aug 2:30", quantity: "7", price: "150", orderStatus: "Waiting for progress" },
        //     { image: "res://tomato", date: "22 Aug 9:30", quantity: "6", price: "200", orderStatus: "Waiting for progress" },
        //     { image: "res://palak", date: "22 Aug 2:30", quantity: "7", price: "150", orderStatus: "Waiting for progress" },
        // );
        // this.orderedProducts.push(
        //     { image: "res://potato", date: "22 Aug 4:15", quantity: "5", price: "170", orderStatus: "Order delivered" },
        //     { image: "res://tomato", date: "22 Aug 9:30", quantity: "6", price: "200", orderStatus: "Order delivered" },
        //     { image: "res://palak", date: "22 Aug 2:30", quantity: "7", price: "150", orderStatus: "Order delivered" },
        //     { image: "res://tomato", date: "22 Aug 9:30", quantity: "6", price: "200", orderStatus: "Order delivered" },
        //     { image: "res://palak", date: "22 Aug 2:30", quantity: "7", price: "150", orderStatus: "Order delivered" },
        // );
        if (localstorage.getItem("token") != null && localstorage.getItem("token") != undefined) {
            this.token = localstorage.getItem("token");
            this.headers = new HttpHeaders({
                "Content-Type": "application/json",
                "x-access-token": this.token
            });
            this.isLoading = true;
            this.getOrders();
        }
        this.page.on('navigatedTo', (data) => {
            if (data.isBackNavigation) {
                this.userService.headerLabel("My orders");
                this.userService.activeScreen("myOrders");
            }
        });
    }

    protected get shadowColor(): Color {
        return new Color('#888888')
    }

    protected get shadowOffset(): number {
        return 2.0
    }

    onAddressLoaded(args: any) {
        var addressCard = <any>args.object;
        setTimeout(() => {
            if (addressCard.android) {
                let nativeGridMain = addressCard.android;
                var shape = new android.graphics.drawable.GradientDrawable();
                shape.setShape(android.graphics.drawable.GradientDrawable.RECTANGLE);
                shape.setColor(android.graphics.Color.parseColor('white'));
                shape.setCornerRadius(20)
                nativeGridMain.setBackgroundDrawable(shape);
                nativeGridMain.setElevation(10)
            } else if (addressCard.ios) {
                let nativeGridMain = addressCard.ios;
                nativeGridMain.layer.shadowColor = this.shadowColor.ios.CGColor;
                nativeGridMain.layer.shadowOffset = CGSizeMake(0, this.shadowOffset);
                nativeGridMain.layer.shadowOpacity = 0.5
                nativeGridMain.layer.shadowRadius = 5.0
                nativeGridMain.layer.shadowRadius = 5.0
            }
            // this.changeDetector.detectChanges();
        }, 50)

    }

    onOrderLoaded(args: any) {
        var orderCard = <any>args.object;
        setTimeout(() => {
            if (orderCard.android) {
                let nativeGridMain = orderCard.android;
                var shape = new android.graphics.drawable.GradientDrawable();
                shape.setShape(android.graphics.drawable.GradientDrawable.RECTANGLE);
                shape.setColor(android.graphics.Color.parseColor('white'));
                shape.setCornerRadius(20)
                nativeGridMain.setBackgroundDrawable(shape);
                nativeGridMain.setElevation(5)
            } else if (orderCard.ios) {
                let nativeGridMain = orderCard.ios;
                nativeGridMain.layer.shadowColor = this.shadowColor.ios.CGColor;
                nativeGridMain.layer.shadowOffset = CGSizeMake(0, this.shadowOffset);
                nativeGridMain.layer.shadowOpacity = 0.5
                nativeGridMain.layer.shadowRadius = 5.0
                nativeGridMain.layer.shadowRadius = 5.0
            }
            // this.changeDetector.detectChanges();
        }, 10)
    }

    onOrderImageLoaded(args: any) {
        var orderImage = <any>args.object;
        setTimeout(() => {
            if (orderImage.android) {
                let nativeGridMain = orderImage.android;
                var shape = new android.graphics.drawable.GradientDrawable();
                shape.setShape(android.graphics.drawable.GradientDrawable.RECTANGLE);
                shape.setColor(android.graphics.Color.parseColor('#F3F3F3'));
                shape.setCornerRadius(20)
                nativeGridMain.setBackgroundDrawable(shape);
                nativeGridMain.setElevation(0)
            } else if (orderImage.ios) {
                let nativeGridMain = orderImage.ios;
                nativeGridMain.layer.shadowColor = this.shadowColor.ios.CGColor;
                nativeGridMain.layer.shadowOffset = CGSizeMake(0, this.shadowOffset);
                nativeGridMain.layer.shadowOpacity = 0.5
                nativeGridMain.layer.shadowRadius = 5.0
                nativeGridMain.layer.shadowRadius = 5.0
            }
            // this.changeDetector.detectChanges();
        }, 10)
    }

    onHeaderLoaded(args: any) {
        var headerCard = <any>args.object;
        setTimeout(() => {
            if (headerCard.android) {
                let nativeGridMain = headerCard.android;
                var shape = new android.graphics.drawable.GradientDrawable();
                shape.setShape(android.graphics.drawable.GradientDrawable.RECTANGLE);
                shape.setColor(android.graphics.Color.parseColor('white'));
                shape.setCornerRadius(0)
                nativeGridMain.setBackgroundDrawable(shape);
                nativeGridMain.setElevation(5)
            } else if (headerCard.ios) {
                let nativeGridMain = headerCard.ios;
                nativeGridMain.layer.shadowColor = this.shadowColor.ios.CGColor;
                nativeGridMain.layer.shadowOffset = CGSizeMake(0, this.shadowOffset);
                nativeGridMain.layer.shadowOpacity = 0.5
                nativeGridMain.layer.shadowRadius = 5.0
                nativeGridMain.layer.shadowRadius = 5.0
            }
            // this.changeDetector.detectChanges();
        }, 50)
    }

    onFooterLoaded(args: any) {
        var footerCard = <any>args.object;
        setTimeout(() => {
            if (footerCard.android) {
                let nativeGridMain = footerCard.android;
                var shape = new android.graphics.drawable.GradientDrawable();
                shape.setShape(android.graphics.drawable.GradientDrawable.RECTANGLE);
                shape.setColor(android.graphics.Color.parseColor('white'));
                shape.setCornerRadius(0)
                nativeGridMain.setBackgroundDrawable(shape);
                nativeGridMain.setElevation(5)
            } else if (footerCard.ios) {
                let nativeGridMain = footerCard.ios;
                nativeGridMain.layer.shadowColor = this.shadowColor.ios.CGColor;
                nativeGridMain.layer.shadowOffset = CGSizeMake(0, this.shadowOffset);
                nativeGridMain.layer.shadowOpacity = 0.5
                nativeGridMain.layer.shadowRadius = 5.0
                nativeGridMain.layer.shadowRadius = 5.0
            }
            // this.changeDetector.detectChanges();
        }, 50)
    }

    getOrders() {
        this.query = `_id=${localstorage.getItem("cartId")}&pageNo=${this.pageNo}&items=${this.items}&history=${this.history}`
        // console.log(this.query);
        this.http
            .get(Values.BASE_URL + "orders?" + this.query, {
                headers: this.headers
            })
            .subscribe((res: any) => {
                if (res != null && res != undefined) {
                    if (res.isSuccess == true) {
                        if (res.data.orders.length > 0) {
                            this.isOrders = true;
                            this.orderMessage = "";
                            console.trace("ORDERS:::", res);
                            for (var i = 0; i < res.data.orders.length; i++) {
                                if (res.data.orders[i].status == "pending") {
                                    var status = "Waiting for progress";
                                }
                                else if (res.data.orders[i].status == "rejected") {
                                    var status = "Order has been rejected.";
                                }
                                else if (res.data.orders[i].status == "confirmed") {
                                    var status = "Order has been confirmed.";
                                }
                                else {
                                    var status = "Order has been delivered.";
                                }
                                var date = res.data.orders[i].date;
                                var dateTime = new Date(date);
                                var hours = dateTime.getHours();
                                var ampm = "am";
                                if (hours > 12) {
                                    var hours = hours - 12;
                                    var ampm = "pm";
                                }
                                var finalHours = "";
                                if (hours < 10) {
                                    finalHours = "0" + hours;
                                }
                                else {
                                    finalHours = hours.toString();
                                }
                                var minutes = dateTime.getMinutes().toString();
                                if (minutes.length < 2) {
                                    minutes = "0" + minutes;
                                }
                                date = dateTime.getDate().toString() + "/" + (dateTime.getMonth() + 1).toString() + "/" + dateTime.getFullYear().toString() + " (" + finalHours + ":" + minutes + " " + ampm + ")";
                                this.orders.push({
                                    id: res.data.orders[i]._id,
                                    image: res.data.orders[i].products[0].image.url,
                                    status: status,
                                    quantity: res.data.orders[i].products.length,
                                    grandTotal: res.data.orders[i].grandTotal,
                                    date: date,
                                    orderId: res.data.orders[i].orderId
                                })
                            }
                            this.isLoading = false;
                            this.pageNo = this.pageNo + 1;
                            this.getOrders();
                        }
                        else {
                            if (this.pageNo == 1) {
                                this.isOrders = false;
                                this.isLoading = false;
                                this.orderMessage = "There is no orders.";
                            }
                        }
                    }
                }
            }, error => {
                this.isLoading = false;
                console.log("ERROR::::", error.error.error);
            });
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
        this.routerExtensions.navigate(['/orderDetails'], {
            queryParams: {
                "orderId": item.id
            },
        });
    }
}