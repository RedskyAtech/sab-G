import { RouterExtensions } from '@nativescript/angular';
import { Component, OnInit, Input } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Page } from 'tns-core-modules/ui/page/page';
import { Color } from 'tns-core-modules/color/color';
import { UserService } from '~/app/services/user.service';
import { ChangeDetectorRef } from '@angular/core';
import { images } from '~/app/assets/index';

declare const android: any;
declare const CGSizeMake: any;
@Component({
  selector: 'ns-header',
  moduleId: module.id,
  templateUrl: './header.component.html',
  styleUrls: ['./header.component.scss'],
})
export class HeaderComponent implements OnInit {
  assets = {
    backIcon: images.BACK_ICON,
    headerIcon: images.HEADER_ICON
  };

  backIcon: string;
  headerLabel: string;
  showHeader: boolean;
  showBackButton: string;
  // showAddButton: string;
  screen: string;
  showLogo: boolean;
  sabgLogo: string;
  constructor(
    private http: HttpClient,
    private page: Page,
    private userService: UserService,
    private routerExtensions: RouterExtensions,
    private cdr: ChangeDetectorRef,
  ) {
    this.page.actionBarHidden = true;
    this.backIcon = this.assets.backIcon;
    this.headerLabel = '';
    this.showHeader = true;
    this.showBackButton = 'visible';
    // this.showAddButton = "hidden";
    this.screen = '';
    this.showLogo = false;
    this.sabgLogo = this.assets.headerIcon;

    this.userService.headerlabel.subscribe((label: string) => {
      // console.log('header:::::::::::', label);
      if (label != undefined && label != null) {
        this.headerLabel = label;
      }
      this.cdr.markForCheck();
    });

    this.userService.showback.subscribe((state: string) => {
      if (state != undefined && state != null) {
        this.showBackButton = state;
      }
      this.cdr.markForCheck();
    });

    // this.userService.showaddButton.subscribe((state: string) => {
    //     if (state != undefined && state != null) {
    //         this.showAddButton = state;
    //     }
    // })

    this.userService.activescreen.subscribe((screen: string) => {
      // console.log('value of screen in shared header:: ', screen);
      this.screen = screen;
      if (screen == 'home') {
        this.showLogo = true;
      } else {
        this.showLogo = false;
      }
      this.cdr.markForCheck();
    });
  }

  ngOnInit(): void {}

  protected get shadowColor(): Color {
    return new Color('#888888');
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

  onBackClick() {
    this.routerExtensions.back();
  }

  onAddClick() {
    if (this.screen == 'categories') {
      this.routerExtensions.navigate(['/addCategory']);
    }
    if (this.screen == 'products') {
      this.routerExtensions.navigate(['/addProduct']);
    }
  }
}
