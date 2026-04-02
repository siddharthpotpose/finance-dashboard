import { CommonModule } from '@angular/common';
import { Component, inject } from '@angular/core';
import { FormBuilder, ReactiveFormsModule } from '@angular/forms';
import { DashboardState } from '../../state/dashboard.state';
import { SettingsState } from '../../models/finance.models';

@Component({
  selector: 'app-settings',
  imports: [CommonModule, ReactiveFormsModule],
  templateUrl: './settings.html',
  styleUrl: './settings.css',
})
export class Settings {
  private readonly store = inject(DashboardState);
  private readonly fb = inject(FormBuilder);

  readonly settings = this.store.settings;

  readonly settingsForm = this.fb.group({
    currency: [this.store.settings().currency],
    taxRate: [this.store.settings().taxRate],
    fiscalYear: [this.store.settings().fiscalYear],
    baseCategory: [this.store.settings().baseCategory]
  });

  constructor() {
    this.settingsForm.valueChanges.subscribe((value) => {
      this.store.updateSettings(value as SettingsState);
    });
  }
}
