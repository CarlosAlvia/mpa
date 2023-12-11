import { Component } from '@angular/core';
import { CommonModule } from '@angular/common';
import { RouterLinkActive, RouterLink } from '@angular/router';
import { SidebarService } from '../../servicios/sidebar.service';

@Component({
  selector: 'app-sidebar',
  standalone: true,
  imports: [CommonModule, RouterLinkActive, RouterLink],
  templateUrl: './sidebar.component.html',
  styleUrl: './sidebar.component.css'
})
export class SidebarComponent {

  isOpened: boolean = true;

  constructor(private sidebarService: SidebarService){
    this.sidebarService.sidebarState$.subscribe(state => {
      this.isOpened = state;
    });
  }

}
