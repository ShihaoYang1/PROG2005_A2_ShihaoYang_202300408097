/**
 * HelpComponent - Help Center Page
 * 
 * This component displays FAQs and troubleshooting guidance
 * to help users effectively use the inventory management system.
 */
import { Component } from '@angular/core';

@Component({
  standalone: false,
  selector: 'app-help',
  template: `
    <div class="card">
      <h2>Help Center</h2>
      <p>
        Welcome to the Inventory Management System Help Center. Here you'll find 
        frequently asked questions and troubleshooting guides to help you better 
        use this system.
      </p>

      <!-- FAQ Section -->
      <h3>Frequently Asked Questions (FAQ)</h3>
      <div class="faq-section">
        <div class="faq-item">
          <h4>1. How to add a new inventory item?</h4>
          <p>
            On the Inventory page, fill in the item name, category, quantity, price, 
            and description, then click the "Add Item" button.
          </p>
        </div>

        <div class="faq-item">
          <h4>2. How to edit an existing inventory item?</h4>
          <p>
            On the Inventory page, find the item you want to edit, click the "Edit" 
            button, modify the relevant information, then click the "Update Item" button.
          </p>
        </div>

        <div class="faq-item">
          <h4>3. How to delete an inventory item?</h4>
          <p>
            On the Inventory page, find the item you want to delete, click the "Delete" 
            button, and click "OK" in the confirmation dialog box. The confirmation 
            dialog will show the item name being deleted.
          </p>
        </div>

        <div class="faq-item">
          <h4>4. How to search for inventory items?</h4>
          <p>
            On the Search page, enter the item name, then click the "Search" button 
            or press Enter. The search is case-insensitive and supports partial matching.
          </p>
        </div>

        <div class="faq-item">
          <h4>5. Where is the data stored?</h4>
          <p>
            The system uses the browser's localStorage for data storage. All data is 
            stored only on your local device.
          </p>
        </div>

        <div class="faq-item">
          <h4>6. How to back up data?</h4>
          <p>
            You can view and export localStorage data in your browser's developer tools, 
            or use the browser's export function to back up data.
          </p>
        </div>

        <div class="faq-item">
          <h4>7. Will data be lost?</h4>
          <p>
            If you clear your browser cache or change devices, data in localStorage may 
            be lost. It is recommended to back up data regularly.
          </p>
        </div>

        <div class="faq-item">
          <h4>8. Which browsers are supported?</h4>
          <p>
            The system supports all modern browsers, including Chrome, Firefox, Safari, 
            and Edge.
          </p>
        </div>
      </div>

      <!-- Troubleshooting Section -->
      <h3>Troubleshooting</h3>
      <div class="troubleshoot-section">
        <div class="troubleshoot-item">
          <h4>1. Cannot add or update items</h4>
          <p>Please check:</p>
          <ul>
            <li>All required fields are filled in</li>
            <li>Quantity and price are non-negative numbers</li>
            <li>Quantity is a whole number (no decimals)</li>
            <li>Your browser supports localStorage</li>
          </ul>
        </div>

        <div class="troubleshoot-item">
          <h4>2. Search function not working</h4>
          <p>Please check:</p>
          <ul>
            <li>You entered the correct search term</li>
            <li>There are matching inventory items</li>
          </ul>
        </div>

        <div class="troubleshoot-item">
          <h4>3. Data loss</h4>
          <p>If data is lost, please check:</p>
          <ul>
            <li>You cleared your browser cache</li>
            <li>You changed devices</li>
            <li>You used incognito mode browser</li>
          </ul>
        </div>

        <div class="troubleshoot-item">
          <h4>4. Page display issues</h4>
          <p>Please try:</p>
          <ul>
            <li>Refreshing the page</li>
            <li>Clearing browser cache</li>
            <li>Using a different browser</li>
          </ul>
        </div>

        <div class="troubleshoot-item">
          <h4>5. Form validation errors</h4>
          <p>Please ensure:</p>
          <ul>
            <li>Item name is not empty</li>
            <li>Category is not empty</li>
            <li>Quantity contains only numbers (no letters)</li>
            <li>Price contains only numbers (no letters)</li>
          </ul>
        </div>
      </div>

      <!-- Contact Section -->
      <h3>Contact Support</h3>
      <p>
        If you encounter any issues that cannot be resolved, please contact the 
        system administrator or technical support team.
      </p>
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
      margin-top: 30px;
      margin-bottom: 20px;
      border-bottom: 1px solid #eee;
      padding-bottom: 8px;
    }

    h4 {
      color: #333;
      margin-bottom: 10px;
      font-size: 1rem;
    }

    p {
      margin-bottom: 15px;
      line-height: 1.6;
    }

    .faq-section,
    .troubleshoot-section {
      margin-bottom: 20px;
    }

    .faq-item,
    .troubleshoot-item {
      margin-bottom: 20px;
      padding-bottom: 15px;
      border-bottom: 1px solid #f0f0f0;
    }

    .faq-item:last-child,
    .troubleshoot-item:last-child {
      border-bottom: none;
    }

    ul {
      margin-left: 20px;
      margin-bottom: 10px;
    }

    li {
      margin-bottom: 8px;
      line-height: 1.5;
    }
  `]
})
export class HelpComponent {
  // Help component - static content display
}
