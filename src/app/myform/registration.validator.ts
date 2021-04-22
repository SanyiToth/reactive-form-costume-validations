import {AbstractControl, ValidationErrors, ValidatorFn} from '@angular/forms';

export function userNameComplexityValidator(control: AbstractControl): ValidationErrors | null {
  const strongRegex = new RegExp('(?=.*[A-Z])(?=.*[a-z])');

  const valid = strongRegex.test(control.value);
  return valid ? null : {
    userNameComplexity: true
  };
}


export function firstAndLastNameMatchValidator(control: AbstractControl): ValidationErrors | null {
  const control1 = control.get('firstName');
  const control2 = control.get('lastName');

  if (!control1 || !control2) {
    return null;
  }

  const valid = control1.value !== control2.value;

  return valid ? null : {
    fistAndLastNameMatching: true
  };

}

export function numberRangeValidator(min: number, max: number): ValidatorFn {
  return (control: AbstractControl): ValidationErrors | null => {
    const value: number = +control.value;
    const valid = value >= min && value <= max;
    return valid ? null : {numberRange: true};
  };
}


