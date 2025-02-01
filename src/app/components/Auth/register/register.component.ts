import { Component } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { MatSnackBar } from '@angular/material/snack-bar';
import { AuthService } from '../../../services/auth.service';
import { RegisterDto } from '../../../services/Model/AuthDto';
import { ToastrService } from 'ngx-toastr';
import { Router } from '@angular/router';

@Component({
  selector: 'app-register',
  templateUrl: './register.component.html',
  styleUrls: ['./register.component.css'],
})
export class RegisterComponent {
  registerForm: FormGroup;

  constructor(
    private fb: FormBuilder,
    private authService: AuthService,
    private snackBar: MatSnackBar,
    private toastr: ToastrService,
    private router: Router
  ) {
    this.registerForm = this.fb.group({
      userName: ['', [Validators.required, Validators.minLength(3)]],
      userEmail: ['', [Validators.required, Validators.email]],
      password: ['', [Validators.required, Validators.minLength(6)]],
    });
  }

  onSubmit() {
    if (this.registerForm.valid) {
      const registerData: RegisterDto = this.registerForm.value;

      this.authService.registerUser(registerData).subscribe({
        next: (response) => {
          this.router.navigate(['/login']);
          this.toastr.success(response.message, 'Success');
          this.registerForm.reset();
        },
        error: (err) => {
          this.toastr.error(err.error.message, 'Error');
        },
      });
    } else {
      this.snackBar.open('Please fill out the form correctly.', 'Close', {
        duration: 3000,
      });
    }
  }

  navigateToLogin() {
    this.router.navigate(['/login']);
  }
}
