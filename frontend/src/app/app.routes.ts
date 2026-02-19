import { Routes } from '@angular/router';
import { LeadListComponent } from './components/lead-list/lead-list.component';
import { LeadDetailComponent } from './components/lead-detail/lead-detail';
import { LeadFormComponent } from './components/lead-form/lead-form';

export const routes: Routes = [
  { path: '', redirectTo: '/leads', pathMatch: 'full' },
  { path: 'leads', component: LeadListComponent },
  { path: '**', redirectTo: '/leads' },
  { path: 'leads/:id', component: LeadDetailComponent },
  { path:'leads',component:LeadListComponent },
  { path:'leads/create',component:LeadFormComponent },
  { path:'leads/:id',component:LeadDetailComponent },
  { path:'leads/edit/:id',component:LeadFormComponent },
];
