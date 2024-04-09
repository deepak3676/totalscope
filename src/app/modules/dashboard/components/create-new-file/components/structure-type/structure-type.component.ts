
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
  selector: 'app-structure-type',
  templateUrl: './structure-type.component.html',
  styleUrls: ['./structure-type.component.scss'],
})

export class StructureTypeComponent
{
  public showOtherType: boolean = false;

  structureTypeForm = new FormGroup({
    structureName: new FormControl(''),
    structureType: new FormControl('dwelling'),
    otherType: new FormControl(''),
  });

  constructor () {}

  ngOnInit() {}

  public onStructureTypeClick(value: string)
  {
    if( value === 'other')
    {
      this.showOtherType = true;
    }
    else
    {
      this.showOtherType = false;
    }
  }

}
