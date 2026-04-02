import { Injectable, signal } from '@angular/core';

export interface ToastMessage {
  id: number;
  type: 'success' | 'error' | 'warning' | 'info';
  message: string;
  duration: number;
}

@Injectable({ providedIn: 'root' })
export class ToastService {
  private nextId = 0;
  readonly toasts = signal<ToastMessage[]>([]);

  show(message: string, type: 'success' | 'error' | 'warning' | 'info' = 'info', duration = 3000): void {
    const id = this.nextId++;
    const toast: ToastMessage = { id, type, message, duration };
    this.toasts.update((list) => [...list, toast]);
    if (duration > 0) {
      setTimeout(() => this.dismiss(id), duration);
    }
  }

  success(message: string, duration = 3000): void {
    this.show(message, 'success', duration);
  }

  error(message: string, duration = 4000): void {
    this.show(message, 'error', duration);
  }

  warning(message: string, duration = 3500): void {
    this.show(message, 'warning', duration);
  }

  info(message: string, duration = 3000): void {
    this.show(message, 'info', duration);
  }

  dismiss(id: number): void {
    this.toasts.update((list) => list.filter((t) => t.id !== id));
  }

  clear(): void {
    this.toasts.set([]);
  }
}
