import {
  FormBuilder,
  FormGroup,
  FormsModule,
  ReactiveFormsModule,
  Validators,
} from '@angular/forms';
import { MatButton, MatIconButton } from '@angular/material/button';
import { Router, RouterLink } from '@angular/router';

import { AuthService } from '../../_services/auth.service';
import { Component } from '@angular/core';
import { FeathericonsModule } from '../../icons/feathericons/feathericons.module';
import { MatCheckboxModule } from '@angular/material/checkbox';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatInputModule } from '@angular/material/input';
import { NgIf } from '@angular/common';

@Component({
  selector: 'app-sign-in',
  standalone: true,
  imports: [
    RouterLink,
    MatButton,
    MatIconButton,
    FormsModule,
    MatFormFieldModule,
    MatInputModule,
    FeathericonsModule,
    MatCheckboxModule,
    ReactiveFormsModule,
    NgIf,
  ],
  templateUrl: './sign-in.component.html',
  styleUrl: './sign-in.component.scss',
})
export class SignInComponent {
  constructor(
    private fb: FormBuilder,
    private router: Router,
    private authService: AuthService
  ) {
    this.authForm = this.fb.group({
      username: ['', [Validators.required]],
      password: ['', [Validators.required]],
    });
  }

  // Password Hide
  hide = true;

  // Form
  authForm: FormGroup;
  onSubmit() {
    if (this.authForm.valid) {
      this.authService.login(this.authForm).subscribe({
        next: (response) => {
          this.router.navigateByUrl('/home');
        },
        error: (error) => {
          console.log(error);
        },
      });
    } else {
      console.log('Form non valido, controlla i dati inseriti');
    }
  }
}
