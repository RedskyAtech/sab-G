import { Component, OnInit, AfterContentInit } from "@angular/core";
import { Color } from "tns-core-modules/color/color";
import { TextField } from "tns-core-modules/ui/text-field";
import { RouterExtensions } from 'nativescript-angular/router/router-extensions';
import { UserService } from "~/app/services/user.service";
import { stringify } from "@angular/core/src/util";

declare const android: any;
declare const CGSizeMake: any;

@Component({
    selector: "ns-changePassword",
    moduleId: module.id,
    templateUrl: "./change-password.component.html",
    styleUrls: ['./change-password.component.css']
})
export class ChangePasswordComponent implements OnInit, AfterContentInit {

    // isRendering: boolean;
    isLoading: boolean;
    oldPasswordText: string;
    oldPasswordHint: string;
    oldPasswordBorderColor: string;
    oldPasswordBorderWidth: string;
    oldPasswordSecure: boolean;
    newPasswordText: string;
    newPasswordHint: string;
    newPasswordBorderColor: string;
    newPasswordBorderWidth: string;
    newPasswordSecure: boolean;
    confirmPasswordText: string;
    confirmPasswordHint: string;
    confirmPasswordBorderColor: string;
    confirmPasswordBorderWidth: string;
    confirmPasswordSecure: boolean;
    updatePasswordButton: string;
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
        this.oldPasswordText = "";
        this.oldPasswordHint = "Old password";
        this.oldPasswordBorderColor = "#707070";
        this.oldPasswordBorderWidth = "1";
        this.oldPasswordSecure = true;
        this.newPasswordText = "";
        this.newPasswordHint = "New Password";
        this.newPasswordBorderColor = "#707070";
        this.newPasswordBorderWidth = "1";
        this.newPasswordSecure = true;
        this.confirmPasswordText = "";
        this.confirmPasswordHint = "Confirm password";
        this.confirmPasswordBorderColor = "#707070";
        this.confirmPasswordBorderWidth = "1";
        this.confirmPasswordSecure = true;
        this.updatePasswordButton = "Update password"
        this.forgotPassword = "Forgot password?";
        this.userService.showFooter(true);
        this.userService.showHeader(true);
        this.userService.headerLabel("Change Password");
    }

    protected get shadowColor(): Color {
        return new Color('#888888')
    }

    protected get shadowOffset(): number {
        return 2.0
    }

    onChangePasswordLoaded(args: any) {
        var changePasswordCard = <any>args.object;
        setTimeout(() => {
            if (changePasswordCard.android) {
                let nativeGridMain = changePasswordCard.android;
                var shape = new android.graphics.drawable.GradientDrawable();
                shape.setShape(android.graphics.drawable.GradientDrawable.RECTANGLE);
                shape.setColor(android.graphics.Color.parseColor('white'));
                shape.setCornerRadius(20)
                nativeGridMain.setBackgroundDrawable(shape);
                nativeGridMain.setElevation(10)
            } else if (changePasswordCard.ios) {
                let nativeGridMain = changePasswordCard.ios;
                nativeGridMain.layer.shadowColor = this.shadowColor.ios.CGColor;
                nativeGridMain.layer.shadowOffset = CGSizeMake(0, this.shadowOffset);
                nativeGridMain.layer.shadowOpacity = 0.5
                nativeGridMain.layer.shadowRadius = 5.0
                nativeGridMain.layer.shadowRadius = 5.0
            }
            // this.changeDetector.detectChanges();
        }, 50)

    }

    public oldPasswordTextField(args) {
        var textField = <TextField>args.object;
        this.oldPasswordText = textField.text;
        this.oldPasswordBorderColor = "#23A6DB";
        this.oldPasswordBorderWidth = "2";
    }

    public newPasswordTextField(args) {
        var textField = <TextField>args.object;
        this.newPasswordText = textField.text;
        this.newPasswordBorderColor = "#23A6DB";
        this.newPasswordBorderWidth = "2";
    }
    public confirmPasswordTextField(args) {
        var textField = <TextField>args.object;
        this.confirmPasswordText = textField.text;
        this.confirmPasswordBorderColor = "#23A6DB";
        this.confirmPasswordBorderWidth = "2";
    }

    onUpdatePasswordClick() {
        if (this.oldPasswordText == "") {
            alert("Please enter old password.");
        }
        else if (this.oldPasswordText.length < 6) {
            alert("Old password should be of six digits.");
        }
        else if (this.newPasswordText == "") {
            alert("Please enter new password.");
        }
        else if (this.newPasswordText.length < 6) {
            alert("New password should be of six digits.");
        }
        else if (this.confirmPasswordText == "") {
            alert("Please enter confirm password.");
        }
        else if (this.confirmPasswordText.length < 6) {
            alert("Confirm password should be of six digits.");
        }
        else if (this.confirmPasswordText != this.newPasswordText) {
            alert("New password and confirm password should be same.");
        }
        else {
            // this.routerExtensions.navigate(['/home']);
            alert("Password changed successfully");
        }
    }

    onCancelClick() {
        // this.routerExtensions.navigate(['/register']);
        alert("cancel button clicked");
    }

    onForgotPassword() {
        this.routerExtensions.navigate(['/forgotPassword']);
    }

    onOldEyeClick() {
        this.oldPasswordSecure = !this.oldPasswordSecure;
    }

    onNewEyeClick() {
        this.newPasswordSecure = !this.newPasswordSecure;
    }

    onConfirmEyeClick() {
        this.confirmPasswordSecure = !this.confirmPasswordSecure;
    }
}