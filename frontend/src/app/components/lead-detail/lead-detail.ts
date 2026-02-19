import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { OdooService } from '../../services/odoo.service';
import { CommonModule } from '@angular/common';

@Component({
  selector:'app-lead-detail',
  standalone:true,
  imports:[CommonModule],
  template:`

  <h2>Detalle Lead</h2>

  <div *ngIf="lead">
     <p>ID: {{lead.id}}</p>
     <p>Nombre: {{lead.name}}</p>
     <p>Email: {{lead.email_from}}</p>
  </div>

  `
})
export class LeadDetailComponent implements OnInit {
  lead:any;

  constructor(
    private route:ActivatedRoute,
    private odooService:OdooService
  ){}

  ngOnInit(){
    const id = this.route.snapshot.paramMap.get('id');

    if(id){
      this.odooService.getLeadById(Number(id))
      .subscribe(res=>{
        this.lead = res.data;
      });
    }

  }

}
