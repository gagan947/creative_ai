import { Component } from '@angular/core';
import { Router, RouterLink } from '@angular/router';
import { ApiService } from '../../services/api.service';
import { NzMessageService } from 'ng-zorro-antd/message';
import { CommonModule } from '@angular/common';

@Component({
  selector: 'app-dashboard',
  standalone: true,
  imports: [RouterLink, CommonModule],
  templateUrl: './dashboard.component.html',
  styleUrl: './dashboard.component.css'
})
export class DashboardComponent {
  allProjectsList: any[] = []
  constructor(private apiService: ApiService, private message: NzMessageService, private router: Router) {
  }
  ngOnInit(): void {
    this.apiService.getApi<any>('api/user/fetchClientAllProjects').subscribe(
      (res) => (res.success ? (this.allProjectsList = res.data) : null)
    );
  }

  Navigate(url: string, id: number) {
    this.apiService.getApi(`api/user/fetchClientInquries?inquiryId=${id}`).subscribe(
      {
        next: (res: any) => {
          if (res.success) {
            const data = res.data
            let projectData = {
              clientEnquryId: id,
              PhasesDeliverables: data.PhasesAndDeliverables,
              estimated_time: data.durations,
              finalCost: data.gstTotalCost,
              logoStyle: data.logoSize,
              platform: data.platforms,
              projectLogo: data.clientProjectLogo,
              projectName: data.clientProjectName,
              selectdFeature: data.projectFeatures,
              speed: data.developmentSpeed,
              totalCost: data.totalCost,
              featuresCost: data.featuresPrice,
            };
            sessionStorage.setItem('projectData', JSON.stringify(projectData));
            this.router.navigate([url]);
          }
        }
      }
    )
  }
}
