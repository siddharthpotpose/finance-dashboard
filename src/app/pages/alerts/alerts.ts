import { CommonModule } from '@angular/common';
import { Component, inject } from '@angular/core';
import { ALERTS } from '../../core/data/finance.data';
import { DashboardState } from '../../state/dashboard.state';

@Component({
  selector: 'app-alerts',
  imports: [CommonModule],
  templateUrl: './alerts.html',
  styleUrl: './alerts.css',
})
export class Alerts {
  private readonly store = inject(DashboardState);
  readonly settings = this.store.settings;
  readonly alerts = ALERTS;

  get highCount() {
    return this.alerts.filter(a => a.level === 'high').length;
  }

  get mediumCount() {
    return this.alerts.filter(a => a.level === 'medium').length;
  }

  get lowCount() {
    return this.alerts.filter(a => a.level === 'low').length;
  }
}
