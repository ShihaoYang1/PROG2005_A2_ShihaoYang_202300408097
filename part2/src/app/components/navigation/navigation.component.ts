/**
 * NavigationComponent - Main Navigation Bar Component
 * 
 * This component displays the application header and navigation menu.
 * It provides links to all main pages of the application.
 */
import { Component } from '@angular/core';

@Component({
  standalone: false,
  selector: 'app-navigation',
  template: `
    <nav>
      <div class="container">
        <!-- Application Title -->
        <h1>Inventory Management System</h1>
        
        <!-- Navigation Links -->
        <ul>
          <li><a routerLink="/home" routerLinkActive="active">Home</a></li>
          <li><a routerLink="/inventory" routerLinkActive="active">Inventory</a></li>
          <li><a routerLink="/search" routerLinkActive="active">Search</a></li>
          <li><a routerLink="/privacy" routerLinkActive="active">Privacy & Security</a></li>
          <li><a routerLink="/help" routerLinkActive="active">Help</a></li>
        </ul>
      </div>
    </nav>
  `,
  styles: [`
    /* Navigation styles are defined in global styles.css */
    /* Additional component-specific styles can be added here */
  `]
})
export class NavigationComponent {
  // Navigation component logic can be added here if needed
}
