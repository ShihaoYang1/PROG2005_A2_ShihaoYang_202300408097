/**
 * InventoryFormComponent - Form for Adding and Editing Inventory Items
 * 
 * This component provides a form for users to add new inventory items
 * or edit existing ones. It includes comprehensive input validation.
 */
import { Component, OnInit, Output, EventEmitter, Input } from '@angular/core';
import { FormBuilder, FormGroup, Validators, AbstractControl } from '@angular/forms';
import { InventoryItem } from '../../models/inventory.model';
import { InventoryService } from '../../services/inventory.service';
import { MessageService } from '../../services/message.service';

@Component({
  standalone: false,
  selector: 'app-inventory-form',
  template: `
    <div class="card">
      <h2>{{ isEditMode ? 'Edit' : 'Add' }} Inventory Item</h2>
      
      <form [formGroup]="itemForm" (ngSubmit)="onSubmit()">
        <!-- Item Name Field -->
        <div class="form-group">
          <label for="name">Item Name:</label>
          <input 
            type="text" 
            id="name" 
            formControlName="name"
            placeholder="Enter item name"
            [attr.disabled]="isEditMode ? true : null">
          <div class="error-message" *ngIf="showError('name')">
            {{ getErrorMessage('name') }}
          </div>
        </div>

        <!-- Category Field -->
        <div class="form-group">
          <label for="category">Category:</label>
          <input 
            type="text" 
            id="category" 
            formControlName="category"
            placeholder="Enter category">
          <div class="error-message" *ngIf="showError('category')">
            {{ getErrorMessage('category') }}
          </div>
        </div>

        <!-- Quantity Field - numeric only -->
        <div class="form-group">
          <label for="quantity">Quantity:</label>
          <input 
            type="number" 
            id="quantity" 
            formControlName="quantity"
            min="0"
            step="1"
            placeholder="Enter quantity"
            (keypress)="preventNonNumeric($event, false)">
          <div class="error-message" *ngIf="showError('quantity')">
            {{ getErrorMessage('quantity') }}
          </div>
        </div>

        <!-- Price Field - numeric only -->
        <div class="form-group">
          <label for="price">Price:</label>
          <input 
            type="number" 
            id="price" 
            formControlName="price"
            min="0"
            step="0.01"
            placeholder="Enter price"
            (keypress)="preventNonNumeric($event, true)">
          <div class="error-message" *ngIf="showError('price')">
            {{ getErrorMessage('price') }}
          </div>
        </div>

        <!-- Description Field (Optional) -->
        <div class="form-group">
          <label for="description">Description:</label>
          <textarea 
            id="description" 
            formControlName="description"
            rows="3"
            placeholder="Enter description (optional)"></textarea>
        </div>

        <!-- Form Buttons -->
        <div class="button-group">
          <button 
            type="submit" 
            class="btn btn-primary"
            *ngIf="!isEditMode"
            [disabled]="itemForm.invalid">
            Add Item
          </button>
          <button 
            type="submit" 
            class="btn btn-success"
            *ngIf="isEditMode"
            [disabled]="itemForm.invalid">
            Update Item
          </button>
          <button 
            type="button" 
            class="btn"
            (click)="resetForm()">
            Reset
          </button>
          <button 
            type="button" 
            class="btn"
            *ngIf="isEditMode"
            (click)="cancelEdit()">
            Cancel
          </button>
        </div>
      </form>
    </div>
  `,
  styles: [`
    /* Component-specific styles */
    input:disabled {
      background-color: #e9ecef;
      cursor: not-allowed;
    }
    
    button:disabled {
      opacity: 0.6;
      cursor: not-allowed;
    }
  `]
})
export class InventoryFormComponent implements OnInit {
  // Event emitters for parent component communication
  @Output() itemAdded = new EventEmitter<void>();
  @Output() itemUpdated = new EventEmitter<void>();
  @Output() editCancelled = new EventEmitter<void>();
  
  // Input for editing existing item
  @Input() set editItem(item: InventoryItem | null) {
    if (item) {
      this.isEditMode = true;
      this.originalItemName = item.name;
      this.itemForm.patchValue({
        name: item.name,
        category: item.category,
        quantity: item.quantity,
        price: item.price,
        description: item.description || ''
      });
    }
  }

  // Form group for the inventory item
  itemForm!: FormGroup;
  
  // Flag to indicate edit mode
  isEditMode = false;
  
  // Original item name for updating
  originalItemName = '';

  constructor(
    private fb: FormBuilder,
    private inventoryService: InventoryService,
    private messageService: MessageService
  ) {}

