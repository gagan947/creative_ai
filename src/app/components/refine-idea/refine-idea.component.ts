import { Component, Input, ViewChild } from '@angular/core';
import { FormBuilder } from '@angular/forms';
import { Router, RouterLink } from '@angular/router';
import { ApiService } from '../../services/api.service';
import { Feature, FeatureResponse } from '../../models/projects';
import { CommonModule } from '@angular/common';
import { DragDropModule } from '@angular/cdk/drag-drop';

@Component({
  selector: 'app-refine-idea',
  standalone: true,
  imports: [RouterLink, CommonModule, DragDropModule],
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
            this.findDifferences(res.data, this.projectsFeaturs)

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


  removeFeture(feature: any) {
    this.totalPrice = this.totalPrice - feature.totalSubFeaturedPrice
    const commonFeatureIndex = this.commongFeaturs.findIndex(f => f.featuresName === feature.featuresName);
    if (commonFeatureIndex > -1) {
      this.commongFeaturs[commonFeatureIndex].subFeaturesList.map((item: any) => {
        item.selected = false
      })

      this.commongFeaturs[commonFeatureIndex].selected = false
      const featureIndex = this.projectsFeaturs.findIndex(f => f.featuresName === feature.featuresName);
      this.projectsFeaturs.splice(featureIndex, 1)
    }
    this.totalPrice = this.totalPrice + feature.subFeaturesList.reduce((pre: any, next: { subFeaturedPrice: any; }) => pre + next.subFeaturedPrice, 0)
  }

  removeSubFeture(features: any, item2: any) {
    this.totalPrice = this.totalPrice - item2.subFeaturedPrice
    const featureIndex = this.projectsFeaturs.findIndex(f => f.featuresName === features.featuresName);
    if (featureIndex > -1) {
      this.projectsFeaturs[featureIndex].subFeaturesListWithPrice = this.projectsFeaturs[featureIndex].subFeaturesListWithPrice.filter(el => el !== item2);
      if (this.projectsFeaturs[featureIndex].subFeaturesListWithPrice.length === 0) {
        this.projectsFeaturs.splice(featureIndex, 1);
      }
      this.projectsFeaturs = [...this.projectsFeaturs];

      const commonFeatureIndex = this.commongFeaturs.findIndex(f => f.featuresName === features.featuresName);
      if (commonFeatureIndex > -1) {
        this.commongFeaturs[commonFeatureIndex].subFeaturesList.map((item: any) => {
          item.subFeaturesName == item2.subFeaturesName ? item.selected = false : ''
        })
      }
    }
  }

  totalCost(featureData: any) {
    this.totalPrice = featureData.reduce((pre: any, next: { totalSubFeaturedPrice: any; }) => pre + next.totalSubFeaturedPrice, 0);
  }

  Navigate() {
    let totalCost = {
      totalCost: this.totalPrice
    }

    let selectdFeature = {
      selectdFeature: this.projectsFeaturs
    }
    sessionStorage.setItem('projectData', JSON.stringify({ ...this.projectsData, ...totalCost, ...selectdFeature }))
    this.router.navigate([`/plan-delivery/${this.id}`])
  }

  findDifferences(originalArray: any[], newArray: any[]) {
    const newFeaturesSet = new Set(newArray.map(feature => feature.featuresName));
    const newSubFeaturesSet = new Set(newArray.flatMap(feature => feature.subFeaturesListWithPrice.map((subFeature: any) => subFeature.subFeaturesName)));

    this.commongFeaturs = originalArray.map(f => ({
      ...f,
      selected: newFeaturesSet.has(f.featuresName),
      subFeaturesList: f.subFeaturesList.map((sf: any) => ({
        ...sf,
        selected: newSubFeaturesSet.has(sf.subFeaturesName)
      }))
    }));
  }

  selectSubFeature(features: any, items: any) {
    debugger
    const featureIndex = this.projectsFeaturs.findIndex(f => f.featuresName === features.featuresName);
    if (featureIndex > -1) {
      this.projectsFeaturs[featureIndex].subFeaturesListWithPrice.push(items);
      this.projectsFeaturs[featureIndex].totalSubFeaturedPrice =    this.projectsFeaturs[featureIndex].totalSubFeaturedPrice + items.subFeaturedPrice
      this.projectsFeaturs = [...this.projectsFeaturs];

    } else {
      this.projectsFeaturs.unshift({
        featuresName: features.featuresName,
        totalSubFeaturedPrice: items.subFeaturedPrice,
        subFeaturesListWithPrice: [items],
        countSubFeaturesName: items.length
      })
    }
    const commonFeatureIndex = this.commongFeaturs.findIndex(f => f.featuresName === features.featuresName);
    if (commonFeatureIndex > -1) {
      this.commongFeaturs[commonFeatureIndex].subFeaturesList.map((item: any) => {
        item == items ? item.selected = true : ''
      })

      this.commongFeaturs[commonFeatureIndex].selected = true
    }
    this.totalPrice = this.totalPrice + items.subFeaturedPrice
  }

  selectFeature(feature: any) {
    const commonFeatureIndex = this.commongFeaturs.findIndex(f => f.featuresName === feature.featuresName);
    if (commonFeatureIndex > -1) {
      this.commongFeaturs[commonFeatureIndex].subFeaturesList.map((item: any) => {
        item.selected = true
      })

      this.commongFeaturs[commonFeatureIndex].selected = true


      this.projectsFeaturs.unshift({
        featuresName: feature.featuresName,
        totalSubFeaturedPrice: feature.subFeaturesList.reduce((pre: any, next: { subFeaturedPrice: any; }) => pre + next.subFeaturedPrice, 0),
        subFeaturesListWithPrice: feature.subFeaturesList,
        countSubFeaturesName: feature.subFeaturesList.lenght
      })
    }
    this.totalPrice = this.totalPrice + feature.subFeaturesList.reduce((pre: any, next: { subFeaturedPrice: any; }) => pre + next.subFeaturedPrice, 0)
  }
}
