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
import { Component, ElementRef, EventEmitter, Input, OnInit, Output, Renderer2 } from '@angular/core'
import { Router } from '@angular/router';
import { PageChangeEvent } from '@progress/kendo-angular-grid';
import { SVGIcon, folderIcon } from '@progress/kendo-svg-icons';
import { CommonService } from 'src/app/services/common.service';
import { ApiService } from 'src/core/api.service';
import { CreateUsersComponent } from 'src/app/modules/auth/register/contractor/components/createusers/createusers.component';
import { GridDataResult } from '@progress/kendo-angular-grid';
import { arrowDownIcon, arrowUpIcon } from "@progress/kendo-svg-icons";

/**
 * @COMPONENT | DEFINES THE COMPONENT AND ITS PROPERTIES.
 * SELECTOR | DEFINES THE NAME OF THE COMPONENT.
 * TEMPLATEURL AND STYLEURLS | DEFINES THE HTML AND CSS FILES THAT ARE USED BY THE COMPONENT.
 */
@Component
  ({
    selector: 'app-accounts',
    templateUrl: './accounts.component.html',
    styleUrls: ['./accounts.component.scss'],
  })

export class AccountsComponent implements OnInit {

  companyTypeAfterLogin: string = 'contractor';
  isEditOpen: string = 'true';

  addUserButtonClicked: boolean = false;
  public checkMode: any = "multiple";
  public selectionMode: any = "single";
  public checkOnClick = false;
  public checkParents = true;
  public checkDisabledChildren = false;
  public checkChildren = true;
  public enableCheck = true;
  public checkInProgress = true;
  public checkUnsubmit = true;
  statusOptions = ['All', 'Active', 'Inactive'];
  selectedStatus: string = 'All';
  public folderSVG: SVGIcon = folderIcon;
  public loanData: any
  public pageSize = 9;
  public buttonCount = 4;
  public sizes = [10, 20, 50];
  public loanDataTableHeight: number = 200; // HEIGHT OF THE TABLE.
  public dataTablePageSize: number = 5; // NUMBER OF RECORDS TO BE DISPLAYED IN TABLE.
  public sort: any;
  public range = { start: new Date('2024-01-01'), end: new Date() };
  public totalRecords: number = 0;
  public totalPages: number = 0;
  public skip: number = 0;
  public userData: any;
  public propertyId: string = '';
  public status = 'AVAILABLE'
  public sortby = 'status';
  public order = 'desc'
  public tsStatusList: any = ['Available', 'In Process']
  public timeList = ['15 Days', '30 Days'];
  public selectedTime = this.timeList[0];
  public searchQuery: any = '';
  public entity_Id = ''
  originalLoanData: any;

  selectAll: boolean = false;
  activeOnly: boolean = false;
  inactiveOnly: boolean = false;
  getStatusBackgroundColor(status: string): string {
    switch (status) {
      case "AVAILABLE":
        return "available";
      case "INPROCESS":
        return "inprocess";
      case "COMPLETED":
        return "completed";
      case "REJECTRETURN":
        return "rejectreturn";
      default:
        return "";
    }
  }

  constructor( private commonService: CommonService,
     private apiService: ApiService,
      private el: ElementRef) {
        const userDataString = localStorage.getItem('userData');

    // Check if userDataString is not null
      if (userDataString !== null) {
      // Parse the JSON string to get the userData object
      const userData = JSON.parse(userDataString);

      // Extract the userId property
      var userId = userData?.userId || ''; // Use the default value if userId is not present or undefined
      } 
      else {
      // Handle the case where userDataString is null (e.g., it's not a valid JSON string in local storage)
      console.error('Error: userDataString is null');
      }
    // this.entity_Id = this.commonService.contractorDetails.entity_id;
    this.apiService
    .get(`/entity/get-company-by-id?id=${userId}`)
    .subscribe(
    (response) => {
      this.entity_Id = response.data[0].entity_id;
      this.getFiles(this.entity_Id);
    });
      }
  ngOnInit() {
    // const element = document.querySelector('.k-hierarchy-cell.k-table-td');
    // if (element) {
    //   element.classList.add('hide-hierarchy-cell');
    // }
  }

  public pageChange(event: PageChangeEvent): void {
    this.skip = event.skip;
    this.loadItems();
  }


