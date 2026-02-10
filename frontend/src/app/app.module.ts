import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { HttpClientModule } from '@angular/common/http';
import { RouterModule, Routes } from '@angular/router';
import { AppComponent } from './app.component';
import { LeadListComponent } from './components/lead-list/lead-list.component';

const routes: Routes = [
  { path: '', redirectTo: '/leads', pathMatch: 'full' },
  { path: 'leads', component: LeadListComponent },
  { path: '**', redirectTo: '/leads' }
];

@NgModule({
  declarations: [
    AppComponent,

  ],
  imports: [
    BrowserModule,
    CommonModule,
    FormsModule,
    HttpClientModule,
    RouterModule.forRoot(routes),
    LeadListComponent
  ],
  providers: [],
  bootstrap: [AppComponent]
})
export class AppModule { }
