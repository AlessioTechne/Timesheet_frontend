import { Component } from '@angular/core';
import { FeathericonsModule } from '../../../../icons/feathericons/feathericons.module';
import { FileUploadModule } from '@iplab/ngx-file-upload';
import { FormsModule } from '@angular/forms';
import { MatButtonModule } from '@angular/material/button';
import { MatCardModule } from '@angular/material/card';
import { MatDatepickerModule } from '@angular/material/datepicker';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatInputModule } from '@angular/material/input';
import { MatMenuModule } from '@angular/material/menu';
import { MatSelectModule } from '@angular/material/select';
import { NgxEditorModule } from 'ngx-editor';
import { RouterLink } from '@angular/router';
import { provideNativeDateAdapter } from '@angular/material/core';

@Component({
  selector: 'app-pm-project-edit',
  standalone: true,
  providers: [provideNativeDateAdapter()],
  imports: [
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
  ],
  templateUrl: './pm-project-edit.component.html',
  styleUrl: './pm-project-edit.component.scss',
})
export class PmProjectEditComponent {}
