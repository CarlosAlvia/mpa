import { Component } from '@angular/core';
import { CommonModule } from '@angular/common';
import { SidebarService } from '../../servicios/sidebar.service';

@Component({
  selector: 'app-navbar',
  standalone: true,
  imports: [CommonModule],
  templateUrl: './navbar.component.html',
  styleUrl: './navbar.component.css'
})
export class NavbarComponent {
  constructor(private sidebarService: SidebarService){}
  toggleSidebar() {
    this.sidebarService.toggleSidebar();
  }
}
