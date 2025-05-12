import { Component } from '@angular/core';
import { FormBuilder } from '@angular/forms';
import { Router, RouterLink } from '@angular/router';
import { NzMessageService } from 'ng-zorro-antd/message';
import { SelectedFeature, ProjectData } from '../../../models/sessionData';
import { ApiService } from '../../../services/api.service';
import { CommonModule } from '@angular/common';

@Component({
  selector: 'app-payment-detail',
  standalone: true,
  imports: [RouterLink, CommonModule],
  templateUrl: './payment-detail.component.html',
  styleUrl: './payment-detail.component.css'
})
export class PaymentDetailComponent {
  projectsFeatures: SelectedFeature[] = [];
  today: Date = new Date();
  projectsData: ProjectData;
  totalSubFeatures: any;
  totalCost!: number;
  paymentPlan = '1';
  noOfInstallments!: number;
  installmentType!: string;
  actualCost: number | null | undefined
  securityDeposit!: number
  installmentDates: any[] = []
  constructor(private fb: FormBuilder, private apiService: ApiService, private router: Router, private message: NzMessageService) {
    let projectData = sessionStorage.getItem('projectData');
    this.projectsData = JSON.parse(projectData!);
    this.totalCost = this.projectsData.finalCost;

    this.projectsFeatures = this.projectsData.selectdFeature;
  };

  Navigate() {

    let formData = undefined
    if (this.paymentPlan == '2') {
      formData = {
        paymentPlan: this.paymentPlan == '2' ? 'Installment' : 'Upfront',
        installmentType: this.installmentType,
        taxes: (this.totalCost * 18) / 100,
        gstTotalCost: this.actualCost,
        securityDeposit: this.securityDeposit,
        currentRoutes: this.router.url,
        installmentPlan: this.installmentDates.map((ele) => {
          return {
            dueDate: ele,
            projectStage: "Development",
            amount: (this.actualCost! - this.securityDeposit - (this.securityDeposit * 18) / 100) / this.noOfInstallments
          }
        })
      }
    } else {
      formData = {
        paymentPlan: this.paymentPlan == '1' ? 'Upfront' : 'Installment',
        taxes: (this.totalCost * 18) / 100,
        currentRoutes: this.router.url,
        gstTotalCost: this.totalCost + (this.totalCost * 18) / 100 - ((this.totalCost + (this.totalCost * 18) / 100) * 10) / 100
      }
    }

    this.apiService.postAPI(`api/user/addClientPaymentPlan?inquiryId=${this.projectsData.clientEnquryId}`, formData).subscribe({
      next: (res: any) => {
        if (res.success) {
          this.router.navigate(['/payment-detail'])
        }
      }, error(err) {
        // this.message.error(err.error.message)
      },
    })
  }
}
