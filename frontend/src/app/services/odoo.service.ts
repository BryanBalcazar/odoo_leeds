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

  private apiUrl = 'http://localhost:8000/api';

  constructor(private http: HttpClient) {}

  getLeads(limit: number = 100): Observable<any> {
    return this.http.get(`${this.apiUrl}/leads/?limit=${limit}`);
  }

  checkConnection(): Observable<any> {
    return this.http.get(`${this.apiUrl}/health/`);
  }
}
