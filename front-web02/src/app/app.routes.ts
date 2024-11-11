import { Routes } from '@angular/router';
import { LoginGuard } from './core/routing-guards/login.guard';
import { PageNotFoundComponent } from './common/page-not-found/page-not-found.component';
export const routes: Routes = [
    { path: '', redirectTo: 'side-nav', pathMatch: 'full' }, {
        path: 'side-nav', canLoad: [LoginGuard],
        loadChildren: () => import('./common/side-navigation/side-nav.routes').then(m =>
            m.routes)
    },

    // {
    //     path: 'login',
    //     loadChildren: () => import('./auth/auth.routes').then(m => m.routes)
    // },
    {
        path: '**',
        component: PageNotFoundComponent
    }
];