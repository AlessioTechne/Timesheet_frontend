import { CommonModule, registerLocaleData } from '@angular/common';
import { Component, Input, LOCALE_ID, OnInit } from '@angular/core';

import { MatCardModule } from '@angular/material/card';
import { ProjectsDto } from '../../../../_models/project';
import { RouterLink } from '@angular/router';
import localeIt from '@angular/common/locales/it';

registerLocaleData(localeIt, 'it');

@Component({
  selector: 'app-stats',
  standalone: true,
  imports: [RouterLink, MatCardModule,CommonModule],
  providers: [{ provide: LOCALE_ID, useValue: 'it' }],
  templateUrl: './stats.component.html',
  styleUrl: './stats.component.scss',
})
export class StatsComponent implements OnInit {
  @Input() project: ProjectsDto;

  constructor() {}
  
  ngOnInit(): void {
    console.log('project', this.project);
  }
}
