import { Injectable } from '@angular/core';
import { AbstractControl, FormControl, FormGroup, ValidationErrors, ValidatorFn, Validators } from '@angular/forms';

@Injectable({
  providedIn: 'root'
})
export class ValidationService {

  constructor() {}

  /** Formulario de registro */
  createRegisterForm(): FormGroup {
    return new FormGroup(
      {
        name: new FormControl('', [
                Validators.required
            ]),
            email: new FormControl('', [
                Validators.required, 
                Validators.email
            ]),
            password: new FormControl('', [
                Validators.required, 
                Validators.minLength(8),
                Validators.pattern(/^(?=.*[A-Z])(?=.*\d)[A-Za-z\d!@#$%^&*()_+\-={}[\]|\\:;"'<>,.?/~`]{8,}$/)
            ]),
            confirmPassword: new FormControl('', [
                Validators.required
            ]),
        },
        {validators: this.matchFields('password', 'confirmPassword')}
    );
  }

  /** Formulario de login */
  createLoginForm(): FormGroup {
    return new FormGroup({
      email: new FormControl('', [
        Validators.required,
        Validators.email
      ]),

      password: new FormControl('', [
        Validators.required
      ]),

      isAdminLogin: new FormControl(false)
    });
  }


    matchFields(field1: string, field2: string): ValidatorFn {
        return (control: AbstractControl): ValidationErrors | null => {
            const control1 = control.get(field1);
            const control2 = control.get(field2);

            if (!control1 || !control2) return null;

            const value1 = control1.value;
            const value2 = control2.value;

            // Clonamos errores actuales de confirmPassword
            const errors = control2.errors ? { ...control2.errors } : {};

            if (value1 !== value2) {
            errors['fieldsNotMatch'] = true;
            control2.setErrors(errors);
            return { fieldsNotMatch: true };
            } else {
            // Cuando coincide, quitamos SOLO ese error
            if (errors['fieldsNotMatch']) {
                delete errors['fieldsNotMatch'];
                control2.setErrors(Object.keys(errors).length ? errors : null);
            }
            return null;
            }
        };
    }
}
