import { Component, inject } from '@angular/core';
import { CommonModule } from '@angular/common';
import { ToastService, ToastMessage } from '../services/toast.service';

@Component({
  selector: 'app-toast',
  standalone: true,
  imports: [CommonModule],
  template: `
    <div class="toast-container">
      @for (toast of toastService.toasts(); track toast.id) {
        <div class="toast-item" [class]="'toast-' + toast.type" (click)="toastService.dismiss(toast.id)">
          <i class="fa-solid" [ngClass]="{
            'fa-circle-check': toast.type === 'success',
            'fa-circle-xmark': toast.type === 'error',
            'fa-triangle-exclamation': toast.type === 'warning',
            'fa-circle-info': toast.type === 'info'
          }"></i>
          <span class="toast-msg">{{ toast.message }}</span>
          <button class="toast-close" (click)="toastService.dismiss(toast.id); $event.stopPropagation()">
            <i class="fa-solid fa-xmark"></i>
          </button>
        </div>
      }
    </div>
  `,
  styles: [`
    .toast-container {
      position: fixed;
      top: 16px;
      right: 16px;
      z-index: 10000;
      display: flex;
      flex-direction: column;
      gap: 8px;
      max-width: 380px;
    }
    .toast-item {
      display: flex;
      align-items: center;
      gap: 10px;
      padding: 12px 16px;
      border-radius: 8px;
      font-size: 13px;
      font-weight: 500;
      cursor: pointer;
      animation: slideIn 0.3s ease-out;
      box-shadow: 0 4px 12px rgba(0,0,0,0.15);
    }
    @keyframes slideIn {
      from { transform: translateX(100%); opacity: 0; }
      to { transform: translateX(0); opacity: 1; }
    }
    .toast-success { background: #ecfdf5; color: #065f46; border: 1px solid #a7f3d0; }
    .toast-error { background: #fef2f2; color: #991b1b; border: 1px solid #fecaca; }
    .toast-warning { background: #fffbeb; color: #92400e; border: 1px solid #fde68a; }
    .toast-info { background: #eff6ff; color: #1e40af; border: 1px solid #bfdbfe; }
    .toast-msg { flex: 1; }
    .toast-close {
      margin-left: auto;
      background: none;
      border: none;
      color: inherit;
      opacity: 0.5;
      cursor: pointer;
      padding: 2px;
      display: grid;
      place-items: center;
    }
    .toast-close:hover { opacity: 1; }
  `]
})
export class ToastComponent {
  readonly toastService = inject(ToastService);
}
