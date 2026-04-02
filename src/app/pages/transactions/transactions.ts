import { CommonModule } from '@angular/common';
import { Component, computed, effect, inject, signal } from '@angular/core';
import { FormBuilder, FormGroup, ReactiveFormsModule, Validators } from '@angular/forms';
import { ExportService } from '../../services/export.service';
import { ToastService } from '../../services/toast.service';
import { LoaderService } from '../../services/loader.service';
import { DashboardState, DEFAULT_FILTERS } from '../../state/dashboard.state';
import { FilterState, SortState, Transaction, TransactionStatus, TransactionType } from '../../models/finance.models';
import { DaterangepickerDirective, DateRangeResult } from '../../shared/daterangepicker.directive';
import { CustomValidators } from '../../utils/validators';

@Component({
  selector: 'app-transactions',
  imports: [
    CommonModule,
    ReactiveFormsModule,
    DaterangepickerDirective
  ],
  templateUrl: './transactions.html',
  styleUrl: './transactions.css',
})
export class Transactions {
  private readonly store = inject(DashboardState);
  private readonly exportService = inject(ExportService);
  private readonly toastService = inject(ToastService);
  private readonly loaderService = inject(LoaderService);
  private readonly fb = inject(FormBuilder);

  readonly role = this.store.role;
  readonly settings = this.store.settings;
  readonly isAdmin = computed(() => this.role() === 'admin');
  readonly sort = this.store.sort;
  readonly transactions = this.store.sortedTransactions;
  readonly filteredCount = computed(() => this.transactions().length);

  readonly isTransactionModalOpen = signal(false);
  readonly isEditMode = signal(false);
  readonly isDeleteModalOpen = signal(false);
  readonly selectedTransaction = signal<Transaction | null>(null);

  readonly statusOptions = ['All', 'Completed', 'Pending', 'Failed'];
  readonly typeOptions = ['All', 'Credit', 'Debit'];
  readonly categoryOptions = computed(() => {
    const categories = new Set(this.store.transactions().map((tx) => tx.category));
    return ['All', ...Array.from(categories).sort()];
  });

  readonly modalTypeOptions: TransactionType[] = ['Credit', 'Debit'];
  readonly modalStatusOptions: TransactionStatus[] = ['Completed', 'Pending', 'Failed'];
  readonly modalCategoryOptions = [
    'Subscriptions', 'Infrastructure', 'Payroll', 'Consulting',
    'Marketing', 'Product Sales', 'Operations', 'Admin', 'Affiliates', 'Misc'
  ];
  readonly modalAccountOptions = [
    'Operating Account', 'Cloud Card', 'Payroll Account',
    'Marketing Card', 'Operations Card', 'Receivables', 'Treasury'
  ];

  readonly filtersForm = this.fb.group({
    search: [this.store.filters().search],
    category: [this.store.filters().category],
    status: [this.store.filters().status],
    type: [this.store.filters().type],
    dateFrom: [this.store.filters().dateFrom],
    dateTo: [this.store.filters().dateTo],
    amountMin: [this.store.filters().amountMin],
    amountMax: [this.store.filters().amountMax]
  });

  transactionForm: FormGroup = this.fb.group({
    date: ['', [Validators.required]],
    description: ['', [Validators.required, Validators.minLength(3), Validators.maxLength(100), CustomValidators.descriptionValidator()]],
    amount: ['', [Validators.required, CustomValidators.amount(), CustomValidators.positiveNumber()]],
    type: ['Debit', Validators.required],
    category: ['', Validators.required],
    status: ['Pending', Validators.required],
    account: ['', Validators.required]
  });

  deleteForm: FormGroup = this.fb.group({
    remark: ['', [Validators.required, Validators.minLength(3), Validators.maxLength(200)]]
  });

  private todayStr = '';

  constructor() {
    this.filtersForm.valueChanges.subscribe((value) => {
      this.store.setFilters(value as FilterState);
    });
    effect(() => {
      this.filtersForm.patchValue(this.store.filters(), { emitEvent: false });
    });
    this.ensureTodayStr();
    this.resetTransactionForm(null);
  }

  onDateRangeSelected(range: DateRangeResult): void {
    this.filtersForm.patchValue({
      dateFrom: range.startDate,
      dateTo: range.endDate
    }, { emitEvent: true });
  }

  resetFilters(): void {
    this.store.resetFilters();
    this.filtersForm.patchValue(DEFAULT_FILTERS, { emitEvent: false });
  }

  setSort(key: keyof Transaction): void {
    const current = this.sort();
    const direction: SortState['direction'] =
      current.key === key && current.direction === 'asc' ? 'desc' : 'asc';
    this.store.setSort({ key, direction });
  }

  openAddModal(): void {
    this.isEditMode.set(false);
    this.selectedTransaction.set(null);
    this.resetTransactionForm(null);
    this.isTransactionModalOpen.set(true);
  }

  openEditModal(tx: Transaction): void {
    this.isEditMode.set(true);
    this.selectedTransaction.set(tx);
    this.resetTransactionForm(tx);
    this.isTransactionModalOpen.set(true);
  }

  openDeleteModal(tx: Transaction): void {
    this.selectedTransaction.set(tx);
    this.deleteForm.reset();
    this.isDeleteModalOpen.set(true);
  }

  closeTransactionModal(): void {
    this.isTransactionModalOpen.set(false);
    this.isEditMode.set(false);
    this.selectedTransaction.set(null);
  }

  closeDeleteModal(): void {
    this.isDeleteModalOpen.set(false);
    this.selectedTransaction.set(null);
    this.deleteForm.reset();
  }

