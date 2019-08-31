import { Component, OnInit, AfterContentInit } from "@angular/core";
import { Color } from "tns-core-modules/color/color";
import { TextField } from "tns-core-modules/ui/text-field";
import { RouterExtensions } from 'nativescript-angular/router/router-extensions';
import { UserService } from "~/app/services/user.service";
import { stringify } from "@angular/core/src/util";

declare const android: any;
declare const CGSizeMake: any;

@Component({
    selector: "ns-login",
    moduleId: module.id,
    templateUrl: "./login.component.html",
    styleUrls: ['./login.component.css']
})
export class LoginComponent implements OnInit, AfterContentInit {

    // isRendering: boolean;
    isLoading: boolean;
    mobileText: string;
    passwordText: string;
    heading: string;
    mobileHint: string;
    passwordHint: string;
    loginButton: string;
    forgotPassword: string;
    renderingTimeout;
    mobileBorderColor: string;
    passwordBorderColor: string;
    mobileBorderWidth: string;
    passwordBorderWidth: string;
    passwordSecure: boolean;
    constructor(private routerExtensions: RouterExtensions, private userService: UserService) {
        // this.isRendering = true;
        this.isLoading = false;
        this.mobileText = "";
        this.passwordText = "";
        this.heading = "Log In";
        this.mobileHint = "Enter your mobile number";
        this.passwordHint = "Enter your password";
        this.loginButton = "Log In"
        this.forgotPassword = "Forgot password?";
        this.userService.showFooter(false);
        this.userService.showHeader(false);
        this.userService.headerLabel("login");
        this.mobileBorderColor = "#707070";
        this.passwordBorderColor = "#707070";
        this.mobileBorderWidth = "1";
        this.passwordBorderWidth = "1";
        this.passwordSecure = true;
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

    public passwordTextField(args) {
        var textField = <TextField>args.object;
        this.passwordText = textField.text;
        this.passwordBorderColor = "#23A6DB";
        this.passwordBorderWidth = "2";
    }

    onLoginClick() {
        if (this.mobileText == "") {
            alert("Please enter mobile number.");
        }
        else if (this.mobileText.length < 10) {
            alert("Mobile number should be of ten digits.");
        }
        else if (this.passwordText == "") {
            alert("Please enter password.");
        }
        else {
            // this.routerExtensions.navigate(['/home']);
            alert("Login successfully");
        }
    }

    onRegisterClick() {
        this.routerExtensions.navigate(['/register']);
    }

    onForgotPassword() {
        this.routerExtensions.navigate(['/forgotPassword']);
    }

    onEyeClick() {
        this.passwordSecure = !this.passwordSecure;
    }

}