/*
		  FILENAME: src\app\modules\auth\register\contractor\components\contractorprofile\contractorprofile.component.ts
			AUTHOR: ICI/SZ
		   SUMMARY: HOLDS THE REGISTRATION OF COMPANY PROFILE FORM.
		   PURPOSE: TO MAKE MULTIPLE COMPONENTS TO GET USE IN DIFFERENT PLACES AND STAY SEPARATE OF CONCERNS
   IMPORTING FILES: contractorprofile.component.html | contractorprofile.component.scss
 SUBSCRIBING FILES: contractor-details.component.ts
  LAST COMMIT DATE: SEPTEMBER 4, 2023
*/

// TBD
import {Component, EventEmitter, Input, OnChanges, OnInit, Output, SimpleChanges, ViewChild} from '@angular/core';
import {FormBuilder, FormControl, FormGroup, Validators} from '@angular/forms';
import {CommonService} from 'src/app/services/common.service';
import {GenericService} from 'src/app/services/generic.service';
import { HelperService } from 'src/app/services/helper.service';
import {ActivatedRoute, NavigationEnd, NavigationStart, Router} from "@angular/router";
// TBD
@Component
	({
		selector: 'app-contractor-profile',
		templateUrl: './contractorprofile.component.html',
		styleUrls: ['./contractorprofile.component.scss']
	})

// TBD
export class ContractorProfileComponent implements OnInit, OnChanges
{
	// TBD
	constructor(
		private formBuilder: FormBuilder,
		private genericService: GenericService,
		private commonService: CommonService,
		private helper: HelperService,
		private router: Router
	) { }

	// CREATING INPUT AND OUTPUT FOR DATA COMMUNICATION FOR COMPONENTS
	@Input() companyType: string = '';
	@Input() current: number = 0;

	@Output() currentPage = new EventEmitter();
	@Output() isValid = new EventEmitter();

	public stepSubcription: any;

	// TBD
	public contractorProfileForm: FormGroup | any;

	public imageUrl = "";
	public file: any;
	public payload: any;
	public teamPayload: any;
	public data = [];
	public dataSource = [];
	public phoneMask = "(000) 000-0000";
	public entityId = '';
	public is_updated: boolean = false;
	public getDataValues:any;

	// DROPDOWN FOR HOW DID YOU HEAR ABOUT TS
	public howDidYouHearList: Array<{text: string; value: string;}> = [
		{text: "Advertisement", value: "A"},
		{text: "Referral", value: "R"},
		{text: "Online Search", value: "OS"},
		{text: "Social Media", value: "SM"},
		{text: "Event", value: "E"},
		{text: "Other", value: "O"},
	];

