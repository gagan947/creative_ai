import { Component } from '@angular/core';
import { FormBuilder, Validators } from '@angular/forms';
import { RouterLink } from '@angular/router';
import { ApiService } from '../../services/api.service';
import { CommonModule } from '@angular/common';
import { Project, ProjectResponse } from '../../models/projects';
declare var Calendly: any;
@Component({
  selector: 'app-main',
  standalone: true,
  imports: [RouterLink, CommonModule],
  templateUrl: './main.component.html',
  styleUrl: './main.component.css'
})
export class MainComponent {
projectsData:Project[]=[]
projectId :any;
featureCount :any;

  ngOnInit(): void {
   
    this.getProjects()
  };




  constructor(private fb: FormBuilder, private apiservice: ApiService) {
   
  };


  getProjects() {

    this.apiservice.getApi<ProjectResponse>(`api/user/fetchAllProjects`)
      .subscribe({
        next: (res) => {
          if (res.success == true) {
            this.projectsData = res.data;
          } else {
            // this.loading = false
          }
        },
        error: err => {
          // this.loading = false
        }
      });
  };


  openCalendly() {
    Calendly.initPopupWidget({ url: 'https://calendly.com/mohdfaraz-ctinfotech/30min' });
  };

  ngAfterViewInit() {
    const calendlyContainer = document.getElementById('calendly-inline-widget');
    if (calendlyContainer) {
      Calendly.initInlineWidget({
        url: 'https://calendly.com/mohdfaraz-ctinfotech/30min',
        parentElement: calendlyContainer
      });
    }
  };

  updateProjectId(id:any , featureCount :number){
    console.log(id);
    this.projectId = id;
    this.featureCount = featureCount

  }
}
