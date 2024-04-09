/**
 *          FILENAME: dashboard.component.ts
 *             ROUTE: totalscope_webclient/src/app/modules/dashboard/
 *            AUTHOR: ICI/AD
 *              WHAT: HOLDS MAIN WAREFRAME OF DASHBOARD
 *               HOW: THIS WILL INJECT THE LEFT MENU, TOP BAR AND PAGE CONTAINER.
 *   IMPORTING FILES: dashboard.component.html | dashboard.component.scss
 * SUBSCRIBING FILES: dashboard.module.ts | dashboard.routing.ts
 *  LAST COMMIT DATE: DECEMBER 12, 2023
 */

/**
 * COMPONENT | PROVIDES THE LOGIC AND TEMPLATE FOR CREATING COMPONENTS.
 */
import { Component } from '@angular/core';
import { StepType } from "@progress/kendo-angular-layout";
import { ApiService } from 'src/core/api.service';


// DECLARE VARIABLE $ TO ANY TYPE. LATER, IT CAN BE CAST TO THE DESIRED TYPE.
declare var $: any;
/**
 * @COMPONENT | DEFINES THE COMPONENT AND ITS PROPERTIES.
 * SELECTOR | DEFINES THE NAME OF THE COMPONENT.
 * TEMPLATEURL AND STYLEURLS | DEFINES THE HTML AND CSS FILES THAT ARE USED BY THE COMPONENT.
 */
@Component
({
  selector: 'app-create-new-file',
  templateUrl: './create-new-file.component.html',
  styleUrls: ['./create-new-file.component.scss'],
})

export class CreateNewFileComponent
{
  public current = 0;
  public stepType: StepType = "indicator";
  public stepTypes: Array<StepType> = ["indicator", "label", "full"];
  public steps = [
    { label: "First step", isValid: true },
    { label: "Second step", isValid: true },
    { label: "Third step", isValid: true },
    { label: "Fourth step", isValid: true },
    { label: "Fifth step", isValid: true },
  ];


  constructor (
    private apiService: ApiService,
    ) {}

  ngOnInit()
  {
  }

  public next()
  {
    this.current ++;
  }

  public prev()
  {
    this.current --;
  }

}
