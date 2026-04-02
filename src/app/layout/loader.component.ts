import { Component, inject } from '@angular/core';
import { CommonModule } from '@angular/common';
import { LoaderService } from '../services/loader.service';

@Component({
  selector: 'app-loader',
  standalone: true,
  imports: [CommonModule],
  template: `
    @if (loaderService.isLoading()) {
      <div class="loader-overlay">
        <div class="loader-spinner">
          <div class="spinner"></div>
          <span>Loading...</span>
        </div>
      </div>
    }
  `,
  styles: [`
    .loader-overlay {
      position: fixed;
      inset: 0;
      background: rgba(0,0,0,0.3);
      backdrop-filter: blur(4px);
      z-index: 9999;
      display: grid;
      place-items: center;
    }
    .loader-spinner {
      display: flex;
      flex-direction: column;
      align-items: center;
      gap: 12px;
      background: var(--panel, #fff);
      padding: 24px 32px;
      border-radius: 12px;
      box-shadow: 0 8px 24px rgba(0,0,0,0.2);
    }
    .loader-spinner span {
      font-size: 13px;
      font-weight: 600;
      color: var(--muted, #6b7280);
    }
    .spinner {
      width: 36px;
      height: 36px;
      border: 3px solid var(--border, #e2e6ec);
      border-top-color: var(--accent, #0d9488);
      border-radius: 50%;
      animation: spin 0.8s linear infinite;
    }
    @keyframes spin {
      to { transform: rotate(360deg); }
    }
  `]
})
export class LoaderComponent {
  readonly loaderService = inject(LoaderService);
}
