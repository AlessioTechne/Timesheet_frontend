import { ActivatedRoute, Router, RouterLink } from '@angular/router';
import { Component, OnInit } from '@angular/core';
import {
  FormBuilder,
  FormGroup,
  FormsModule,
  ReactiveFormsModule,
  UntypedFormGroup,
  Validators,
} from '@angular/forms';
import {
  UserNewDto,
  UserRolesDto,
  UserUpdatesDto,
} from '../../../_models/user';

import { AdminService } from '../../../_services/admin.service';
import { CommonModule } from '@angular/common';
import { FeathericonsModule } from '../../../icons/feathericons/feathericons.module';
import { MatButtonModule } from '@angular/material/button';
import { MatCardModule } from '@angular/material/card';
import { MatDividerModule } from '@angular/material/divider';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatIconModule } from '@angular/material/icon';
import { MatInputModule } from '@angular/material/input';
import { MatSelectModule } from '@angular/material/select';
import { MatSnackBar } from '@angular/material/snack-bar';
import { RolesDto } from '../../../_models/rolesDto';
import { TextInputComponent } from '../../../_forms/text-input/text-input.component';

@Component({
  selector: 'app-user-edit',
  standalone: true,
  imports: [
    CommonModule,
    FormsModule,
    ReactiveFormsModule,
    MatCardModule,
    MatInputModule,
    MatFormFieldModule,
    MatSelectModule,
    FeathericonsModule,
    MatButtonModule,
    MatIconModule,
    RouterLink,
    MatDividerModule,
    TextInputComponent
  ],
  templateUrl: './user-edit.component.html',
  styleUrl: './user-edit.component.scss',
})
export class UserEditComponent implements OnInit {
  userForm: FormGroup;
  formSubmitted: boolean = false;
  pageTitle: string;

  userId: number;
  roles: RolesDto[];

  constructor(
    private adminServices: AdminService,
    private route: ActivatedRoute,
    private router: Router,
    private _snackBar: MatSnackBar,
    private fb: FormBuilder
  ) {}

  ngOnInit(): void {
    this.loadRoles();
    this.initializeForm();
    this.loadUser();
  }

  initializeForm() {
    this.userForm = this.fb.group({
      userName: ['', [Validators.required]],
      fullName: ['', Validators.required],
      email: ['', [Validators.required, Validators.email, Validators.minLength(4)]],
      roles: [[], Validators.required],
    });
  }

  loadRoles() {
    this.adminServices.getRoles().subscribe({
      next: (response) => {
        this.roles = response;
      },
    });
  }

  loadUser() {
    this.userId = parseInt(this.route.snapshot.url[1]?.path);
    if (this.userId>0) {
      this.adminServices.getUserWithRoles(this.userId).subscribe({
        next: (response) => {
          this.userForm.patchValue({
            userName: response.userName,
            fullName: response.fullName,
            email: response.email,
            roles: response.roles,
          });
          this.pageTitle = 'Modifica ' + response.userName;
        },
      });
    } else {
      this.pageTitle = 'Nuovo Utente';
    }
  }

  onSubmit() {
    this.formSubmitted = true;
    if (this.userForm.valid) {
      if (this.userId) {
        var userUpdateDto: UserUpdatesDto = {
          userId: this.userId,
          fullName: this.userForm.controls['fullName'].value,
          userName: this.userForm.controls['userName'].value,
          email: this.userForm.controls['email'].value,
          roles: this.userForm.controls['roles'].value,
        };
        this.adminServices.updateUserWithRoles(userUpdateDto).subscribe({
          complete: () => {
            this.router.navigate(['settings/admin-panel']);
            this._snackBar.open('Utente modificato con successo', 'Chiudi');
          },
          error: (e) => {
            console.log(e);
            this._snackBar.open(
              e.error,
              'Chiudi'
            );
          },
        });
      } else {
        var userNewDto: UserNewDto = {
          fullName: this.userForm.controls['fullName'].value,
          userName: this.userForm.controls['userName'].value,
          email: this.userForm.controls['email'].value,
          roles: this.userForm.controls['roles'].value,
        };
        this.adminServices.createUserWithRoles(userNewDto).subscribe({
          complete: () => {
            this.router.navigate(['settings/admin-panel']);
            this._snackBar.open('Utente creato con successo', 'Chiudi');
          },
          error: (e) => {
            console.log(e);
            this._snackBar.open(
              e.error,
              'Chiudi'
            );
          },
        });
      }
    } else {
      this._snackBar.open('Attenzione form non valida!', 'Chiudi')
      this.formSubmitted = false;
    }
  }

  onDelete() {
    if (confirm('Sei sicuro di voler eliminare definitivamente questo utente?'))
      this.adminServices.deleteUser(this.userId).subscribe({
        next: () => {
          this.router.navigate(['settings/admin-panel']);
          this._snackBar.open('Utente eliminato con successo', 'Chiudi');
        },
        error: (error) => {
          console.log(error);
          this._snackBar.open(error.error, 'Chiudi');
        },
      });
  }

  onCancel() {
    this.router.navigate(['settings/admin-panel']);
  }
}
