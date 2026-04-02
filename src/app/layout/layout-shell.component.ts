import { CommonModule } from '@angular/common';
import { Component, computed, inject, signal } from '@angular/core';
import { RouterOutlet } from '@angular/router';
import { DashboardState } from '../state/dashboard.state';
import { Role } from '../models/finance.models';
import { HeaderComponent } from './header.component';
import { SidebarComponent } from './sidebar.component';
import { FooterComponent } from './footer.component';
import { ToastComponent } from './toast.component';
import { LoaderComponent } from './loader.component';

@Component({
  selector: 'app-layout-shell',
  standalone: true,
  imports: [
    CommonModule,
    RouterOutlet,
    HeaderComponent,
    SidebarComponent,
    FooterComponent,
    ToastComponent,
    LoaderComponent
  ],
  templateUrl: './layout-shell.component.html',
  styleUrl: './layout-shell.component.css'
})
export class LayoutShellComponent {
  private readonly store = inject(DashboardState);

  readonly sidebarCollapsed = signal(false);
  readonly role = this.store.role;
  readonly theme = this.store.theme;
  readonly isAdmin = computed(() => this.role() === 'admin');
  readonly roleOptions: Role[] = ['admin', 'viewer'];

  toggleSidebar(): void {
    this.sidebarCollapsed.update((value) => !value);
  }

  toggleTheme(): void {
    this.store.setTheme(this.theme() === 'light' ? 'dark' : 'light');
  }

  setRole(role: Role): void {
    this.store.setRole(role);
  }
}
