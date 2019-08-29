import { Component, OnInit, AfterContentInit } from "@angular/core";
import { Color } from "tns-core-modules/color/color";
import { TextField } from "tns-core-modules/ui/text-field";
import { RouterExtensions } from 'nativescript-angular/router/router-extensions';
import { UserService } from "~/app/services/user.service";
import { stringify } from "@angular/core/src/util";

declare const android: any;
declare const CGSizeMake: any;

@Component({
    selector: "ns-register",
    moduleId: module.id,
    templateUrl: "./register.component.html",
    styleUrls: ['./register.component.css']
})
export class RegisterComponent implements OnInit, AfterContentInit {

    // isRendering: boolean;
    isLoading: boolean;
    mobileText: string;
    passwordText: string;
    confirmPasswordText: string;
    heading: string;
    mobileHint: string;
    passwordHint: string;
    confirmPasswordHint: string;
    createNow: string;
    registerButton: string;
    forgotPassword: string;
    renderingTimeout;
    mobileBorderColor: string;
    passwordBorderColor: string;
    confirmPasswordBorderColor: string;
    mobileBorderWidth: string;
    passwordBorderWidth: string;
    confirmPasswordBorderWidth: string;
    constructor(private routerExtensions: RouterExtensions, private userService: UserService) {
        // this.isRendering = true;
        this.isLoading = false;
        this.mobileText = "";
        this.passwordText = "";
        this.heading = "Sign Up";
        this.mobileHint = "Enter your mobile number";
        this.passwordHint = "Enter your password";
        this.confirmPasswordHint = "Confirm your password";
        this.createNow = " Create Now";
        this.registerButton = "Sign Up"
        this.forgotPassword = "Forgot password?";
        this.userService.showFooter(false);
        this.mobileBorderColor = "#707070";
        this.passwordBorderColor = "#707070";
        this.mobileBorderWidth = "1";
        this.passwordBorderWidth = "1";
        this.confirmPasswordBorderColor = "#707070";
        this.confirmPasswordBorderWidth = "1";
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

    onRegisterLoaded(args: any) {
        var registerCard = <any>args.object;
        setTimeout(() => {
            if (registerCard.android) {
                let nativeGridMain = registerCard.android;
                var shape = new android.graphics.drawable.GradientDrawable();
                shape.setShape(android.graphics.drawable.GradientDrawable.RECTANGLE);
                shape.setColor(android.graphics.Color.parseColor('white'));
                shape.setCornerRadius(50)
                nativeGridMain.setBackgroundDrawable(shape);
                nativeGridMain.setElevation(10)
            } else if (registerCard.ios) {
                let nativeGridMain = registerCard.ios;
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

    public confirmPasswordTextField(args) {
        var textField = <TextField>args.object;
        this.confirmPasswordText = textField.text;
        this.confirmPasswordBorderColor = "#23A6DB";
        this.confirmPasswordBorderWidth = "2";
    }

    onRegisterClick() {
        if (this.mobileText == "") {
            alert("Please enter mobile enter.");
        }
        else if (this.passwordText == "") {
            alert("Please enter password.");
        }
        else if (this.confirmPasswordText == "") {
            alert("Please enter confirm password.");
        }
        else {
            this.routerExtensions.navigate(['/login']);
        }
    }

    onLoginClick() {
        this.routerExtensions.navigate(['/login']);
    }
}