import { Routes } from '@angular/router';
import { SideNavParentComponent } from './side-nav-parent/side-nav-parent.component';
import { LoginGuard } from '../../core/routing-guards/login.guard';
import { SideNavigationGuard } from '../../core/routing-guards/side-navigation.guard';
import { PageNotFoundComponent } from '../page-not-found/page-not-found.component';
export const routes: Routes = [{
    path: '', component: SideNavParentComponent, children: [
        {
            path: '',
            redirectTo: 'devices',
            pathMatch: 'full' //추가
        },
        {
            path: 'devices', canLoad: [LoginGuard, SideNavigationGuard],
            loadChildren: () => import('../../features/devices/devices.routes').then(m =>
                m.routes),
        },
        // {
        //   path: 'devices-type',
        //   canLoad: [SideNavigationGuard],
        //   loadChildren: () => import('../../features/devices/devices.routes').then(m => m.DevicesTypeModule),
        // }, // {
        //   path: 'devices-group',
        //   canLoad: [SideNavigationGuard],
        //   loadChildren: () => import('../../features/devices/devices.routes').then(m => m.DevicesGroupModule),
        // }, // {
        //   path: 'rules',
        //   canLoad: [SideNavigationGuard],
        //   loadChildren: () => import('../../features/devices/devices.routes').then(m 
        // => m.RulesModule),
        // }, // {
        //   path: 'ota-updates', canLoad: [SideNavigationGuard],
        //   loadChildren: () => import('../../featured-modules/ota-updates/ota-
        // updates.module').then(m => m.OtaUpdatesModule),
        // },
        // {
        //   path: 'generate-keys', canLoad: [SideNavigationGuard],
        //   loadChildren: () => import('../../featured-modules/generate-keys/generate-
        // keys.module').then(m => m.GenerateKeysModule)
        // },
        {
          path: 'dashboard', canLoad: [SideNavigationGuard],   loadChildren: () => 
            import('../../features/dashboard/dashboard.module').then(m => m.DashboardModule)
        },
        {path: 'members', component: PageNotFoundComponent}
    ]
},
{ path: '**', component: PageNotFoundComponent }
];