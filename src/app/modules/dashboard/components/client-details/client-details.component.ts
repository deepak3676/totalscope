import { Component } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { ApiService } from 'src/core/api.service';

@Component({
	selector: 'app-client-details',
	templateUrl: './client-details.component.html',
	styleUrls: ['./client-details.component.scss']
})
export class ClientDetailsComponent
{

	public ownerDetail: any = {};
	public propertyId: string | null = '';
	public tabSection: string | null = '';

	constructor 
	(
		private apiService: ApiService, 
		private route: ActivatedRoute,
		private router: Router,
	) { }

	ngOnInit ()
	{
		this.route.paramMap.subscribe(params =>
		{
			this.propertyId = params.get('propertyId');
			this.tabSection = params.get('tabSection');
		});
		this.getOwnerDetail();
		
	}

	// FUNCTION TO ROUTE TO THE SELECTED TAB
	public onSelect(e: any)
	{
		this.router.navigate(["dashboard", "client-details", this.propertyId, e.title.split(' ').at(0).split('.').at(0)]);
	}

	// FUNCTION TO GET THE OWNER DETAILS
	public getOwnerDetail () 
	{

		this.apiService.get(`/properties/find/${this.propertyId}`)
			.subscribe((response) =>
			{
				if (response.status === 'success') 
				{
					this.ownerDetail = response?.data;
				}
				else 
				{
					console.error('Error fetching data:', response.error);
				}
			}, (error) => 
			{
				console.error('API Error:', error);
			});
	}

}
