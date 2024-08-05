import { AdminPanelComponent } from './settings/admin/admin-panel/admin-panel.component';
import { AuthGuard } from './_guards/auth.guard';
import { AuthenticationComponent } from './authentication/authentication.component';
import { BusinessUnitComponent } from './pages/businessUnit/business-unit/business-unit.component';
import { BusinessUnitEditComponent } from './pages/businessUnit/business-unit-edit/business-unit-edit.component';
import { BusinessUnitManagementComponent } from './pages/businessUnit/business-unit-management/business-unit-management.component';
import { CustomerComponent } from './pages/customers/customer/customer.component';
import { CustomerEditComponent } from './pages/customers/customer-edit/customer-edit.component';
import { CustomerManagementComponent } from './pages/customers/customer-management/customer-management.component';
import { EmployeesComponent } from './pages/employees/employees/employees.component';
import { EmployeesEditComponent } from './pages/employees/employees-edit/employees-edit.component';
import { EmployeesManagementComponent } from './pages/employees/employees-management/employees-management.component';
import { EmployeesOverviewComponent } from './pages/employees/employees-overview/employees-overview.component';
import { LogoutComponent } from './authentication/logout/logout.component';
import { NotFoundComponent } from './common/not-found/not-found.component';
import { PmProjectDetailsComponent } from './pages/project-management-page/pm-project-details/pm-project-details.component';
import { PmProjectEditComponent } from './pages/project-management-page/pm-project-details/pm-project-edit/pm-project-edit.component';
import { PmProjectListComponent } from './pages/project-management-page/pm-project-list/pm-project-list.component';
import { PmProjectViewComponent } from './pages/project-management-page/pm-project-list/pm-project-view/pm-project-view.component';
import { ProjectManagementComponent } from './pages/project-management-page/project-management.component';
import { Routes } from '@angular/router';
import { SettingsComponent } from './settings/settings.component';
import { SignInComponent } from './authentication/sign-in/sign-in.component';
import { SingleTaskOverviewComponent } from './pages/project-management-page/tasks/single-task-overview/single-task-overview.component';
import { TasksEditComponent } from './pages/project-management-page/tasks/tasks-edit/tasks-edit.component';
import { TimetableManagementComponent } from './pages/employees/timetable-management/timetable-management.component';
import { UserEditComponent } from './settings/admin/user-edit/user-edit.component';
import { UserHomeComponent } from './pages/home/user-home/user-home.component';

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
      { path: '', component: UserHomeComponent },
      {
        path: 'settings',
        component: SettingsComponent,
        children: [
          { path: '', component: AdminPanelComponent },
          { path: 'admin-panel', component: AdminPanelComponent },
          { path: 'user-edit', component: UserEditComponent },
          { path: 'user-edit/:userId', component: UserEditComponent },
        ],
      },
      {
        path: 'customer',
        component: CustomerComponent,
        children: [
          { path: '', component: CustomerManagementComponent },
          { path: 'edit', component: CustomerEditComponent },
          { path: 'edit/:customerId', component: CustomerEditComponent },
        ],
      },
      {
        path: 'employees',
        component: EmployeesComponent,
        children: [
          { path: '', component: EmployeesManagementComponent },
          { path: 'overview/:emplyeesId', component: EmployeesOverviewComponent },
          { path: 'edit', component: EmployeesEditComponent },
          { path: 'edit/:employeesId', component: EmployeesEditComponent },
          { path: 'timetable/:employeeId', component: TimetableManagementComponent },
        ],
      },
      {
        path: 'businessUnit',
        component: BusinessUnitComponent,
        children: [
          { path: '', component: BusinessUnitManagementComponent },
          { path: 'edit', component: BusinessUnitEditComponent },
          { path: 'edit/:businessUnitId', component: BusinessUnitEditComponent },
        ],
      },
      {
        path: 'project-management',
        component: ProjectManagementComponent,
        children: [
          { path: '', component: PmProjectListComponent },
          { path: 'all/:status', component: PmProjectViewComponent },
          { path: 'detail/:idProject', component: PmProjectDetailsComponent },
          { path: 'edit', component: PmProjectEditComponent },
          { path: 'edit/:id', component: PmProjectEditComponent },
          { path: 'taskEdit/:idProject', component: TasksEditComponent },
          {
            path: 'taskEdit/:idProject/:idTask',
            component: TasksEditComponent,
          },
          {
            path: 'taskDetail/:projectId/:taskId',
            component: SingleTaskOverviewComponent,
          },
        ],
      },

      // Here add new pages component
    ],
  },
  { path: '**', component: NotFoundComponent }, // This line will remain down from the whole pages component list
];
