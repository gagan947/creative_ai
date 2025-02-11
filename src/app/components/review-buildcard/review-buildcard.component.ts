import { Component } from '@angular/core';
import { FormBuilder } from '@angular/forms';
import { Router, RouterLink } from '@angular/router';
import { ApiService } from '../../services/api.service';
import { Feature } from '../../models/projects';
import { CommonModule } from '@angular/common';

@Component({
  selector: 'app-review-buildcard',
  standalone: true,
  imports: [RouterLink, CommonModule],
  templateUrl: './review-buildcard.component.html',
  styleUrl: './review-buildcard.component.css'
})
export class ReviewBuildcardComponent {

  projectsFeatures: Feature[] = [];
  projectsData: any;
  constructor(private fb: FormBuilder, private apiService: ApiService, private router: Router) {
    let projectData = sessionStorage.getItem('projectData');
    this.projectsData = JSON.parse(projectData!);
    this.projectsFeatures = this.projectsData.selectdFeature;
    console.log(this.projectsFeatures);

  };
}
