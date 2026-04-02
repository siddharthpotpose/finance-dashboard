import { Routes } from '@angular/router';

export const routes: Routes = [
  {
    path: '',
    loadComponent: () =>
      import('./pages/dashboard/dashboard-page.component').then(
        (m) => m.DashboardPageComponent
      )
  },
  { 
    path: 'transactions',
    loadComponent: () =>
      import('./pages/transactions/transactions').then((m) => m.Transactions)
  },
  {
    path: 'invoices',
    loadComponent: () =>
      import('./pages/invoices/invoices').then((m) => m.Invoices)
  },
  {
    path: 'customers',
    loadComponent: () =>
      import('./pages/customers/customers').then((m) => m.Customers)
  },
  {
    path: 'accounts',
    loadComponent: () =>
      import('./pages/accounts/accounts').then((m) => m.Accounts)
  },
  {
    path: 'reports',
    loadComponent: () =>
      import('./pages/reports/reports').then((m) => m.Reports)
  },
  {
    path: 'insights',
    loadComponent: () =>
      import('./pages/insights/insights').then((m) => m.Insights)
  },
  {
    path: 'alerts',
    loadComponent: () =>
      import('./pages/alerts/alerts').then((m) => m.Alerts)
  },
  {
    path: 'settings',
    loadComponent: () =>
      import('./pages/settings/settings').then((m) => m.Settings)
  },
  {
    path: '**',
    redirectTo: ''
  }
];
