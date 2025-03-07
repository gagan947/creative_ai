import { Component, Input } from '@angular/core';
import { FormBuilder, FormsModule } from '@angular/forms';
import { Router, RouterLink } from '@angular/router';
import { Feature } from '../../models/projects';
import { ApiService } from '../../services/api.service';
import { CommonModule } from '@angular/common';
import { ProjectData } from '../../models/sessionData';
import { NzMessageService } from 'ng-zorro-antd/message';

@Component({
  selector: 'app-plan-delivery',
  standalone: true,
  imports: [RouterLink, CommonModule, FormsModule],
  templateUrl: './plan-delivery.component.html',
  styleUrl: './plan-delivery.component.css'
})
export class PlanDeliveryComponent {
  @Input() id!: string;
  projectsData: ProjectData;
  projectsFeaturs: Feature[] = [];
  commongFeaturs: any[] = [];
  totalPrice: any;
  isActiveAND = true;
  isActiveIOS = false;
  isActiveWeb = false;
  isActiveMobileSite = false;
  thirtyPercent!: number;
  twelvePercent!: number;
  projectCost!: number;
  rangeValue: string = '0';
  projectSecondCost!: number;
  projectThirdCost!: number;
  devices: any[] = ['Android', 'iOS', 'Web', 'Mobile Site'];
  estimatedDate: Date | undefined;
  estimatedWeeks: any;
  customWeeks: any;
  totalSubFeatures: any;
  totalFeatureCost!: number;
  featureCost!: number;
  featureSecondCost!: number;
  featureThirdCost!: number;
  customizationCost!: number;
  customizationSecondCost!: number;
  customizationThirdCost!: number;
  totalCustomizeCost!: number;
  PhasesDeliverables: any[] = [{ design: 'We do your designs' }];
  constructor(private fb: FormBuilder, private apiService: ApiService, private router: Router, private message: NzMessageService) {
    let projectData = sessionStorage.getItem('projectData');
    this.projectsData = JSON.parse(projectData!);
    this.projectCost = this.projectsData.totalCost;
    this.twelvePercent = (this.projectsData.totalCost * 12) / 100;
    this.thirtyPercent = (this.projectsData.totalCost * 30) / 100;
    this.projectSecondCost = this.projectCost + this.twelvePercent;
    this.projectThirdCost = this.projectCost + (this.projectsData.totalCost * 36) / 100;
    this.totalPrice = this.projectCost;
    this.featureCost = this.projectsData.featuresCost;
    this.featureSecondCost = this.projectsData.featuresCost + (this.featureCost * 12) / 100;
    this.featureThirdCost = this.projectsData.featuresCost + (this.featureCost * 36) / 100;
    this.totalFeatureCost = this.featureCost;
    this.customizationCost = this.projectsData.customisationCost;
    this.customizationSecondCost = this.projectsData.customisationCost + (this.customizationCost * 12) / 100;;
    this.customizationThirdCost = this.projectsData.customisationCost + (this.customizationCost * 36) / 100;
    console.log(this.customizationThirdCost);
    this.totalCustomizeCost = this.customizationCost;
    // this.totalSubFeatures = this.projectsData.selectdFeature.reduce(
    //   (total: any, feature: { feature: string | any[]; }) => total + (feature.subFeaturesListWithPrice?.length || 0),
    //   0
    // );
    const today = new Date();
    this.customWeeks = this.estimatedWeeks = this.projectsData.estimated_time;
    this.estimatedDate = new Date(today);
    this.estimatedDate.setDate(today.getDate() + this.estimatedWeeks * 7);
  };

  selectedDevices: string[] = ['Android'];

