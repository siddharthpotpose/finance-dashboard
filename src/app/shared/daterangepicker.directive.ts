import {
  Directive,
  ElementRef,
  EventEmitter,
  Input,
  OnDestroy,
  Output,
  AfterViewInit,
  OnChanges,
  SimpleChanges
} from '@angular/core';

export interface DateRangeResult {
  startDate: string;
  endDate: string;
  label: string;
}

@Directive({
  selector: '[appDaterangepicker]',
  standalone: true
})
export class DaterangepickerDirective implements AfterViewInit, OnDestroy, OnChanges {
  @Input() singleDatePicker = false;
  @Input() showDropdowns = true;
  @Input() autoApply = false;
  @Input() autoUpdateInput = true;
  @Input() maxDate: string = '';
  @Input() minDate: string = '';
  @Input() disableFuture = false;
  @Input() format = 'YYYY-MM-DD';
  @Input() placeholder = 'Select date range';
  @Input() initialStartDate: string = '';
  @Input() initialEndDate: string = '';
  @Input() parentEl: string = '';

  @Output() rangeSelected = new EventEmitter<DateRangeResult>();
  @Output() dateSelected = new EventEmitter<string>();

  constructor(private el: ElementRef) {}

  private picker: any;
  private $el: any;

  ngAfterViewInit(): void {
    setTimeout(() => this.initPicker(), 100);
  }

  ngOnChanges(changes: SimpleChanges): void {
    if (!this.picker) return;
    if (!changes['initialStartDate'] && !changes['initialEndDate']) return;
    this.syncPickerWithInputs();
  }

  private initPicker(): void {
    const win = window as any;
    const $ = win.$ || win.jQuery;

    if (!$ || typeof $.fn.daterangepicker !== 'function') {
      console.error('jQuery or daterangepicker not loaded');
      return;
    }

    const self = this;
    const nativeEl = this.el.nativeElement;
    const $el = $(nativeEl);
    const moment = win.moment;
    this.$el = $el;

    const options: any = {
      singleDatePicker: this.singleDatePicker,
      showDropdowns: this.showDropdowns,
      autoApply: this.singleDatePicker ? true : this.autoApply,
      autoUpdateInput: this.autoUpdateInput,
      locale: {
        format: this.format,
        cancelLabel: 'Clear',
        applyLabel: 'Apply',
        customRangeLabel: 'Custom Range'
      },
      opens: 'left',
      drops: 'down',
      linkedCalendars: false,
      alwaysShowCalendars: true,
      showCustomRangeLabel: !this.singleDatePicker
    };

    if (!this.singleDatePicker) {
      options.ranges = {
        'Today': [moment(), moment()],
        'Yesterday': [moment().subtract(1, 'days'), moment().subtract(1, 'days')],
        'Last 7 Days': [moment().subtract(6, 'days'), moment()],
        'Last 30 Days': [moment().subtract(29, 'days'), moment()],
        'This Month': [moment().startOf('month'), moment().endOf('month')],
        'Last Month': [moment().subtract(1, 'month').startOf('month'), moment().subtract(1, 'month').endOf('month')]
      };
    }

    if (this.maxDate) {
      options.maxDate = this.maxDate;
    } else if (this.disableFuture) {
      options.maxDate = moment();
    }
    if (this.minDate) {
      options.minDate = this.minDate;
    }
    if (this.initialStartDate) {
      options.startDate = this.initialStartDate;
    }
    if (this.initialEndDate) {
      options.endDate = this.initialEndDate;
    }
    if (this.parentEl) {
      options.parentEl = this.parentEl;
    }

    $el.daterangepicker(options);
    this.picker = $el.data('daterangepicker');

    $el.on('apply.daterangepicker', function(_ev: any, picker: any) {
      if (self.singleDatePicker) {
        const dateStr = picker.startDate.format(self.format);
        $el.val(dateStr);
        self.dateSelected.emit(dateStr);
      } else {
        self.rangeSelected.emit({
          startDate: picker.startDate.format(self.format),
          endDate: picker.endDate.format(self.format),
          label: picker.chosenLabel
        });
      }
    });

    $el.on('cancel.daterangepicker', function() {
      $el.val('');
      if (self.singleDatePicker) {
        self.dateSelected.emit('');
      } else {
        self.rangeSelected.emit({ startDate: '', endDate: '', label: '' });
      }
    });
  }

  ngOnDestroy(): void {
    const win = window as any;
    const $ = win.$ || win.jQuery;
    if ($) {
      try {
        $(this.el.nativeElement).daterangepicker('remove');
      } catch (_e) {}
    }
  }

  private syncPickerWithInputs(): void {
    const win = window as any;
    const moment = win.moment;
    if (!this.picker || !moment) return;

    if (this.singleDatePicker) {
      if (!this.initialStartDate) return;
      this.picker.setStartDate(this.initialStartDate);
      this.picker.setEndDate(this.initialStartDate);
      return;
    }

    if (this.initialStartDate) {
      this.picker.setStartDate(this.initialStartDate);
    }
    if (this.initialEndDate) {
      this.picker.setEndDate(this.initialEndDate);
    }
  }
}
