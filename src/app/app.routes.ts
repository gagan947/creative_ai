import { Routes } from '@angular/router';

export const routes: Routes = [
      {
            path: 'login', loadComponent: () => import('./components/login/login.component').then(c => c.LoginComponent)
      },
      {
            path: 'dashboard', loadComponent: () => import('./components/dashboard/dashboard.component').then(c => c.DashboardComponent)
      },
      {
            path: 'free-demo', loadComponent: () => import('./components/free-demo/free-demo.component').then(c => c.FreeDemoComponent)
      },
      {
            path: 'make-it-mine', loadComponent: () => import('./components/make-it-mine/make-it-mine.component').then(c => c.MakeItMineComponent)
      },
      {
            path: '', loadChildren: () => import('./components/landing-pages/landing.routes').then(r => r.LandingRoutes)
      }
];