  onDeviceSelect(device: string): void {
    const index = this.selectedDevices.indexOf(device);
    if (index === -1) {
      this.selectedDevices.push(device);
      this.projectCost = this.projectCost + this.thirtyPercent;
      this.featureCost = this.featureCost + (this.projectsData.featuresCost * 30) / 100;
      this.featureSecondCost = this.featureCost + (this.featureCost * 12) / 100;
      this.featureThirdCost = this.featureCost + (this.featureCost * 36) / 100;
      this.customizationCost = this.customizationCost + (this.projectsData.customisationCost * 30) / 100;
      this.customizationSecondCost = this.customizationCost + (this.customizationCost * 12) / 100;
      this.customizationThirdCost = this.customizationCost + (this.customizationCost * 36) / 100;
      this.projectSecondCost = this.projectCost + (this.projectCost * 12) / 100;
      this.projectThirdCost = this.projectCost + (this.projectCost * 36) / 100;

    } else {
      if (this.selectedDevices.length == 1) {
        return
      } else {
        this.selectedDevices.splice(index, 1);
        this.projectCost = this.projectCost - this.thirtyPercent;
        this.projectSecondCost = this.projectCost + ((this.projectCost * 12) / 100);
        this.projectThirdCost = this.projectCost + ((this.projectCost * 36) / 100);
        this.featureCost = this.featureCost - (this.projectsData.featuresCost * 30) / 100;
        this.featureSecondCost = this.featureCost + ((this.featureCost * 12) / 100);
        this.featureThirdCost = this.featureCost + ((this.featureCost * 36) / 100);
        this.customizationCost = this.customizationCost - (this.projectsData.customisationCost * 30) / 100;
        this.customizationSecondCost = this.customizationCost + (this.customizationCost * 12) / 100;
        this.customizationThirdCost = this.customizationCost + (this.customizationCost * 36) / 100;

      }
    }
    if (this.selectedDevices.length == 0) {

    } else if (this.selectedDevices.length == 1) {
      this.projectCost = this.projectsData.totalCost;
      this.projectSecondCost = this.projectCost + this.twelvePercent;
      this.projectThirdCost = this.projectCost + (this.projectsData.totalCost * 36) / 100;
      this.featureCost = this.projectsData.featuresCost;
      this.featureSecondCost = this.featureCost + (this.featureCost * 12) / 100;
      this.featureThirdCost = this.featureCost + (this.featureCost * 36) / 100;
      this.customizationCost = this.projectsData.customisationCost;
      this.customizationSecondCost = this.customizationCost + (this.projectsData.customisationCost * 12) / 100;
      this.customizationThirdCost = this.customizationCost + (this.projectsData.customisationCost * 36) / 100;

    }
    if (this.rangeValue == '2') {
      this.totalPrice = this.projectSecondCost;
      this.totalFeatureCost = this.featureSecondCost;
      this.totalCustomizeCost = this.customizationSecondCost;
    } else if (this.rangeValue == '4') {
      this.totalPrice = this.projectThirdCost;
      this.totalFeatureCost = this.featureThirdCost
      this.totalCustomizeCost = this.customizationThirdCost;
    } else {

      this.totalFeatureCost = this.featureCost;
      this.totalCustomizeCost = this.customizationCost;
      this.totalPrice = this.projectCost;
    }
  };

  onRangeChange(event: any) {
    const today = new Date();
    this.estimatedDate = new Date(today);

    this.rangeValue = event.target.value;

    if (this.rangeValue == '2') {
      this.totalPrice = this.projectSecondCost;
      this.totalFeatureCost = this.featureSecondCost;
      console.log(this.totalFeatureCost);
      this.totalCustomizeCost = this.customizationSecondCost;
      this.estimatedWeeks = this.customWeeks - 2
      this.estimatedDate.setDate(today.getDate() + (this.estimatedWeeks) * 7);
    } else if (this.rangeValue == '4') {
      this.totalFeatureCost = this.featureThirdCost;
      this.totalCustomizeCost = this.customizationThirdCost;
      this.estimatedWeeks = this.estimatedWeeks - 2
      this.estimatedWeeks = this.customWeeks - 4
      this.estimatedDate.setDate(today.getDate() + (this.estimatedWeeks) * 7);
      this.totalPrice = this.projectThirdCost;
    } else {
      this.totalPrice = this.projectCost;
      this.totalFeatureCost = this.featureCost;
      this.totalCustomizeCost = this.customizationCost;
      this.estimatedWeeks = this.projectsData.estimated_time
      this.estimatedDate.setDate(today.getDate() + this.estimatedWeeks * 7);
    }
  }

  Navigate() {

    let formData = {
      formNumber: 3,
      platforms: this.selectedDevices,
      developmentSpeed: this.rangeValue == '0' ? 'Standard' : this.rangeValue == '2' ? 'Fast' : 'Speedy',
      PhasesAndDeliverables: this.PhasesDeliverables,
      featuresPrice: this.totalFeatureCost,
      customisationPrice: this.totalCustomizeCost,
      durations: this.estimatedWeeks,
      totalCost: this.totalPrice,
      currentRoutes: this.router.url
    }

    this.apiService.postAPI(`api/user/addClientInquries?inquiryId=${this.projectsData.clientEnquryId}`, formData)
      .subscribe({
        next: (res: any) => {
          if (res.success) {
            this.projectsData.estimated_time = this.estimatedWeeks

            sessionStorage.setItem('projectData', JSON.stringify({ ...this.projectsData, ...{ finalCost: this.totalPrice }, ...{ projectId: this.id }, ...{ 'featuresCost': this.totalFeatureCost }, ...{ 'customisationCost': this.totalCustomizeCost }, ...{ platform: this.selectedDevices }, ...{ speed: this.rangeValue == '0' ? 'Standard' : this.rangeValue == '2' ? 'Fast' : 'Speedy' }, ...{ estimatedDate: this.estimatedDate }, ...{ 'PhasesDeliverables': this.PhasesDeliverables } }))
            this.router.navigate([`/review-buildcard`])
          } else {
            this.message.error(res.message);
          }
        }, error: err => { this.message.error(err.error.message); }
      });
  }

  selectDeliveryPhase(event: any, item: any) {
    if (event.target.checked) {
      this.PhasesDeliverables.push(item)
    } else {
      const index = this.PhasesDeliverables.indexOf(item);
      this.PhasesDeliverables.splice(index, 1);
    }
  }

  selectDesignPhase(event: any, item: string) {
    if (event.target.checked) {
      const existingDesign = this.PhasesDeliverables.find((phase) => phase.design);
      if (existingDesign) {
        existingDesign.design = item
      } else {
        const design = {
          design: item
        }
        this.PhasesDeliverables.push(design)
      }
    }
  }
}
