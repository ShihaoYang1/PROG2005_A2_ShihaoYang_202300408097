/**
 * InventoryComponent - Inventory Management Page
 * 
 * This component provides the main inventory management interface.
 * It includes:
 * - Form for adding and editing inventory items
 * - Table displaying all inventory items with edit/delete actions
 * - Table displaying popular items
 */
import { Component, OnInit, OnDestroy } from '@angular/core';
import { Subscription } from 'rxjs';
import { InventoryItem } from '../../models/inventory.model';
import { InventoryService } from '../../services/inventory.service';

@Component({
  standalone: false,
  selector: 'app-inventory',
  template: `
    <!-- Inventory Form Component -->
    <app-inventory-form
      [editItem]="currentEditItem"
      (itemAdded)="onItemAdded()"
      (itemUpdated)="onItemUpdated()"
      (editCancelled)="onEditCancelled()">
    </app-inventory-form>

    <!-- All Inventory Items Table -->
    <app-inventory-table
      title="All Inventory Items"
      [items]="allItems"
      [showActions]="true"
      [showDescription]="true"
      emptyMessage="No inventory items"
      (editItem)="onEditItem($event)"
      (deleteItem)="onDeleteItem($event)">
    </app-inventory-table>

    <!-- Popular Items Table -->
    <app-inventory-table
      title="Popular Items"
      [items]="popularItems"
      [showActions]="false"
      [showDescription]="false"
      emptyMessage="No popular items">
    </app-inventory-table>
  `,
  styles: [`
    /* Component-specific styles can be added here */
  `]
})
export class InventoryComponent implements OnInit, OnDestroy {
  // All inventory items
  allItems: InventoryItem[] = [];
  
  // Popular items (top 5 by quantity)
  popularItems: InventoryItem[] = [];
  
  // Item currently being edited
  currentEditItem: InventoryItem | null = null;
  
  // Subscription for cleanup
  private subscription: Subscription | null = null;

  constructor(private inventoryService: InventoryService) {}

  /**
   * Initialize component and subscribe to inventory changes
   */
  ngOnInit(): void {
    // Subscribe to inventory changes
    this.subscription = this.inventoryService.inventory$.subscribe(() => {
      this.loadData();
    });
    
    // Initial data load
    this.loadData();
  }

  /**
   * Clean up subscription when component is destroyed
   */
  ngOnDestroy(): void {
    if (this.subscription) {
      this.subscription.unsubscribe();
    }
  }

  /**
   * Load all items and popular items from the service
   */
  private loadData(): void {
    this.allItems = this.inventoryService.getAllItems();
    this.popularItems = this.inventoryService.getPopularItems();
  }

  /**
   * Handle item added event
   */
  onItemAdded(): void {
    this.loadData();
    this.currentEditItem = null;
  }

  /**
   * Handle item updated event
   */
  onItemUpdated(): void {
    this.loadData();
    this.currentEditItem = null;
  }

  /**
   * Handle edit cancelled event
   */
  onEditCancelled(): void {
    this.currentEditItem = null;
  }

  /**
   * Handle edit item event from table
   * @param item - Item to edit
   */
  onEditItem(item: InventoryItem): void {
    // Set the current edit item - this will populate the form
    this.currentEditItem = { ...item };
    
    // Scroll to the top of the page where the form is
    window.scrollTo({ top: 0, behavior: 'smooth' });
  }

  /**
   * Handle delete item event from table
   * @param item - Item to delete
   */
  onDeleteItem(item: InventoryItem): void {
    // Delete the item using its name
    this.inventoryService.deleteItem(item.name);
    
    // Clear edit state if the deleted item was being edited
    if (this.currentEditItem && this.currentEditItem.name === item.name) {
      this.currentEditItem = null;
    }
    
    // Reload data
    this.loadData();
  }
}
