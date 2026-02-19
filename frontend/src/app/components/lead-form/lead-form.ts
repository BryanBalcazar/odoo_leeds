import { Component, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { ActivatedRoute, Router } from '@angular/router';
import { OdooService } from '../../services/odoo.service';

@Component({

selector:'app-lead-form',
standalone:true,
imports:[CommonModule,FormsModule],
templateUrl:'./lead-form.html',
styleUrls:['./lead-form.css']

})

export class LeadFormComponent implements OnInit{

  lead:any={
  name:'',
  email_from:'',
  phone:'',
  expected_revenue:0,
  probability:0
  };

  isEdit=false;
  loading=false;

  constructor(
  private route:ActivatedRoute,
  private router:Router,
  private odooService:OdooService

  ){}


  ngOnInit(){
    const id=this.route.snapshot.params['id'];
    // si existe edita el ID
    if(id){
    this.isEdit=true;
    this.loadLead(id);
    }
  }

  loadLead(id:number){

    this.loading=true;
    this.odooService
    .getLeadById(id).subscribe({
      next:(res)=>{
      this.lead=res.data;
      this.loading=false;
      },
      error:()=>{
      this.loading=false;
      }
    });
  }
  save(){

    this.loading=true;
    if(this.isEdit){
      this.odooService
      .updateLead(this.lead.id,this.lead).subscribe({
      next:()=>{
        this.loading=false;
        this.router.navigate(['/leads']);
        }
      });
    }

    else{
        this.odooService
        .createLead(this.lead).subscribe({ next:()=>{
          this.router.navigate(['/leads']);},
        error:(err)=>{
          console.error(err);
          this.loading=false;
          alert('Error guardando el lead');
          }
        });
      }
    }
}

