import { Component, Input } from '@angular/core';
import { FormBuilder, FormsModule } from '@angular/forms';
import { Router, RouterLink } from '@angular/router';
import { Feature } from '../../models/projects';
import { ApiService } from '../../services/api.service';
import { CommonModule } from '@angular/common';
import { ProjectData } from '../../models/sessionData';

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
  totalSubFeatures: any;
  totalFeatureCost!:number;
  featureCost!:number;
  featureSecondCost!:number;
  featureThirdCost!:number;
  customizationCost!:number;
  customizationSecondCost!:number;
  customizationThirdCost!:number;
  totalCustomizeCost!:number;
  PhasesDeliverables: any[] = [{ design: 'We do your designs' }];
  constructor(private fb: FormBuilder, private apiService: ApiService, private router: Router) {
    let projectData = sessionStorage.getItem('projectData');
    this.projectsData = JSON.parse(projectData!);
    this.projectCost = this.projectsData.totalCost;
    this.twelvePercent = (this.projectsData.totalCost * 12) / 100;
    this.thirtyPercent = (this.projectsData.totalCost * 30) / 100;
    this.projectSecondCost = this.projectCost + this.twelvePercent;
    this.projectThirdCost = this.projectCost + (this.projectsData.totalCost * 36) / 100;
    this.totalPrice = this.projectCost;
    this.featureCost = this.projectsData.featuresCost;
    this.featureSecondCost = this.projectsData.featuresCost  + (this.featureCost * 12) / 100;
    this.featureThirdCost = this.projectsData.featuresCost + (this.featureCost * 36) / 100;
    this.totalFeatureCost = this.featureCost;
    this.customizationCost = this.projectsData.customisationCost;
    this.customizationSecondCost = this.projectsData.customisationCost + (this.customizationCost * 12) / 100;;
    this.customizationThirdCost = this.projectsData.customisationCost + (this.customizationCost * 36) / 100;;
    this.totalCustomizeCost = this.customizationCost;
    // this.totalSubFeatures = this.projectsData.selectdFeature.reduce(
    //   (total: any, feature: { feature: string | any[]; }) => total + (feature.subFeaturesListWithPrice?.length || 0),
    //   0
    // );
    const today = new Date();
    this.estimatedWeeks = this.projectsData.estimated_time;
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
        this.featureCost = this.featureCost - (this.projectsData.featuresCost * 30) / 100;
        this.featureSecondCost = this.featureCost + ((this.featureCost * 12) / 100);
        this.featureThirdCost = this.featureCost + ((this.featureCost * 36) / 100);
        this.customizationCost = this.customizationCost - (this.projectsData.customisationCost * 30) / 100;
        this.customizationSecondCost = this.customizationCost + (this.customizationCost * 12) / 100;
        this.customizationThirdCost = this.customizationCost + (this.customizationCost * 30) / 100;
        this.projectSecondCost = this.projectCost + ((this.projectCost * 12) / 100);
        this.projectThirdCost = this.projectCost + ((this.projectCost * 36) / 100);
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

    }
    if (this.rangeValue == 'Fast') {
      this.totalPrice = this.projectSecondCost;
    } else if (this.rangeValue == 'Speedy') {
      this.totalPrice = this.projectThirdCost
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
      console.log(  this.totalFeatureCost );
      this.totalCustomizeCost = this.customizationSecondCost;
      this.estimatedWeeks = this.estimatedWeeks - 2
      this.estimatedDate.setDate(today.getDate() + (this.estimatedWeeks) * 7);
    } else if (this.rangeValue == '4') {
      this.totalFeatureCost = this.featureThirdCost;
      this.totalCustomizeCost = this.customizationThirdCost;
      this.estimatedWeeks = this.estimatedWeeks - 2
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

  onclickAND(event: any) {
    event.stopPropagation()
    this.isActiveAND = !this.isActiveAND;

    if (this.isActiveAND) {
      this.totalPrice = this.projectsData.totalCost
    }

  }
  onclickIOS(event: any) {
    event.stopPropagation()
    this.isActiveIOS = !this.isActiveIOS;
    if (this.isActiveIOS) {
      const thirtyPercent = (this.projectsData.totalCost * 30) / 100
    }
  }
  onclickWEB(event: any) {
    event.stopPropagation()
    this.isActiveWeb = !this.isActiveWeb
  }
  onclickMOb(event: any) {
    event.stopPropagation()
    this.isActiveMobileSite = !this.isActiveMobileSite
  };

  Navigate() {

    this.projectsData.estimated_time = this.estimatedWeeks

    sessionStorage.setItem('projectData', JSON.stringify({ ...this.projectsData, ...{ finalCost: this.totalPrice }, ...{ projectId: this.id }, ...{ platform: this.selectedDevices }, ...{ speed: this.rangeValue }, ...{ estimatedDate: this.estimatedDate }, ...{ 'PhasesDeliverables': this.PhasesDeliverables } }))
    this.router.navigate([`/review-buildcard`])
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
