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
  selectedFiles: File[] = [];
  ngOnInit(): void {
    this.myForm = this.fb.group({
      fullName: ['', [Validators.required, Validators.minLength(3)]],
      phoneNumber: ['', [Validators.required]],
      businessEmail: ['', [Validators.required, Validators.email]],
      companyName: ['', [Validators.required]],
      projectName: ['', [Validators.required]],
      projectDescription: ['', ],
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
    const updloadData = new FormData();
    if (this.selectedFiles.length > 0) {
      this.selectedFiles.forEach(file => {
        updloadData.append('multiple_files', file);
      });
    }

    updloadData.append('fullName', formData.fullName);

    updloadData.append('businessEmail', formData.businessEmail);
    updloadData.append('companyName', formData.companyName);
    updloadData.append('project_name', formData.projectName);
    updloadData.append('project_description', formData.projectDescription);
    updloadData.append('companySize', formData.companySize);
    updloadData.append('jobTitle', formData.jobTitle);
    updloadData.append('phoneNumber', formData.phoneNumber.internationalNumber);

    this.apiService.postAPI('api/user/getFreeDemo', updloadData).subscribe({
      next: (response: any) => {
        if (response.success)
          this.demoId = response.data.insertId
        this.myForm.reset();
        this.selectedFiles = []; // Reset form after submission
        const modal = new bootstrap.Modal(document.getElementById('ct_schedule_call_modal') as HTMLElement);
        modal.show();
      },
      error: (error) => {
        console.error('Error:', error);
        this.message.error('Something went wrong. Please try again.');
        // alert('Something went wrong. Please try again.');
      }
    });
  };

  onFileChange(event: Event): void {
    const input = event.target as HTMLInputElement;

    if (input.files) {
      this.selectedFiles = Array.from(input.files);
    }
  }

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
    Calendly.initPopupWidget({ url: 'https://calendly.com/amitholkar/30min' });
  };

  ngAfterViewInit() {
    const calendlyContainer = document.getElementById('calendly-inline-widget');
    if (calendlyContainer) {
      Calendly.initInlineWidget({
        url: 'https://calendly.com/amitholkar/30min',
        parentElement: calendlyContainer
      });
    }
  }
}
