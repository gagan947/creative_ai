import { Component, Input } from '@angular/core';
import { FormBuilder, FormsModule } from '@angular/forms';
import { Router, RouterLink } from '@angular/router';
import { Feature } from '../../models/projects';
import { ApiService } from '../../services/api.service';
import { CommonModule } from '@angular/common';

@Component({
  selector: 'app-plan-delivery',
  standalone: true,
  imports: [RouterLink, CommonModule, FormsModule],
  templateUrl: './plan-delivery.component.html',
  styleUrl: './plan-delivery.component.css'
})
export class PlanDeliveryComponent {
  @Input() id!: string;
  projectsData: any
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
  rangeValue: number = 0;
  projectSecondCost!:number;
  projectThirdCost!:number;
  devices: any[] = ['Android', 'iOS', 'Web', 'Mobile Site'];
  constructor(private fb: FormBuilder, private apiService: ApiService, private router: Router) {
    let projectData = sessionStorage.getItem('projectData');
    this.projectsData = JSON.parse(projectData!);
    this.projectCost = this.projectsData.totalCost;
    this.twelvePercent = (this.projectsData.totalCost * 12) / 100;
    this.thirtyPercent = (this.projectsData.totalCost * 30) / 100;
    this.projectSecondCost = this.projectCost  + this.twelvePercent;
    this.projectThirdCost = this.projectCost + (this.projectsData.totalCost * 36) / 100;
    this.totalPrice = this.projectCost;

  };

  selectedDevices: string[] = ['Android'];

  onDeviceSelect(device: string): void {
    const index = this.selectedDevices.indexOf(device);
    if (index === -1) {
      this.selectedDevices.push(device);
      this.projectCost = this.projectCost + this.thirtyPercent;
      this.projectSecondCost = this.projectCost + (this.projectCost * 12) / 100;
      this.projectThirdCost = this.projectCost + (this.projectCost * 36) / 100;
     
    } else {
      if(this.selectedDevices.length ==1){
        return
      }else{
        this.selectedDevices.splice(index, 1);
        this.projectCost = this.projectCost - this.thirtyPercent;
        this.projectSecondCost = this.projectCost + ((this.projectCost * 12) / 100);
        this.projectThirdCost = this.projectCost + ((this.projectCost * 36) / 100);
      }
    }
    if (this.selectedDevices.length == 0) {

    } else if (this.selectedDevices.length == 1) {
      this.projectCost = this.projectsData.totalCost;
      this.projectSecondCost = this.projectCost  + this.twelvePercent;
      this.projectThirdCost = this.projectCost + (this.projectsData.totalCost * 36) / 100;
    }
    if(this.rangeValue ==2){
      this.totalPrice = this.projectSecondCost;
    }else if(this.rangeValue ==4){
      this.totalPrice = this.projectThirdCost
    }else {
      this.totalPrice = this.projectCost
    }
  };

  onRangeChange(event: any) {
    this.rangeValue = event.target.value;
    if(this.rangeValue ==2){
      this.totalPrice = this.projectSecondCost;
    }else if(this.rangeValue ==4){
      this.totalPrice = this.projectThirdCost
    }else {
      this.totalPrice = this.projectCost
    }

    console.log("Range changed to:", this.rangeValue);
    // Perform any action here based on the range value
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
 
    sessionStorage.setItem('projectData', JSON.stringify({ ...this.projectsData,...{finalCost:this.totalPrice},...{projectId:this.id}, ...{platform:this.selectedDevices},...{speed:this.rangeValue} }))
    this.router.navigate([`/review-buildcard`])
  }
}
