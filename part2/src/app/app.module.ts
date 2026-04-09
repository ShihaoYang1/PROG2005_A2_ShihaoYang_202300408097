/**
 * AppModule - Root Module of the Inventory Management System
 * 
 * This module imports and configures all necessary Angular modules,
 * declares all components, and provides services for the application.
 */
import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';

// Routing Module
import { AppRoutingModule } from './app-routing.module';

// Components
import { AppComponent } from './app.component';
import { NavigationComponent } from './components/navigation/navigation.component';
import { HomeComponent } from './pages/home/home.component';
import { InventoryComponent } from './pages/inventory/inventory.component';
import { SearchComponent } from './pages/search/search.component';
import { PrivacyComponent } from './pages/privacy/privacy.component';
import { HelpComponent } from './pages/help/help.component';
import { InventoryFormComponent } from './components/inventory-form/inventory-form.component';
import { InventoryTableComponent } from './components/inventory-table/inventory-table.component';
import { MessageComponent } from './components/message/message.component';

// Services
import { InventoryService } from './services/inventory.service';
import { MessageService } from './services/message.service';

@NgModule({
  // Declare all components that belong to this module
  declarations: [
    AppComponent,
    NavigationComponent,
    HomeComponent,
    InventoryComponent,
    SearchComponent,
    PrivacyComponent,
    HelpComponent,
    InventoryFormComponent,
    InventoryTableComponent,
    MessageComponent
  ],
  // Import necessary Angular modules
  imports: [
    BrowserModule,
    FormsModule,
    ReactiveFormsModule,
    AppRoutingModule
  ],
  // Provide services at the root level
  providers: [
    InventoryService,
    MessageService
  ],
  // Bootstrap component - the root component
  bootstrap: [AppComponent]
})
export class AppModule { }
