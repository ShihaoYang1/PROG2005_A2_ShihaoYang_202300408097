/**
 * MessageComponent - Notification Message Display Component
 * 
 * This component displays success and error messages to users.
 * Messages are automatically cleared after a timeout period.
 */
import { Component, OnInit, OnDestroy } from '@angular/core';
import { Subscription } from 'rxjs';
import { MessageService, Message } from '../../services/message.service';

@Component({
  standalone: false,
  selector: 'app-message',
  template: `
    <!-- Display message only when there is one -->
    <div *ngIf="message" 
         class="message" 
         [ngClass]="'message-' + message.type">
      {{ message.text }}
    </div>
  `,
  styles: [`
    /* Message styles are defined in global styles.css */
    /* Component-specific styles can be added here */
    .message {
      animation: fadeIn 0.3s ease-in-out;
    }

    @keyframes fadeIn {
      from {
        opacity: 0;
        transform: translateY(-10px);
      }
      to {
        opacity: 1;
        transform: translateY(0);
      }
    }
  `]
})
export class MessageComponent implements OnInit, OnDestroy {
  // Current message to display
  message: Message | null = null;
  
  // Subscription for cleanup
  private subscription: Subscription | null = null;

  constructor(private messageService: MessageService) {}

  /**
   * Subscribe to message updates on component initialization
   */
  ngOnInit(): void {
    this.subscription = this.messageService.message$.subscribe(
      (message) => {
        this.message = message;
      }
    );
  }

  /**
   * Unsubscribe when component is destroyed to prevent memory leaks
   */
  ngOnDestroy(): void {
    if (this.subscription) {
      this.subscription.unsubscribe();
    }
  }
}
