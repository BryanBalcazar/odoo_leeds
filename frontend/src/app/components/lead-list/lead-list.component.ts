// frontend/src/app/components/lead-list/lead-list.component.ts
import { Component, OnInit, ChangeDetectorRef } from '@angular/core';
import { CommonModule, DecimalPipe } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { OdooService, Lead } from '../../services/odoo.service';
import { Router } from '@angular/router';

@Component({
  selector: 'app-lead-list',
  standalone: true,
  imports: [CommonModule, FormsModule, DecimalPipe],
  templateUrl: './lead-list.component.html',
  styleUrls: ['./lead-list.component.css']
})
export class LeadListComponent implements OnInit {
  leads: Lead[] = [];
  loading: boolean = false;
  error: string = '';
  connectionStatus: boolean = false;

  constructor(
    private odooService: OdooService,
    private router: Router,
    private cdr: ChangeDetectorRef
  ) { }

  ngOnInit(): void {
    this.checkConnection();
    this.loadLeads();
  }

  checkConnection(): void {
    this.odooService.checkConnection().subscribe({
      next: (response) => {
        this.connectionStatus = response.success;
        if (!response.success) {
          this.error = 'No se pudo conectar con Odoo. Verifica la configuración.';
        }
      },
      error: (err) => {
        this.connectionStatus = false;
        this.error = 'Error de conexión con el backend Django.';
      }
    });
  }

  loadLeads(): void {
    this.loading = true;
    this.odooService.getLeads(50).subscribe({
      next: (response) => {
        if (response.success) {
          this.leads = response.data;
          this.cdr.detectChanges();
        }
        this.loading = false;
        this.cdr.detectChanges();
      },
      error: (err) => {
        this.error = 'Error de conexión con la API';
        this.loading = false;
        this.cdr.detectChanges();
      }
    });
  }

  refreshLeads(): void {
    this.loadLeads();
  }

  // Método faltante que causa el error
  viewLeadDetails(lead: Lead): void {
    this.router.navigate(['/leads', lead.id]);
  }

  // Método auxiliar para formatear fechas
  formatDate(dateString: string): string {
    if (!dateString) return '';
    const date = new Date(dateString);
    return date.toLocaleDateString('es-ES', {
      year: 'numeric',
      month: 'short',
      day: 'numeric'
    });
  }

  // Método para determinar la clase CSS según la probabilidad
  getProbabilityClass(probability: number): string {
    if (probability >= 70) return 'high-probability';
    if (probability >= 30) return 'medium-probability';
    return 'low-probability';
  }
}
