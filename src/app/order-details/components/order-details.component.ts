import { Component, OnInit, AfterContentInit } from "@angular/core";
import { Color } from "tns-core-modules/color/color";
import { TextField } from "tns-core-modules/ui/text-field";
import { RouterExtensions } from 'nativescript-angular/router/router-extensions';
import { UserService } from "~/app/services/user.service";
import { stringify } from "@angular/core/src/util";

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
    cartProducts;
    subtotal: string;
    savedRs: string;
    totalItems: string;
    deliveryCharges: string;
    total: string;
    dateTime: string;

    constructor(private routerExtensions: RouterExtensions, private userService: UserService) {
        // this.isRendering = true;
    }
    ngAfterContentInit(): void {
        // this.renderingTimeout = setTimeout(() => {
        //     this.isRendering = true;
        // }, 5000)
    }
    ngOnInit(): void {
        this.cartProducts = [];
        this.isLoading = false;
        this.subtotal = "125";
        this.savedRs = "5.00";
        this.totalItems = "5";
        this.deliveryCharges = "FREE";
        this.total = "120"
        this.dateTime = "22 Aug 9:30"
        this.userService.showFooter(true);
        this.userService.showHeader(true);
        this.userService.headerLabel("Order details");
        this.cartProducts.push(
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

    onCartLoaded(args: any) {
        var cartCard = <any>args.object;
        setTimeout(() => {
            if (cartCard.android) {
                let nativeGridMain = cartCard.android;
                var shape = new android.graphics.drawable.GradientDrawable();
                shape.setShape(android.graphics.drawable.GradientDrawable.RECTANGLE);
                shape.setColor(android.graphics.Color.parseColor('white'));
                shape.setCornerRadius(20)
                nativeGridMain.setBackgroundDrawable(shape);
                nativeGridMain.setElevation(5)
            } else if (cartCard.ios) {
                let nativeGridMain = cartCard.ios;
                nativeGridMain.layer.shadowColor = this.shadowColor.ios.CGColor;
                nativeGridMain.layer.shadowOffset = CGSizeMake(0, this.shadowOffset);
                nativeGridMain.layer.shadowOpacity = 0.5
                nativeGridMain.layer.shadowRadius = 5.0
                nativeGridMain.layer.shadowRadius = 5.0
            }
            // this.changeDetector.detectChanges();
        }, 10)
    }

    onCartImageLoaded(args: any) {
        var cartImage = <any>args.object;
        setTimeout(() => {
            if (cartImage.android) {
                let nativeGridMain = cartImage.android;
                var shape = new android.graphics.drawable.GradientDrawable();
                shape.setShape(android.graphics.drawable.GradientDrawable.RECTANGLE);
                shape.setColor(android.graphics.Color.parseColor('#F3F3F3'));
                shape.setCornerRadius(20)
                nativeGridMain.setBackgroundDrawable(shape);
                nativeGridMain.setElevation(0)
            } else if (cartImage.ios) {
                let nativeGridMain = cartImage.ios;
                nativeGridMain.layer.shadowColor = this.shadowColor.ios.CGColor;
                nativeGridMain.layer.shadowOffset = CGSizeMake(0, this.shadowOffset);
                nativeGridMain.layer.shadowOpacity = 0.5
                nativeGridMain.layer.shadowRadius = 5.0
                nativeGridMain.layer.shadowRadius = 5.0
            }
            // this.changeDetector.detectChanges();
        }, 10)
    }

    onCheckout() {
        alert("checkout clicked");
    }

    onDelete() {
        alert("delete clicked");
    }

    onMinus() {
        alert("minus clicked");
    }

    onPlus() {
        alert("plus clicked");
    }
}