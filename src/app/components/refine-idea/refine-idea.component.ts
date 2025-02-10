import { Component, Input } from '@angular/core';
import { FormBuilder } from '@angular/forms';
import { Router, RouterLink } from '@angular/router';
import { ApiService } from '../../services/api.service';
import { Feature, FeatureResponse } from '../../models/projects';
import { CommonModule } from '@angular/common';
import { DragDropModule } from '@angular/cdk/drag-drop';
import {
  CdkDragDrop,
  moveItemInArray,
  transferArrayItem,
  CdkDrag,
  CdkDropList,
} from '@angular/cdk/drag-drop';
@Component({
  selector: 'app-refine-idea',
  standalone: true,
  imports: [RouterLink, CommonModule,DragDropModule,CdkDropList],
  templateUrl: './refine-idea.component.html',
  styleUrl: './refine-idea.component.css'
})
export class RefineIdeaComponent {
  @Input() id!: string;
  projectsData: any
  projectsFeaturs: Feature[] = [];
  commongFeaturs: any[] = [];
  totalPrice: any;

  constructor(private fb: FormBuilder, private apiService: ApiService, private router: Router) {
    let projectData = sessionStorage.getItem('projectData');
    this.projectsData = JSON.parse(projectData!);
   
  }

  ngOnInit(): void {
 
    this.getProjects();
    this.getFeatures()
  };


  getProjects() {

    this.apiService.getApi<FeatureResponse>(`api/user/fetchProjectDetailedById?projectId=${this.id}`)
      .subscribe({
        next: (res) => {
          if (res.success == true) {
            this.projectsFeaturs = res.data;
            this.totalCost(this.projectsFeaturs)
          } else {
            // this.loading = false
          }
        },
        error: err => {
          // this.loading = false
        }
      });
  };
  getFeatures() {

    this.apiService.getApi<any>(`api/user/fetchFeaturesAndThereSubFeatures`)
      .subscribe({
        next: (res) => {
          if (res.success == true) {
            this.commongFeaturs = res.data;
          
          } else {
            // this.loading = false
          }
        },
        error: err => {
          // this.loading = false
        }
      });
  };

  get connectedDropLists(): string[] {
    return this.commongFeaturs.map((_, index) => `list-${index}`);
  }

  drop(event: any, projectIndex: number) {
    if (event.previousContainer === event.container) {
      // Reorder within the same list
      moveItemInArray(event.container.data, event.previousIndex, event.currentIndex);
    } else {
      // Capture the moved item before transfer
      const movedItem = event.previousContainer.data[event.previousIndex];
  
      // Transfer the item between lists
      transferArrayItem(
        event.previousContainer.data,
        event.container.data,
        event.previousIndex,
        event.currentIndex
      );
  
      // Update the project feature's totals
      const projectFeature = this.projectsFeaturs[projectIndex];
      projectFeature.countSubFeaturesName += 1;
      projectFeature.totalSubFeaturedPrice += movedItem.subFeaturedPrice;
    }
  }



  removeFeture(item: any) {
    this.totalPrice = this.totalPrice - item.totalSubFeaturedPrice
    this.projectsFeaturs = this.projectsFeaturs.filter(el => {
      return el !== item
    })
  }

  removeSubFeture(item2: any) {
    this.totalPrice = this.totalPrice - item2.subFeaturedPrice
    this.projectsFeaturs = this.projectsFeaturs.map(f => ({
      ...f,
      subFeaturesListWithPrice: f.subFeaturesListWithPrice.filter(el => el !== item2)
    }));
  }

  totalCost(featureData: any) {
    this.totalPrice = featureData.reduce((pre: any, next: { totalSubFeaturedPrice: any; }) => pre + next.totalSubFeaturedPrice, 0);
    console.log(  this.totalPrice);
  }

  Navigate() {
    let totalCost = {
      totalCost: this.totalPrice
    }
    sessionStorage.setItem('projectData', JSON.stringify({ ...this.projectsData, ...totalCost }))
    this.router.navigate([`/plan-delivery/${this.id}`])
  }
}
