import { AbstractControl } from '@angular/forms';

export function ValidateNotEmpty(control: AbstractControl) {
  if (!control.value.trim().length) {
    return { validEmpty: true };
  }
  return null;
}