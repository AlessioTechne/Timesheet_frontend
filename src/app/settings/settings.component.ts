import { RouterLink, RouterLinkActive, RouterOutlet } from '@angular/router';

import { Component } from '@angular/core';
import { FeathericonsModule } from '../icons/feathericons/feathericons.module';
import { FooterComponent } from "../common/footer/footer.component";
import { HeaderComponent } from "../common/header/header.component";
import { HttpClientModule } from '@angular/common/http';
import { MatButtonModule } from '@angular/material/button';
import { MatCardModule } from '@angular/material/card';
import { SidebarComponent } from "../common/sidebar/sidebar.component";

@Component({
    selector: 'app-settings',
    standalone: true,
    templateUrl: './settings.component.html',
    styleUrl: './settings.component.scss',
    imports: [
        RouterOutlet,
        MatCardModule,
        RouterLinkActive,
        RouterLink,
        FeathericonsModule,
        MatButtonModule,
        HttpClientModule,
        HeaderComponent,
        FooterComponent,
        SidebarComponent
    ]
})
export class SettingsComponent {}
