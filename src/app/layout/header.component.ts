import { CommonModule } from '@angular/common';
import { Component, EventEmitter, Input, Output } from '@angular/core';
import { RouterLink, RouterLinkActive } from '@angular/router';
import { Role } from '../models/finance.models';

@Component({
  selector: 'app-header',
  standalone: true,
  imports: [CommonModule, RouterLink, RouterLinkActive],
  templateUrl: './header.component.html',
  styleUrl: './header.component.css'
})
export class HeaderComponent {
  @Input({ required: true }) role!: Role;
  @Input({ required: true }) roleOptions!: Role[];
  @Input() isAdmin = false;

  @Output() toggleSidebar = new EventEmitter<void>();
  @Output() roleChange = new EventEmitter<Role>();
  @Output() toggleTheme = new EventEmitter<void>();
}
