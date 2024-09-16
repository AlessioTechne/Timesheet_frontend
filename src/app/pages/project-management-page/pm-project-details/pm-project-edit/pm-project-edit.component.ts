import { ActivatedRoute, Router, RouterLink } from '@angular/router';
import { CommonModule, registerLocaleData } from '@angular/common';
import { Component, OnInit } from '@angular/core';
import {
  FormBuilder,
  FormGroup,
  FormsModule,
  ReactiveFormsModule,
  Validators,
} from '@angular/forms';
import {
  MAT_DATE_LOCALE,
  provideNativeDateAdapter,
} from '@angular/material/core';
import { ProjectEditDto, ProjectNewDto } from '../../../../_models/project';

import { BusinessUnitDto } from '../../../../_models/businessUnit';
import { BusinessUnitService } from '../../../../_services/business-unit.service';
import { CustomerDto } from '../../../../_models/customer';
import { CustomersService } from '../../../../_services/customers.service';
import { EmployeesDto } from '../../../../_models/employees';
import { EmployeesService } from '../../../../_services/employees.service';
import { FeathericonsModule } from '../../../../icons/feathericons/feathericons.module';
import { MatAutocompleteModule } from '@angular/material/autocomplete';
import { MatButtonModule } from '@angular/material/button';
import { MatCardModule } from '@angular/material/card';
import { MatDatepickerModule } from '@angular/material/datepicker';
import { MatDivider } from '@angular/material/divider';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatInputModule } from '@angular/material/input';
import { MatMenuModule } from '@angular/material/menu';
import { MatSelectModule } from '@angular/material/select';
import { NavigationService } from '../../../../_services/navigation.service';
import { NgxEditorModule } from 'ngx-editor';
import { ProjectManagementService } from '../../../../_services/project-management.service';
import { forkJoin } from 'rxjs';
import localeIt from '@angular/common/locales/it';

registerLocaleData(localeIt, 'it');
@Component({
  selector: 'app-pm-project-edit',
  standalone: true,
  providers: [
    provideNativeDateAdapter(),
    { provide: MAT_DATE_LOCALE, useValue: 'it-IT' },
  ],
  imports: [
    CommonModule,
    RouterLink,
    MatCardModule,
    MatButtonModule,
    MatMenuModule,
    FormsModule,
    MatFormFieldModule,
    MatInputModule,
    FeathericonsModule,
    NgxEditorModule,
    MatDatepickerModule,
    MatSelectModule,
    ReactiveFormsModule,
    MatAutocompleteModule,
    MatDivider,
  ],
  templateUrl: './pm-project-edit.component.html',
  styleUrl: './pm-project-edit.component.scss',
})
export class PmProjectEditComponent implements OnInit {
  projectForm: FormGroup;
  projectId: number;
  titlePage: string;
  buttonText: string = 'Salva';

  businessUnits: BusinessUnitDto[] = [];
  filteredBusinessUnits: BusinessUnitDto[] = [];

  customer: CustomerDto[] = [];
  filteredCustomer: CustomerDto[] = [];

  employees: EmployeesDto[] = [];
  filteredEmployees: EmployeesDto[] = [];

  constructor(
    private fb: FormBuilder,
    private router: Router,
    private route: ActivatedRoute,
    private projectServices: ProjectManagementService,
    private customerServices: CustomersService,
    private businessUnitsServices: BusinessUnitService,
    private employeesServices: EmployeesService,
    private navigationService: NavigationService
  ) {}

  ngOnInit(): void {
    this.route.paramMap.subscribe((params) => {
      if (params.has('projectId')) {
        this.projectId = +params.get('projectId')!;
      }
    });

    this.initializeForm();
    
    forkJoin([
      this.businessUnitsServices.getAllBusinessUnits(),
      this.customerServices.getAllCustomers(),
      this.employeesServices.getAllEmployees()
    ]).subscribe(([businessUnits, customers, employees]) => {
      this.businessUnits = businessUnits;
      this.filteredBusinessUnits = businessUnits;
      this.customer = customers;
      this.filteredCustomer = customers;
      this.employees = employees;
      this.filteredEmployees = employees;

      this.loadProject();
    });
  }

