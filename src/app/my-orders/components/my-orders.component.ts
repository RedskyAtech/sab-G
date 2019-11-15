import { Component, OnInit, AfterContentInit } from "@angular/core";
import { Color } from "tns-core-modules/color/color";
import { RouterExtensions } from 'nativescript-angular/router/router-extensions';
import { UserService } from "~/app/services/user.service";

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
    orderedProducts;
    waitingProducts;
    products;
    subtotal: string;
    savedRs: string;
    totalItems: string;
    deliveryCharges: string;
    total: string;
    dateTime: string;
    isCurrentButton: boolean;
    isPastButton: boolean;

    constructor(private routerExtensions: RouterExtensions, private userService: UserService) {
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
        this.orderedProducts = [];
        this.waitingProducts = [];
        this.products = [];
        this.isLoading = false;
        this.subtotal = "125";
        this.savedRs = "5.00";
        this.totalItems = "5";
        this.deliveryCharges = "FREE";
        this.total = "120"
        this.dateTime = "22 Aug 9:30"
        this.userService.showFooter(true);
        this.userService.showHeader(true);
        this.userService.headerLabel("My orders");
        this.waitingProducts.push(
            { image: "res://onion", date: "22 Aug 9:30", quantity: "3", price: "95", orderStatus: "Waiting for progress" },
            { image: "res://lady_finger", date: "22 Aug 2:30", quantity: "4", price: "105", orderStatus: "Waiting for progress" },
            { image: "res://potato", date: "22 Aug 4:15", quantity: "5", price: "170", orderStatus: "Waiting for progress" },
            { image: "res://tomato", date: "22 Aug 9:30", quantity: "6", price: "200", orderStatus: "Waiting for progress" },
            { image: "res://palak", date: "22 Aug 2:30", quantity: "7", price: "150", orderStatus: "Waiting for progress" },
            { image: "res://tomato", date: "22 Aug 9:30", quantity: "6", price: "200", orderStatus: "Waiting for progress" },
            { image: "res://palak", date: "22 Aug 2:30", quantity: "7", price: "150", orderStatus: "Waiting for progress" },
        );
        this.orderedProducts.push(
            { image: "res://potato", date: "22 Aug 4:15", quantity: "5", price: "170", orderStatus: "Order delivered" },
            { image: "res://tomato", date: "22 Aug 9:30", quantity: "6", price: "200", orderStatus: "Order delivered" },
            { image: "res://palak", date: "22 Aug 2:30", quantity: "7", price: "150", orderStatus: "Order delivered" },
            { image: "res://tomato", date: "22 Aug 9:30", quantity: "6", price: "200", orderStatus: "Order delivered" },
            { image: "res://palak", date: "22 Aug 2:30", quantity: "7", price: "150", orderStatus: "Order delivered" },
        );
        this.products = this.waitingProducts;
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

    onCurrentClick() {
        this.isCurrentButton = true;
        this.isPastButton = false;
        this.products = [];
        this.products = this.waitingProducts;
    }

    onPastClick() {
        this.isCurrentButton = false;
        this.isPastButton = true;
        this.products = [];
        this.products = this.orderedProducts;
    }

    onDetailsClick() {
        // alert("details clicked");
        this.routerExtensions.navigate(['/orderDetails']);
    }
}