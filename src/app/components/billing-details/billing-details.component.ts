import { Component } from '@angular/core';
import { Router, RouterLink } from '@angular/router';
import { Feature } from '../../models/projects';
import { FormBuilder, FormGroup, FormsModule, ReactiveFormsModule, Validators } from '@angular/forms';
import { ApiService } from '../../services/api.service';
import { CommonModule } from '@angular/common';
import { Country, State, City } from 'country-state-city'
import { CountryISO, NgxIntlTelInputModule, SearchCountryField } from 'ngx-intl-tel-input-gg';
import { NzMessageService } from 'ng-zorro-antd/message';

@Component({
  selector: 'app-billing-details',
  standalone: true,
  imports: [NgxIntlTelInputModule, CommonModule, FormsModule, ReactiveFormsModule],
  templateUrl: './billing-details.component.html',
  styleUrl: './billing-details.component.css'
})
export class BillingDetailsComponent {
  projectsFeatures: Feature[] = [];
  projectsData: any;
  totalSubFeatures: any;
  countries: any;
  states: any;
  cities: any;
  billingForm!: FormGroup;
  countryCode: string = '';
  SearchCountryField = SearchCountryField
  CountryISO = CountryISO
  constructor(private fb: FormBuilder, private apiService: ApiService, private message: NzMessageService, private router: Router) {
    let projectData = sessionStorage.getItem('projectData');
    this.projectsData = JSON.parse(projectData!);
    this.projectsFeatures = this.projectsData.selectdFeature;
    this.totalSubFeatures = this.projectsData.selectdFeature.reduce(
      (total: any, feature: { subFeaturesListWithPrice: string | any[]; }) => total + (feature.subFeaturesListWithPrice?.length || 0),
      0
    );
  };

  ngOnInit(): void {
    this.countries = Country.getAllCountries()

    this.billingForm = this.fb.group({
      customer_type: ['individual', Validators.required],
      company_name: ['', Validators.required],
      email: ['', [Validators.required, Validators.email]],
      phone: ['', Validators.required],
      company_location: ['', Validators.required],
      address_line_1: ['', Validators.required],
      address_line_2: [''],
      city: ['', Validators.required],
      state: ['', Validators.required],
      postal_code: ['', [Validators.required, Validators.pattern(/^\d{5,6}$/)]],
      estimated_duration: [''],
      expected_completion: [''],
      features: [''],
      customization: [''],
      studio_one_12_months: [''],
      total_cost: ['']
    });
  };

  getStateByCountry(event: any) {
    this.countryCode = event.target.value
    this.states = State.getStatesOfCountry(this.countryCode);
  };

  getCityByState(event: any) {
    this.cities = City.getCitiesOfState(this.countryCode, event.target.value);
  };

  onSubmit() {
    this.billingForm.markAllAsTouched()
    if (this.billingForm.invalid) {
      return;
    }
    let formData = this.billingForm.value;
    formData.phone = formData.phone.number
    formData.features = this.projectsData.totalCost
    formData.total_cost = this.projectsData.finalCost;
    formData.customization = this.projectsData.finalCost - this.projectsData.totalCost;
    formData.studio_one_12_months = 0;
    formData.estimated_duration = this.projectsData.estimated_time.toString();
    formData.expected_completion = this.projectsData.estimatedDate;
    this.apiService.postAPI(`api/user/addBillingInformation`, formData).subscribe({
      next: (res: any) => {
        if (res.success == true) {
          this.message.success(res.message);
          this.router.navigate(['/payment-plan']);
        }
      },
      error: err => {
        console.error('Error:', err);
        this.message.error(err.error.message);
      }
    })

  }
}
