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

  constructor(private http: HttpClient) { }

  checkConnection(): Observable<any> {
    return this.http.get(`${this.apiUrl}/health/`);
  }

  getLeads(limit: number = 50): Observable<any> {
    return this.http.get(`${this.apiUrl}/leads/?limit=${limit}`);
  }

  getLeadById(id:number){
      return this.http.get<any>(
    `${this.apiUrl}/leads/${id}/`
      );
  }

  createLead(data:any){
    return this.http.post(
    `${this.apiUrl}/leads/create/`, data
    );
}

// UPDATE

updateLead(id:number,data:any){
return this.http.put(
`${this.apiUrl}/leads/${id}/update/`, data
);
}


deleteLead(id:number){
return this.http.delete(
`${this.apiUrl}/leads/${id}/delete/`
);

}
}
