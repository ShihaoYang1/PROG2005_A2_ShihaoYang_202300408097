/**
 * AppRoutingModule - Application Routing Configuration
 * 
 * This module defines all routes for the multi-page Angular application.
 * Routes include: Home, Inventory, Search, Privacy & Security, and Help pages.
 */
import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';

// Import page components
import { HomeComponent } from './pages/home/home.component';
import { InventoryComponent } from './pages/inventory/inventory.component';
import { SearchComponent } from './pages/search/search.component';
import { PrivacyComponent } from './pages/privacy/privacy.component';
import { HelpComponent } from './pages/help/help.component';

// Define application routes
const routes: Routes = [
  // Default route - redirects to home page
  { path: '', redirectTo: '/home', pathMatch: 'full' },
  
  // Home page - displays the purpose of the app
  { path: 'home', component: HomeComponent },
  
  // Inventory page - for adding, editing, and deleting inventory items
  { path: 'inventory', component: InventoryComponent },
  
  // Search page - for searching items with filtering options
  { path: 'search', component: SearchComponent },
  
  // Privacy & Security page - explains key security considerations
  { path: 'privacy', component: PrivacyComponent },
  
  // Help page - FAQs and troubleshooting guidance
  { path: 'help', component: HelpComponent },
  
  // Wildcard route - redirects unknown routes to home
  { path: '**', redirectTo: '/home' }
];

@NgModule({
  // Import RouterModule and configure with our routes
  imports: [RouterModule.forRoot(routes)],
  // Export RouterModule so it's available throughout the app
  exports: [RouterModule]
})
export class AppRoutingModule { }