	// TBD
	ngOnInit(): void
	{

		// INITIALIZING REACTIVE ENTITY PROFILE FORM
		this.contractorProfileForm = this.formBuilder.group
			({
				companyname: new FormControl('', {validators: [Validators.required], updateOn: 'blur'}),
				streetnumber: new FormControl('', {validators: [Validators.required, Validators.minLength(1), Validators.maxLength(5)], updateOn: 'blur'}),
				streetname: new FormControl('', {validators: [Validators.required], updateOn: 'blur'}),
				pobaddress: new FormControl(''),
				zip: new FormControl('', {validators: [Validators.required, Validators.pattern('^\\d{5}(-\\d{4})?$')], updateOn: 'blur'}),
				city: new FormControl('', {validators: [Validators.required, Validators.maxLength(50), Validators.pattern('^[a-zA-Z \']*$')], updateOn: 'blur'}),
				statename: new FormControl('', {validators: [Validators.required, Validators.pattern('^[a-zA-Z \']*$')], updateOn: 'blur'}),
				email: new FormControl('', {validators: [Validators.required, Validators.pattern('^\\w+(?:[\\.+\\-]\\w+)*@\\w+(?:[\\.-]\\w+)*(?:\\.\\w{2,})+$'), Validators.maxLength(75)], updateOn: 'blur'}),
				mobilephone: new FormControl('', {validators: [Validators.required, Validators.pattern('^(?:\\+1|(?:\\+\\d{1,3}))?[-\\s]?\\d{3}[-\\s]?\\d{3}[-\\s]?\\d{4}$')], updateOn: 'blur'}),
				websiteurl: new FormControl('', {validators: [Validators.pattern('^(https?:\/\/)?(?:[a-zA-Z][a-zA-Z0-9-]*\\.)+[a-zA-Z]{2,}$')], updateOn: 'blur'}),
				expectedmonthlyroofcompletions: new FormControl('', {validators: [Validators.required, Validators.pattern('^[0-9]*$')], updateOn: 'blur'}),
				howdidyouhear: new FormControl({text: "Select item...", value: null}),
				agreeCheck: new FormControl(),
			});

		this.entityId = this.commonService.contractorDetails.entity_id;

		if (this.entityId)
		{
			this.getContractorProfile(this.entityId);
		}

		this.stepSubcription = this.helper.onSteperChange.subscribe((step: any) =>{
			this.onSteperSelected(step);
		});

		if(sessionStorage.getItem('contractorResponseData'))
		{
			let contractorResponseData : any = sessionStorage.getItem('contractorResponseData');
			contractorResponseData = JSON.parse(contractorResponseData);
			this.commonService.contractorDetails = contractorResponseData;
			this.entityId = this.commonService.contractorDetails.entity_id;
			if (this.entityId)
			{
				this.getContractorProfile(this.entityId);
			}
		}
		
		if(sessionStorage.getItem('contractorFormData'))
		{
			let contractorFormData : any = sessionStorage.getItem('contractorFormData');
			contractorFormData = JSON.parse(contractorFormData);
			//this.getDataValues = contractorFormData;
			this.mapFormFields(contractorFormData);
		}
	}

	ngOnDestroy()
	{
		this.stepSubcription.unsubscribe();
	}

	ngOnChanges(changes: SimpleChanges): void
	{
		if (this.entityId)
		{
			this.getContractorProfile(this.entityId);
		}
	}

	ngAfterViewInit()
	{
		this.genericService.get('zip/zip').subscribe({
			next: (response) =>
			{
				this.data = response.data;
				this.dataSource = response.data;
			},
			error: (error) =>
			{
				console.log('error==>', error);
			}
		});
	}
	

	public subscribeFormChange()
	{
		this.contractorProfileForm.valueChanges.subscribe((e: any) =>
		{
			if (this.contractorProfileForm.dirty)
			{
				this.is_updated = true;
			}
		});
	}

	// TO CHANGE THE STEPPER TO NEXT PREVIOUS
	public async onNext()
	{
		const isValid = await this.validateForm();
		if (isValid)
		{
			this.saveContractorProfile().then(()=>{
				this.currentPage.emit(this.current + 1);
				this.isValid.emit(true);
			}).catch((err) => console.log('error=>', err));
		}
		
	}

	// CALL THIS FUNTION ON CHANGE STEPER ON CLICK
	public async onSteperSelected (stepNumber: any)
	{
		if(stepNumber > this.current)
		{
			const isValid = await this.validateForm();
			if (isValid)
			{
				this.saveContractorProfile().then(()=>{
					this.currentPage.emit(stepNumber);
					this.isValid.emit(true);
				}).catch((err) => console.log('error=>', err));
			} else {
				this.helper.onSteperValidationError.next(0);
			}
		}else{
			this.currentPage.emit(stepNumber);
		}
	}

	// TO CHECK THE VALIDATION OF FORM
	public validateForm()
	{
		let isValid = true
		if (this.contractorProfileForm.invalid)
		{
			isValid = false
			this.contractorProfileForm.markAllAsTouched()
		}
		return isValid
	}

	public getZipCode(value: any)
	{
		for (let index = 0; index < this.data.length; index++)
		{
			const element: any = this.data[index];
			if (element.zip_id === value)
			{
				return element;
			}
		}
	}


	// GET ZIP
	public zipChange(form: any)
	{
		const zipCode = form.get('zip').value;
		const zipObject = this.getZipCode(zipCode);

		form.controls['city'].setValue(zipObject?.city || "");
		form.controls['statename'].setValue(zipObject?.state || "");
	}

	// SAVE CONTRACTOR PROFILE

