import { Component, Input, LOCALE_ID } from '@angular/core';
import { DatePipe, registerLocaleData } from '@angular/common';

import { FeathericonsModule } from '../../../../icons/feathericons/feathericons.module';
import { MatButtonModule } from '@angular/material/button';
import { MatCardModule } from '@angular/material/card';
import { MatIconModule } from '@angular/material/icon';
import { ProjectsDto } from '../../../../_models/project';
import { RouterLink } from '@angular/router';
import localeIt from '@angular/common/locales/it';

registerLocaleData(localeIt, 'it');

@Component({
  selector: 'app-about',
  standalone: true,
  imports: [
    MatCardModule,
    MatButtonModule,
    FeathericonsModule,
    DatePipe,
    MatIconModule,
    RouterLink,
  ],
  providers: [{ provide: LOCALE_ID, useValue: 'it' }],
  templateUrl: './about.component.html',
  styleUrl: './about.component.scss',
})
export class AboutComponent {
  @Input() project: ProjectsDto;
}
