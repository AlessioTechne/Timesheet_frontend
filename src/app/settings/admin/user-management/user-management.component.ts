import { Component, OnInit } from '@angular/core';
import { MatTableDataSource, MatTableModule } from '@angular/material/table';

import { AdminService } from '../../../_services/admin.service';
import { CommonModule } from '@angular/common';
import { FeathericonsModule } from '../../../icons/feathericons/feathericons.module';
import { MatButtonModule } from '@angular/material/button';
import { MatCardModule } from '@angular/material/card';
import { MatDividerModule } from '@angular/material/divider';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatIcon } from '@angular/material/icon';
import { MatPaginator } from '@angular/material/paginator';
import { RouterLink } from '@angular/router';
import { UserRolesDto } from '../../../_models/user';

@Component({
  selector: 'app-user-management',
  standalone: true,
  imports: [
    CommonModule,
    MatCardModule,
    MatFormFieldModule,
    MatTableModule,
    MatButtonModule,
    MatIcon,
    FeathericonsModule,
    RouterLink,
    MatDividerModule,
  ],
  templateUrl: './user-management.component.html',
  styleUrl: './user-management.component.scss',
})
export class UserManagementComponent implements OnInit {
  data: UserRolesDto[] = [];
  dataSource: MatTableDataSource<UserRolesDto, MatPaginator>;
  displayedColumns: String[] = ['fullName', 'roles', 'edit'];

  constructor(private adminService: AdminService) {}

  ngOnInit(): void {
    this.loadUser();
  }

  loadUser() {
    this.adminService.getUsersWithRoles().subscribe({
      next: (response) => {
        this.data = response;
        this.dataSource = new MatTableDataSource(this.data);
      },
    });
  }
}
