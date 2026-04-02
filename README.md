# FinanceDesk Dashboard

A modern, responsive finance management dashboard built with Angular 21 featuring Role-Based Access Control (RBAC), real-time data visualization, and comprehensive transaction management.

## Overview

FinanceDesk is a single-page application designed to provide comprehensive financial oversight through an intuitive interface. It enables users to track transactions, manage invoices, monitor accounts, view insights, and configure system settings—all with role-based access control that restricts sensitive operations to administrators.

## Features

### Dashboard
- **KPI Cards** - Summary metrics with trend indicators (Revenue, Expenses, Profit, Savings)
- **Income vs Expense Chart** - 6-month bar chart visualization
- **Expense Mix Donut** - Category-based expense breakdown
- **Transaction Summary** - Quick filters for Debit/Credit and status counts
- **Recent Activity** - Live customer, invoice, and account previews
- **Alerts Marquee** - Scrolling alert notifications

### Transactions Management
- **Full CRUD Operations** - Add, edit, and delete transactions
- **Advanced Filtering** - Search by ID/description, filter by category/status/type
- **Date Range Picker** - Custom date range selection
- **Sorting** - Sortable columns (ID, Date, Amount)
- **Export** - Download as CSV or JSON format
- **Validation** - Form validation with error messages

### Role-Based Access Control (RBAC)
- **Admin Role** - Full access: can add, edit, delete transactions
- **Viewer Role** - Read-only access: cannot modify data
- **Role Switcher** - Quick toggle in header dropdown

### Theming
- **Light/Dark Mode** - Toggle in sidebar or header
- **CSS Variables** - Consistent theming across all components

### Settings
- **Currency Configuration** - INR, USD, EUR support
- **Tax Rate** - Configurable tax percentage
- **Fiscal Year** - Adjustable fiscal period
- **Base Category** - Default category selection

### Additional Pages
- **Invoices** - Invoice tracking with status (Paid/Unpaid/Overdue)
- **Customers** - Customer analytics with spending metrics
- **Accounts** - Account management with balance tracking
- **Reports** - Financial reports with sparkline visualizations
- **Insights** - Automated financial insights and recommendations
- **Alerts** - Priority-based alert management (low/medium/high)

## Technical Approach

### Architecture
- **Standalone Components** - Modern Angular 21 pattern, no NgModules
- **Signal-Based State Management** - Reactive state with Angular Signals
- **Lazy-Loaded Routes** - Code-split pages for performance
- **Services Layer** - ExportService, ToastService, LoaderService

### State Management
- Centralized `DashboardState` service using Angular Signals
- `computed()` signals for derived state (filtered/sorted transactions)
- `effect()` for localStorage persistence
- Reactive forms with form controls

### Code Structure
```
src/app/
├── core/data/           # Static data (seed data)
├── layout/              # Shell, Header, Sidebar, Footer
├── models/              # TypeScript interfaces
├── pages/               # Feature pages
│   ├── dashboard/
│   ├── transactions/
│   ├── invoices/
│   ├── customers/
│   ├── accounts/
│   ├── reports/
│   ├── insights/
│   ├── alerts/
│   └── settings/
├── services/            # Business logic services
├── shared/              # Directives, shared components
├── state/               # Global state management
└── utils/               # Validators, utilities
```

## Setup Instructions

### Prerequisites
- Node.js 18+ 
- npm 9+

### Installation

```bash
# Install dependencies
npm install

# Start development server
ng serve
```

Open `http://localhost:4200/` in your browser.

### Build for Production

```bash
ng build
```

Production artifacts will be in `dist/finance-dashboard/`.

### Running Tests

```bash
# Unit tests
ng test

# E2E tests
ng e2e
```

## Project Structure

| File/Directory | Purpose |
|---------------|---------|
| `src/app/state/dashboard.state.ts` | Central state management with signals |
| `src/app/models/finance.models.ts` | TypeScript interfaces and types |
| `src/app/services/export.service.ts` | CSV/JSON export functionality |
| `src/app/services/toast.service.ts` | Toast notifications |
| `src/app/services/loader.service.ts` | Loading spinner overlay |
| `src/app/shared/daterangepicker.directive.ts` | Date range picker |
| `src/app/utils/validators.ts` | Custom form validators |

## Technologies Used

- **Angular 21** - Framework
- **TypeScript** - Language
- **Font Awesome 6** - Icons
- **Bootstrap** - Layout utilities
- **jQuery + Moment.js** - Date range picker
- **Angular Signals** - State management

## License

MIT 
