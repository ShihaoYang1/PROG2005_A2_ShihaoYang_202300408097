/**
 * MessageService - Service for Managing Notification Messages
 * 
 * This service handles displaying success and error messages to users.
 * Messages are automatically cleared after a specified timeout.
 */
import { Injectable } from '@angular/core';
import { BehaviorSubject } from 'rxjs';

/**
 * Message interface for notification messages
 */
export interface Message {
  /** Message content text */
  text: string;
  
  /** Message type: 'success' or 'error' */
  type: 'success' | 'error';
}

@Injectable({
  providedIn: 'root'
})
export class MessageService {
  // BehaviorSubject to track current message
  private messageSubject = new BehaviorSubject<Message | null>(null);
  
  // Observable for components to subscribe to
  public message$ = this.messageSubject.asObservable();
  
  // Timeout reference for auto-clearing messages
  private timeoutRef: ReturnType<typeof setTimeout> | null = null;
  
  // Default timeout duration in milliseconds
  private readonly DEFAULT_TIMEOUT = 3000;

  constructor() {}

  /**
   * Show a success message
   * @param text - Message content
   * @param timeout - Optional timeout in milliseconds (default: 3000)
   */
  showSuccess(text: string, timeout: number = this.DEFAULT_TIMEOUT): void {
    this.showMessage({ text, type: 'success' }, timeout);
  }

  /**
   * Show an error message
   * @param text - Message content
   * @param timeout - Optional timeout in milliseconds (default: 3000)
   */
  showError(text: string, timeout: number = this.DEFAULT_TIMEOUT): void {
    this.showMessage({ text, type: 'error' }, timeout);
  }

  /**
   * Show a message and auto-clear after timeout
   * @param message - Message object with text and type
   * @param timeout - Timeout in milliseconds
   */
  private showMessage(message: Message, timeout: number): void {
    // Clear any existing timeout
    if (this.timeoutRef) {
      clearTimeout(this.timeoutRef);
    }

    // Set the new message
    this.messageSubject.next(message);

    // Auto-clear after timeout
    this.timeoutRef = setTimeout(() => {
      this.clear();
    }, timeout);
  }

  /**
   * Clear the current message
   */
  clear(): void {
    this.messageSubject.next(null);
    if (this.timeoutRef) {
      clearTimeout(this.timeoutRef);
      this.timeoutRef = null;
    }
  }
}
