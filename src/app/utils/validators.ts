import { AbstractControl, ValidationErrors, ValidatorFn } from '@angular/forms';

export class CustomValidators {
  static numbersOnly(): ValidatorFn {
    return (control: AbstractControl): ValidationErrors | null => {
      if (!control.value) return null;
      const isValid = /^\d+$/.test(control.value);
      return isValid ? null : { numbersOnly: { value: control.value } };
    };
  }

  static charactersOnly(): ValidatorFn {
    return (control: AbstractControl): ValidationErrors | null => {
      if (!control.value) return null;
      const isValid = /^[a-zA-Z\s]+$/.test(control.value);
      return isValid ? null : { charactersOnly: { value: control.value } };
    };
  }

  static alphanumeric(): ValidatorFn {
    return (control: AbstractControl): ValidationErrors | null => {
      if (!control.value) return null;
      const isValid = /^[a-zA-Z0-9\s\-]+$/.test(control.value);
      return isValid ? null : { alphanumeric: { value: control.value } };
    };
  }

  static amount(): ValidatorFn {
    return (control: AbstractControl): ValidationErrors | null => {
      if (!control.value) return null;
      const isValid = /^\d+(\.\d{1,2})?$/.test(control.value);
      return isValid ? null : { invalidAmount: { value: control.value } };
    };
  }

  static positiveNumber(): ValidatorFn {
    return (control: AbstractControl): ValidationErrors | null => {
      if (!control.value) return null;
      const num = Number(control.value);
      const isValid = !isNaN(num) && num > 0;
      return isValid ? null : { positiveNumber: { value: control.value } };
    };
  }

  static noFutureDate(): ValidatorFn {
    return (control: AbstractControl): ValidationErrors | null => {
      if (!control.value) return null;
      const selectedDate = new Date(control.value);
      const today = new Date();
      today.setHours(23, 59, 59, 999);
      return selectedDate <= today ? null : { futureDate: { value: control.value } };
    };
  }

  static noPastDate(): ValidatorFn {
    return (control: AbstractControl): ValidationErrors | null => {
      if (!control.value) return null;
      const selectedDate = new Date(control.value);
      const today = new Date();
      today.setHours(0, 0, 0, 0);
      return selectedDate >= today ? null : { pastDate: { value: control.value } };
    };
  }

  static minDate(minDateStr: string): ValidatorFn {
    return (control: AbstractControl): ValidationErrors | null => {
      if (!control.value) return null;
      const selectedDate = new Date(control.value);
      const minDate = new Date(minDateStr);
      return selectedDate >= minDate ? null : { minDate: { min: minDateStr, actual: control.value } };
    };
  }

  static maxDate(maxDateStr: string): ValidatorFn {
    return (control: AbstractControl): ValidationErrors | null => {
      if (!control.value) return null;
      const selectedDate = new Date(control.value);
      const maxDate = new Date(maxDateStr);
      return selectedDate <= maxDate ? null : { maxDate: { max: maxDateStr, actual: control.value } };
    };
  }

  static descriptionValidator(): ValidatorFn {
    return (control: AbstractControl): ValidationErrors | null => {
      if (!control.value) return null;
      const isValid = /^[a-zA-Z0-9\s\-\.\,\(\)\/]+$/.test(control.value);
      return isValid ? null : { invalidDescription: { value: control.value } };
    };
  }
}
