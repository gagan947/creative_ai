import { Component } from '@angular/core';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { CountryISO, NgxIntlTelInputModule, SearchCountryField } from 'ngx-intl-tel-input-gg';
import { Country, State, City } from 'country-state-city'
import { CommonModule } from '@angular/common';

@Component({
  selector: 'app-signup',
  standalone: true,
  imports: [NgxIntlTelInputModule, ReactiveFormsModule, FormsModule, CommonModule],
  templateUrl: './signup.component.html',
  styleUrl: './signup.component.css'
})
export class SignupComponent {
  SearchCountryField = SearchCountryField
  CountryISO = CountryISO
  countries: any;

  ngOnInit(): void {
    this.countries = Country.getAllCountries()
  }
}
