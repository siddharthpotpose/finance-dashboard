import { CommonModule } from '@angular/common';
import { Component, EventEmitter, Input, Output } from '@angular/core';
import { RouterLink, RouterLinkActive } from '@angular/router';
import { Role } from '../models/finance.models';

@Component({
  selector: 'app-sidebar',
  standalone: true,
  imports: [CommonModule, RouterLink, RouterLinkActive],
  templateUrl: './sidebar.component.html',
  styleUrl: './sidebar.component.css'
}) 
export class SidebarComponent {
  @Input() collapsed = false;
  @Input() role: Role = 'admin';
  @Output() toggleTheme = new EventEmitter<void>();
  @Output() toggleSidebar = new EventEmitter<void>();
}
