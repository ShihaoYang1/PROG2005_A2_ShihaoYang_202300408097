/**
 * InventoryTableComponent - Table Display for Inventory Items
 * 
 * This component displays inventory items in a table format.
 * It supports showing all items or popular items, and provides
 * edit and delete actions.
 */
import { Component, Input, Output, EventEmitter } from '@angular/core';
import { InventoryItem } from '../../models/inventory.model';

@Component({
  standalone: false,
  selector: 'app-inventory-table',
  template: `
    <div class="card">
      <h2>{{ title }}</h2>
      
      <table>
        <thead>
          <tr>
            <th>Item Name</th>
            <th>Category</th>
            <th>Quantity</th>
            <th>Price</th>
            <th *ngIf="showDescription">Description</th>
            <th *ngIf="showActions">Actions</th>
          </tr>
        </thead>
        <tbody>
          <!-- Empty state -->
          <tr *ngIf="items.length === 0">
            <td [attr.colspan]="getColspan()" style="text-align: center;">
              {{ emptyMessage }}
            </td>
          </tr>
          
          <!-- Item rows -->
          <tr *ngFor="let item of items">
            <td>{{ item.name }}</td>
            <td>{{ item.category }}</td>
            <td>{{ item.quantity }}</td>
            <td>{{ formatPrice(item.price) }}</td>
            <td *ngIf="showDescription">{{ item.description || '-' }}</td>
            <td *ngIf="showActions">
              <button 
                class="btn btn-primary" 
                (click)="onEdit(item)"
                style="margin-right: 5px;">
                Edit
              </button>
              <button 
                class="btn btn-danger" 
                (click)="onDelete(item)">
                Delete
              </button>
            </td>
          </tr>
        </tbody>
      </table>
    </div>
  `,
  styles: [`
    /* Component-specific styles */
    table {
      margin-top: 10px;
    }
    
    .btn {
      margin: 2px;
    }
    
    td:last-child {
      white-space: nowrap;
    }
  `]
})
export class InventoryTableComponent {
  // Input properties
  @Input() title = 'Inventory Items';
  @Input() items: InventoryItem[] = [];
  @Input() showActions = false;
  @Input() showDescription = true;
  @Input() emptyMessage = 'No items found';
  
  // Output events
  @Output() editItem = new EventEmitter<InventoryItem>();
  @Output() deleteItem = new EventEmitter<InventoryItem>();

  /**
   * Calculate the colspan for empty state row
   * @returns Number of columns
   */
  getColspan(): number {
    let cols = 4; // Base columns: name, category, quantity, price
    if (this.showDescription) cols++;
    if (this.showActions) cols++;
    return cols;
  }

  /**
   * Format price with currency symbol
   * @param price - Price value
   * @returns Formatted price string
   */
  formatPrice(price: number): string {
    return '$' + price.toFixed(2);
  }

  /**
   * Handle edit button click
   * @param item - Item to edit
   */
  onEdit(item: InventoryItem): void {
    this.editItem.emit(item);
  }

  /**
   * Handle delete button click with confirmation
   * @param item - Item to delete
   */
  onDelete(item: InventoryItem): void {
    // Show confirmation dialog using item name
    const confirmed = window.confirm(
      `Are you sure you want to delete item "${item.name}"?`
    );
    
    if (confirmed) {
      this.deleteItem.emit(item);
    }
  }
}
