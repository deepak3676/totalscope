
import {Component, ViewChild} from '@angular/core';
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
  selector: 'app-property-type',
  templateUrl: './property-type.component.html',
  styleUrls: ['./property-type.component.scss'],
})

export class PropertyTypeComponent
{
  public showCheck: boolean[]=[false, false, false, false];
  public current: number = -1;
  @ViewChild('upload', { static: false }) uploadComponent: any;
  public showUpload: boolean = false;
  public selectedFile: File | null = null;
  public imageUrl: string | ArrayBuffer | null = null;
  public show: boolean = false;
  public uploadSaveUrl = "saveUrl";
  public uploadRemoveUrl = "removeUrl";
  public uploadProgress = 0;

  propertyDetailsForm = new FormGroup({
    propertyType: new FormControl('sf'),
    estimateType: new FormControl('ic'),
  });

  constructor () {}

  ngOnInit() {}

  public toggleCheck(blockNumber: number): void {
    this.showCheck[blockNumber] = !this.showCheck[blockNumber];
    this.current = blockNumber ;
  }

  public isAnyCheckTrue(): boolean {
    return this.showCheck.some(check => check);
  }

  // FUNCTION TO UPLOAD IMAGE
  public onClickSelectFile() 
  {
    const fileInput = document.getElementById('selectFile') as HTMLInputElement;
  }

  // FUNCTION TO GENERATE THE IMAGE URL
  public onFileSelected(event: any) 
  {
    const file = event.target.files[0];

    if (file) 
    {
      this.selectedFile = file;
      // Read the file and generate a data URL
      const reader = new FileReader();
      reader.onload = (e) => {
        this.imageUrl = e.target?.result as string;
        this.uploadProgress = 100;
      };
      reader.readAsDataURL(file);
    }
  }

  // FUNCTION TO CALCULATE THE SIZE OF THE IMAGE
  public formatFileSize(size: number): string 
  {
    const KB = 1024;
    const MB = KB * 1024;

    if (size < KB) 
    {
      return size + ' B';
    } 
    else if (size < MB) 
    {
      return (size / KB).toFixed(2) + ' KB';
    } 
    else 
    {
      return (size / MB).toFixed(2) + ' MB';
    }
  }

  public onRemove()
  {
    this.imageUrl = null;
  }
}
