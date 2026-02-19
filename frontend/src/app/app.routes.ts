import { Routes } from '@angular/router';
import { LeadListComponent } from './components/lead-list/lead-list.component';
import { LeadDetailComponent } from './components/lead-detail/lead-detail';
import { LeadFormComponent } from './components/lead-form/lead-form';

export const routes: Routes = [
  { path:'', redirectTo:'/leads', pathMatch:'full'},
  // List
  { path:'leads', component:LeadListComponent},
  // Create
  { path:'leads/create', component:LeadFormComponent},
  // Edit
  { path:'leads/edit/:id', component:LeadFormComponent},
  // Details
  { path:'leads/:id', component:LeadDetailComponent},
  { path:'**', redirectTo:'/leads' }

];