  loadProject() {
    if (this.projectId > 0) {
      this.projectServices.getEditProject(this.projectId).subscribe((data) => {
        this.projectForm.patchValue({
          projectName: data.projectName,
          projectCode: data.projectCode,
          estimatedEffortInDays: data.estimatedEffortInDays,
          notes: data.notes,
          dueDate: data.dueDate,
          businessUnit: this.filteredBusinessUnits.find(
            (unit) => unit.businessUnitId === data.businessUnitId
          ),
          customer: this.filteredCustomer.find(
            (unit) => unit.customerId === data.customerId
          ),
          employees: this.filteredEmployees.find(
            (unit) => unit.employeeId === data.projectLeaderId
          ),
          quoteNumber: data.quoteNumber,
          quoteDate: data.quoteDate,
          quoteAmount: data.quoteAmount,
          salesOrderNumber: data.salesOrderNumber,
          salesOrderDate: data.salesOrderDate,
          salesOrderAmount: data.salesOrderAmount,
          invoiceNumber: data.invoiceNumber,
          invoiceDate: data.invoiceDate,
        });
        this.titlePage = 'Modifica progetto "' + data.projectName + '"';
        this.buttonText = 'Aggiorna';
      });
    } else {
      this.titlePage = 'Nuovo Progetto';
      this.buttonText = 'Crea Progetto';
    }
  }

  ngAfterViewInit(): void {
    this.projectForm.get('businessUnit')?.valueChanges.subscribe((value) => {
      if (typeof value === 'string') {
        this.filteredBusinessUnits = this._filterBusinessUnit(value);
      }

      if (typeof value === 'object') {
        this.filteredBusinessUnits = this._filterBusinessUnit(
          value.businessUnitName
        );
      }
    });

    this.projectForm.get('customer')?.valueChanges.subscribe((value) => {
      if (typeof value === 'string') {
        this.filteredCustomer = this._filterCustomer(value);
      }
      if (typeof value === 'object') {
        this.filteredCustomer = this._filterCustomer(value.customerName);
      }
    });

    this.projectForm.get('employees')?.valueChanges.subscribe((value) => {
      if (typeof value === 'string') {
        this.filteredEmployees = this._filterEmployees(value);
      }
      if (typeof value === 'object') {
        this.filteredEmployees = this._filterEmployees(
          value.firstName + ' ' + value.surname
        );
      }
    });
  }

  initializeForm() {
    this.projectForm = this.fb.group({
      projectName: ['', Validators.required],
      projectCode: ['', Validators.required],
      estimatedEffortInDays: [''],
      //approved: [''],
      notes: [''],
      dueDate: [''],
      customer: ['', Validators.required],
      businessUnit: ['', Validators.required],
      employees: ['', Validators.required],
      quoteNumber: [''],
      quoteDate: [null],
      quoteAmount: [0],
      salesOrderNumber: [''],
      salesOrderDate: [null],
      salesOrderAmount: [0],
      invoiceNumber: [''],
      invoiceDate: [null],
    });
    if (!this.projectId) {
      this.projectForm.controls['quoteNumber'].disable();
      this.projectForm.controls['quoteDate'].disable();
      this.projectForm.controls['quoteAmount'].disable();
      this.projectForm.controls['salesOrderNumber'].disable();
      this.projectForm.controls['salesOrderDate'].disable();
      this.projectForm.controls['salesOrderAmount'].disable();
      this.projectForm.controls['invoiceNumber'].disable();
      this.projectForm.controls['invoiceDate'].disable();
    }
  }

  private _filterBusinessUnit(value: string): BusinessUnitDto[] {
    const filterValue = value.toLowerCase();
    return this.businessUnits.filter(
      (option) =>
        option.businessUnitName.toLowerCase().includes(filterValue) ||
        option.businessUnitInitials.toLowerCase().includes(filterValue)
    );
  }

  private _filterCustomer(value: string): CustomerDto[] {
    const filterValue = value.toLowerCase();
    return this.customer.filter((option) =>
      option.customerName.toLowerCase().includes(filterValue)
    );
  }

