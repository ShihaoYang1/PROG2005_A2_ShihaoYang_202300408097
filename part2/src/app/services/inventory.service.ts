/**
 * InventoryService - Core Service for Inventory Management
 * 
 * This service handles all CRUD operations for inventory items.
 * Data is persisted using browser localStorage for local storage.
 */
import { Injectable } from '@angular/core';
import { BehaviorSubject, Observable } from 'rxjs';
import { InventoryItem, ValidationResult } from '../models/inventory.model';
import { MessageService } from './message.service';

@Injectable({
  providedIn: 'root'
})
export class InventoryService {
  // LocalStorage key for inventory data
  private readonly STORAGE_KEY = 'inventory';
  
  // BehaviorSubject to track inventory changes
  private inventorySubject = new BehaviorSubject<InventoryItem[]>([]);
  
  // Observable for components to subscribe to
  public inventory$ = this.inventorySubject.asObservable();

  constructor(private messageService: MessageService) {
    // Load inventory from localStorage on service initialization
    this.loadInventory();
  }

  /**
   * Load inventory data from localStorage
   */
  private loadInventory(): void {
    try {
      const data = localStorage.getItem(this.STORAGE_KEY);
      const items = data ? JSON.parse(data) : [];
      this.inventorySubject.next(items);
    } catch (error) {
      console.error('Error loading inventory from localStorage:', error);
      this.inventorySubject.next([]);
    }
  }

  /**
   * Save inventory data to localStorage
   */
  private saveInventory(): void {
    try {
      localStorage.setItem(
        this.STORAGE_KEY, 
        JSON.stringify(this.inventorySubject.value)
      );
    } catch (error) {
      console.error('Error saving inventory to localStorage:', error);
      this.messageService.showError('Failed to save data to storage');
    }
  }

  /**
   * Get all inventory items
   * @returns Array of all inventory items
   */
  getAllItems(): InventoryItem[] {
    return this.inventorySubject.value;
  }

  /**
   * Get popular items (items with quantity >= 10, limited to top 5)
   * @returns Array of popular inventory items
   */
  getPopularItems(): InventoryItem[] {
    const items = this.inventorySubject.value;
    // Sort by quantity descending and return top 5
    return [...items]
      .sort((a, b) => b.quantity - a.quantity)
      .slice(0, 5);
  }

  /**
   * Search items by name
   * @param searchTerm - Search keyword
   * @returns Array of matching inventory items
   */
  searchItems(searchTerm: string): InventoryItem[] {
    if (!searchTerm || searchTerm.trim() === '') {
      return this.getAllItems();
    }
    
    const term = searchTerm.toLowerCase().trim();
    return this.inventorySubject.value.filter(
      item => item.name.toLowerCase().includes(term)
    );
  }

  /**
   * Find an item by its name
   * @param name - Item name to search for
   * @returns The item if found, undefined otherwise
   */
  findItemByName(name: string): InventoryItem | undefined {
    return this.inventorySubject.value.find(
      item => item.name.toLowerCase() === name.toLowerCase()
    );
  }

  /**
   * Add a new inventory item
   * @param item - The item to add
   * @returns true if successful, false otherwise
   */
  addItem(item: InventoryItem): boolean {
    // Check if item with same name already exists
    if (this.findItemByName(item.name)) {
      this.messageService.showError(`Item "${item.name}" already exists`);
      return false;
    }

    const items = [...this.inventorySubject.value, item];
    this.inventorySubject.next(items);
    this.saveInventory();
    this.messageService.showSuccess('Inventory item added successfully!');
    return true;
  }

  /**
   * Update an existing inventory item by name
   * @param itemName - Original item name (used for lookup)
   * @param updatedItem - Updated item data
   * @returns true if successful, false otherwise
   */
  updateItem(itemName: string, updatedItem: InventoryItem): boolean {
    const items = this.inventorySubject.value;
    const index = items.findIndex(
      item => item.name.toLowerCase() === itemName.toLowerCase()
    );

    if (index === -1) {
      this.messageService.showError('Inventory item not found!');
      return false;
    }

    // If name is changed, check for duplicates
    if (itemName.toLowerCase() !== updatedItem.name.toLowerCase()) {
      const duplicateIndex = items.findIndex(
        item => item.name.toLowerCase() === updatedItem.name.toLowerCase()
      );
      if (duplicateIndex !== -1) {
        this.messageService.showError(`Item "${updatedItem.name}" already exists`);
        return false;
      }
    }

    // Update the item
    const updatedItems = [...items];
    updatedItems[index] = { ...updatedItem };
    this.inventorySubject.next(updatedItems);
    this.saveInventory();
    this.messageService.showSuccess('Inventory item updated successfully!');
    return true;
  }

  /**
   * Delete an inventory item by name
   * @param itemName - Name of the item to delete
   * @returns true if successful, false otherwise
   */
  deleteItem(itemName: string): boolean {
    const items = this.inventorySubject.value;
    const index = items.findIndex(
      item => item.name.toLowerCase() === itemName.toLowerCase()
    );

    if (index === -1) {
      this.messageService.showError('Inventory item not found!');
      return false;
    }

    const updatedItems = items.filter((_, i) => i !== index);
    this.inventorySubject.next(updatedItems);
    this.saveInventory();
    this.messageService.showSuccess('Inventory item deleted successfully!');
    return true;
  }

  /**
   * Validate form data for inventory item
   * @param item - Item data to validate
   * @returns ValidationResult with isValid flag and error message
   */
  validateItem(item: Partial<InventoryItem>): ValidationResult {
    // Validate item name
    if (!item.name || item.name.trim() === '') {
      return { isValid: false, message: 'Item name cannot be empty' };
    }

    // Validate category
    if (!item.category || item.category.trim() === '') {
      return { isValid: false, message: 'Category cannot be empty' };
    }

    // Validate quantity - must be a non-negative number
    if (item.quantity === undefined || item.quantity === null) {
      return { isValid: false, message: 'Quantity is required' };
    }
    if (isNaN(Number(item.quantity)) || item.quantity < 0) {
      return { isValid: false, message: 'Quantity must be a non-negative number' };
    }
    if (!Number.isInteger(Number(item.quantity))) {
      return { isValid: false, message: 'Quantity must be a whole number' };
    }

    // Validate price - must be a non-negative number
    if (item.price === undefined || item.price === null) {
      return { isValid: false, message: 'Price is required' };
    }
    if (isNaN(Number(item.price)) || item.price < 0) {
      return { isValid: false, message: 'Price must be a non-negative number' };
    }

    return { isValid: true, message: '' };
  }
}