	public saveContractorProfile()
	{
		return new Promise((resolve, reject) =>
		{
			const formValue = this.contractorProfileForm.value;
			if (formValue.agreeCheck === true)
			{
				formValue.agreementstatusenglish = 'AGREE';
				formValue.agreementstatusspanish = 'DE ACUERDO';
			} else
			{
				formValue.agreementstatusenglish = 'DISAGREE'
				formValue.agreementstatusspanish = 'EN DESACUERDO'
			}

			const isValid = this.validateForm();

			if (isValid && this.entityId)
			{
				this.payload = {
					...formValue,
					'entityType': this.companyType[0].toUpperCase() + this.companyType.slice(1),
					'contractortype': this.getDataValues.contractortype,
					'entity_id': this.getDataValues.entity_id,
					"city_id": this.getDataValues.city_id,
					"state_id": this.getDataValues.state_id,
					"address_id": this.getDataValues.address_id,
					"contractor_id": this.getDataValues.contractor_id,
					"country_id": this.getDataValues.country_id,
				};
				sessionStorage.setItem("contractorFormData", JSON.stringify(this.payload));
				this.genericService.put(`registration-steps/update-step-1?entity_id=${this.entityId}`, this.payload).subscribe({
					next: (response) =>
					{
						if (response)
						{
							console.log('update-step');
							resolve(true);
						}
						else
						{
							reject(response);
						}
					},
					error: (error) =>
					{
						reject(error);
					}
				});
				
			}
			else if(isValid && !this.entityId)
			{
				this.payload = {
					...formValue,
					'entityType': this.companyType[0].toUpperCase() + this.companyType.slice(1),
					'contractortype': 'Roofing'
				};

				sessionStorage.setItem("contractorFormData", JSON.stringify(this.payload));

				this.genericService.post('auth/register', this.payload).subscribe({
					next: (response) =>
					{
						if (response.status === 'success')
						{
							resolve(true);
							const resIds = {'entity_id': response.data.entity_id, 'contractor_id': response.data.contractor_id, 'entitycode': response.data.entitycode}
							sessionStorage.setItem("contractorResponseData", JSON.stringify(response.data));

							this.commonService.contractorDetails = resIds;
							
							this.createTeam(response.data.entity_id, response.data.entitycode)
							
						}
						else
						{
							reject(response.message);
						}
					},
					error: (error) =>
					{
						reject(error);
					}
				});
			}
			else
			{
				reject('Invalid Field');
			}
		});
	}

	// GET CONTRACTOR PROFILE DATA
	public getContractorProfile(entityId: any)
	{

		this.genericService.get(`registration-steps/get-step-1?entity_id=${entityId}`).subscribe({
			next: (response) =>
			{
				if (response.status === 'success')
				{
					this.mapFormFields(response.data[0]);
					this.getDataValues = response.data[0];
					this.subscribeFormChange();
				}
				else
				{
					console.log('error', response.message);
				}
			},
			error: (error) =>
			{
				console.log('error', error);
			}
		});
	}

	public mapFormFields(data: any)
	{
		this.contractorProfileForm?.get('companyname')?.setValue(data.companyname);
		this.contractorProfileForm?.get('streetnumber')?.setValue(data.streetnumber);
		this.contractorProfileForm?.get('streetname')?.setValue(data.streetname);
		this.contractorProfileForm?.get('pobaddress')?.setValue(data.pobaddress);
		this.contractorProfileForm?.get('zip')?.setValue(data.zip);
		this.contractorProfileForm?.get('city')?.setValue(data.city);
		this.contractorProfileForm?.get('statename')?.setValue(data.statename);
		this.contractorProfileForm?.get('email')?.setValue(data.email);
		this.contractorProfileForm?.get('mobilephone')?.setValue(data.mobilephone);
		this.contractorProfileForm?.get('websiteurl')?.setValue(data.websiteurl);
		this.contractorProfileForm?.get('expectedmonthlyroofcompletions')?.setValue(data.expectedmonthlyroofcompletions);
		this.contractorProfileForm?.get('howdidyouhear')?.setValue(this.findObjectByValue(data.howdidyouhear, this.howDidYouHearList));
		this.contractorProfileForm?.get('agreeCheck')?.setValue(data.agreementstatusenglish === 'AGREE' ? true : false);
	}

