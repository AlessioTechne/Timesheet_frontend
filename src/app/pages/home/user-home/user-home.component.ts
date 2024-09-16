import { Component } from '@angular/core';
import { MyProjectComponent } from '../../timesheet/my-project/my-project.component';
import { ToDoListComponent } from './to-do-list/to-do-list.component';

@Component({
  selector: 'app-user-home',
  standalone: true,
  imports: [ToDoListComponent, MyProjectComponent],
  templateUrl: './user-home.component.html',
  styleUrl: './user-home.component.scss'
})
export class UserHomeComponent {

}
