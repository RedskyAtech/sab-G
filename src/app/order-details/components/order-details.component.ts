import { Component, OnInit, AfterContentInit } from "@angular/core";
import { Color } from "tns-core-modules/color/color";
import { RouterExtensions } from 'nativescript-angular/router/router-extensions';
import { UserService } from "~/app/services/user.service";
import { HttpHeaders, HttpClient } from "@angular/common/http";
import * as localstorage from "nativescript-localstorage";
import { ActivatedRoute } from "@angular/router";
import { Values } from "~/app/values/values";
import { Page } from "tns-core-modules/ui/page/page";

declare const android: any;
declare const CGSizeMake: any;

@Component({
    selector: "ns-orderDetails",
    moduleId: module.id,
    templateUrl: "./order-details.component.html",
    styleUrls: ['./order-details.component.css']
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
    dateTime: string;
    token: string;
    headers: HttpHeaders;
    orderId: string;

    constructor(private routerExtensions: RouterExtensions, private userService: UserService, private route: ActivatedRoute, private http: HttpClient, private page: Page) {
        this.page.actionBarHidden = true;
        // this.isRendering = true;
    }
    ngAfterContentInit(): void {
        // this.renderingTimeout = setTimeout(() => {
        //     this.isRendering = true;
        // }, 5000)
    }
    ngOnInit(): void {
        this.orderedProducts = [];
        this.isLoading = false;
        this.subtotal = "125";
        this.savedRs = "5.00";
        this.totalItems = "5";
        this.deliveryCharges = "FREE";
        this.total = "120"
        this.dateTime = "22 Aug 9:30"
        this.userService.headerLabel("Order details");
        this.userService.activeScreen("orderDetails");
        this.route.queryParams.subscribe(params => {
            this.orderId = params["orderId"];
        });
        if (localstorage.getItem("token") != null && localstorage.getItem("token") != undefined) {
            this.token = localstorage.getItem("token");
            this.headers = new HttpHeaders({
                "Content-Type": "application/json",
                "x-access-token": this.token
            });
            this.getOrderDetails();
        }
        this.orderedProducts.push(
            { image: "res://onion", name: "Onion", MRP: "31.50", price: "25", weight: "1", dimension: "kg", quantity: "1" },
            { image: "res://lady_finger", name: "Lady finger", MRP: "31.50", price: "25", weight: "500", dimension: "g", quantity: "1" },
            { image: "res://potato", name: "Potato", MRP: "31.50", price: "25", weight: "1", dimension: "kg", quantity: "1" },
            { image: "res://tomato", name: "Tomato", MRP: "31.50", price: "25", weight: "2", dimension: "kg", quantity: "1" },
            { image: "res://palak", name: "Palak", MRP: "31.50", price: "25", weight: "1", dimension: "kg", quantity: "1" },
        );
    }

    protected get shadowColor(): Color {
        return new Color('#888888')
    }

    protected get shadowOffset(): number {
        return 2.0
    }

    onPriceCardLoaded(args: any) {
        var priceCard = <any>args.object;
        setTimeout(() => {
            if (priceCard.android) {
                let nativeGridMain = priceCard.android;
                var shape = new android.graphics.drawable.GradientDrawable();
                shape.setShape(android.graphics.drawable.GradientDrawable.RECTANGLE);
                shape.setColor(android.graphics.Color.parseColor('white'));
                shape.setCornerRadius(20)
                nativeGridMain.setBackgroundDrawable(shape);
                nativeGridMain.setElevation(10)
            } else if (priceCard.ios) {
                let nativeGridMain = priceCard.ios;
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

    onPrductImageLoaded(args: any) {
        var productImage = <any>args.object;
        setTimeout(() => {
            if (productImage.android) {
                let nativeGridMain = productImage.android;
                var shape = new android.graphics.drawable.GradientDrawable();
                shape.setShape(android.graphics.drawable.GradientDrawable.RECTANGLE);
                shape.setColor(android.graphics.Color.parseColor('white'));
                shape.setCornerRadius(20)
                nativeGridMain.setBackgroundDrawable(shape);
                nativeGridMain.setElevation(5)
            } else if (productImage.ios) {
                let nativeGridMain = productImage.ios;
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

    getOrderDetails() {
        this.http
            .get(Values.BASE_URL + "orders/" + this.orderId, {
                headers: this.headers
            })
            .subscribe((res: any) => {
                if (res != null && res != undefined) {
                    if (res.isSuccess == true) {
                        // console.log("Orders Length::::::", res.data.orders.length);
                        console.trace("ORDER DETAILS:::", res);
                    }
                }
            }, error => {
                this.isLoading = false;
                console.log("ERROR::::", error.error.error);
            });
    }
}