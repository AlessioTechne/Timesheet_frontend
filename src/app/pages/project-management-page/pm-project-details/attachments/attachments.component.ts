import {
  AttachmentParams,
  ProjectAttachmentsDto,
} from '../../../../_models/projectTask';
import { Component, Input, OnInit } from '@angular/core';
import { MatPaginator, MatPaginatorModule } from '@angular/material/paginator';
import { MatTableDataSource, MatTableModule } from '@angular/material/table';
import { Observable, Subscription } from 'rxjs';

import { AttachmentsEditComponent } from '../attachments-edit/attachments-edit.component';
import { CommonModule } from '@angular/common';
import { HttpEventType } from '@angular/common/http';
import { MatButtonModule } from '@angular/material/button';
import { MatCardModule } from '@angular/material/card';
import { MatDialog } from '@angular/material/dialog';
import { MatDividerModule } from '@angular/material/divider';
import { MatIconModule } from '@angular/material/icon';
import { MatMenuModule } from '@angular/material/menu';
import { MatProgressBarModule } from '@angular/material/progress-bar';
import { Pagination } from '../../../../_models/pagination';
import { ProjectManagementService } from '../../../../_services/project-management.service';
import { RouterLink } from '@angular/router';

@Component({
  selector: 'app-attachments',
  standalone: true,
  imports: [
    CommonModule,
    RouterLink,
    MatCardModule,
    MatMenuModule,
    MatButtonModule,
    MatIconModule,
    MatPaginatorModule,
    MatTableModule,
    MatDividerModule,
    MatProgressBarModule,
  ],
  templateUrl: './attachments.component.html',
  styleUrl: './attachments.component.scss',
})
export class AttachmentsComponent implements OnInit {
  @Input() projectId: number;
  attachments: ProjectAttachmentsDto[] = [];
  dataSource: MatTableDataSource<ProjectAttachmentsDto, MatPaginator>;
  pagination: Pagination | undefined;
  uploadProgress: number;
  uploadSub: Subscription | undefined;

  attachmentsParams: AttachmentParams | undefined;

  displayedColumns = ['attachmentName', 'actions'];

  constructor(
    public dialog: MatDialog,
    private projectServices: ProjectManagementService
  ) {}

  ngOnInit() {
    this.attachmentsParams = this.projectServices.getAttachmentsParams();
    if (this.attachmentsParams) {
      this.attachmentsParams.projectId = this.projectId;
    }
    this.loadAttachments();
  }

  openDialog() {
    const dialogRef = this.dialog.open(AttachmentsEditComponent);

    dialogRef.afterClosed().subscribe((result) => {
      if (!result) return;
      const formData = new FormData();
      formData.append('file', result.data[1]);
      formData.append('attachmentName', result.data[0]);
      formData.append('projectId', this.projectId.toString());

      this.projectServices.newAttachment(formData).subscribe({
        next: () => this.loadAttachments(),
      });
    });
  }

  loadAttachments() {
    console.log(this.attachmentsParams);
    if (this.attachmentsParams) {
      this.projectServices.setAttachmentsParams(this.attachmentsParams);

      this.projectServices
        .getPaginatedAttachment(this.attachmentsParams)
        .subscribe({
          next: (response) => {
            if (response.result && response.pagination) {
              this.attachments = response.result;
              this.dataSource = new MatTableDataSource(this.attachments);
              this.pagination = response.pagination;
            }
          },
        });
    }
  }

  pageChanged(event: any) {
    if (
      this.attachmentsParams &&
      this.attachmentsParams?.pageNumber !== event.page
    ) {
      this.attachmentsParams.pageNumber = event.pageIndex;
      this.attachmentsParams.pageSize = event.pageSize;
      this.projectServices.setAttachmentsParams(this.attachmentsParams);
      this.loadAttachments();
    }
  }

  deleteAttach(id: number) {
    if (confirm('Sei sicuro di voler eliminare questo allegato?'))
      this.projectServices.deleteAttachment(id).subscribe({
        next: () => this.loadAttachments(),
      });
  }

  editAttach(attachment: ProjectAttachmentsDto) {
    const dialogRef = this.dialog.open(AttachmentsEditComponent, {
      data: attachment.attachmentName,
    });

    dialogRef.afterClosed().subscribe((result) => {
      if (!result) return;
      const formData = new FormData();
      formData.append('file', result.data[1]);
      formData.append('attachmentName', result.data[0]);
      formData.append('attachmentId', attachment.attachmentId.toString());

      this.projectServices.editAttachment(formData).subscribe({
        next: () => this.loadAttachments(),
      });
    });
  }

  downloadAttach(id: number) {
    this.projectServices.getAttachmentfile(id).subscribe({
      next: (response) => {
        console.log(response);
        if (response.body !== null) {
        const blob = new Blob([response.body], { type: 'application/pdf' });
        const url = window.URL.createObjectURL(blob);
        const a = document.createElement('a');
        a.href = url;
        var attach =this.attachments.find((x) => x.attachmentId === id);
        if(attach)
          a.download = attach.attachmentName;
        document.body.appendChild(a);
        a.click();
        document.body.removeChild(a);
        window.URL.revokeObjectURL(url);}
      },
    });
  }
}
