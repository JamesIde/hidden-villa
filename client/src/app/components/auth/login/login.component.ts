import { Component, OnInit } from '@angular/core';
import { FormControl, FormGroup, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { Subscription } from 'rxjs';
import { APIService } from 'src/app/shared/API.service';
import { LoginUser, User } from '../userModel';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css'],
})
export class LoginComponent implements OnInit {
  // Set up the form
  userForm!: FormGroup;
  // Subscribe to behaviour subject
  userSubscription!: Subscription;
  // Flags for status
  isLoading = false;
  isError = false;
  error!: string;

  constructor(private apiService: APIService, private router: Router) {}

  ngOnInit(): void {
    this.userForm = new FormGroup({
      email: new FormControl('', [Validators.required, Validators.email]),
      password: new FormControl('', [
        Validators.required,
        Validators.minLength(3),
      ]),
    });
  }

  handleSubmit() {
    this.isLoading = true;
    // Create user subject
    const user: LoginUser = {
      email: this.userForm.value.email,
      password: this.userForm.value.password,
    };
    // Call the login service

    this.apiService.loginUser(user).subscribe(
      (data) => {
        console.log(data);
        this.isLoading = false;
        console.log('Logged in');
        this.router.navigate(['/profile']);
        this.userForm.reset();
        // Navigate to list of todo page
      },
      (error) => {
        this.isLoading = false;
        this.isError = true;
        this.error = error.error.message;
        this.setErrorTimeout();
        this.userForm.reset();
      }
    );
  }
  setErrorTimeout() {
    setTimeout(() => {
      this.isError = false;
    }, 5000);
  }
}
