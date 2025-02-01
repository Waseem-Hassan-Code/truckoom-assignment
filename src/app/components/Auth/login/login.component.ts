import { Component } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { MatSnackBar } from '@angular/material/snack-bar';
import { Router } from '@angular/router';
import { ToastrService } from 'ngx-toastr';
import { AuthService } from '../../../services/auth.service';
import { LoginDto } from '../../../services/Model/AuthDto';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css'],
})
export class LoginComponent {
  loginForm: FormGroup;

  constructor(
    private fb: FormBuilder,
    private authService: AuthService,
    private snackBar: MatSnackBar,
    private toastr: ToastrService,
    private router: Router
  ) {
    this.loginForm = this.fb.group({
      userName: ['', [Validators.required, Validators.minLength(3)]],
      password: ['', [Validators.required, Validators.minLength(6)]],
    });
  }

  onSubmit(): void {
    if (this.loginForm.invalid) {
      this.snackBar.open('Please fill out the form correctly.', 'Close', {
        duration: 3000,
      });
      return;
    }

    const loginData: LoginDto = this.loginForm.value;

    this.authService.authUser(loginData).subscribe({
      next: (response) => {
        if (response.isSuccess && response.response) {
          localStorage.setItem('token', response.response);
          this.router.navigate(['/dashboard']);
          this.toastr.success(response.message, 'Success');
        } else {
          this.toastr.error(response.message || 'Login failed.', 'Error');
        }
      },
      error: (err) => {
        const errorMessage =
          err.error?.message || 'An error occurred during login.';
        this.toastr.error(errorMessage, 'Error');
      },
    });
  }
}
