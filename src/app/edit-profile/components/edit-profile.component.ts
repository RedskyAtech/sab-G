import { Component, OnInit, AfterContentInit, ViewChild } from "@angular/core";
import { Color } from "tns-core-modules/color/color";
import { TextField } from "tns-core-modules/ui/text-field";
import { RouterExtensions } from 'nativescript-angular/router/router-extensions';
import { UserService } from "~/app/services/user.service";
import { ModalComponent } from "~/app/modals/modal.component";
import { Page } from "tns-core-modules/ui/page/page";
import { ImageSource, fromFile } from "tns-core-modules/image-source/image-source";
import { ImageCropper } from 'nativescript-imagecropper';
import { Folder, path, File } from "tns-core-modules/file-system";
import { session } from 'nativescript-background-http';
import { Values } from '~/app/values/values';
import * as localstorage from "nativescript-localstorage";
import { Images } from '~/app/models/images.model';
import * as Toast from 'nativescript-toast';
import { User } from "~/app/models/user.model";
import { ActivatedRoute } from "@angular/router";
import { HttpClient } from "@angular/common/http";
import * as camera from "nativescript-camera";
import * as permissions from "nativescript-permissions";
import * as imagepicker from "nativescript-imagepicker";

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
    @ViewChild('viewRemoveAccountDialog') viewRemoveAccountDialog: ModalComponent;
    @ViewChild('uploadProgressDialog') uploadProgressDialog: ModalComponent;

    // isRendering: boolean;
    isLoading: boolean;
    renderingTimeout;
    userName: string;
    userContact: string;
    changePhotoButton: string;
    firstNameHint: string;
    firstNameText: string;
    lastNameHint: string;
    lastNameText: string;
    phoneHint: string;
    phoneText: string;
    // emailHint: string;
    // emailText: string;
    private imageCropper: ImageCropper;
    profilePicture: string | ImageSource = "res://profile";
    file: any;
    url: string;
    thumbnail: string;
    resize_url: string;
    resize_thumbnail: string;
    name: string;
    extension: string;
    isVisibleImage: boolean;
    submitButton: string;
    from: string;
    token: string;
    uploadProgressValue: number;
    user: User;
    image: Images;

    constructor(private route: ActivatedRoute, private routerExtensions: RouterExtensions, private userService: UserService, private page: Page, private http: HttpClient) {
        this.page.actionBarHidden = true;
        // this.isRendering = true;
        this.isVisibleImage = true;
    }
    ngAfterContentInit(): void {
        // this.renderingTimeout = setTimeout(() => {
        //     this.isRendering = true;
        // }, 5000)
    }
    ngOnInit(): void {
        this.isLoading = false;
        this.changePhotoButton = "Change Photo";
        this.firstNameHint = "Enter first name";
        this.firstNameText = "";
        this.lastNameHint = "Enter last name";
        this.lastNameText = "";
        this.phoneHint = "Enter your mobile number";
        this.phoneText = "1234567890";
        // this.emailHint = "Enter your email";
        // this.emailText = "abc@gmail.com";
        this.userService.headerLabel("Edit profile");
        this.userService.activeScreen("editProfile");
        this.extension = 'jpg';
        this.imageCropper = new ImageCropper();
        this.submitButton = "Submit";
        this.from = "";
        this.token = "";
        this.url = "";
        this.thumbnail = "";
        this.resize_url = "";
        this.resize_thumbnail = "";
        this.uploadProgressValue = 10;
        this.user = new User();
        this.image = new Images();
        this.user.image = new Images();
        if (localstorage.getItem("token") != null && localstorage.getItem("token") != undefined) {
            this.token = localstorage.getItem("token");
        }
        this.route.queryParams.subscribe(params => {
            this.phoneText = params["phone"];
            this.firstNameText = params["firstName"];
            this.lastNameText = params["lastName"];
            this.url = params["imageUrl"];
            if (this.url != "") {
                this.profilePicture = "undefined";
                this.profilePicture = this.url;
                this.isVisibleImage = false;
            }
            this.thumbnail = params["thumbnail"];
            this.resize_url = params["resize_url"];
            this.resize_thumbnail = params["resize_thumbnail"];
        });
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

    onHeaderLoaded(args: any) {
        var headerCard = <any>args.object;
        setTimeout(() => {
            if (headerCard.android) {
                let nativeGridMain = headerCard.android;
                var shape = new android.graphics.drawable.GradientDrawable();
                shape.setShape(android.graphics.drawable.GradientDrawable.RECTANGLE);
                shape.setColor(android.graphics.Color.parseColor('white'));
                shape.setCornerRadius(0)
                nativeGridMain.setBackgroundDrawable(shape);
                nativeGridMain.setElevation(5)
            } else if (headerCard.ios) {
                let nativeGridMain = headerCard.ios;
                nativeGridMain.layer.shadowColor = this.shadowColor.ios.CGColor;
                nativeGridMain.layer.shadowOffset = CGSizeMake(0, this.shadowOffset);
                nativeGridMain.layer.shadowOpacity = 0.5
                nativeGridMain.layer.shadowRadius = 5.0
                nativeGridMain.layer.shadowRadius = 5.0
            }
            // this.changeDetector.detectChanges();
        }, 50)
    }

    onFooterLoaded(args: any) {
        var footerCard = <any>args.object;
        setTimeout(() => {
            if (footerCard.android) {
                let nativeGridMain = footerCard.android;
                var shape = new android.graphics.drawable.GradientDrawable();
                shape.setShape(android.graphics.drawable.GradientDrawable.RECTANGLE);
                shape.setColor(android.graphics.Color.parseColor('white'));
                shape.setCornerRadius(0)
                nativeGridMain.setBackgroundDrawable(shape);
                nativeGridMain.setElevation(5)
            } else if (footerCard.ios) {
                let nativeGridMain = footerCard.ios;
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

    onRemoveAccountDialogLoaded(args) {
        var removeAccountDialog = <any>args.object;
        setTimeout(() => {
            if (removeAccountDialog.android) {
                let nativeImageView = removeAccountDialog.android;
                var shape = new android.graphics.drawable.GradientDrawable();
                shape.setShape(android.graphics.drawable.GradientDrawable.OVAL);
                shape.setColor(android.graphics.Color.parseColor('#6D7CF1'));
                nativeImageView.setElevation(20)
            } else if (removeAccountDialog.ios) {
                let nativeImageView = removeAccountDialog.ios;
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

    public firstNameTextField(args) {
        var textField = <TextField>args.object;
        this.firstNameText = textField.text;
    }

    public lastNameTextField(args) {
        var textField = <TextField>args.object;
        this.lastNameText = textField.text;
    }

    public phoneTextField(args) {
        var textField = <TextField>args.object;
        this.phoneText = textField.text;
    }

    // public emailTextField(args) {
    //     var textField = <TextField>args.object;
    //     this.emailText = textField.text;
    // }

    onChangePhotoClick() {
        this.userService.showFooter(false);
        this.viewImageChooserDialog.show();
    }

    onOutsideClick() {
        this.userService.showFooter(true);
        this.viewImageChooserDialog.hide();
        this.viewRemoveAccountDialog.hide();
    }

    onCancelImageDialog() {
        this.userService.showFooter(true);
        this.viewImageChooserDialog.hide();
    }

    onCancelAccountDialog() {
        this.userService.showFooter(true);
        this.viewRemoveAccountDialog.hide();
    }

    onRemoveAccountDialog() {
        this.isLoading = true;
        this.http
            .delete(Values.BASE_URL + "users/" + localstorage.getItem("userId"), {
                headers: {
                    "Content-Type": "application/json",
                    "x-access-token": this.token
                }
            })
            .subscribe((res: any) => {
                if (res != null && res != undefined) {
                    if (res.isSuccess == true) {
                        Toast.makeText("User is successfully deleted!!!", "long").show();
                        localstorage.removeItem("token");
                        localstorage.removeItem("userId");
                        this.isLoading = false;
                        this.routerExtensions.navigate(['/login'], {
                            clearHistory: true
                        });
                    }
                }
            }, error => {
                this.isLoading = false;
                console.log("ERROR::::", error.error.error);
            });


        // this.userService.showFooter(true);
        // this.viewRemoveAccountDialog.hide();
    }

    onRemoveAccount() {
        this.viewRemoveAccountDialog.show();
        this.userService.showFooter(false);
    }

    onGallery() {
        this.isVisibleImage = true;
        this.viewImageChooserDialog.hide();
        var that = this;
        let context = imagepicker.create({
            mode: "single"
        });
        context
            .authorize()
            .then(() => {
                return context.present();
            })
            .then(selection => {
                selection.forEach(function (selected) {
                    // that.showAddButton = true;
                    var image = new ImageSource();
                    image.fromAsset(selected).then((source) => {
                        that.imageCropper.show(source, { lockSquare: true }).then((args: any) => {
                            if (args.image !== null) {
                                var folder: Folder = Folder.fromPath("/storage/emulated/0" + "/sabG");
                                var file: File = File.fromPath(path.join(folder.path, 'sabG.jpg'));
                                args.image.saveToFile(file.path, 'jpg');
                                that.file = "/storage/emulated/0/sabG/sabG.jpg";
                                that.name = that.file.substr(that.file.lastIndexOf("/") + 1);
                                that.extension = that.name.substr(that.name.lastIndexOf(".") + 1);
                                that.profilePicture = undefined;
                                that.profilePicture = fromFile("/storage/emulated/0/sabG/sabG.jpg");
                                that.isVisibleImage = false;
                            }
                        })
                            .catch(function (e) {
                                console.log(e);
                            });
                    }).catch((err) => {
                        console.log("Error -> " + err.message);
                    });
                });
            });
    }

    onCamera() {
        this.isVisibleImage = true;
        this.viewImageChooserDialog.hide();
        if (camera.isAvailable()) {
            var that = this;
            permissions.requestPermission([android.Manifest.permission.CAMERA, android.Manifest.permission.WRITE_EXTERNAL_STORAGE])
                .then(() => {
                    camera.takePicture({ width: 512, height: 512, keepAspectRatio: true })
                        .then((selected) => {
                            let source = new ImageSource();
                            source.fromAsset(selected).then((source) => {
                                this.imageCropper.show(source, { lockSquare: true }).then((args) => {
                                    if (args.image !== null) {
                                        var folder: Folder = Folder.fromPath("/storage/emulated/0" + "/sabG");
                                        var file: File = File.fromPath(path.join(folder.path, 'sabG.jpg'));
                                        args.image.saveToFile(file.path, 'jpg');
                                        that.file = "/storage/emulated/0/sabG/sabG.jpg";
                                        that.name = that.file.substr(that.file.lastIndexOf("/") + 1);
                                        that.extension = that.name.substr(that.name.lastIndexOf(".") + 1);
                                        that.profilePicture = undefined;
                                        that.profilePicture = fromFile("/storage/emulated/0/sabG/sabG.jpg");
                                        that.isVisibleImage = false;
                                    }
                                })
                                    .catch(function (e) {
                                        console.log(e);
                                    });
                            });
                        }).catch((err) => {
                            console.log("Error -> " + err.message);
                        });
                })
                .catch(function () {
                    alert("User denied permissions");
                });
        }
    }

    onSubmitClick() {
        if (this.file == null || this.file == undefined) {
            this.updateUser();
        }
        else {
            this.isLoading = true;
            var mimeType = "image/" + this.extension;
            var uploadSession = session('image-upload');
            var request = {
                url: Values.BASE_URL + "files",
                method: "POST",
                headers: {
                    "Content-Type": "application/octet-stream",
                    "File-Name": "my file",
                    "x-access-token": this.token
                },
                description: "{'uploading':" + "my file" + "}"
            }
            const params = [
                { name: "file", filename: this.file, mimeType: "image/jpeg" },
            ]

            console.log("REQUEST::::", request);
            console.log("PARAMS:::::", params);
            var task = uploadSession.multipartUpload(params, request);

            task.on("progress", (e) => {
                this.uploadProgressValue = (e.currentBytes / e.totalBytes) * 100;
                this.uploadProgressDialog.show();
            });

            task.on("responded", (e: any) => {
                this.isLoading = false;
                // this.userService.showLoadingState(false);
                this.url = JSON.parse(e.data).data.image.url;
                this.thumbnail = JSON.parse(e.data).data.image.thumbnail;
                this.resize_url = JSON.parse(e.data).data.image.resize_url;
                this.resize_thumbnail = JSON.parse(e.data).data.image.resize_thumbnail;
                this.uploadProgressDialog.hide();
                this.updateUser();
                // this.routerExtensions.navigate(['./addImages']);
                // Toast.makeText("Login successfully", "long").show();
            });
            task.on("error", (e) => {
                this.isLoading = false;
                console.log("ERRORRR:::::", e.error);
                this.uploadProgressDialog.hide();
                alert("May be your network connection is low.");
            });
            // task.on("complete", this.completeEvent);
        }
    }

    updateUser() {
        this.user.firstName = this.firstNameText;
        this.user.lastName = this.lastNameText;
        this.user.image.url = this.url;
        this.user.image.thumbnail = this.thumbnail;
        this.user.image.resize_url = this.resize_url;
        this.user.image.resize_thumbnail = this.resize_thumbnail;
        this.isLoading = true;
        console.trace("MODEL:::::", this.user);
        this.http
            .put(Values.BASE_URL + "users/" + localstorage.getItem("userId"), this.user, {
                headers: {
                    "Content-Type": "application/json",
                    "x-access-token": this.token
                }
            })
            .subscribe((res: any) => {
                if (res != null && res != undefined) {
                    if (res.isSuccess == true) {
                        Toast.makeText("User is successfully updated!!!", "long").show();
                        this.isLoading = false;
                        this.routerExtensions.back();
                    }
                }
            }, error => {
                this.isLoading = false;
                console.log("ERROR::::", error.error.error);
            });
    }
}