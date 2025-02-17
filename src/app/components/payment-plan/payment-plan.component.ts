import { Component } from '@angular/core';
import { Router, RouterLink } from '@angular/router';
import { Feature } from '../../models/projects';
import { FormBuilder } from '@angular/forms';
import { ApiService } from '../../services/api.service';
import { CommonModule } from '@angular/common';

@Component({
  selector: 'app-payment-plan',
  standalone: true,
  imports: [RouterLink, CommonModule],
  templateUrl: './payment-plan.component.html',
  styleUrl: './payment-plan.component.css'
})
export class PaymentPlanComponent {
  projectsFeatures: Feature[] = [];
  projectsData: any;
  totalSubFeatures: any;
  constructor(private fb: FormBuilder, private apiService: ApiService, private router: Router) {
    let projectData = sessionStorage.getItem('projectData');
    this.projectsData = JSON.parse(projectData!);
    this.projectsFeatures = this.projectsData.selectdFeature;
    this.totalSubFeatures = this.projectsData.selectdFeature.reduce(
      (total: any, feature: { subFeaturesListWithPrice: string | any[]; }) => total + (feature.subFeaturesListWithPrice?.length || 0),
      0
    );
  };
}
