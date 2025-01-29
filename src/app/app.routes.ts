import { Routes } from '@angular/router';

export const routes: Routes = [
      {
            path: '', loadComponent: () => import('./components/home/home.component').then(c => c.HomeComponent)
      },
      {
            path: 'login', loadComponent: () => import('./components/login/login.component').then(c => c.LoginComponent)
      },
      {
            path: 'dashboard', loadComponent: () => import('./components/dashboard/dashboard.component').then(c => c.DashboardComponent)
      },
      {
            path: 'creative-studio', loadComponent: () => import('./components/landing-pages/creative-studio/creative-studio.component').then(c => c.CreativeStudioComponent)
      },
      {
            path: 'creative-store', loadComponent: () => import('./components/landing-pages/creative-store/creative-store.component').then(c => c.CreativeStoreComponent)
      },
      {
            path: 'creative-now', loadComponent: () => import('./components/landing-pages/creative-now/creative-now.component').then(c => c.CreativeNowComponent)
      },
      {
            path: 'enterprenuers', loadComponent: () => import('./components/landing-pages/enterprenuers/enterprenuers.component').then(c => c.EnterprenuersComponent)
      },
      {
            path: 'retail-ecommerce', loadComponent: () => import('./components/landing-pages/retail-ecommerce/retail-ecommerce.component').then(c => c.RetailEcommerceComponent)
      },
      {
            path: 'why-we-use-ai', loadComponent: () => import('./components/why-we-use-ai/why-we-use-ai.component').then(c => c.WhyWeUseAiComponent)
      },
      {
            path: 'dedicated-customers', loadComponent: () => import('./components/landing-pages/dedicated-customer/dedicated-customer.component').then(c => c.DedicatedCustomerComponent)
      },
      {
            path: 'how-we-compare', loadComponent: () => import('./components/landing-pages/how-we-compare/how-we-compare.component').then(c => c.HowWeCompareComponent)
      },
      {
            path: 'case-studies', loadComponent: () => import('./components/landing-pages/case-studies/case-studies.component').then(c => c.CaseStudiesComponent)
      },
      {
            path: 'our-story', loadComponent: () => import('./components/landing-pages/our-story/our-story.component').then(c => c.OurStoryComponent)
      },
      {
            path: 'careers', loadComponent: () => import('./components/landing-pages/careers/careers.component').then(c => c.CareersComponent)
      },
      {
            path: 'blog', loadComponent: () => import('./components/landing-pages/blog/blog.component').then(c => c.BlogComponent)
      },
      {
            path: 'FAQs', loadComponent: () => import('./components/landing-pages/faqs/faqs.component').then(c => c.FAQsComponent)
      },
      {
            path: 'pricing', loadComponent: () => import('./components/landing-pages/pricing/pricing.component').then(c => c.PricingComponent)
      },
      {
            path: 'free-demo', loadComponent: () => import('./components/free-demo/free-demo.component').then(c => c.FreeDemoComponent)
      },
      {
            path: 'main', loadComponent: () => import('./components/main/main.component').then(c => c.MainComponent)
      },
      {
            path: 'make-it-mine', loadComponent: () => import('./components/make-it-mine/make-it-mine.component').then(c => c.MakeItMineComponent)
      },
];
