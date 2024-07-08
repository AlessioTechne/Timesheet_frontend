import { BasicFormComponent } from './basic-form/basic-form.component';
import { Component } from '@angular/core';
import { FeathericonsModule } from '../../icons/feathericons/feathericons.module';
import { MatCardModule } from '@angular/material/card';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatInputModule } from '@angular/material/input';
import { MatSelectModule } from '@angular/material/select';
import { RouterLink } from '@angular/router';

@Component({
  selector: 'app-basic-elements',
  standalone: true,
  imports: [
    RouterLink,
    MatCardModule,
    MatInputModule,
    MatFormFieldModule,
    MatSelectModule,
    BasicFormComponent,
    FeathericonsModule,
  ],
  templateUrl: './basic-elements.component.html',
  styleUrl: './basic-elements.component.scss',
})
export class BasicElementsComponent {}
