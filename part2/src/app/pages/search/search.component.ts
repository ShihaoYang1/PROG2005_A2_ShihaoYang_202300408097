/**
 * SearchComponent - Item Search Page
 * 
 * This component provides search functionality for inventory items.
 * Users can search by item name with filtering options.
 */
import { Component, OnInit } from '@angular/core';
import { InventoryItem } from '../../models/inventory.model';
import { InventoryService } from '../../services/inventory.service';

@Component({
  standalone: false,
  selector: 'app-search',
  template: `
    <!-- Search Form -->
    <div class="card">
      <h2>Item Search</h2>
      <div class="search-container">
        <input 
          type="text" 
          [(ngModel)]="searchTerm"
          placeholder="Enter item name to search..."
          (keypress)="onKeyPress($event)">
        <button 
          class="btn btn-primary" 
          (click)="performSearch()">
          Search
        </button>
        <button 
          class="btn" 
          (click)="clearSearch()">
          Clear
        </button>
      </div>
    </div>

    <!-- Search Results -->
    <div class="card">
      <h2>Search Results</h2>
      <p class="result-count" *ngIf="hasSearched">
        Found {{ searchResults.length }} item(s)
      </p>
      
      <table>
        <thead>
          <tr>
            <th>Item Name</th>
            <th>Category</th>
            <th>Quantity</th>
            <th>Price</th>
            <th>Description</th>
          </tr>
        </thead>
        <tbody>
          <!-- Empty state -->
          <tr *ngIf="searchResults.length === 0">
            <td colspan="5" style="text-align: center;">
              {{ emptyMessage }}
            </td>
          </tr>
          
          <!-- Result rows -->
          <tr *ngFor="let item of searchResults">
            <td>{{ item.name }}</td>
            <td>{{ item.category }}</td>
            <td>{{ item.quantity }}</td>
            <td>{{ formatPrice(item.price) }}</td>
            <td>{{ item.description || '-' }}</td>
          </tr>
        </tbody>
      </table>
    </div>
  `,
  styles: [`
    /* Component-specific styles */
    .result-count {
      color: #666;
      margin-bottom: 10px;
      font-style: italic;
    }

    table {
      margin-top: 10px;
    }

    .search-container input {
      min-width: 300px;
    }

    /* Responsive adjustments */
    @media (max-width: 768px) {
      .search-container input {
        min-width: 100%;
      }
    }
  `]
})
export class SearchComponent implements OnInit {
  // Search term entered by user
  searchTerm = '';
  
  // Search results array
  searchResults: InventoryItem[] = [];
  
  // Flag to track if a search has been performed
  hasSearched = false;
  
  // Empty message to display
  emptyMessage = 'No items found';

  constructor(private inventoryService: InventoryService) {}

  /**
   * Initialize component and display all items
   */
  ngOnInit(): void {
    // Initially display all items
    this.searchResults = this.inventoryService.getAllItems();
    
    if (this.searchResults.length === 0) {
      this.emptyMessage = 'No inventory items available';
    }
  }

  /**
   * Handle keypress event for Enter key
   * @param event - Keyboard event
   */
  onKeyPress(event: KeyboardEvent): void {
    if (event.key === 'Enter') {
      this.performSearch();
    }
  }

  /**
   * Perform search based on current search term
   */
  performSearch(): void {
    this.hasSearched = true;
    
    if (this.searchTerm.trim() === '') {
      // Empty search term - show all items
      this.searchResults = this.inventoryService.getAllItems();
      this.emptyMessage = 'No inventory items available';
    } else {
      // Perform search by item name
      this.searchResults = this.inventoryService.searchItems(this.searchTerm);
      this.emptyMessage = `No items matching "${this.searchTerm}" found`;
    }
  }

  /**
   * Clear search and display all items
   */
  clearSearch(): void {
    this.searchTerm = '';
    this.hasSearched = false;
    this.searchResults = this.inventoryService.getAllItems();
    this.emptyMessage = 'No inventory items available';
  }

  /**
   * Format price with currency symbol
   * @param price - Price value
   * @returns Formatted price string
   */
  formatPrice(price: number): string {
    return '$' + price.toFixed(2);
  }
}
