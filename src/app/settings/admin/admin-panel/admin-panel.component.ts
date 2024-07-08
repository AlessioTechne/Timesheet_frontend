import { Component } from '@angular/core';
import { UserManagementComponent } from '../user-management/user-management.component';

@Component({
  selector: 'app-admin-panel',
  standalone: true,
  imports: [UserManagementComponent],
  templateUrl: './admin-panel.component.html',
  styleUrl: './admin-panel.component.scss'
})
export class AdminPanelComponent {

}
