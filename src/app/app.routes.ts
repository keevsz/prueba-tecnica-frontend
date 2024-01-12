import { Routes } from '@angular/router';
import { ClientsComponent } from './clients/clients.component';

export const routes: Routes = [
  {
    path: 'clients',
    component: ClientsComponent,
  },
  { path: '**',   redirectTo: '/clients', pathMatch: 'full' }
];
