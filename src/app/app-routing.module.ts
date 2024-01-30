import { NgModule } from '@angular/core';
import { NativeScriptRouterModule } from '@nativescript/angular';
import { Routes, PreloadAllModules } from '@angular/router';

const routes: Routes = [
  { path: '', redirectTo: '/login', pathMatch: 'full' },
  // { path: 'home', loadChildren: './home/home.module#HomeModule' },
  { path: 'login', loadChildren: () => import('./login/login.module').then(m => m.LoginModule) },
  {
    path: 'register',
    loadChildren: () => import('./register/register.module').then(m => m.RegisterModule),
  },
  {
    path: 'forgotPassword',
    loadChildren: () => import('./forgot-password/forgot-password.module').then(m => m.ForgotPasswordModule)
  },
  {
    path: 'changePassword',
    loadChildren: () => import('./change-password/change-password.module').then(m => m.ChangePasswordModule),
  },
  {
    path: 'confirmOtp',
    loadChildren: () => import('./confirm-otp/confirm-otp.module').then(m => m.ConfirmOtpModule),
  },
  {
    path: 'shipping',
    loadChildren: () => import('./shipping/shipping.module').then(m => m.ShippingModule),
  },
  {
    path: 'addAddress',
    loadChildren: () => import('./add-address/add-address.module').then(m => m.AddAddressModule),
  },
  {
    path: 'congratulations',
    loadChildren: () => import('./congratulations/congratulations.module').then(m => m.CongratulationsModule),
  },
  { path: 'menu', loadChildren: () => import('./menu/menu-routing.module').then(m => m.MenuRoutingModule) },
  { path: 'profile', loadChildren: () => import('./profile/profile.module').then(m => m.ProfileModule) },
  {
    path: 'editProfile',
    loadChildren: () => import('./edit-profile/edit-profile.module').then(m => m.EditProfileModule),
  },
  { path: 'cart', loadChildren: () => import('./cart/cart.module').then(m => m.CartModule) },
  {
    path: 'products',
    loadChildren: () => import('./products/products.module').then(m => m.ProductsModule),
  },
  { path: 'search', loadChildren: () => import('./search/search.module').then(m => m.SearchModule) },
  {
    path: 'orderDetails',
    loadChildren: () => import('./order-details/order-details.module').then(m => m.OrderDetailsModule),
  },
  {
    path: 'myOrders',
    loadChildren: () => import('./my-orders/my-orders.module').then(m => m.MyOrdersModule),
  },
  { path: 'home', loadChildren: () => import('./home/home.module').then(m => m.HomeModule) },
  {
    path: 'categories',
    loadChildren: () => import('./categories/categories.module').then(m => m.CategoriesModule),
  },
  {
    path: 'setPassword',
    loadChildren: () => import('./set-password/set-password.module').then(m => m.SetPasswordModule),
  },
  { path: 'faq', loadChildren: () => import('./faq/faq.module').then(m => m.FaqModule) },
];

@NgModule({
  imports: [
    NativeScriptRouterModule.forRoot(routes, {
      preloadingStrategy: PreloadAllModules,
    }),
  ],
  exports: [NativeScriptRouterModule],
})
export class AppRoutingModule { }
