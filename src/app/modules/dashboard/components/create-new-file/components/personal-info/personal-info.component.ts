
import {Component} from '@angular/core';
import { FormGroup, FormControl } from '@angular/forms';


// DECLARE VARIABLE $ TO ANY TYPE. LATER, IT CAN BE CAST TO THE DESIRED TYPE.
declare var $: any;
/**
 * @COMPONENT | DEFINES THE COMPONENT AND ITS PROPERTIES.
 * SELECTOR | DEFINES THE NAME OF THE COMPONENT.
 * TEMPLATEURL AND STYLEURLS | DEFINES THE HTML AND CSS FILES THAT ARE USED BY THE COMPONENT.
 */
@Component
({
  selector: 'app-personal-info',
  templateUrl: './personal-info.component.html',
  styleUrls: ['./personal-info.component.scss'],
})

export class PersonalInfoComponent
{

  profileForm = new FormGroup({
    firstName: new FormControl(''),
    lastName: new FormControl(''),
    phone: new FormControl(''),
    email: new FormControl(''),
  });

  constructor () {}

  ngOnInit() {}

}
