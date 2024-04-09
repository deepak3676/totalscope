import { Component } from '@angular/core'
@Component({
  selector: 'app-pricing',
  templateUrl: './pricing.component.html',
  styleUrls: ['./pricing.component.scss'],
})
export class PricingComponent {
  public items = [
    {
      icon: 'assets/images/svg/home.svg',
      text: '$297 for up to 2 structures (main house + shed/detached garage (ie)). Your first residential file is FREE.',
      heading: 'Residential Properties',
    },
    {
      icon: 'assets/images/svg/commercial.svg',
      text: 'Commercial and multifamily files are billed at 1.5% of the increase from the client-submitted insurance bid to the TotalScope estimate. TotalScope will invoice client separately for these files.',
      heading: 'Commercial Properties',
    },
    {
      icon: 'assets/images/svg/enterprise.svg',
      text: 'For volume north of 100 files per month, call us and we can discuss enterprise-level pricing for your organization',
      heading: 'Enterprise Pricing',
    },
  ]
}
