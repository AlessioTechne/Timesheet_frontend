import { ActivatedRoute, Router } from '@angular/router';
import { Component, Input, OnInit } from '@angular/core';
import { MatFormFieldModule, MatLabel } from '@angular/material/form-field';
import { MatTableDataSource, MatTableModule } from '@angular/material/table';

import { DatePipe } from '@angular/common';
import { FeatherModule } from 'angular-feather';
import { MatButtonModule } from '@angular/material/button';
import { MatCardModule } from '@angular/material/card';
import { MatDatepickerModule } from '@angular/material/datepicker';
import { MatDialog } from '@angular/material/dialog';
import { MatIconModule } from '@angular/material/icon';
import { TaskLogsEditDto } from '../../../../../_models/project';
import { TaskLogsOverviewDto } from '../../../../../_models/projectTask';
import { TaskService } from '../../../../../_services/task.service';
import { TimesheetDialogComponent } from '../../../../timesheet/timesheet-dialog/timesheet-dialog.component';

@Component({
  selector: 'app-task-logs',
  standalone: true,
  imports: [
    MatIconModule,
    MatCardModule,
    MatTableModule,
    MatLabel,
    FeatherModule,
    MatIconModule,
    MatFormFieldModule,
    MatDatepickerModule,
    MatButtonModule,
    DatePipe,
  ],
  providers: [DatePipe],
  templateUrl: './task-logs.component.html',
  styleUrl: './task-logs.component.scss',
})
export class TaskLogsComponent implements OnInit {
  @Input() taskId: number;
  @Input() taskName: string;
  @Input() hasLogsAsSubtasks: boolean;
  dataSource = new MatTableDataSource<TaskLogsOverviewDto>();

  displayedColumns = [
    'actualWorkInHours',
    'taskLogDate',
    'taskLogName',
    'taskLogNote',
    'employeeName',
    'actions',
  ];

  constructor(
    private taskServices: TaskService,
    public dialog: MatDialog,
    private router: Router,
    private route: ActivatedRoute
  ) {}

  ngOnInit(): void {
    this.loadTimesheet();
  }

  loadTimesheet() {
    this.taskServices.getAllTaskLogs(this.taskId).subscribe((data) => {
      console.log(data);
      if (data) {
        this.dataSource.data = data;
      }
    });
  }

  deleteTimesheet(taskLog: TaskLogsOverviewDto) {
    if (confirm('Sei sicuro di voler eliminare questo Task Log?'))
      this.taskServices.deleteTaskLog(taskLog.taskLogId).subscribe(() => {
        this.dataSource.data = this.dataSource.data.filter(
          (x) => x.taskLogId !== taskLog.taskLogId
        );
      });
  }

  editTimesheet(taskLog: TaskLogsOverviewDto) {
    const dialogRef = this.dialog.open(TimesheetDialogComponent, {
      data: {
        name: this.taskName,
        actualWorkInHours: taskLog.actualWorkInHours,
        taskLogName: taskLog.taskLogName,
        taskLogNote: taskLog.taskLogNote,
        hasLogsAsSubtasks: this.hasLogsAsSubtasks,
      },
    });

    return dialogRef.afterClosed().subscribe((result) => {
      if (!result) return;
      var data: TaskLogsEditDto = {
        taskLogId: taskLog.taskLogId,
        taskId: taskLog.taskId,
        taskLogDate: taskLog.taskLogDate.toString(),
        taskLogNote: result.data[2],
        actualWorkInHours: result.data[0],
        taskLogName: result.data[1],
      };

      this.taskServices.updateTaskLog(data).subscribe(() => {
        this.loadTimesheet();
      });
    });
  }

  addTimeLogs() {
    this.router.navigate(['../../../taskLog/add/' + this.taskId], {
      relativeTo: this.route,
    });
  }
}
