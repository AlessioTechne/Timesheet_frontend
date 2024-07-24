import { ActivatedRoute, Router, RouterLink } from '@angular/router';
import {
  BusinessUnitDto,
  BusinessUnitEditDto,
  BusinessUnitNewDto,
} from '../../../_models/businessUnit';
import { Component, OnInit } from '@angular/core';
import {
  FormBuilder,
  FormGroup,
  FormsModule,
  ReactiveFormsModule,
  Validators,
} from '@angular/forms';

import { BasicElementsComponent } from '../../../forms/basic-elements/basic-elements.component';
import { BasicFormComponent } from '../../../forms/basic-elements/basic-form/basic-form.component';
import { BusinessUnitService } from '../../../_services/business-unit.service';
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
import { TextInputComponent } from '../../../_forms/text-input/text-input.component';

@Component({
  selector: 'app-business-unit-edit',
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
  templateUrl: './business-unit-edit.component.html',
  styleUrl: './business-unit-edit.component.scss',
})
export class BusinessUnitEditComponent implements OnInit {
  businessUnitForm: FormGroup;
  formSubmitted: boolean = false;
  pageTitle: string;

  businessUnitId: number;
  businessUnit: BusinessUnitDto;

  constructor(
    private businessUnitService: BusinessUnitService,
    private route: ActivatedRoute,
    private router: Router,
    private _snackBar: MatSnackBar,
    private fb: FormBuilder
  ) {}

  ngOnInit(): void {
    this.route.paramMap.subscribe((params) => {
      if (params.has('businessUnitId')) {
        this.businessUnitId = +params.get('businessUnitId')!;
      }
    });
    this.initializeForm();
    this.loadBusinessUnit();
  }

  initializeForm() {
    this.businessUnitForm = this.fb.group({
      businessUnitName: ['', [Validators.required]],
      businessUnitInitials: ['', [Validators.required]],
    });
  }

  loadBusinessUnit() {
    if (this.businessUnitId > 0) {
      this.businessUnitService.getBusinessUnit(this.businessUnitId).subscribe({
        next: (response) => {
          console.log(response);
          this.businessUnit = response;
          this.businessUnitForm.patchValue({
            businessUnitName: response.businessUnitName,
            businessUnitInitials: response.businessUnitInitials,
          });
          this.pageTitle = 'Modifica ' + response.businessUnitName;
        },
      });
    } else {
      this.pageTitle = 'Nuova Business Unit';
    }
  }

  onSubmit() {
    this.formSubmitted = true;
    if (this.businessUnitForm.valid) {
      if (this.businessUnitId) {
        var userUpdateDto: BusinessUnitEditDto = {
          businessUnitId: this.businessUnitId,
          businessUnitName:
            this.businessUnitForm.controls['businessUnitName'].value,
          businessUnitInitials:
            this.businessUnitForm.controls['businessUnitInitials'].value,
        };
        this.businessUnitService.editBusinessUnit(userUpdateDto).subscribe({
          complete: () => {
            this.router.navigate(['home/businessUnit']);
            this._snackBar.open(
              'Business Unit modificata con successo',
              undefined,
              {
                duration: 3 * 1000,
              }
            );
          },
          error: (e) => {
            console.log(e);
            this._snackBar.open(e.error, 'Chiudi');
          },
        });
      } else {
        var businessUnitNewDto: BusinessUnitNewDto = {
          businessUnitName:
            this.businessUnitForm.controls['businessUnitName'].value,
          businessUnitInitials:
            this.businessUnitForm.controls['businessUnitInitials'].value,
        };
        this.businessUnitService
          .createBusinessUnit(businessUnitNewDto)
          .subscribe({
            complete: () => {
              this.router.navigate(['home/businessUnit']);
              this._snackBar.open(
                'Business Unit creata con successo',
                undefined,
                {
                  duration: 3 * 1000,
                }
              );
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
      confirm(
        'Sei sicuro di voler eliminare definitivamente questa business unit?'
      )
    ) {
      this.businessUnitService
        .deleteBusinessUnit(this.businessUnitId)
        .subscribe({
          next: () => {
            this.router.navigate(['home/businessUnit']);
            this._snackBar.open(
              'Business Unit eliminata con successo',
              undefined,
              {
                duration: 3 * 1000,
              }
            );
          },
          error: (error) => {
            console.log(error);
            this._snackBar.open('Si è verificato un errore', 'Chiudi');
          },
        });
    }
  }

  onCancel() {
    this.router.navigate(['home/businessUnit']);
  }
}
