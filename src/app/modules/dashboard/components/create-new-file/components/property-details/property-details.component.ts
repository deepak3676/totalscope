
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
  selector: 'app-property-details',
  templateUrl: './property-details.component.html',
  styleUrls: ['./property-details.component.scss'],
})

export class PropertyDetailsComponent
{
  public showCheck: boolean[]=[false, false, false, false];
  public current: number = -1;
  public stateList: string[] = ['California', 'Alaska', 'Texas', 'Florida']; // STATIC LIST OF STATES, WILL UPDATE IT WITH API IN FUTURE
  public activeOption: any = '';
  propertyDetailsForm = new FormGroup({
    streetNumber: new FormControl(''),
    streetName: new FormControl(''),
    zip: new FormControl(''),
    city: new FormControl(''),
    state: new FormControl('California'),
    portfolioLink: new FormControl('')
  });
  public linksData = [ // STATIC LIST OF LINKS DATA
    {
      name: 'CompanyCam',
      asset: './assets/images/svg/company-cam.svg',
      link: ''
    },
    {
      name: 'Acculynx',
      asset: './assets/images/svg/Frame1.svg',
      link: ''
    },
    {
      name: 'Google Drive',
      asset: './assets/images/svg/drive.svg',
      link: 'www.google.com'
    },
    {
      name: 'OneDrive',
      asset: './assets/images/svg/Frame.svg',
      link: ''
    },
  ];

  constructor () {}

  ngOnInit() {}

  // FUNCTION TO UPDATE ACTIVE OPTION VAR AND SET VALUE IN PORTFOLIOLINK CONTROLLER
  public currentActive(index: number): void {
    // UPDATE PORTFOLIO LINK CONTROLLER
    this.propertyDetailsForm.controls.portfolioLink.setValue(this.linksData[index].link);
    // ASSIGN CURRENTLY CHECKED OPTION TO ACTIVE OPTION
    this.activeOption = this.linksData[index];
  }

  // FUNCTION TO SAVE THE PORTFOLIOLINK VALUE INTO LINKSDATA
  public updateLink(): void {
    const index = this.linksData.findIndex((item) => item.name === this.activeOption.name)
    if (index > -1) {
      this.linksData[index].link = this.propertyDetailsForm.controls.portfolioLink.value!;
    }
  }
}
