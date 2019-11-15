import { Component, OnInit, AfterContentInit } from "@angular/core";
import { Color } from "tns-core-modules/color/color";
import { TextField } from "tns-core-modules/ui/text-field";
import { RouterExtensions } from 'nativescript-angular/router/router-extensions';
import { UserService } from "~/app/services/user.service";

declare const android: any;
declare const CGSizeMake: any;

@Component({
    selector: "ns-forgotPassword",
    moduleId: module.id,
    templateUrl: "./forgot-password.component.html",
    styleUrls: ['./forgot-password.component.css']
})
export class ForgotPasswordComponent implements OnInit, AfterContentInit {

    // isRendering: boolean;
    isLoading: boolean;
    mobileText: string;
    heading: string;
    mobileHint: string;
    sendOtpButton: string;
    forgotPassword: string;
    renderingTimeout;
    mobileBorderColor: string;
    mobileBorderWidth: string;
    constructor(private routerExtensions: RouterExtensions, private userService: UserService) {
        // this.isRendering = true;
        this.isLoading = false;
        this.mobileText = "";
        this.heading = "Forgot Password";
        this.mobileHint = "Enter your mobile number";
        this.sendOtpButton = "Send OTP"
        this.userService.showFooter(false);
        this.userService.showHeader(false);
        this.mobileBorderColor = "#707070";
        this.mobileBorderWidth = "1";
    }
    ngAfterContentInit(): void {
        // this.renderingTimeout = setTimeout(() => {
        //     this.isRendering = true;
        // }, 5000)
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

    onLoginLoaded(args: any) {
        var loginCard = <any>args.object;
        setTimeout(() => {
            if (loginCard.android) {
                let nativeGridMain = loginCard.android;
                var shape = new android.graphics.drawable.GradientDrawable();
                shape.setShape(android.graphics.drawable.GradientDrawable.RECTANGLE);
                shape.setColor(android.graphics.Color.parseColor('white'));
                shape.setCornerRadius(50)
                nativeGridMain.setBackgroundDrawable(shape);
                nativeGridMain.setElevation(10)
            } else if (loginCard.ios) {
                let nativeGridMain = loginCard.ios;
                nativeGridMain.layer.shadowColor = this.shadowColor.ios.CGColor;
                nativeGridMain.layer.shadowOffset = CGSizeMake(0, this.shadowOffset);
                nativeGridMain.layer.shadowOpacity = 0.5
                nativeGridMain.layer.shadowRadius = 5.0
                nativeGridMain.layer.shadowRadius = 5.0
            }
            // this.changeDetector.detectChanges();
        }, 50)

    }

    public mobileTextField(args) {
        var textField = <TextField>args.object;
        this.mobileText = textField.text;
        this.mobileBorderColor = "#23A6DB";
        this.mobileBorderWidth = "2";
    }

    onSendOtpClick() {
        if (this.mobileText == "") {
            alert("Please enter mobile number.");
        }
        else if (this.mobileText.length < 10) {
            alert("Mobile number should be of ten digits.");
        }
        else {
            this.routerExtensions.navigate(['/confirmOtp']);
        }
    }

    onCancel() {
        this.routerExtensions.navigate(['/login']);
    }

}