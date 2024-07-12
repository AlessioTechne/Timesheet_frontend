import { ActivatedRoute, Router, RouterLink } from '@angular/router';
import { Component, OnInit } from '@angular/core';
import {
  CustomerDto,
  CustomerEditDto,
  CustomerNewDto,
} from '../../../_models/customer';
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
import { CustomersService } from '../../../_services/customers.service';
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
  selector: 'app-customer-edit',
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
    BasicElementsComponent
  ],
  templateUrl: './customer-edit.component.html',
  styleUrl: './customer-edit.component.scss',
})
export class CustomerEditComponent implements OnInit {
  customerForm: FormGroup;
  formSubmitted: boolean = false;
  pageTitle: string;

  customerId: number;
  customer: CustomerDto;

  constructor(
    private customerService: CustomersService,
    private route: ActivatedRoute,
    private router: Router,
    private _snackBar: MatSnackBar,
    private fb: FormBuilder
  ) {}

  ngOnInit(): void {
    this.initializeForm();
    this.loadCustomer();
  }

  initializeForm() {
    this.customerForm = this.fb.group({
      customerName: ['', [Validators.required]],
      vatId: ['', [Validators.required, Validators.maxLength(11)]],
      initials: [
        '',
        [Validators.required, Validators.maxLength(4), Validators.minLength(4)],
      ],
    });
  }

  loadCustomer() {
    this.customerId = parseInt(this.route.snapshot.url[1]?.path);
    if (this.customerId > 0) {
      this.customerService.getCustomer(this.customerId).subscribe({
        next: (response) => {
          this.customer = response
          this.customerForm.patchValue({
            customerName: response.customerName,
            vatId: response.vatId,
            initials: response.initials,
          });
          this.pageTitle = 'Modifica ' + response.customerName;
        },
      });
    } else {
      this.pageTitle = 'Nuovo Cliente';
    }
  }

  onSubmit() {
    this.formSubmitted = true;
    if (this.customerForm.valid) {
      if (this.customerId) {
        var userUpdateDto: CustomerEditDto = {
          customerId: this.customerId,
          customerName: this.customerForm.controls['customerName'].value,
          vatId: this.customerForm.controls['vatId'].value,
          initials: this.customerForm.controls['initials'].value,
        };
        this.customerService.editCustomer(userUpdateDto).subscribe({
          complete: () => {
            this.router.navigate(['home/customer']);
            this._snackBar.open('Cliente modificato con successo', 'Chiudi');
          },
          error: (e) => {
            console.log(e);
            this._snackBar.open(e.error, 'Chiudi');
          },
        });
      } else {
        var customerNewDto: CustomerNewDto = {
          customerName: this.customerForm.controls['customerName'].value,
          vatId: this.customerForm.controls['vatId'].value,
          initials: this.customerForm.controls['initials'].value,
        };
        this.customerService.createCustomer(customerNewDto).subscribe({
          complete: () => {
            this.router.navigate(['home/customer']);
            this._snackBar.open('Cliente creato con successo');
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
    if (
      confirm('Sei sicuro di voler eliminare definitivamente questo utente?')
    ) {
      this.customerService.deleteCustomer(this.customerId).subscribe({
        next: () => {
          this.router.navigate(['home/customer']);
          this._snackBar.open('Cliente eliminato con successo', 'Chiudi');
        },
        error: (error) => {
          console.log(error);
          this._snackBar.open('Si è verificato un errore', 'Chiudi');
        },
      });
    }
  }

  onCancel() {
    this.router.navigate(['home/customer']);
  }
}
