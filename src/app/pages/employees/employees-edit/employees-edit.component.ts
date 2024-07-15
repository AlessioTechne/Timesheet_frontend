import { ActivatedRoute, Router, RouterLink } from '@angular/router';
import { Component, OnInit } from '@angular/core';
import {
  EmployeesDto,
  EmployeesEditDto,
  EmployeesNewDto,
} from '../../../_models/employees';
import {
  FormBuilder,
  FormGroup,
  FormsModule,
  ReactiveFormsModule,
  Validators,
} from '@angular/forms';

import { BasicElementsComponent } from '../../../forms/basic-elements/basic-elements.component';
import { BasicFormComponent } from '../../../forms/basic-elements/basic-form/basic-form.component';
import { CommonModule } from '@angular/common';
import { EmployeesService } from '../../../_services/employees.service';
import { FeathericonsModule } from '../../../icons/feathericons/feathericons.module';
import { MatButtonModule } from '@angular/material/button';
import { MatCardModule } from '@angular/material/card';
import { MatDividerModule } from '@angular/material/divider';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatIconModule } from '@angular/material/icon';
import { MatInputModule } from '@angular/material/input';
import { MatSelectModule } from '@angular/material/select';
import { MatSnackBar } from '@angular/material/snack-bar';
import { TextInputComponent } from '../../../_forms/text-input/text-input.component';

@Component({
  selector: 'app-employees-edit',
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
    TextInputComponent,
    BasicFormComponent,
    BasicElementsComponent,
  ],
  templateUrl: './employees-edit.component.html',
  styleUrl: './employees-edit.component.scss',
})
export class EmployeesEditComponent implements OnInit {
  employeesForm: FormGroup;
  formSubmitted: boolean = false;
  pageTitle: string;

  employeesId: number;
  employees: EmployeesDto;
  constructor(
    private employeesService: EmployeesService,
    private route: ActivatedRoute,
    private router: Router,
    private _snackBar: MatSnackBar,
    private fb: FormBuilder
  ) {}

  ngOnInit(): void {
    this.initializeForm();
    this.loadEmployee();
  }

  initializeForm() {
    this.employeesForm = this.fb.group({
      surname: ['', [Validators.required]],
      firstName: ['', [Validators.required]],
      account: ['', []],
      employeeSN: ['', []],
    });
  }

  loadEmployee() {
    this.employeesId = parseInt(this.route.snapshot.url[1]?.path);
    if (this.employeesId > 0) {
      this.employeesService.getEmployees(this.employeesId).subscribe({
        next: (response) => {
          this.employees = response;
          this.employeesForm.patchValue({
            surname: response.surname,
            firstName: response.firstName,
            account: response.account,
            employeeSN: response.employeeSN,
          });
          this.pageTitle =
            'Modifica Utente ' + response.surname + ' ' + response.firstName;
        },
      });
    } else {
      this.pageTitle = 'Nuovo Utente';
    }
  }

  onSubmit() {
    console.log(this.employeesForm.valid);
    this.formSubmitted = true;
    if (this.employeesForm.valid) {
      if (this.employeesId) {
        var userUpdateDto: EmployeesEditDto = {
          employeeId: this.employeesId,
          surname: this.employeesForm.controls['surname'].value,
          firstName: this.employeesForm.controls['firstName'].value,
          employeeSN: this.employeesForm.controls['employeeSN'].value,
          account: this.employeesForm.controls['account'].value,
        };
        this.employeesService.editEmployees(userUpdateDto).subscribe({
          complete: () => {
            this.router.navigate(['home/employees']);
            this._snackBar.open('Utente modificato con successo', undefined, {
              duration: 3 * 1000,
            });
          },
          error: (e) => {
            console.log(e);
            this._snackBar.open(e.error, 'Chiudi');
          },
        });
      } else {
        var customerNewDto: EmployeesNewDto = {
          surname: this.employeesForm.controls['surname'].value,
          firstName: this.employeesForm.controls['firstName'].value,
          employeeSN: this.employeesForm.controls['employeeSN'].value,
          account: this.employeesForm.controls['account'].value,
        };
        this.employeesService.createEmployees(customerNewDto).subscribe({
          complete: () => {
            this.router.navigate(['home/employees']);
            this._snackBar.open('Utente creato con successo', undefined, {
              duration: 3 * 1000,
            });
          },
          error: (e) => {
            console.log(e);
            this._snackBar.open(e.error, 'Chiudi');
          },
        });
      }
    } else {
      this._snackBar.open('Attenzione form non valida!', 'Chiudi');
      this.formSubmitted = false;
    }
  }

  onDelete() {
    var message = '';
    if (this.employees.deleted) {
      message = 'Sei sicuro di voler ripristinare questo utente?';
    } else {
      message = 'Sei sicuro di voler cancellare questo utente?';
    }
    if (confirm(message)) {
      this.employeesService.deleteEmployees(this.employeesId).subscribe({
        next: () => {
          this.router.navigate(['home/employees']);
          if (this.employees.deleted) {
            this._snackBar.open('Utente ripristinato con successo', undefined, {
              duration: 3 * 1000,
            });
          } else {
            this._snackBar.open('Utente eliminato con successo', undefined, {
              duration: 3 * 1000,
            });
          }
        },
        error: (error) => {
          console.log(error);
          this._snackBar.open('Si è verificato un errore', 'Chiudi');
        },
      });
    }
  }

  onCancel() {
    this.router.navigate(['home/employees']);
  }
}
