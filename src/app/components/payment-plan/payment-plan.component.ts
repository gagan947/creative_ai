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
  actualCost: number | null | undefined
  securityDeposit!: number
  installmentDates: any[] = []
  constructor(private fb: FormBuilder, private apiService: ApiService, private router: Router) {

    let projectData = sessionStorage.getItem('projectData');
    this.projectsData = JSON.parse(projectData!);
    this.totalCost = this.projectsData.finalCost;

    this.projectsFeatures = this.projectsData.selectdFeature;
  };

  onPaymentChange(id: any) {
    if (id == 1) {
      this.totalCost = this.projectsData.finalCost
      this.actualCost = null
    } else {
      this.paymentPlan = '2'
      this.actualCost = this.projectsData.finalCost + (this.projectsData.finalCost * 18) / 100
      this.securityDeposit = (this.actualCost * 20) / 100
      this.generateInstallemnts(this.projectsData.estimated_time)
    }
  };


  onInstallmentChange(type: any) {
    const today = new Date()
    if (type == 'weekly') {
      this.noOfInstallments = this.projectsData.estimated_time;
      this.installmentType = 'weekly'
      const dates = []
      for (let i = 0; i < this.projectsData.estimated_time; i++) {
        today.setDate(today.getDate() + 7)
        dates.push(new Date(today).toISOString())
      }
      this.installmentDates = dates
    } else {
      this.noOfInstallments = Math.trunc(this.projectsData.estimated_time / 4);
      this.installmentType = 'monthly'
      const dates = []
      for (let i = 0; i < this.noOfInstallments; i++) {
        today.setMonth(today.getMonth() + 1)
        dates.push(new Date(today).toISOString())
      }
      this.installmentDates = dates
    }
  };

  generateInstallemnts(weeks: number) {
    const today = new Date()
    if (this.installmentType == 'weekly') {
      this.noOfInstallments = weeks;
      const dates = []
      for (let i = 0; i < weeks; i++) {
        today.setDate(today.getDate() + 7)
        dates.push(new Date(today).toISOString())
      }
      this.installmentDates = dates
    } else {
      this.noOfInstallments = Math.trunc(weeks / 4);
      const dates = []
      for (let i = 0; i < this.noOfInstallments; i++) {
        today.setMonth(today.getMonth() + 1)
        dates.push(new Date(today).toISOString())
      }
      this.installmentDates = dates
      this.installmentType = 'monthly'
    }
  }
}