  userClickBack(data: boolean) {

    this.addUserButtonClicked = false;
    this.getFiles(this.entity_Id)
  }

  private loadItems(): void {


    if (this.loanData) {
      this.userData = this.loanData.map((item: {
        namefirst: string;
        namelast: string;
        activestatus: any;
        roles?: { role_id?: any; roletitle?: any; }[];
      }) => {
        const totalscopeRole = item.roles?.[0]?.roletitle || 'No Role';
        const companyRoles = item.roles?.slice(1).map(role => role.roletitle);

        const isSuperAdmin = totalscopeRole.toLowerCase() === 'super admin';

        return {
          userName: item.namefirst,
          lastName: item.namelast,
          tsstatus: item.activestatus,
          totalScopeRole: totalscopeRole,
          companyRole: companyRoles,
          showEditDeleteButtons: !isSuperAdmin,
          // Add other properties as needed
        };
      });
      this.totalPages = Math.ceil(this.userData.length / this.pageSize);
    }
  }

  public handleSearch(event: Event) {
    const inputValue = (event.target as HTMLInputElement).value;
    this.searchQuery = inputValue;
    this.loanData = this.originalLoanData.filter((item: { namefirst: string }) =>
      // Add your filtering logic here based on the search query and item properties
      item.namefirst.toLowerCase().includes(this.searchQuery.toLowerCase())
      // Add other properties as needed
    );
    this.loadItems();
  }


  public setOrder(value: string) {
    this.order = value;
    this.sortLoanData();
  }

  private sortLoanData() {
    // Assuming this.sortby is the property by which you want to sort
    switch (this.order) {
      case 'asc':
        this.loanData.sort((a: any, b: any) => a[this.sortby].localeCompare(b[this.sortby]));
        break;
      case 'desc':
        this.loanData.sort((a: any, b: any) => b[this.sortby].localeCompare(a[this.sortby]));
        break;
      default:
        // Handle other cases if needed
        break;
    }

    this.loadItems(); // Assuming loadItems() is responsible for updating the displayed data
  }
  public sortBy(value: string) {
    this.sortby = value;
    this.sortLoanData();
  }

  public dataForEdit: any;
  public getFiles(entity_Id: string) {
    this.apiService.get(`/registration-steps/get-step-3?entity_id=${entity_Id}`).subscribe(
      (response) => {
        // if (response.status === 'success') {
        this.totalRecords = response.data?.length;
        this.loanData = response.data;
        this.originalLoanData = [...this.loanData]; // Store the original data
        this.loadItems();


        // } else {
        //   console.error('Error fetching data:', response.error);
        // }
      },
      (error) => {
        console.error('API Error:', error);
      }
    );

  }
  addUser() {

    this.addUserButtonClicked = true;

  }
  public expandedRows: any[] = [];
  data: any;
  isMinusClicked = true;
  expandedState:boolean=true;
  buttonColor=true
  
  changeExpantionState(dataItem:any){
    dataItem.isMinusClicked=false;  
    this.isMinusClicked = true;
    this.el.nativeElement.querySelectorAll('.k-svg-i-minus')[0].click();
    const userDataString = localStorage.getItem('userData');

    // Check if userDataString is not null
      if (userDataString !== null) {
      // Parse the JSON string to get the userData object
      const userData = JSON.parse(userDataString);

      // Extract the userId property
      var userId = userData?.userId || ''; // Use the default value if userId is not present or undefined
      } 
    this.apiService
        .get(`/entity/get-company-by-id?id=${userId}`)
        .subscribe(
        (response) => {
          this.entity_Id = response.data[0].entity_id;
          this.getFiles(this.entity_Id);
        });


  }
  editUser(dataItem: any, rowIndex: number) {
    if (this.isMinusClicked) {
      this.isMinusClicked = false;
      this.buttonColor=false;
      var data=this.el.nativeElement.querySelectorAll('.k-svg-i-plus');
      data[rowIndex].click();
      // $('.k-svg-i-minus')[rowIndex].click();
      dataItem.isMinusClicked=true;
    } 
    else {
      this.changeExpantionState(dataItem);
      dataItem.isMinusClicked=false;
    }
    
    console.log(this.loanData[rowIndex]);
    this.data = this.loanData[rowIndex];
  }


  deleteUser(data: any) {

  }
}
