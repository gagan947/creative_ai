import { Component, Input } from '@angular/core';
import { FormBuilder } from '@angular/forms';
import { Router, RouterLink } from '@angular/router';
import { ApiService } from '../../services/api.service';
import { Feature, FeatureResponse } from '../../models/projects';
import { CommonModule } from '@angular/common';

@Component({
  selector: 'app-refine-idea',
  standalone: true,
  imports: [RouterLink, CommonModule],
  templateUrl: './refine-idea.component.html',
  styleUrl: './refine-idea.component.css'
})
export class RefineIdeaComponent {
  @Input() id!: string;
  projectsData: any
  projectsFeaturs: Feature[] = [];
  totalPrice: any;

  constructor(private fb: FormBuilder, private apiService: ApiService, private router: Router) {
    let projectData = sessionStorage.getItem('projectData');
    this.projectsData = JSON.parse(projectData!);
  }

  ngOnInit(): void {
    console.log(this.id);
    this.getProjects()
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
  }

  Navigate() {
    let totalCost = {
      totalCost: this.totalPrice
    }
    sessionStorage.setItem('projectData', JSON.stringify({ ...this.projectsData, ...totalCost }))
    this.router.navigate([`/plan-delivery/${this.id}`])
  }
}