	public findObjectByValue(value: string, list: any)
	{
		for (let i = 0; i < list.length; i++)
		{
			if (list[i].value === value)
			{
				return list[i];
			}
		}
		return {text: "Select item...", value: null};
	}

	public createTeam(entity_id: string, entitycode: string)
	{
		return new Promise((resolve, reject) =>
		{
			const teamname = 'General';
			this.teamPayload = {'entity_id': entity_id, 'teamname': teamname, 'entitycode': entitycode};

			this.genericService.post('team/create-team', this.teamPayload).subscribe({
				next: (response) =>
				{
					this.commonService.teamId = response.data.insertId;
					resolve(true);
				}, error: (error) =>
				{
					reject(error);
				}
			})
		});
	}

	/**
	 * @title THIS FUNCTION WILL BE CALLED WHEN USER DROPS THE IMAGES IN "DROP FILES HERE" AREA
	 *
	 * @description
	 *    * WE ARE GETTING AN EVENT (ANGULAR PROVIDE THIS THING WHILE HANDLING A DROP EVENT)
	 *    * THE FILE USER DROPS WILL BE INSIDE  event.dataTransfer.files
	 *    * WE ARE USING A FUNCTION event.preventDefault IT STOPS FROM ALL OTHER ACTION THAT ANGULAR DO IT'S OWN
	 *
	 * @param event any
	 */
	onDrop(event: any): void
	{
		event.preventDefault();
		const files: FileList = event.dataTransfer.files; // TBD

		// TBD
		if (files.length > 0)
		{
			this.onFileUpload({target: {files}});
		}
	}

	/**
	 * @title THIS FUNCTION WILL BE CALLED WHEN USER DRAGOVER THE DROP FILES HERE AREA
	 *
	 * @description
	 *    * WE ARE GETTING AN EVENT (ANGULAR PROVIDE THIS THING WHILE HANDLING A DRAG EVENT)
	 *
	 * @param event any
	 */
	onDragOver(event: any): void
	{
		event.preventDefault();
	}

	/**
	 * @title THIS WILL BE USED TO REMOVE THE UPLOADED IMAGE
	 */
	public removeImage()
	{
		this.imageUrl = '';
		this.file = null;
	}

	/**
	 * @title THIS FUNCTION WILL BE CALLED WHEN USER CLICK ON UPLOAD FILES OR DROP THE FILE
	 *
	 * @description
	 *    * WE ARE GETTING AN EVENT (ANGULAR PROVIDE THIS THING WHEN WE UPLOAD A FILE)
	 *    * THE FILE USER UPLOADS WILL BE INSIDE event.target.files <ARRAY/OBJECT
	 *
	 * @flow
	 *    * FIRST WE HAVE CREATED A ARRAY OF VALID EXTENSIONS WITH NAME validExts
	 *    * THEN WE ARE GETTING THE NAME OF UPLOADED FILE
	 *    * THEN WE ARE SPLITTING THE NAME FROM '.' AND COMPARING THE EXTENSION NAME FROM OUR validExts ARRAY
	 *    * PASSING THE FILE TO READER TO SHOW THE PREVIEW OF FILE
	 *
	 * @param event any
	 */
	public async onFileUpload(event: any)
	{
		let validExts = new Array('.jpg', '.png', '.jpeg', '.svg', '.gif');
		let fileExt = event.target.files[0]?.name;
		fileExt = fileExt.substring(fileExt.lastIndexOf('.'));

		// THIS WILL VALIDATE FILE TYPES AND IF IT'S WRONG THE RETURN NULL VALUE
		if (validExts.indexOf(fileExt) < 0)
		{
			return;
		}
		this.file = event.target.files.item(0);

		//TO SHOW IMAGE PREVIEW
		let reader = new FileReader();

		// TBD
		reader.onload = (event: any) =>
		{

			this.imageUrl = event.target.result;
		};

		// TBD
		reader.readAsDataURL(event.target.files.item(0));
	}


}
