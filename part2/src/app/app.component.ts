/**
 * AppComponent - Root Component of the Application
 * 
 * This is the main component that serves as the shell for the entire application.
 * It includes the navigation component and a router outlet for page content.
 */
import { Component } from '@angular/core';

@Component({
  standalone: false,
  selector: 'app-root',
  template: `
    <!-- Navigation component - displayed on all pages -->
    <app-navigation></app-navigation>
    
    <!-- Main content area -->
    <div class="container">
      <!-- Message notification component -->
      <app-message></app-message>
      
      <!-- Router outlet - renders the current page component -->
      <router-outlet></router-outlet>
    </div>
  `,
  styles: []
})
export class AppComponent {
  // Application title
  title = 'Inventory Management System';
}
