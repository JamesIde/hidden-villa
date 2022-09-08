import { Component, OnInit } from '@angular/core';
import {
  AbstractControl,
  FormControl,
  FormGroup,
  ValidationErrors,
  ValidatorFn,
  Validators,
} from '@angular/forms';
import { Router } from '@angular/router';
import { AuthService } from 'src/app/services/auth.service';
@Component({
  selector: 'app-register',
  templateUrl: './register.component.html',
  styleUrls: ['./register.component.css'],
})
export class RegisterComponent implements OnInit {
  constructor(private authService: AuthService, private router: Router) {}
  registerForm!: FormGroup;
  isLoading = false;
  isError = false;
  error!: string;
  ngOnInit(): void {
    this.registerForm = new FormGroup({
      name: new FormControl('', [Validators.required]),
      email: new FormControl(null, [Validators.required, Validators.email]),
      passwordGroup: new FormGroup(
        {
          password: new FormControl(null, [
            Validators.required,
            Validators.minLength(6),
          ]),
          confirmPassword: new FormControl(null, [
            Validators.required,
            Validators.minLength(6),
          ]),
        },
        { validators: passwordMatchingValidatior }
      ),
    });
  }

  handleSubmit() {
    this.isLoading = true;
    const userData = {
      name: this.registerForm.value.name,
      email: this.registerForm.value.email,
      password: this.registerForm.value.password,
      password2: this.registerForm.value.confirmPassword,
    };
    this.authService.registerUser(userData).subscribe(
      (user) => {
        this.isLoading = false;
        console.log('Registered');
        this.router.navigate(['/todo']);
        this.registerForm.reset();
      },
      (error) => {
        this.isLoading = false;
        this.isError = true;
        this.error = error.error.message;
        this.setErrorTimeout();
        this.registerForm.reset();
      }
    );
  }
  setErrorTimeout() {
    setTimeout(() => {
      this.isError = false;
    }, 5000);
  }
}
export const passwordMatchingValidatior: ValidatorFn = (
  control: AbstractControl
): ValidationErrors | null => {
  const password = control.get('password');
  const confirmPassword = control.get('confirmPassword');

  return password?.value === confirmPassword?.value
    ? null
    : { notmatched: true };
};
