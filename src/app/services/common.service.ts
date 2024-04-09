
import { Injectable } from '@angular/core';
import { BehaviorSubject, Observable, Subject } from 'rxjs';
import { ApiService } from 'src/core/api.service';

// RESPONSIBLE TO SERVE ALMOST EVERY SERVICE IN ENTIRE PROJECT.
@Injectable({
    providedIn: 'root'
  })
export class CommonService {
  public contractorDetails = {entity_id: '', contractor_id: '', entitycode: ''};
  public teamId = '';
  public emailsArray: string[] = [];
    constructor(private apiService:ApiService) {
      const userDataString = localStorage.getItem('userData');
        if (userDataString !== null) {
      // Parse the JSON string to get the userData object
        const userData = JSON.parse(userDataString);

      // Extract the userId property
          var userId = userData?.userId || '';
        } 
        else {
          console.error('Error: userDataString is null');
          }
          debugger;
        this.apiService.get(`/entity/get-company-by-id?id=${userId}`)
        .subscribe(
        (response) => {
          this.contractorDetails.entity_id = response.data[0].entity_id;
          this.apiService.get(`/registration-steps/get-step-3?entity_id=${this.contractorDetails.entity_id}`)
          .subscribe((response)=>{
          this.teamId=response.data[0].team_id;
          this.contractorDetails.entitycode=response.data[0].entitycode;
        });
        });
      
     }

  
}
 