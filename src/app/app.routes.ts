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
            path: 'creative-studio', loadComponent: () => import('./components/creative-studio/creative-studio.component').then(c => c.CreativeStudioComponent)
      },
      {
            path: 'creative-store', loadComponent: () => import('./components/creative-store/creative-store.component').then(c => c.CreativeStoreComponent)
      },
      {
            path: 'creative-now', loadComponent: () => import('./components/creative-now/creative-now.component').then(c => c.CreativeNowComponent)
      },
      {
            path: 'enterprenuers', loadComponent: () => import('./components/enterprenuers/enterprenuers.component').then(c => c.EnterprenuersComponent)
      },
      {
            path: 'retail-ecommerce', loadComponent: () => import('./components/retail-ecommerce/retail-ecommerce.component').then(c => c.RetailEcommerceComponent)
      },
      {
            path: 'why-we-use-ai', loadComponent: () => import('./components/why-we-use-ai/why-we-use-ai.component').then(c => c.WhyWeUseAiComponent)
      },
      {
            path: 'dedicated-customers', loadComponent: () => import('./components/dedicated-customer/dedicated-customer.component').then(c => c.DedicatedCustomerComponent)
      },
      {
            path: 'how-we-compare', loadComponent: () => import('./components/how-we-compare/how-we-compare.component').then(c => c.HowWeCompareComponent)
      },
      {
            path: 'case-studies', loadComponent: () => import('./components/case-studies/case-studies.component').then(c => c.CaseStudiesComponent)
      },
      {
            path: 'our-story', loadComponent: () => import('./components/our-story/our-story.component').then(c => c.OurStoryComponent)
      },
      {
            path: 'careers', loadComponent: () => import('./components/careers/careers.component').then(c => c.CareersComponent)
      },
      {
            path: 'blog', loadComponent: () => import('./components/blog/blog.component').then(c => c.BlogComponent)
      },
      {
            path: 'FAQs', loadComponent: () => import('./components/faqs/faqs.component').then(c => c.FAQsComponent)
      },
      {
            path: 'pricing', loadComponent: () => import('./components/pricing/pricing.component').then(c => c.PricingComponent)
      },
      {
            path: 'demo', loadComponent: () => import('./components/free-demo/free-demo.component').then(c => c.FreeDemoComponent)
      },
      {
            path: 'chat-with-ai', loadComponent: () => import('./components/chat-with-ai/chat-with-ai.component').then(c => c.ChatWithAiComponent)
      },
      {
            path: 'make-it-mine', loadComponent: () => import('./components/make-it-mine/make-it-mine.component').then(c => c.MakeItMineComponent)
      },
];
