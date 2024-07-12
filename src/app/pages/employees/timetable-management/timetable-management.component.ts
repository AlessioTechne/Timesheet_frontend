import { ActivatedRoute, Router } from '@angular/router';
import { Component, OnInit } from '@angular/core';
import {
  EmployeeTimetablesDto,
  EmployeeTimetablesUpdateDto,
} from '../../../_models/employees';
import {
  FormArray,
  FormBuilder,
  FormGroup,
  FormsModule,
  ReactiveFormsModule,
  Validators,
} from '@angular/forms';

import { CommonModule } from '@angular/common';
import { EmployeesService } from '../../../_services/employees.service';
import { FeathericonsModule } from '../../../icons/feathericons/feathericons.module';
import { MatButtonModule } from '@angular/material/button';
import { MatCardModule } from '@angular/material/card';
import { MatIcon } from '@angular/material/icon';
import { MatInputModule } from '@angular/material/input';
import { MatSnackBar } from '@angular/material/snack-bar';
import { TextInputComponent } from '../../../_forms/text-input/text-input.component';

@Component({
  selector: 'app-timetable-management',
  standalone: true,
  imports: [
    CommonModule,
    FormsModule,
    ReactiveFormsModule,
    MatCardModule,
    MatInputModule,
    MatButtonModule,
    MatIcon,
    TextInputComponent,
    FeathericonsModule,
  ],
  templateUrl: './timetable-management.component.html',
  styleUrl: './timetable-management.component.scss',
})
export class TimetableManagementComponent implements OnInit {
  employeeId: number;
  timeTable: EmployeeTimetablesDto[] = [];
  timeTableForm: FormGroup;

  constructor(
    private employeesServices: EmployeesService,
    private route: ActivatedRoute,
    private _snackBar: MatSnackBar,
    private router: Router,
    private fb: FormBuilder
  ) {}

  ngOnInit(): void {
    this.initializeForm();
    this.loadTimetables();
  }

  initializeForm() {
    this.timeTableForm = this.fb.group({
      minHours1: [0, [Validators.required, Validators.min(0)]],
      maxHours1: [0, [Validators.required, Validators.min(0)]],
      minHours2: [0, [Validators.required, Validators.min(0)]],
      maxHours2: [0, [Validators.required, Validators.min(0)]],
      minHours3: [0, [Validators.required, Validators.min(0)]],
      maxHours3: [0, [Validators.required, Validators.min(0)]],
      minHours4: [0, [Validators.required, Validators.min(0)]],
      maxHours4: [0, [Validators.required, Validators.min(0)]],
      minHours5: [0, [Validators.required, Validators.min(0)]],
      maxHours5: [0, [Validators.required, Validators.min(0)]],
      minHours6: [0, [Validators.required, Validators.min(0)]],
      maxHours6: [0, [Validators.required, Validators.min(0)]],
      minHours7: [0, [Validators.required, Validators.min(0)]],
      maxHours7: [0, [Validators.required, Validators.min(0)]],
    });
  }

  loadTimetables() {
    this.employeeId = parseInt(this.route.snapshot.url[1]?.path);
    if (this.employeeId) {
      this.employeesServices.getTimetables(this.employeeId).subscribe({
        next: (response) => {
          this.timeTable = response;
          response.forEach((value) => {
            switch (value.wDay) {
              case 1:
                this.timeTableForm.patchValue({
                  maxHours1: value.maxHours,
                  minHours1: value.minHours,
                });
                break;

              case 2:
                this.timeTableForm.patchValue({
                  maxHours2: value.maxHours,
                  minHours2: value.minHours,
                });
                break;

              case 3:
                this.timeTableForm.patchValue({
                  maxHours3: value.maxHours,
                  minHours3: value.minHours,
                });
                break;

              case 4:
                this.timeTableForm.patchValue({
                  maxHours4: value.maxHours,
                  minHours4: value.minHours,
                });
                break;

              case 5:
                this.timeTableForm.patchValue({
                  maxHours5: value.maxHours,
                  minHours5: value.minHours,
                });
                break;

              case 6:
                this.timeTableForm.patchValue({
                  maxHours6: value.maxHours,
                  minHours6: value.minHours,
                });
                break;

              case 7:
                this.timeTableForm.patchValue({
                  maxHours7: value.maxHours,
                  minHours7: value.minHours,
                });
                break;

              default:
                break;
            }
          });
        },
        error: (e) => {
          console.log(e);
          this._snackBar.open('Errore nel caricamento dei dati', 'Chiudi');
        },
      });
    }
  }

  onCancel() {
    this.router.navigate(['home/employees']);
  }

  onSubmit() {
    console.log(this.timeTableForm.controls)
    if (this.timeTableForm.valid) {
      var list: EmployeeTimetablesDto[] = [];
      for (let i = 1; i < 8; i++) {
        var timetable: EmployeeTimetablesDto = {
          wDay: i,
          minHours: this.timeTableForm.controls['minHours' + i].value,
          maxHours: this.timeTableForm.controls['maxHours' + i].value,
        };
        list.push(timetable);
      }

      var timeTableUpdate: EmployeeTimetablesUpdateDto = {
        employeeId: this.employeeId,
        employeeTimeTable: list,
      };

      this.employeesServices.updateTimetable(timeTableUpdate).subscribe({
        next: () => {
          this._snackBar.open('Orari modificati con successo', 'Chiudi');
          this.router.navigate(['home/employees']);
        },
        error: (e) => {
          console.log(e);
          this._snackBar.open(e.message, 'Chiudi');
        },
      });
    }
  }
}
