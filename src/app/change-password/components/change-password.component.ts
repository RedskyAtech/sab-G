import { Component, OnInit, AfterContentInit } from "@angular/core";
import { Color } from "tns-core-modules/color/color";
import { TextField } from "tns-core-modules/ui/text-field";
import { RouterExtensions } from 'nativescript-angular/router/router-extensions';

declare const android: any;
declare const CGSizeMake: any;

@Component({
    selector: "ns-change-password",
    moduleId: module.id,
    templateUrl: "./change-password.component.html",
    styleUrls: ['./change-password.component.css']
})
export class ChangePasswordComponent implements OnInit, AfterContentInit {

    isRendering: boolean;
    isLoading: boolean;
    oldPasswordText: string;
    newPasswordText: string;
    confirmPasswordText: string;
    changePasswordHeading: string;
    oldPasswordHint: string;
    newPasswordHint: string;
    confirmPasswordhint: string;
    updatePasswordButton: string;

    constructor(private routerExtensions: RouterExtensions) {
        this.isRendering = false;
        this.isLoading = false;
        this.oldPasswordText = "";
        this.newPasswordText = "";
        this.confirmPasswordText = "";
        this.changePasswordHeading = "Change Password";
        this.oldPasswordHint = "Old password";
        this.newPasswordHint = "New password";
        this.confirmPasswordhint = "Confirm password";
        this.updatePasswordButton = "Update password";
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
    }

    public newPasswordTextField(args) {
        var textField = <TextField>args.object;
        this.newPasswordText = textField.text;
    }

    public confirmPasswordTextField(args) {
        var textField = <TextField>args.object;
        this.confirmPasswordText = textField.text;
    }

    onUpdatePassword() {
        this.routerExtensions.navigate(['/login']);
    }

}