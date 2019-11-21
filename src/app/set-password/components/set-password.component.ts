import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Component, OnInit, AfterContentInit, ElementRef, ViewChild } from "@angular/core";
import { Color } from "tns-core-modules/color/color";
import { TextField } from "tns-core-modules/ui/text-field";
import { RouterExtensions } from 'nativescript-angular/router/router-extensions';
import { UserService } from "~/app/services/user.service";
import { Page } from "tns-core-modules/ui/page/page";
import { User } from "~/app/models/user.model";
import { ActivatedRoute } from "@angular/router";
import { Values } from '~/app/values/values';
import * as Toast from 'nativescript-toast';

declare const android: any;
declare const CGSizeMake: any;

@Component({
    selector: "ns-setPassword",
    moduleId: module.id,
    templateUrl: "./set-password.component.html",
    styleUrls: ['./set-password.component.css']
})
export class SetPasswordComponent implements OnInit, AfterContentInit {
    @ViewChild("textField1") textField1: ElementRef;
    @ViewChild("textField2") textField2: ElementRef;
    @ViewChild("textField3") textField3: ElementRef;
    @ViewChild("textField4") textField4: ElementRef;

    // isRendering: boolean;
    isLoading: boolean;
    otp1Text: string;
    otp2Text: string;
    otp3Text: string;
    otp4Text: string;
    heading: string;
    mobileHint: string;
    nextButton: string;
    forgotPassword: string;
    renderingTimeout;
    mobileBorderColor: string;
    mobileBorderWidth: string;
    textfield1: TextField;
    textfield2: TextField;
    textfield3: TextField;
    textfield4: TextField;
    passwordText: string;
    passwordHint: string;
    passwordBorderColor: string;
    passwordBorderWidth: string;
    passwordSecure: boolean;
    confirmPasswordText: string;
    confirmPasswordHint: string;
    confirmPasswordBorderColor: string;
    confirmPasswordBorderWidth: string;
    confirmPasswordSecure: boolean;
    user: User;
    from: string;
    token: string;
    constructor(private routerExtensions: RouterExtensions, private userService: UserService, private page: Page, private route: ActivatedRoute, private http: HttpClient) {
        this.page.actionBarHidden = true;
        this.isLoading = false;
        this.otp1Text = "";
        this.otp2Text = "";
        this.otp3Text = "";
        this.otp4Text = "";
        this.heading = "Enter OTP and Set Password";
        this.passwordText = "";
        this.passwordHint = "Enter your password";
        this.passwordBorderColor = "#707070";
        this.passwordBorderWidth = "1";
        this.passwordSecure = true;
        this.nextButton = "Next"
        this.confirmPasswordHint = "Confirm your password";
        this.confirmPasswordBorderColor = "#707070";
        this.confirmPasswordBorderWidth = "1";
        this.confirmPasswordSecure = true;
        this.user = new User();
        this.from = "";
        this.token = "";
    }
    ngAfterContentInit(): void {
        // this.renderingTimeout = setTimeout(() => {
        //     this.isRendering = true;
        // }, 5000)
    }
    ngOnInit(): void {
        this.textfield1 = <TextField>this.textField1.nativeElement;
        this.textfield2 = <TextField>this.textField2.nativeElement;
        this.textfield3 = <TextField>this.textField3.nativeElement;
        this.textfield4 = <TextField>this.textField4.nativeElement;
        this.textfield1.focus();
    }

    onBack() {
        this.routerExtensions.back();
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

    public otp1Field(args) {
        var textField = <TextField>args.object;
        this.otp1Text = textField.text;
        if (this.otp1Text.length == 0) {
            this.textfield1.focus();
        }
        else {
            this.textfield2.focus();
        }
    }

    public otp2Field(args) {
        var textField = <TextField>args.object;
        this.otp2Text = textField.text;
        if (this.otp2Text.length == 0) {
            this.textfield2.focus();
        }
        else {
            this.textfield3.focus();
        }
    }

    public otp3Field(args) {
        var textField = <TextField>args.object;
        this.otp3Text = textField.text;
        if (this.otp3Text.length == 0) {
            this.textfield3.focus();
        }
        else {
            this.textfield4.focus();
        }
    }

    public otp4Field(args) {
        var textField = <TextField>args.object;
        this.otp4Text = textField.text;
        if (this.otp4Text.length == 0) {
            this.textfield4.focus();
        }
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

    onEye() {
        this.passwordSecure = !this.passwordSecure;
    }

    onConfirmEye() {
        this.confirmPasswordSecure = !this.confirmPasswordSecure;
    }

    onNextClick() {
        if (this.otp1Text == "" || this.otp2Text == "" || this.otp3Text == "" || this.otp4Text == "") {
            alert("Please enter correct otp.");
        }
        else if (this.passwordText == "") {
            alert("Please enter password.");
        }
        else if (this.passwordText.length < 6) {
            alert("Password should be of minimum six characters long.");
        }
        else if (this.confirmPasswordText == "") {
            alert("Please enter confirm password.");
        }
        else if (this.passwordText != this.confirmPasswordText) {
            alert("Password and confirm password should be same.");
        }
        else {
            this.route.queryParams.subscribe(params => {
                if (params["phone"] != null && params["phone"] != undefined)
                    this.user.phone = params["phone"];
            });
            this.isLoading = true;
            this.user.otp = this.otp1Text + this.otp2Text + this.otp3Text + this.otp4Text;
            this.user.newPassword = this.passwordText;
            // let headers = new HttpHeaders({
            //     "Content-Type": "application/json",
            //     "x-access-token": this.token
            // });
            this.http
                .post(Values.BASE_URL + "users/resetPassword", this.user)
                .subscribe((res: any) => {
                    if (res != "" && res != undefined) {
                        if (res.isSuccess == true) {
                            this.isLoading = false;
                            Toast.makeText("Password reset successfully", "long").show();
                            this.routerExtensions.navigate(['/login']);
                        }
                    }
                }, error => {
                    this.isLoading = false;
                    if (error.error.error == undefined) {
                        alert("May be your network connection is low.")
                    }
                    else {
                        alert(error.error.error);
                    }
                });
        }
    }

    onResendOtpClick() {
        alert("resend otp clicked.");
    }

}