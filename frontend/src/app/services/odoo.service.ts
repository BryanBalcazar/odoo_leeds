import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';

export interface Lead {
  id: number;
  name: string;
  email: string;
  phone: string;
  stage: string;
  assigned_to: string;
  created_date: string;
  expected_revenue: number;
  probability: number;
  description: string;
}

@Injectable({
  providedIn: 'root'
})
export class OdooService {
  private apiUrl = 'http://localhost:8000/api/odoo';

  constructor(private http: HttpClient) { }

  getLeads(limit = 20, offset = 0): Observable<any> {
    return this.http.get<any>(`${this.apiUrl}?limit=${limit}&offset=${offset}`);
  }

  getLead(id: number): Observable<any> {
    return this.http.get<any>(`${this.apiUrl}${id}/`);
  }

  createLead(data: any): Observable<any> {
    return this.http.post<any>(`${this.apiUrl}create/`, data);
  }

  updateLead(id: number, data: any): Observable<any> {
    return this.http.put<any>(`${this.apiUrl}${id}/update/`, data);
  }

  deleteLead(id: number): Observable<any> {
    return this.http.delete<any>(`${this.apiUrl}${id}/delete/`);
  }

  checkConnection(): Observable<any> {
    return this.http.get(`${this.apiUrl}/health/`);
  }
}