  onTransactionSubmit(): void {
    if (this.transactionForm.invalid) {
      Object.keys(this.transactionForm.controls).forEach((key) => {
        this.transactionForm.get(key)?.markAsTouched();
      });
      return;
    }

    const formValue = this.transactionForm.value;
    const transaction: Transaction = {
      id: this.isEditMode() && this.selectedTransaction() ? this.selectedTransaction()!.id : this.generateId(),
      date: String(formValue.date || this.todayStr),
      description: String(formValue.description || '').trim(),
      amount: Number(formValue.amount),
      type: formValue.type as TransactionType,
      category: String(formValue.category || ''),
      status: formValue.status as TransactionStatus,
      account: String(formValue.account || '')
    };

    if (this.isEditMode()) {
      this.onUpdateTransaction(transaction);
    } else {
      this.onAddTransaction(transaction);
    }
  }

  onAddTransaction(transaction: Transaction): void {
    this.loaderService.show();
    setTimeout(() => {
      this.store.addTransaction(transaction);
      this.loaderService.hide();
      this.closeTransactionModal();
      this.toastService.success('Transaction ' + transaction.id + ' added successfully');
    }, 500);
  }

  onUpdateTransaction(transaction: Transaction): void {
    this.loaderService.show();
    setTimeout(() => {
      this.store.updateTransaction(transaction);
      this.loaderService.hide();
      this.closeTransactionModal();
      this.toastService.success('Transaction ' + transaction.id + ' updated successfully');
    }, 500);
  }

  onDeleteConfirm(): void {
    if (this.deleteForm.invalid || !this.selectedTransaction()) {
      this.deleteForm.get('remark')?.markAsTouched();
      return;
    }
    const event = {
      id: this.selectedTransaction()!.id,
      remark: String(this.deleteForm.value.remark || '').trim()
    };
    this.loaderService.show();
    setTimeout(() => {
      this.store.deleteTransaction(event.id);
      this.loaderService.hide();
      this.closeDeleteModal();
      this.toastService.success('Transaction ' + event.id + ' deleted successfully');
    }, 500);
  }

  exportCsv(): void {
    const rows = this.transactions().map((tx) => ({
      id: tx.id,
      date: tx.date,
      description: tx.description,
      amount: tx.amount,
      type: tx.type,
      category: tx.category,
      status: tx.status,
      account: tx.account
    }));
    this.exportService.downloadCsv('transactions.csv', rows);
    this.toastService.info('CSV exported successfully');
  }

  exportJson(): void {
    this.exportService.downloadJson('transactions.json', this.transactions());
    this.toastService.info('JSON exported successfully');
  }

  onDateSelected(dateStr: string): void {
    this.transactionForm.patchValue({ date: dateStr });
  }

  onTransactionBackdropClick(event: MouseEvent): void {
    if ((event.target as HTMLElement).classList.contains('modal-backdrop')) {
      this.closeTransactionModal();
    }
  }

  onDeleteBackdropClick(event: MouseEvent): void {
    if ((event.target as HTMLElement).classList.contains('modal-backdrop')) {
      this.closeDeleteModal();
    }
  }

  getFieldError(fieldName: string): string {
    const control = this.transactionForm.get(fieldName);
    if (!control || !control.errors || !control.touched) return '';

    const errors = control.errors;
    if (errors['required']) return this.getFieldLabel(fieldName) + ' is required';
    if (errors['minlength']) return 'Minimum ' + errors['minlength'].requiredLength + ' characters required';
    if (errors['maxlength']) return 'Maximum ' + errors['maxlength'].requiredLength + ' characters allowed';
    if (errors['invalidAmount']) return 'Enter a valid amount (e.g., 100 or 100.50)';
    if (errors['positiveNumber']) return 'Amount must be greater than 0';
    if (errors['invalidDescription']) return 'Description contains invalid characters';

    return 'Invalid value';
  }

  isFieldInvalid(fieldName: string): boolean {
    const control = this.transactionForm.get(fieldName);
    return !!control && control.invalid && control.touched;
  }

  get deleteRemarkError(): string {
    const control = this.deleteForm.get('remark');
    if (!control || !control.errors || !control.touched) return '';
    if (control.errors['required']) return 'Remark is required to delete this record';
    if (control.errors['minlength']) return 'Remark must be at least 3 characters';
    if (control.errors['maxlength']) return 'Remark cannot exceed 200 characters';
    return '';
  }

  private ensureTodayStr(): void {
    if (this.todayStr) return;
    const today = new Date();
    this.todayStr = today.getFullYear() + '-' +
      String(today.getMonth() + 1).padStart(2, '0') + '-' +
      String(today.getDate()).padStart(2, '0');
  }

  private resetTransactionForm(tx: Transaction | null): void {
    this.transactionForm.reset({
      date: tx?.date || this.todayStr,
      description: tx?.description || '',
      amount: tx?.amount || '',
      type: tx?.type || 'Debit',
      category: tx?.category || '',
      status: tx?.status || 'Pending',
      account: tx?.account || ''
    });
  }

  private generateId(): string {
    const num = Math.floor(Math.random() * 9000) + 1000;
    return 'TX-' + num;
  }

  private getFieldLabel(fieldName: string): string {
    const labels: Record<string, string> = {
      date: 'Date',
      description: 'Description',
      amount: 'Amount',
      type: 'Type',
      category: 'Category',
      status: 'Status',
      account: 'Account'
    };
    return labels[fieldName] || fieldName;
  }
}
