import { Component, OnInit, AfterContentInit } from "@angular/core";
import { Color } from "tns-core-modules/color/color";
import { TextField } from "tns-core-modules/ui/text-field";
import { RouterExtensions } from 'nativescript-angular/router/router-extensions';
import { UserService } from "~/app/services/user.service";

declare const android: any;
declare const CGSizeMake: any;

@Component({
    selector: "ns-confirmOtp",
    moduleId: module.id,
    templateUrl: "./confirm-otp.component.html",
    styleUrls: ['./confirm-otp.component.css']
})
export class ConfirmOtpComponent implements OnInit, AfterContentInit {

    isRendering: boolean;
    isLoading: boolean;
    otpText: string;
    confirmOtpHeading: string;
    otpHint: string;
    confirmButton: string;

    constructor(private routerExtensions: RouterExtensions, private userService: UserService) {
        this.isRendering = false;
        this.isLoading = false;
        this.otpText = "";
        this.confirmOtpHeading = "Enter your OTP code";
        this.otpHint = "Enter your OTP";
        this.confirmButton = "Confirm"
        this.userService.showFooter(false);
    }
    ngAfterContentInit(): void {
        throw new Error("Method not implemented.");
    }
    ngOnInit(): void {
        throw new Error("Method not implemented.");
    }

    protected get shadowColor(): Color {
        return new Color('#888888')
    }

    protected get shadowOffset(): number {
        return 2.0
    }

    onForgotPasswordLoaded(args: any) {
        var forgotPasswordCard = <any>args.object;
        setTimeout(() => {
            if (forgotPasswordCard.android) {
                let nativeGridMain = forgotPasswordCard.android;
                var shape = new android.graphics.drawable.GradientDrawable();
                shape.setShape(android.graphics.drawable.GradientDrawable.RECTANGLE);
                shape.setColor(android.graphics.Color.parseColor('white'));
                shape.setCornerRadius(20)
                nativeGridMain.setBackgroundDrawable(shape);
                nativeGridMain.setElevation(10)
            } else if (forgotPasswordCard.ios) {
                let nativeGridMain = forgotPasswordCard.ios;
                nativeGridMain.layer.shadowColor = this.shadowColor.ios.CGColor;
                nativeGridMain.layer.shadowOffset = CGSizeMake(0, this.shadowOffset);
                nativeGridMain.layer.shadowOpacity = 0.5
                nativeGridMain.layer.shadowRadius = 5.0
                nativeGridMain.layer.shadowRadius = 5.0
            }
            // this.changeDetector.detectChanges();
        }, 50)

    }

    public otpTextField(args) {
        var textField = <TextField>args.object;
        this.otpText = textField.text;
    }

    onConfirmClick() {
        this.routerExtensions.navigate(['/login']);
    }

    onBack() {
        this.routerExtensions.navigate(['/forgotPassword']);
    }

}