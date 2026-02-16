import { Component } from '@angular/core';
import { CommonModule } from '@angular/common';
import { RouterModule, RouterOutlet } from '@angular/router';

@Component({
  selector: 'app-root',
  standalone: false, // Asegúrate que esto sea false si usas módulos
  templateUrl: './app.component.html',
  styleUrls: ['app.component.css']
})
export class AppComponent {
  currentYear = new Date().getFullYear();
}
