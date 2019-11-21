import { User } from '~/app/models/user.model';
import { Component, OnInit, AfterContentInit } from "@angular/core";
import { Color } from "tns-core-modules/color/color";
import { TextField } from "tns-core-modules/ui/text-field";
import { RouterExtensions } from 'nativescript-angular/router/router-extensions';
import { UserService } from "~/app/services/user.service";
import { Page } from "tns-core-modules/ui/page/page";
import { Address } from '~/app/models/address.model';
import { HttpClient } from '@angular/common/http';
import { Values } from '~/app/values/values';
import * as localstorage from "nativescript-localstorage";
import * as Toast from 'nativescript-toast';

declare const android: any;
declare const CGSizeMake: any;

@Component({
    selector: "ns-addAddress",
    moduleId: module.id,
    templateUrl: "./add-address.component.html",
    styleUrls: ['./add-address.component.css']
})
export class AddAddressComponent implements OnInit, AfterContentInit {

    // isRendering: boolean;
    isLoading: boolean;
    firstNameText: string;
    firstNameHint: string;
    firstNameBorderColor: string;
    firstNameBorderWidth: string;
    lastNameText: string;
    lastNameHint: string;
    lastNameBorderColor: string;
    lastNameBorderWidth: string;
    contactNoText: string;
    contactNoHint: string;
    contactNoBorderColor: string;
    contactNoBorderWidth: string;
    houseNoText: number;
    houseNoHint: string;
    houseNoBorderColor: string;
    houseNoBorderWidth: string;
    apartmentText: string;
    apartmentHint: string;
    apartmentBorderColor: string;
    apartmentBorderWidth: string;
    streetText: string;
    streetHint: string;
    streetBorderColor: string;
    streetBorderWidth: string;
    landmarkText: string;
    landmarkHint: string;
    landmarkBorderColor: string;
    landmarkBorderWidth: string;
    areaText: string;
    areaHint: string;
    areaBorderColor: string;
    areaBorderWidth: string;
    addAddressButton: string;
    renderingTimeout;
    user: User;
    address: Address;
    token: string;
    constructor(private routerExtensions: RouterExtensions, private userService: UserService, private page: Page, private http: HttpClient, ) {
        this.page.actionBarHidden = true;
        // this.isRendering = true;
    }
    ngAfterContentInit(): void {
        // this.renderingTimeout = setTimeout(() => {
        //     this.isRendering = true;
        // }, 5000)
    }
    ngOnInit(): void {
        this.isLoading = false;
        this.firstNameText = "";
        this.firstNameHint = "Enter first name";
        this.firstNameBorderColor = "#707070";
        this.firstNameBorderWidth = "1";
        this.lastNameText = "";
        this.lastNameHint = "Enter last name";
        this.lastNameBorderColor = "#707070";
        this.lastNameBorderWidth = "1";
        this.contactNoText = "";
        this.contactNoHint = "*Contact number to say hello";
        this.contactNoBorderColor = "#707070";
        this.contactNoBorderWidth = "1";
        this.houseNoText = 0;
        this.houseNoHint = "*House no";
        this.houseNoBorderColor = "#707070";
        this.houseNoBorderWidth = "1";
        this.apartmentText = "";
        this.apartmentHint = "Apartment name";
        this.apartmentBorderColor = "#707070";
        this.apartmentBorderWidth = "1";
        this.streetText = "";
        this.streetHint = "Street details to locate you";
        this.streetBorderColor = "#707070";
        this.streetBorderWidth = "1";
        this.landmarkText = "";
        this.landmarkHint = "Landmark for easy reach out";
        this.landmarkBorderColor = "#707070";
        this.landmarkBorderWidth = "1";
        this.areaText = "";
        this.areaHint = "*Area details";
        this.areaBorderColor = "#707070";
        this.areaBorderWidth = "1";
        this.addAddressButton = "Add Address"
        this.userService.showFooter(true);
        this.userService.showHeader(true);
        this.userService.headerLabel("Add new address");
        this.user = new User();
        this.address = new Address();
        this.user.address = new Address();
        this.token = "";
        if (localstorage.getItem("token") != null && localstorage.getItem("token") != undefined) {
            this.token = localstorage.getItem("token");
            this.getAddress();
        }
    }

    protected get shadowColor(): Color {
        return new Color('#888888')
    }