  private _filterEmployees(value: string): EmployeesDto[] {
    const filterValue = value.toLowerCase();
    return this.employees.filter(
      (option) =>
        option.surname.toLowerCase().includes(filterValue) ||
        option.firstName.toLowerCase().includes(filterValue)
    );
  }

  laodBusinessUnits() {
    this.businessUnitsServices.getAllBusinessUnits().subscribe((data) => {
      this.businessUnits = data;
      this.filteredBusinessUnits = data;
    });
  }

  loadCustomers() {
    this.customerServices.getAllCustomers().subscribe((data) => {
      this.customer = data;
      this.filteredCustomer = data;
    });
  }

  loadEmployees() {
    this.employeesServices.getAllEmployees().subscribe((data) => {
      this.employees = data;
      this.filteredEmployees = data;
    });
  }

  onSubmit() {
    if (this.projectForm.valid) {
      if (this.projectId) {
        var projectEditDto: ProjectEditDto = {
          projectId: this.projectId,
          projectName: this.projectForm.controls['projectName'].value,
          projectCode: this.projectForm.controls['projectCode'].value,
          estimatedEffortInDays:
            this.projectForm.controls['estimatedEffortInDays'].value,
          notes: this.projectForm.controls['notes'].value,
          dueDate: this.projectForm.controls['dueDate'].value,
          businessUnitId:
            this.projectForm.controls['businessUnit'].value.businessUnitId,
          customerId: this.projectForm.controls['customer'].value.customerId,
          projectLeaderId:
            this.projectForm.controls['employees'].value.employeeId,
          quoteNumber: this.projectForm.controls['quoteNumber'].value,
          quoteDate: this.projectForm.controls['quoteDate'].value
            ? this.projectForm.controls['quoteDate'].value
            : null,
          quoteAmount: this.projectForm.controls['quoteAmount'].value,
          salesOrderNumber: this.projectForm.controls['salesOrderNumber'].value,
          salesOrderDate: this.projectForm.controls['salesOrderDate'].value
            ? this.projectForm.controls['salesOrderDate'].value
            : null,
          salesOrderAmount: this.projectForm.controls['salesOrderAmount'].value,
          invoiceNumber: this.projectForm.controls['invoiceNumber'].value,
          invoiceDate: this.projectForm.controls['invoiceDate'].value
            ? this.projectForm.controls['invoiceDate'].value
            : null,
          statusId: 'W',
          approved: true,
        };
        this.projectServices.editProject(projectEditDto).subscribe({
          complete: () => {
            this.router.navigate([this.navigationService.getPreviousUrl()]);
          },
        });
      } else {
        var projectNewDto: ProjectNewDto = {
          projectName: this.projectForm.controls['projectName'].value,
          projectCode: this.projectForm.controls['projectCode'].value,
          estimatedEffortInDays:
            this.projectForm.controls['estimatedEffortInDays'].value,
          notes: this.projectForm.controls['notes'].value,
          dueDate: this.projectForm.controls['dueDate'].value,
          businessUnitId:
            this.projectForm.controls['businessUnit'].value.businessUnitId,
          customerId: this.projectForm.controls['customer'].value.customerId,
          projectLeaderId:
            this.projectForm.controls['employees'].value.employeesId,
          customerReference: '',
          approved: true,
        };

        this.projectServices.createProject(projectNewDto).subscribe({
          complete: () => {
            this.router.navigate([this.navigationService.getPreviousUrl()]);
          },
        });
      }
    }
  }

  onClose() {
    this.router.navigate([this.navigationService.getPreviousUrl()]);
  }

  businessUnitsVal(): ((value: BusinessUnitDto) => string) | null {
    return (value: any) => value.businessUnitName;
  }

  customerVal(): ((value: CustomerDto) => string) | null {
    return (value: any) => value.customerName;
  }

  employeesVal(): ((value: EmployeesDto) => string) | null {
    return (value: EmployeesDto) =>
      value ? value.firstName + ' ' + value.surname : '';
  }
}
