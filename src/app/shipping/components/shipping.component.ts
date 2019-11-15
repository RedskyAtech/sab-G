import { Component, OnInit, AfterContentInit } from "@angular/core";
import { Color } from "tns-core-modules/color/color";
import { TextField } from "tns-core-modules/ui/text-field";
import { RouterExtensions } from 'nativescript-angular/router/router-extensions';
import { UserService } from "~/app/services/user.service";
import * as Toast from 'nativescript-toast';
declare const android: any;
declare const CGSizeMake: any;

@Component({
    selector: "ns-shipping",
    moduleId: module.id,
    templateUrl: "./shipping.component.html",
    styleUrls: ['./shipping.component.css']
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
    updateProfileButton: string;
    forgotPassword: string;
    renderingTimeout;
    constructor(private routerExtensions: RouterExtensions, private userService: UserService) {
        // this.isRendering = true;
    }
    ngAfterContentInit(): void {
        // this.renderingTimeout = setTimeout(() => {
        //     this.isRendering = true;
        // }, 5000)
    }
    ngOnInit(): void {
        this.isLoading = false;
        this.cityText = "";
        this.cityHint = "City";
        this.cityBorderColor = "#707070";
        this.cityBorderWidth = "1";
        this.addressLineText = "";
        this.addressLineHint = "Address line";
        this.addressLineBorderColor = "#707070";
        this.addressLineBorderWidth = "1";
        this.apartmentText = "";
        this.apartmentHint = "Apartment";
        this.apartmentBorderColor = "#707070";
        this.apartmentBorderWidth = "1";
        this.floorText = "";
        this.floorHint = "Floor";
        this.floorBorderColor = "#707070";
        this.floorBorderWidth = "1";
        this.updateProfileButton = "Update Profile"
        this.forgotPassword = "Forgot password?";
        this.userService.showFooter(true);
        this.userService.showHeader(true);
        this.userService.headerLabel("Shipping");
    }

    protected get shadowColor(): Color {
        return new Color('#888888')
    }

    protected get shadowOffset(): number {
        return 2.0
    }

    onShippingLoaded(args: any) {
        var shippingCard = <any>args.object;
        setTimeout(() => {
            if (shippingCard.android) {
                let nativeGridMain = shippingCard.android;
                var shape = new android.graphics.drawable.GradientDrawable();
                shape.setShape(android.graphics.drawable.GradientDrawable.RECTANGLE);
                shape.setColor(android.graphics.Color.parseColor('white'));
                shape.setCornerRadius(20)
                nativeGridMain.setBackgroundDrawable(shape);
                nativeGridMain.setElevation(10)
            } else if (shippingCard.ios) {
                let nativeGridMain = shippingCard.ios;
                nativeGridMain.layer.shadowColor = this.shadowColor.ios.CGColor;
                nativeGridMain.layer.shadowOffset = CGSizeMake(0, this.shadowOffset);
                nativeGridMain.layer.shadowOpacity = 0.5
                nativeGridMain.layer.shadowRadius = 5.0
                nativeGridMain.layer.shadowRadius = 5.0
            }
            // this.changeDetector.detectChanges();
        }, 50)

    }

    public cityTextField(args) {
        var textField = <TextField>args.object;
        this.cityText = textField.text;
        this.cityBorderColor = "#23A6DB";
        this.cityBorderWidth = "2";
    }

    public addressLineTextField(args) {
        var textField = <TextField>args.object;
        this.addressLineText = textField.text;
        this.addressLineBorderColor = "#23A6DB";
        this.addressLineBorderWidth = "2";
    }
    public apartmentTextField(args) {
        var textField = <TextField>args.object;
        this.apartmentText = textField.text;
        this.apartmentBorderColor = "#23A6DB";
        this.apartmentBorderWidth = "2";
    }
    public floorTextField(args) {
        var textField = <TextField>args.object;
        this.floorText = textField.text;
        this.floorBorderColor = "#23A6DB";
        this.floorBorderWidth = "2";
    }

    onUpdateProfileClick() {
        if (this.cityText == "") {
            alert("Please enter city.");
        }
        else if (this.addressLineText == "") {
            alert("Please enter address line.");
        }
        else {
            Toast.makeText("Shipping address updated successffuly.", "long").show();
            this.routerExtensions.navigate(['/profile']);
        }
    }

    onCancelClick() {
        this.routerExtensions.back();
    }

}