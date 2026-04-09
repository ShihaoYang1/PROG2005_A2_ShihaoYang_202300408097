/**
 * PrivacyComponent - Privacy and Security Analysis Page
 * 
 * This component displays privacy and security information about the application.
 * It explains data storage, security measures, privacy policies, and limitations.
 */
import { Component } from '@angular/core';

@Component({
  standalone: false,
  selector: 'app-privacy',
  template: `
    <div class="card">
      <h2>Privacy and Security Analysis</h2>
      <p>
        This system values user data privacy and security, and has implemented 
        various measures to protect user information. Here are the privacy and 
        security considerations of the system:
      </p>

      <!-- Data Storage Section -->
      <h3>Data Storage</h3>
      <ul>
        <li>
          <strong>Local Storage:</strong> The system uses the browser's localStorage 
          for data storage. All data is stored only on the user's local device and 
          is not uploaded to any server.
        </li>
        <li>
          <strong>Data Encryption:</strong> Although localStorage itself is not 
          encrypted, the system properly handles sensitive data to ensure security.
        </li>
        <li>
          <strong>Data Backup:</strong> Users should regularly back up their data 
          manually, as localStorage may be lost due to browser cleanup or device 
          replacement.
        </li>
      </ul>

      <!-- Security Measures Section -->
      <h3>Security Measures</h3>
      <ul>
        <li>
          <strong>Input Validation:</strong> The system validates all user inputs 
          to ensure correct data format and prevent malicious input. Numeric fields 
          only accept numbers, preventing letter input.
        </li>
        <li>
          <strong>Error Handling:</strong> The system uses appropriate error handling 
          mechanisms to avoid exposing sensitive information.
        </li>
        <li>
          <strong>Data Validation:</strong> The system performs strict data validation 
          when adding and updating inventory items to ensure data integrity and accuracy.
        </li>
        <li>
          <strong>Confirmation Dialogs:</strong> Delete operations require user 
          confirmation using item name to prevent accidental data loss.
        </li>
      </ul>

      <!-- Privacy Policy Section -->
      <h3>Privacy Policy</h3>
      <ul>
        <li>
          <strong>Data Collection:</strong> The system does not collect any user 
          personal information, only stores inventory data entered by users.
        </li>
        <li>
          <strong>Data Sharing:</strong> The system does not share user data with 
          any third parties.
        </li>
        <li>
          <strong>Data Usage:</strong> The system only uses data for inventory 
          management functions and not for other purposes.
        </li>
      </ul>

      <!-- Security Recommendations Section -->
      <h3>Security Recommendations</h3>
      <ul>
        <li>Regularly back up your inventory data to prevent data loss.</li>
        <li>Use a secure browser and regularly update your browser version.</li>
        <li>
          Avoid using this system on public devices, or clear browser data after use.
        </li>
        <li>
          If your device is stolen or lost, consider clearing browser data to 
          protect your inventory information.
        </li>
      </ul>

      <!-- Limitations Section -->
      <h3>Limitations</h3>
      <ul>
        <li>
          This system only uses the browser's localStorage for data storage, 
          which has limited capacity (typically 5MB).
        </li>
        <li>
          localStorage data may be lost due to browser settings or cleanup.
        </li>
        <li>
          This system does not provide user authentication functionality, so 
          anyone using your device can access your inventory data.
        </li>
      </ul>
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
      margin-top: 25px;
      margin-bottom: 15px;
      border-bottom: 1px solid #eee;
      padding-bottom: 8px;
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
      margin-bottom: 12px;
      line-height: 1.6;
    }

    strong {
      color: #333;
    }
  `]
})
export class PrivacyComponent {
  // Privacy component - static content display
}
