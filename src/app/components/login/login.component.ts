import { Component } from '@angular/core';
import { FormGroup, FormBuilder, Validators, ReactiveFormsModule, FormsModule } from '@angular/forms';
import { Router, RouterLink } from '@angular/router';
import { ApiService } from '../../services/api.service';
import { CommonModule } from '@angular/common';

@Component({
  selector: 'app-login',
  standalone: true,
  imports: [RouterLink, ReactiveFormsModule, FormsModule, CommonModule],
  templateUrl: './login.component.html',
  styleUrl: './login.component.css'
})
export class LoginComponent {
  loginForm: FormGroup;
  showPassword: boolean = false; // Controls password visibility

  constructor(private fb: FormBuilder, private apiService: ApiService, private router: Router) {
    this.loginForm = this.fb.group({
      email: ['', [Validators.required, Validators.email]],
      password: [
        '',
        [
          Validators.required,
          Validators.minLength(8),
          Validators.pattern(/^(?=.*[a-z])(?=.*[A-Z])(?=.*\d)(?=.*[@$!%*?&])[A-Za-z\d@$!%*?&]+$/)
        ]
      ]
    });
  }

  togglePasswordVisibility() {
    this.showPassword = !this.showPassword;
  }

  onSubmit() {
    if (this.loginForm.valid) {
      const payload = {
        email: this.loginForm.value.email,
        password: this.loginForm.value.password
      };

      this.apiService.postAPI(`api/user/signIn`, payload)
        .subscribe({
          next: (res: any) => {
            if (res.success == true) {
              this.apiService.setToken(res.data);
              this.router.navigate(['/main'])
              // this.projectInfo = res.projectInfo
              // this, this.getProjectMedia()
              // this.loading = false
            } else {
              // this.loading = false
            }
          },
          error: err => {
            // this.loading = false
          }
        });

      console.log('Login Payload:', payload);
      // Call API service here
    }
  }

  get formControls() {
    return this.loginForm.controls;
  }
}
