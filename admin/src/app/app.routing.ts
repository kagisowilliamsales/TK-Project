import { NgModule } from '@angular/core';
import { CommonModule, } from '@angular/common';
import { BrowserModule  } from '@angular/platform-browser';
import { Routes, RouterModule } from '@angular/router';

import { DashboardComponent } from './dashboard/dashboard.component';
import { UserProfileComponent } from './user-profile/user-profile.component';
import { TableListComponent } from './table-list/table-list.component';
import { TypographyComponent } from './typography/typography.component';
import { IconsComponent } from './icons/icons.component';
import { MapsComponent } from './maps/maps.component';
import { NotificationsComponent } from './notifications/notifications.component';
import { UpgradeComponent } from './upgrade/upgrade.component';
import { AdminLayoutComponent } from './layouts/admin-layout/admin-layout.component';
import { ProductFormComponent } from './components/custom/product-form/product-form.component';
import { AuthGuard } from './shared/guard/auth-guard';
import { AuthenticateComponent } from './authenticate/authenticate.component';

const appRoutes: Routes = [
      { path: '', component: AdminLayoutComponent, canActivate: [AuthGuard], children: [
      { path: '',               redirectTo: 'dashboard', pathMatch: 'full' },
      { path: 'dashboard',      component: DashboardComponent },
      { path: 'user-profile',   component: UserProfileComponent },
      { path: 'products',       component: TableListComponent },
      { path: 'add-product',    component: ProductFormComponent}
    ] },
    { path: 'auth', component: AuthenticateComponent },
    /*{ path: 'typography',     component: TypographyComponent },
    { path: 'icons',          component: IconsComponent },
    { path: 'maps',           component: MapsComponent },
    { path: 'notifications',  component: NotificationsComponent },
    { path: 'upgrade',        component: UpgradeComponent }*/
];

@NgModule({
  imports: [RouterModule.forRoot(appRoutes)],
  exports: [RouterModule]
})

export class AppRoutingModule { }