  /**
   * Initialize the form on component creation
   */
  ngOnInit(): void {
    this.initForm();
  }

  /**
   * Initialize the reactive form with validators
   */
  private initForm(): void {
    this.itemForm = this.fb.group({
      name: ['', [Validators.required, Validators.minLength(1)]],
      category: ['', [Validators.required, Validators.minLength(1)]],
      quantity: [0, [Validators.required, Validators.min(0), this.integerValidator]],
      price: [0, [Validators.required, Validators.min(0)]],
      description: ['']
    });
  }

  /**
   * Custom validator to ensure quantity is an integer
   */
  private integerValidator(control: AbstractControl): { [key: string]: boolean } | null {
    if (control.value !== null && !Number.isInteger(Number(control.value))) {
      return { 'notInteger': true };
    }
    return null;
  }

  /**
   * Prevent non-numeric input in number fields
   * @param event - Keyboard event
   * @param allowDecimal - Whether to allow decimal point
   */
  preventNonNumeric(event: KeyboardEvent, allowDecimal: boolean): void {
    const char = event.key;
    
    // Allow control keys
    if (event.ctrlKey || event.metaKey) {
      return;
    }
    
    // Allow navigation keys
    if (['Backspace', 'Delete', 'ArrowLeft', 'ArrowRight', 'Tab'].includes(char)) {
      return;
    }
    
    // Allow numbers
    if (/^\d$/.test(char)) {
      return;
    }
    
    // Allow decimal point for price field
    if (allowDecimal && char === '.') {
      const currentValue = (event.target as HTMLInputElement).value;
      if (!currentValue.includes('.')) {
        return;
      }
    }
    
    // Prevent all other characters (including letters)
    event.preventDefault();
  }

  /**
   * Check if a field should show an error
   * @param fieldName - Name of the form field
   * @returns boolean indicating if error should be shown
   */
  showError(fieldName: string): boolean {
    const field = this.itemForm.get(fieldName);
    return field ? field.invalid && (field.dirty || field.touched) : false;
  }

  /**
   * Get the error message for a field
   * @param fieldName - Name of the form field
   * @returns Error message string
   */
  getErrorMessage(fieldName: string): string {
    const field = this.itemForm.get(fieldName);
    if (!field) return '';

    if (field.hasError('required')) {
      return `${this.getFieldLabel(fieldName)} is required`;
    }
    if (field.hasError('min')) {
      return `${this.getFieldLabel(fieldName)} must be non-negative`;
    }
    if (field.hasError('notInteger')) {
      return `${this.getFieldLabel(fieldName)} must be a whole number`;
    }
    if (field.hasError('minlength')) {
      return `${this.getFieldLabel(fieldName)} cannot be empty`;
    }

    return '';
  }

  /**
   * Get the display label for a field
   * @param fieldName - Name of the form field
   * @returns Display label string
   */
  private getFieldLabel(fieldName: string): string {
    const labels: { [key: string]: string } = {
      name: 'Item Name',
      category: 'Category',
      quantity: 'Quantity',
      price: 'Price',
      description: 'Description'
    };
    return labels[fieldName] || fieldName;
  }

  /**
   * Handle form submission
   */
  onSubmit(): void {
    if (this.itemForm.invalid) {
      // Mark all fields as touched to show validation errors
      Object.keys(this.itemForm.controls).forEach(key => {
        this.itemForm.get(key)?.markAsTouched();
      });
      return;
    }

    const formValue = this.itemForm.value;
    const item: InventoryItem = {
      name: formValue.name.trim(),
      category: formValue.category.trim(),
      quantity: parseInt(formValue.quantity, 10),
      price: parseFloat(formValue.price),
      description: formValue.description?.trim() || ''
    };

    // Validate using service
    const validation = this.inventoryService.validateItem(item);
    if (!validation.isValid) {
      this.messageService.showError(validation.message);
      return;
    }

    if (this.isEditMode) {
      // Update existing item
      const success = this.inventoryService.updateItem(this.originalItemName, item);
      if (success) {
        this.resetForm();
        this.itemUpdated.emit();
      }
    } else {
      // Add new item
      const success = this.inventoryService.addItem(item);
      if (success) {
        this.resetForm();
        this.itemAdded.emit();
      }
    }
  }

  /**
   * Reset the form to initial state
   */
  resetForm(): void {
    this.itemForm.reset({
      name: '',
      category: '',
      quantity: 0,
      price: 0,
      description: ''
    });
    this.isEditMode = false;
    this.originalItemName = '';
  }

  /**
   * Cancel edit mode
   */
  cancelEdit(): void {
    this.resetForm();
    this.editCancelled.emit();
  }
}
