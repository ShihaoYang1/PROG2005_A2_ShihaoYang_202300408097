/**
 * HomeComponent - Homepage of the Application
 * 
 * This component displays the purpose of the app and provides
 * quick navigation to other sections of the inventory management system.
 */
import { Component } from '@angular/core';

@Component({
  standalone: false,
  selector: 'app-home',
  template: `
    <!-- Welcome Section -->
    <div class="card">
      <h2>Welcome to Inventory Management System</h2>
      <p>
        This system is designed to help businesses and individuals efficiently 
        manage inventory items, providing an intuitive interface and powerful 
        features to make inventory management simple and easy.
      </p>
      
      <!-- System Features -->
      <h3>System Features</h3>
      <ul>
        <li>Add, edit, and delete inventory items</li>
        <li>Search and filter by item name</li>
        <li>View all inventory items</li>
        <li>View popular items</li>
        <li>Secure local data storage</li>
      </ul>

      <!-- System Advantages -->
      <h3>System Advantages</h3>
      <ul>
        <li>User-friendly interface design</li>
        <li>Responsive layout, supporting various devices</li>
        <li>Real-time data validation</li>
        <li>Local data storage, ensuring data security</li>
        <li>Simple and efficient operation process</li>
      </ul>

      <!-- Call to Action Button -->
      <div class="cta-section">
        <a routerLink="/inventory" class="btn btn-primary">
          Start Managing Inventory
        </a>
      </div>
    </div>

    <!-- Quick Navigation Section -->
    <div class="card">
      <h3>Quick Navigation</h3>
      <div class="quick-nav">
        <a routerLink="/inventory" class="btn btn-primary">Inventory</a>
        <a routerLink="/search" class="btn btn-primary">Search</a>
        <a routerLink="/privacy" class="btn btn-primary">Privacy & Security</a>
        <a routerLink="/help" class="btn btn-primary">Help</a>
      </div>
    </div>
  `,
  styles: [`
    /* Component-specific styles */
    h2 {
      color: #333;
      margin-bottom: 15px;
    }

    h3 {
      color: #444;
      margin-top: 20px;
      margin-bottom: 10px;
    }

    p {
      margin-bottom: 15px;
      line-height: 1.8;
    }

    ul {
      margin-left: 20px;
      margin-bottom: 15px;
    }

    li {
      margin-bottom: 8px;
    }

    .cta-section {
      margin-top: 30px;
    }

    .quick-nav {
      display: flex;
      gap: 10px;
      flex-wrap: wrap;
    }

    .quick-nav .btn {
      min-width: 120px;
    }

    /* Responsive adjustments */
    @media (max-width: 768px) {
      .quick-nav {
        flex-direction: column;
      }

      .quick-nav .btn {
        width: 100%;
      }
    }
  `]
})
export class HomeComponent {
  // Home component logic can be extended as needed
}
