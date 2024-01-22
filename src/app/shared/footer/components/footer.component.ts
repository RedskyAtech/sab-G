import { RouterExtensions } from "@nativescript/angular";
import { Component, OnInit, Input } from "@angular/core";
import { HttpClient } from "@angular/common/http";
import { Page } from "tns-core-modules/ui/page/page";
import { Color } from "tns-core-modules/color/color";
import { UserService } from "~/app/services/user.service";
import { images } from "~/app/assets/index";

declare const android: any;
declare const CGSizeMake: any;
@Component({
  selector: "ns-footer",
  moduleId: module.id,
  templateUrl: "./footer.component.html",
  styleUrls: ["./footer.component.scss"],
})
export class FooterComponent implements OnInit {
  @Input() badgeData: any;

  assets = {
    homeIcon: images.INACTIVE_HOME_ICON,
    profileIcon: images.INACTIVE_USER_ICON,
    menuIcon: images.INACTIVE_MENU_ICON,
    cartIcon: images.INACTIVE_CART_ICON,
  };

  homeIcon: string;
  profileIcon: string;
  searchIcon: string;
  menuIcon: string;
  cartIcon: string;
  isHomeHighlighted: string;
  isProfileHighlighted: string;
  isSearchHighlighted: string;
  isMenuHighlighted: string;
  isCartHighlighted: string;
  RouterExtensions: any;
  showCartBadge: boolean = false;
  numberOnBadge: string = "";

  constructor(
    private http: HttpClient,
    private page: Page,
    private userService: UserService,
    private routerExtensions: RouterExtensions
  ) {
    this.page.actionBarHidden = true;

    this.homeIcon = this.assets.homeIcon;
    this.profileIcon = this.assets.profileIcon;
    this.menuIcon = this.assets.menuIcon;
    this.cartIcon = this.assets.cartIcon;
    this.isHomeHighlighted = "hidden";
    this.isProfileHighlighted = "hidden";
    this.isSearchHighlighted = "hidden";
    this.isMenuHighlighted = "hidden";
    this.isCartHighlighted = "hidden";

    this.userService.activescreen.subscribe((screen: string) => {
      if (
        screen == "home" ||
        screen == "products" ||
        screen == "categories" ||
        screen == "addProduct" ||
        screen == "addCategory" ||
        screen == "addSlider" ||
        screen == "addOffer"
      ) {
        this.isHomeHighlighted = "visible";
        this.isProfileHighlighted = "hidden";
        this.isSearchHighlighted = "hidden";
        this.isMenuHighlighted = "hidden";
        this.isCartHighlighted = "hidden";
      }
      if (
        screen == "profile" ||
        screen == "editProfile" ||
        screen == "shipping" ||
        screen == "changePassword"
      ) {
        this.isHomeHighlighted = "hidden";
        this.isProfileHighlighted = "visible";
        this.isSearchHighlighted = "hidden";
        this.isMenuHighlighted = "hidden";
        this.isCartHighlighted = "hidden";
      }
      if (
        screen == "menu" ||
        screen == "orderDetails" ||
        screen == "congratulations" ||
        screen == "myOrders" ||
        screen == "faq"
      ) {
        this.isHomeHighlighted = "hidden";
        this.isProfileHighlighted = "hidden";
        this.isSearchHighlighted = "hidden";
        this.isMenuHighlighted = "visible";
        this.isCartHighlighted = "hidden";
      }
      if (screen == "cart" || screen == "addAddress") {
        this.isHomeHighlighted = "hidden";
        this.isProfileHighlighted = "hidden";
        this.isSearchHighlighted = "hidden";
        this.isMenuHighlighted = "hidden";
        this.isCartHighlighted = "visible";
      }
      // if (screen == 'search') {
      //   this.isHomeHighlighted = 'hidden';
      //   this.isProfileHighlighted = 'hidden';
      //   this.isSearchHighlighted = 'visible';
      //   this.isMenuHighlighted = 'hidden';
      //   this.isCartHighlighted = 'hidden';
      // }
    });
  }

  ngOnInit(): void {}

  onHomeClick() {
    this.routerExtensions.navigate(["/home"]);
  }

  onProfileClick() {
    this.routerExtensions.navigate(["/profile"]);
  }

  // onSearchClick() {
  //   this.routerExtensions.navigate(['/search']);
  // }

  onMenuClick() {
    this.routerExtensions.navigate(["/menu"]);
  }

  onCartClick() {
    console.log("navigating to cart component from footer");
    this.routerExtensions.navigate(["/cart"]);
  }

  protected get shadowColor(): Color {
    return new Color("#888888");
  }

  protected get shadowOffset(): number {
    return 2.0;
  }

  // onHeaderLoaded(args: any) {
  //     var headerCard = <any>args.object;
  //     setTimeout(() => {
  //         if (headerCard.android) {
  //             let nativeGridMain = headerCard.android;
  //             var shape = new android.graphics.drawable.GradientDrawable();
  //             shape.setShape(android.graphics.drawable.GradientDrawable.RECTANGLE);
  //             shape.setColor(android.graphics.Color.parseColor('white'));
  //             shape.setCornerRadius(0)
  //             nativeGridMain.setBackgroundDrawable(shape);
  //             nativeGridMain.setElevation(5)
  //         } else if (headerCard.ios) {
  //             let nativeGridMain = headerCard.ios;
  //             nativeGridMain.layer.shadowColor = this.shadowColor.ios.CGColor;
  //             nativeGridMain.layer.shadowOffset = CGSizeMake(0, this.shadowOffset);
  //             nativeGridMain.layer.shadowOpacity = 0.5
  //             nativeGridMain.layer.shadowRadius = 5.0
  //             nativeGridMain.layer.shadowRadius = 5.0
  //         }
  //         // this.changeDetector.detectChanges();
  //     }, 50)

  // }
}
