import { Component, OnInit, AfterContentInit } from '@angular/core';
import { RouterExtensions } from '@nativescript/angular';
import { UserService } from '~/app/services/user.service';
import { Color } from '@nativescript/core';
import { Page } from '@nativescript/core';
import { slideInAnimation } from '~/app/route-animation';
import { images } from '~/app/assets/index'

@Component({
  selector: 'ns-congratulations',
  moduleId: module.id,
  templateUrl: './congratulations.component.html',
  styleUrls: ['./congratulations.component.scss'],
  animations: [slideInAnimation],
})
export class CongratulationsComponent implements OnInit, AfterContentInit {
  assets = { successIcon: images.SUCCESS_ICON }
  // isRendering: boolean;
  isLoading: boolean;
  renderingTimeout;
  gotItButton: string;
  successIcon: string = this.assets.successIcon;

  constructor(
    private routerExtensions: RouterExtensions,
    private userService: UserService,
    private page: Page,
  ) {
    this.page.actionBarHidden = true;
  }
  ngAfterContentInit(): void { }
  ngOnInit(): void {
    this.isLoading = false;
    // this.userService.headerLabel("Delivery address");
    this.userService.activeScreen('congratulations');
    this.userService.showBack('hidden');
    this.gotItButton = 'Got It!';
  }

  // protected get shadowColor(): Color {
  //   return new Color('#888888');
  // }

  // protected get shadowOffset(): number {
  //   return 2.0;
  // }

  // onHeaderLoaded(args: any) {
  //   const headerCard:any = args.object;
  //   setTimeout(() => {
  //     if (headerCard.android) {
  //       const nativeGridMain = headerCard.android;
  //       const shape = new android.graphics.drawable.GradientDrawable();
  //       shape.setShape(android.graphics.drawable.GradientDrawable.RECTANGLE);
  //       shape.setColor(android.graphics.Color.parseColor('white'));
  //       shape.setCornerRadius(0);
  //       nativeGridMain.setBackgroundDrawable(shape);
  //       nativeGridMain.setElevation(5);
  //     } else if (headerCard.ios) {
  //       const nativeGridMain = headerCard.ios;
  //       nativeGridMain.layer.shadowColor = this.shadowColor.ios.CGColor;
  //       nativeGridMain.layer.shadowOffset = CGSizeMake(0, this.shadowOffset);
  //       nativeGridMain.layer.shadowOpacity = 0.5;
  //       nativeGridMain.layer.shadowRadius = 5.0;
  //       nativeGridMain.layer.shadowRadius = 5.0;
  //     }
  //     // this.changeDetector.detectChanges();
  //   }, 50);
  // }

  // onFooterLoaded(args: any) {
  //   const footerCard:any = args.object;
  //   setTimeout(() => {
  //     if (footerCard.android) {
  //       const nativeGridMain = footerCard.android;
  //       const shape = new android.graphics.drawable.GradientDrawable();
  //       shape.setShape(android.graphics.drawable.GradientDrawable.RECTANGLE);
  //       shape.setColor(android.graphics.Color.parseColor('white'));
  //       shape.setCornerRadius(0);
  //       nativeGridMain.setBackgroundDrawable(shape);
  //       nativeGridMain.setElevation(5);
  //     } else if (footerCard.ios) {
  //       const nativeGridMain = footerCard.ios;
  //       nativeGridMain.layer.shadowColor = this.shadowColor.ios.CGColor;
  //       nativeGridMain.layer.shadowOffset = CGSizeMake(0, this.shadowOffset);
  //       nativeGridMain.layer.shadowOpacity = 0.5;
  //       nativeGridMain.layer.shadowRadius = 5.0;
  //       nativeGridMain.layer.shadowRadius = 5.0;
  //     }
  //     // this.changeDetector.detectChanges();
  //   }, 50);
  // }

  onGotItClick() {
    this.routerExtensions.navigate(['/menu']);
  }
}
