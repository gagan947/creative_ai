import { Component } from '@angular/core';
import { HeaderComponent } from "../shared/header/header.component";
import { FooterComponent } from "../shared/footer/footer.component";
import { CountryISO, NgxIntlTelInputModule, SearchCountryField } from 'ngx-intl-tel-input-gg';
import { FormGroup, FormBuilder, Validators, ReactiveFormsModule, FormsModule } from '@angular/forms';
import { CommonModule } from '@angular/common';
import { Router } from '@angular/router';
import { ApiService } from '../../services/api.service';
import { NzMessageService } from 'ng-zorro-antd/message';
declare var bootstrap: any;
declare var Calendly: any;
@Component({
  selector: 'app-free-demo',
  standalone: true,
  imports: [HeaderComponent, FooterComponent, NgxIntlTelInputModule, ReactiveFormsModule, CommonModule, FormsModule],
  templateUrl: './free-demo.component.html',
  styleUrl: './free-demo.component.css'
})
export class FreeDemoComponent {
  SearchCountryField = SearchCountryField
  CountryISO = CountryISO
  countries: any;
  myForm!: FormGroup;
  demoId: any;
  constructor(private fb: FormBuilder, private apiService: ApiService, private router: Router, private message: NzMessageService) { }

  ngOnInit(): void {
    this.myForm = this.fb.group({
      fullName: ['', [Validators.required, Validators.minLength(3)]],
      phoneNumber: ['', [Validators.required]],
      businessEmail: ['', [Validators.required, Validators.email]],
      companyName: ['', [Validators.required]],
      companySize: ['', [Validators.required]],
      jobTitle: ['', [Validators.required]]
    });
  };

  get f() {
    return this.myForm.controls;
  };


  onSubmit(): void {
    if (this.myForm.invalid) {
      this.myForm.markAllAsTouched(); // Show all errors
      return;
    }


    const formData = { ...this.myForm.value };

    // Concatenate dial code with number
    if (formData.phoneNumber && formData.phoneNumber.dialCode && formData.phoneNumber.number) {
      formData.phoneNumber = `${formData.phoneNumber.dialCode}${formData.phoneNumber.number}`;
    }

    this.apiService.postAPI('api/user/getFreeDemo', formData).subscribe({
      next: (response: any) => {
        if (response.success)
          this.demoId = response.data.insertId
        this.myForm.reset(); // Reset form after submission
        const modal = new bootstrap.Modal(document.getElementById('tellUs') as HTMLElement);
        modal.show();
      },
      error: (error) => {
        console.error('Error:', error);
        this.message.error('Something went wrong. Please try again.');
        // alert('Something went wrong. Please try again.');
      }
    });
  };


  onTellUsSubmit(form: any) {
    this.apiService.postAPI(`api/user/tellUsAbout?demoId=${this.demoId}`, form.value).subscribe({
      next: (response: any) => {
        if (response.success)
          form.reset(); // Reset form after submission
        const modal = new bootstrap.Modal(document.getElementById('tellUs') as HTMLElement);
        modal.close();
      },
      error: (error) => {
        console.error('Error:', error);
        // alert('Something went wrong. Please try again.');
        this.message.error('Something went wrong. Please try again.');
      }
    })
  };

  openCalendly() {
    Calendly.initPopupWidget({ url: 'https://calendly.com/mohdfaraz-ctinfotech/30min' });
  };

  ngAfterViewInit() {
    const calendlyContainer = document.getElementById('calendly-inline-widget');
    if (calendlyContainer) {
      Calendly.initInlineWidget({
        url: 'https://calendly.com/mohdfaraz-ctinfotech/30min',
        parentElement: calendlyContainer
      });
    }
  }
}
