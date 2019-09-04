import { Component, OnInit, AfterContentInit, ViewChild } from "@angular/core";
import { Color } from "tns-core-modules/color/color";
import { TextField } from "tns-core-modules/ui/text-field";
import { RouterExtensions } from 'nativescript-angular/router/router-extensions';
import { UserService } from "~/app/services/user.service";
import { stringify } from "@angular/core/src/util";
import { ModalComponent } from "~/app/modals/modal.component";

declare const android: any;
declare const CGSizeMake: any;

@Component({
    selector: "ns-editProfile",
    moduleId: module.id,
    templateUrl: "./edit-profile.component.html",
    styleUrls: ['./edit-profile.component.css']
})
export class EditProfileComponent implements OnInit, AfterContentInit {
    @ViewChild('viewImageChooserDialog') viewImageChooserDialog: ModalComponent;

    // isRendering: boolean;
    isLoading: boolean;
    renderingTimeout;
    profilePicture: string;
    userName: string;
    userContact: string;
    changePhotoButton: string;
    nameHint: string;
    nameText: string;
    phoneHint: string;
    phoneText: string;
    emailHint: string;
    emailText: string;
    constructor(private routerExtensions: RouterExtensions, private userService: UserService) {
        // this.isRendering = true;
        this.isLoading = false;
        this.userService.showFooter(true);
        this.userService.showHeader(true);
        this.userService.headerLabel("Edit profile");
        this.profilePicture = "res://man";
        this.changePhotoButton = "Change Photo";
        this.nameHint = "Enter name";
        this.nameText = "Abcde Fghij";
        this.phoneHint = "Enter your mobile number";
        this.phoneText = "1234567890";
        this.emailHint = "Enter your email";
        this.emailText = "abc@gmail.com";
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

    onOptionsLoaded(args: any) {
        var optionsCard = <any>args.object;
        setTimeout(() => {
            if (optionsCard.android) {
                let nativeGridMain = optionsCard.android;
                var shape = new android.graphics.drawable.GradientDrawable();
                shape.setShape(android.graphics.drawable.GradientDrawable.RECTANGLE);
                shape.setColor(android.graphics.Color.parseColor('white'));
                shape.setCornerRadius(20)
                nativeGridMain.setBackgroundDrawable(shape);
                nativeGridMain.setElevation(5)
            } else if (optionsCard.ios) {
                let nativeGridMain = optionsCard.ios;
                nativeGridMain.layer.shadowColor = this.shadowColor.ios.CGColor;
                nativeGridMain.layer.shadowOffset = CGSizeMake(0, this.shadowOffset);
                nativeGridMain.layer.shadowOpacity = 0.5
                nativeGridMain.layer.shadowRadius = 5.0
                nativeGridMain.layer.shadowRadius = 5.0
            }
            // this.changeDetector.detectChanges();
        }, 50)

    }

    onImageChooserDialogLoaded(args) {
        var imageChooserDialog = <any>args.object;
        setTimeout(() => {
            if (imageChooserDialog.android) {
                let nativeImageView = imageChooserDialog.android;
                var shape = new android.graphics.drawable.GradientDrawable();
                shape.setShape(android.graphics.drawable.GradientDrawable.OVAL);
                shape.setColor(android.graphics.Color.parseColor('#6D7CF1'));
                nativeImageView.setElevation(20)
            } else if (imageChooserDialog.ios) {
                let nativeImageView = imageChooserDialog.ios;
                nativeImageView.layer.shadowColor = this.shadowColor.ios.CGColor;
                nativeImageView.layer.shadowOffset = CGSizeMake(0, this.shadowOffset);
                nativeImageView.layer.shadowOpacity = 0.5
                nativeImageView.layer.shadowRadius = 5.0
            }
        }, 400)
    }

    onCameraContainerLoaded(args) {
        var cameraContainer = <any>args.object;
        setTimeout(() => {
            if (cameraContainer.android) {
                let nativeImageView = cameraContainer.android;
                var shape = new android.graphics.drawable.GradientDrawable();
                shape.setShape(android.graphics.drawable.GradientDrawable.OVAL);
                shape.setColor(android.graphics.Color.parseColor('#6D7CF1'));
                nativeImageView.setElevation(20)
            } else if (cameraContainer.ios) {
                let nativeImageView = cameraContainer.ios;
                nativeImageView.layer.shadowColor = this.shadowColor.ios.CGColor;
                nativeImageView.layer.shadowOffset = CGSizeMake(0, this.shadowOffset);
                nativeImageView.layer.shadowOpacity = 0.5
                nativeImageView.layer.shadowRadius = 5.0
            }
        }, 400)
    }

    onGalleryContainerLoaded(args) {
        var galleryContainer = <any>args.object;
        setTimeout(() => {
            if (galleryContainer.android) {
                let nativeImageView = galleryContainer.android;
                var shape = new android.graphics.drawable.GradientDrawable();
                shape.setShape(android.graphics.drawable.GradientDrawable.OVAL);
                shape.setColor(android.graphics.Color.parseColor('#6D7CF1'));
                nativeImageView.setElevation(20)
            } else if (galleryContainer.ios) {
                let nativeImageView = galleryContainer.ios;
                nativeImageView.layer.shadowColor = this.shadowColor.ios.CGColor;
                nativeImageView.layer.shadowOffset = CGSizeMake(0, this.shadowOffset);
                nativeImageView.layer.shadowOpacity = 0.5
                nativeImageView.layer.shadowRadius = 5.0
            }
        }, 400)
    }

    public nameTextField(args) {
        var textField = <TextField>args.object;
        this.nameText = textField.text;
    }

    public phoneTextField(args) {
        var textField = <TextField>args.object;
        this.phoneText = textField.text;
    }

    public emailTextField(args) {
        var textField = <TextField>args.object;
        this.emailText = textField.text;
    }

    onChangePhotoClick() {
        this.userService.showFooter(false);
        this.viewImageChooserDialog.show();
    }

    onOutsideClick() {
        this.userService.showFooter(true);
        this.viewImageChooserDialog.hide();
    }

    onCancel() {
        this.userService.showFooter(true);
        this.viewImageChooserDialog.hide();
    }
}