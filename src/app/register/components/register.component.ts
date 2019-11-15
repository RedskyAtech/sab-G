import { User } from './../../models/user.model';
import { HttpClient } from '@angular/common/http';
import { Component, OnInit, AfterContentInit } from "@angular/core";
import { Color } from "tns-core-modules/color/color";
import { TextField } from "tns-core-modules/ui/text-field";
import { RouterExtensions } from 'nativescript-angular/router/router-extensions';
import { UserService } from "~/app/services/user.service";
import { Page } from "tns-core-modules/ui/page/page";
import { Values } from '~/app/values/values';

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
    passwordSecure: boolean;
    confirmPasswordSecure: boolean;
    user: User;

    constructor(private routerExtensions: RouterExtensions, private userService: UserService, private page: Page, private http: HttpClient) {
        this.page.actionBarHidden = true;
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
        this.passwordSecure = true;
        this.confirmPasswordSecure = true;
        this.user = new User();
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
        else if (this.mobileText.length < 10) {
            alert("Mobile number should be of ten digits.");
        }
        else if (this.passwordText == "") {
            alert("Please enter password.");
        }
        else if (this.passwordText.length < 6) {
            alert("Password is too short, please enter minimum six characters.");
        }
        else if (this.confirmPasswordText == "") {
            alert("Please enter confirm password.");
        }
        else if (this.passwordText != this.confirmPasswordText) {
            alert("Password and confirm password should be same.");
        }
        else {
            this.isLoading = true;
            this.user.phone = this.mobileText;
            this.user.password = this.passwordText;
            this.http
                .post(Values.BASE_URL + "users", this.user)
                .subscribe((res: any) => {
                    if (res != "" && res != undefined) {
                        if (res.isSuccess == true) {
                            this.isLoading = false;
                            this.routerExtensions.navigate(['./confirmOtp'], {
                                queryParams: {
                                    "phone": this.mobileText,
                                },
                                clearHistory: true,
                            });
                        }
                    }
                }, error => {
                    this.isLoading = false;
                    console.log(error);
                    if (error.error.error == undefined) {
                        alert("May be your network connection is low.")
                    }
                    else {
                        alert(error.error.error);
                    }
                });
        }
    }

    onLoginClick() {
        this.routerExtensions.navigate(['/login']);
    }

    onEye() {
        this.passwordSecure = !this.passwordSecure;
    }

    onConfirmEye() {
        this.confirmPasswordSecure = !this.confirmPasswordSecure;
    }
}