import { Component } from '@angular/core';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { CountryISO, NgxIntlTelInputModule, SearchCountryField } from 'ngx-intl-tel-input-gg';

@Component({
  selector: 'app-signup',
  standalone: true,
  imports: [NgxIntlTelInputModule, ReactiveFormsModule, FormsModule],
  templateUrl: './signup.component.html',
  styleUrl: './signup.component.css'
})
export class SignupComponent {
  SearchCountryField = SearchCountryField
  CountryISO = CountryISO
}
