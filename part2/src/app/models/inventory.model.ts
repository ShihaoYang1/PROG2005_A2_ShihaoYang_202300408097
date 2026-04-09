/**
 * InventoryItem Interface
 * 
 * Defines the structure of an inventory item object.
 * All inventory items in the system follow this interface.
 */
export interface InventoryItem {
  /** Unique name identifier for the item */
  name: string;
  
  /** Category of the item (e.g., Electronics, Clothing, Food) */
  category: string;
  
  /** Quantity in stock - must be a non-negative number */
  quantity: number;
  
  /** Price per unit - must be a non-negative number */
  price: number;
  
  /** Optional description of the item */
  description?: string;
}

/**
 * ValidationResult Interface
 * 
 * Defines the structure for form validation results.
 */
export interface ValidationResult {
  /** Whether the validation passed */
  isValid: boolean;
  
  /** Error message if validation failed */
  message: string;
}
