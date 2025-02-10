import { Component, Input, ViewChild } from '@angular/core';
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
  imports: [RouterLink, CommonModule, DragDropModule, CdkDropList, CdkDrag],
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
            this.commongFeaturs = res.data
            // this.findDifferences(res.data, this.projectsFeaturs)

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

  drop(event: any) {
    
    if (event.previousContainer === event.container) {
      moveItemInArray(event.container.data, event.previousIndex, event.currentIndex);
    } else {
      const movedItem = event.previousContainer.data[event.previousIndex];
      transferArrayItem(
        event.previousContainer.data,
        event.container.data,
        event.previousIndex,
        event.currentIndex,
      );
      this.totalPrice = this.totalPrice + movedItem.subFeaturedPrice
    }
  }



  removeFeture(item: any) {
    this.totalPrice = this.totalPrice - item.totalSubFeaturedPrice
    this.projectsFeaturs = this.projectsFeaturs.filter(el => {
      return el !== item
    })
    this.commongFeaturs = [...item.subFeaturesListWithPrice, ...this.commongFeaturs]
  }

  removeSubFeture(item2: any) {
    this.totalPrice = this.totalPrice - item2.subFeaturedPrice
    this.projectsFeaturs = this.projectsFeaturs.map(f => ({
      ...f,
      subFeaturesListWithPrice: f.subFeaturesListWithPrice.filter(el => el !== item2)
    }));
    this.commongFeaturs = [item2, ...this.commongFeaturs]
  }

  totalCost(featureData: any) {
    this.totalPrice = featureData.reduce((pre: any, next: { totalSubFeaturedPrice: any; }) => pre + next.totalSubFeaturedPrice, 0);
  }

  Navigate() {
    let totalCost = {
      totalCost: this.totalPrice
    }
    sessionStorage.setItem('projectData', JSON.stringify({ ...this.projectsData, ...totalCost }))
    this.router.navigate([`/plan-delivery/${this.id}`])
  }

  // findDifferences(originalArray: any[], newArray: any[]) {
  //   const originalFeaturesSet = new Set(originalArray.flatMap(feature => feature.subFeaturesList.map((subFeature: { subFeaturesName: any; }) => subFeature.subFeaturesName)));
  //   const newFeaturesSet = new Set(newArray.flatMap(feature => feature.subFeaturesListWithPrice.map((subFeature: { subFeaturesName: any; }) => subFeature.subFeaturesName)));
  //   const diff = new Set([...originalFeaturesSet].filter(x => !newFeaturesSet.has(x)));
  //   this.commongFeaturs = [...this.commongFeaturs, ...originalArray.flatMap(f => f.subFeaturesList).filter(s => diff.has(s.subFeaturesName))];
  // }
}
