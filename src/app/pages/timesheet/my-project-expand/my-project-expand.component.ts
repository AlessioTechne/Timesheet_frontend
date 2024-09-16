import { Component, EventEmitter, Input, OnInit, Output } from '@angular/core';
import { MatTableDataSource, MatTableModule } from '@angular/material/table';
import { TaskLogsDto, TaskTimesheetDto } from '../../../_models/project';

import { CommonModule } from '@angular/common';
import { MatButtonModule } from '@angular/material/button';
import { MatCardModule } from '@angular/material/card';
import { MatDialog } from '@angular/material/dialog';
import { MatIconModule } from '@angular/material/icon';
import { MatPaginator } from '@angular/material/paginator';
import { TaskService } from '../../../_services/task.service';
import { TimesheetDialogComponent } from '../timesheet-dialog/timesheet-dialog.component';
import { TimesheetService } from '../../../_services/timesheet.service';

@Component({
  selector: 'app-my-project-expand',
  standalone: true,
  imports: [
    CommonModule,
    MatCardModule,
    MatTableModule,
    MatTableModule,
    MatButtonModule,
    MatIconModule,
  ],
  templateUrl: './my-project-expand.component.html',
  styleUrl: './my-project-expand.component.scss',
})
export class MyProjectExpandComponent implements OnInit {
  @Input() projectId: number;
  @Output() taskTimesheetDtoChange = new EventEmitter<TaskLogsDto>();
  dataSource: MatTableDataSource<TaskTimesheetDto, MatPaginator>;

  displayedColumns: string[] = [
    'taskName',
    'estimatedEffortInDays',
    'totalWorkHours',
    'delta',
    'action',
  ];

  constructor(
    public dialog: MatDialog,
    private taskService: TaskService,
    private timesheet: TimesheetService
  ) {}

  ngOnInit(): void {
    this.taskService.getTimeSheetTask(this.projectId).subscribe((data) => {
      if (data) {
        this.dataSource = new MatTableDataSource(data);
      }
    });
  }

  openDialog(task: TaskTimesheetDto) {
    const value = this.timesheet.getData(task.taskId);

    const dialogRef = this.dialog.open(TimesheetDialogComponent, {
      data: {
        name: task.taskName,
        actualWorkInHours: value?.actualWorkInHours,
        taskLogNote: value?.taskLogNote,
        taskLogName: value?.taskLogName,
        hasLogsAsSubtasks: !task.hasLogsAsSubtasks,
      },
    });

    dialogRef.afterClosed().subscribe((result) => {
      console.log(result);
      if (!result) return;
      const data: TaskLogsDto = {
        taskId: task.taskId,
        taskName: task.taskName,
        taskLogDate: new Date(),
        taskLogNote: result.data[2],
        actualWorkInHours: result.data[0],
        taskLogName: result.data[1],
        taskLogId: 0,
      };

      if (value) {
        this.timesheet.updateData(task.taskId, data);
      } else {
        this.timesheet.addData(data);
      }
    });
  }
}