    protected get shadowOffset(): number {
        return 2.0
    }

    onAddressLoaded(args: any) {
        var addressCard = <any>args.object;
        setTimeout(() => {
            if (addressCard.android) {
                let nativeGridMain = addressCard.android;
                var shape = new android.graphics.drawable.GradientDrawable();
                shape.setShape(android.graphics.drawable.GradientDrawable.RECTANGLE);
                shape.setColor(android.graphics.Color.parseColor('white'));
                shape.setCornerRadius(20)
                nativeGridMain.setBackgroundDrawable(shape);
                nativeGridMain.setElevation(10)
            } else if (addressCard.ios) {
                let nativeGridMain = addressCard.ios;
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

    getAddress() {
        this.isLoading = true;
        this.http
            .get(Values.BASE_URL + "users/" + localstorage.getItem("userId"), {
                headers: {
                    "Content-Type": "application/json",
                    "x-access-token": this.token
                }
            })
            .subscribe((res: any) => {
                if (res != null && res != undefined) {
                    if (res.isSuccess == true) {
                        console.trace(res);
                        this.houseNoText = res.data.profile.address.houseNo;
                        this.apartmentText = res.data.profile.address.apartmentName;
                        this.streetText = res.data.profile.address.streetDetails;
                        this.areaText = res.data.profile.address.areaDetails;
                        this.landmarkText = res.data.profile.address.landmark;
                        this.isLoading = false;
                    }
                }
            }, error => {
                this.isLoading = false;
                console.log("ERROR::::", error.error.error);
            });
    }

    public firstNameTextField(args) {
        var textField = <TextField>args.object;
        this.firstNameText = textField.text;
        this.firstNameBorderColor = "#23A6DB";
        this.firstNameBorderWidth = "2";
    }
    public lastNameTextField(args) {
        var textField = <TextField>args.object;
        this.lastNameText = textField.text;
        this.lastNameBorderColor = "#23A6DB";
        this.lastNameBorderWidth = "2";
    }
    public contactNoTextField(args) {
        var textField = <TextField>args.object;
        this.contactNoText = textField.text;
        this.contactNoBorderColor = "#23A6DB";
        this.contactNoBorderWidth = "2";
    }
    public houseNoTextField(args) {
        var textField = <TextField>args.object;
        this.houseNoText = parseInt(textField.text);
        this.houseNoBorderColor = "#23A6DB";
        this.houseNoBorderWidth = "2";
    }
    public apartmentTextField(args) {
        var textField = <TextField>args.object;
        this.apartmentText = textField.text;
        this.apartmentBorderColor = "#23A6DB";
        this.apartmentBorderWidth = "2";
    }
    public streetTextField(args) {
        var textField = <TextField>args.object;
        this.streetText = textField.text;
        this.streetBorderColor = "#23A6DB";
        this.streetBorderWidth = "2";
    }
    public landmarkTextField(args) {
        var textField = <TextField>args.object;
        this.landmarkText = textField.text;
        this.landmarkBorderColor = "#23A6DB";
        this.landmarkBorderWidth = "2";
    }
    public areaTextField(args) {
        var textField = <TextField>args.object;
        this.areaText = textField.text;
        this.areaBorderColor = "#23A6DB";
        this.areaBorderWidth = "2";
    }
    onAddAddressClick() {
        // if (this.contactNoText == "") {
        //     alert("Please enter contact number.");
        // }
        // else if (this.contactNoText.length < 10) {
        //     alert("Please enter ten digit contact number.");
        // }
        // else if (this.houseNoText == "") {
        //     alert("Please enter house number.");
        // }
        // else if (this.areaText == "") {
        //     alert("Please enter area.");
        // }
        // else {
        // this.routerExtensions.navigate(['/congratulations']);
        // }
        if (this.houseNoText != 0) {
            this.user.address.houseNo = this.houseNoText;
        }
        if (this.apartmentText != "") {
            this.user.address.apartmentName = this.apartmentText;
        }
        if (this.streetText != "") {
            this.user.address.streetDetails = this.streetText;
        }
        if (this.landmarkText != "") {
            this.user.address.landmark = this.landmarkText;
        }
        if (this.areaText != "") {
            this.user.address.areaDetails = this.areaText;
        }
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
                        Toast.makeText("Address is successfully updated!!!", "long").show();
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