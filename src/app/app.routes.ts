import { AdminPanelComponent } from './settings/admin/admin-panel/admin-panel.component';
import { AllComponent } from './pages/project-management-page/pm-project-list/all/all.component';
import { AuthGuard } from './_guards/auth.guard';
import { AuthenticationComponent } from './authentication/authentication.component';
import { BusinessUnitComponent } from './pages/businessUnit/business-unit/business-unit.component';
import { BusinessUnitEditComponent } from './pages/businessUnit/business-unit-edit/business-unit-edit.component';
import { BusinessUnitManagementComponent } from './pages/businessUnit/business-unit-management/business-unit-management.component';
import { CompletedComponent } from './pages/project-management-page/pm-project-list/completed/completed.component';
import { CustomerComponent } from './pages/customers/customer/customer.component';
import { CustomerEditComponent } from './pages/customers/customer-edit/customer-edit.component';
import { CustomerManagementComponent } from './pages/customers/customer-management/customer-management.component';
import { EmployeesComponent } from './pages/employees/employees/employees.component';
import { EmployeesEditComponent } from './pages/employees/employees-edit/employees-edit.component';
import { EmployeesManagementComponent } from './pages/employees/employees-management/employees-management.component';
import { HomeComponent } from './home/home/home.component';
import { InProgressComponent } from './pages/project-management-page/pm-project-list/in-progress/in-progress.component';
import { LogoutComponent } from './authentication/logout/logout.component';
import { NotFoundComponent } from './common/not-found/not-found.component';
import { PendingComponent } from './pages/project-management-page/pm-project-list/pending/pending.component';
import { PmProjectListComponent } from './pages/project-management-page/pm-project-list/pm-project-list.component';
import { ProjectManagementComponent } from './pages/project-management-page/project-management.component';
import { Routes } from '@angular/router';
import { SettingsComponent } from './settings/settings.component';
import { SignInComponent } from './authentication/sign-in/sign-in.component';
import { TimetableManagementComponent } from './pages/employees/timetable-management/timetable-management.component';
import { UserEditComponent } from './settings/admin/user-edit/user-edit.component';

export const routes: Routes = [
  {
    path: '',
    component: AuthenticationComponent,
    children: [
      { path: '', component: SignInComponent },
      { path: 'logout', component: LogoutComponent },
    ],
  },
  {
    path: 'home',
    runGuardsAndResolvers: 'always',
    canActivate: [AuthGuard],
    children: [
      { path: '', component: HomeComponent },
      {
        path: 'settings',
        component: SettingsComponent,
        children: [
          { path: '', component: AdminPanelComponent },
          { path: 'admin-panel', component: AdminPanelComponent },
          { path: 'user-edit', component: UserEditComponent },
          { path: 'user-edit/:id', component: UserEditComponent },
        ],
      },
      {
        path: 'customer',
        component: CustomerComponent,
        children: [
          { path: '', component: CustomerManagementComponent },
          { path: 'edit', component: CustomerEditComponent },
          { path: 'edit/:id', component: CustomerEditComponent },
        ],
      },
      {
        path: 'employees',
        component: EmployeesComponent,
        children: [
          { path: '', component: EmployeesManagementComponent },
          { path: 'edit', component: EmployeesEditComponent },
          { path: 'edit/:id', component: EmployeesEditComponent },
          { path: 'timetable/:id', component: TimetableManagementComponent },
        ],
      },
      {
        path: 'businessUnit',
        component: BusinessUnitComponent,
        children: [
          { path: '', component: BusinessUnitManagementComponent },
          { path: 'edit', component: BusinessUnitEditComponent },
          { path: 'edit/:id', component: BusinessUnitEditComponent },
        ],
      },
      {
        path: 'project-management',
        component: ProjectManagementComponent,
        children: [
          { path: '', component: PmProjectListComponent },
          { path: 'all', component: AllComponent },
          { path: 'completed', component: CompletedComponent },
          { path: 'inProgress', component: InProgressComponent },
          { path: 'pending', component: PendingComponent },
        ],
      },

      // Here add new pages component
    ],
  },
  { path: '**', component: NotFoundComponent }, // This line will remain down from the whole pages component list
];
