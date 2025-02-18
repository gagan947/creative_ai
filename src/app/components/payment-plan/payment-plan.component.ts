import { Component } from '@angular/core';
import { Router, RouterLink } from '@angular/router';
import { Feature } from '../../models/projects';
import { FormBuilder, FormsModule } from '@angular/forms';
import { ApiService } from '../../services/api.service';
import { CommonModule } from '@angular/common';
import { ProjectData, SelectedFeature } from '../../models/sessionData';

@Component({
  selector: 'app-payment-plan',
  standalone: true,
  imports: [RouterLink, CommonModule, FormsModule],
  templateUrl: './payment-plan.component.html',
  styleUrl: './payment-plan.component.css'
})
export class PaymentPlanComponent {
  projectsFeatures: SelectedFeature[] = [];
  today: Date = new Date();
  projectsData: ProjectData;
  totalSubFeatures: any;
  totalCost!: number;
  paymentPlan = '1';
  noOfInstallments!: number;
  installmentType!: string;
  constructor(private fb: FormBuilder, private apiService: ApiService, private router: Router) {

    let projectData = sessionStorage.getItem('projectData');
    this.projectsData = JSON.parse(projectData!);
    this.totalCost = this.projectsData.finalCost;

    this.projectsFeatures = this.projectsData.selectdFeature;
  };

  onPaymentChange(id: any) {

    if (id == 1) {
      this.totalCost = this.totalCost - ((this.totalCost * 10) / 100)

    } else {
      this.paymentPlan = '2'
      this.generateInstallemnts(this.projectsData.estimated_time)
    }
  };


  onInstallmentChange(type: any) {

    if (type == 'weekly') {
      this.noOfInstallments = this.projectsData.estimated_time;
      this.installmentType = 'weekly'
    } else {
      this.noOfInstallments = Math.trunc(this.projectsData.estimated_time / 4);
      this.installmentType = 'monthly'
    }
  };

  generateInstallemnts(weeks: number) {
    if (weeks < 8) {
      this.noOfInstallments = weeks;
      this.installmentType = 'weekly'
    } else {
      this.noOfInstallments = Math.trunc(weeks / 4);
      this.installmentType = 'monthly'
      console.log(this.noOfInstallments);
    }
  }
}
