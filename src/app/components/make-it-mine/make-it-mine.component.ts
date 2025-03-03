import { Component, ElementRef, Input, ViewChild } from '@angular/core';
import { FormBuilder, FormsModule, Validators } from '@angular/forms';
import { Router, RouterLink } from '@angular/router';
import { ApiService } from '../../services/api.service';
import { CommonModule } from '@angular/common';
import { Location } from '@angular/common';

import { ColorPickerModule } from 'ngx-color-picker';
import { NzMessageService } from 'ng-zorro-antd/message';
@Component({
  selector: 'app-make-it-mine',
  standalone: true,
  imports: [RouterLink, FormsModule, CommonModule, ColorPickerModule],
  templateUrl: './make-it-mine.component.html',
  styleUrl: './make-it-mine.component.css'
})
export class MakeItMineComponent {
  @Input() id!: string;
  projectsData: any[] = [];
  projectName: string = 'My Creative Project';
  imagePreview: string | ArrayBuffer | null = null;
  public color: string = '#2889e9';
  selectedColor: any
  logoImg: File | undefined
  @ViewChild('logoBox') logoBox!: ElementRef;
  mobile_base = true;
  constructor(private fb: FormBuilder, private apiService: ApiService, private router: Router, public location: Location, private message: NzMessageService,) { }

  updateName(name: any) {
    this.projectName = name
  };

  onFileSelected(event: Event) {
    const file = (event.target as HTMLInputElement).files?.[0];
    this.logoImg = file;
    if (file) {
      const reader = new FileReader();
      reader.onload = () => {
        this.imagePreview = reader.result;
      };
      reader.readAsDataURL(file);
    }
  }

  onColorChange(color: string) {
    this.selectedColor = color;
  }


  Navigate(id: any) {

    if (this.projectName == '') {
      return
    }

    let formData = new FormData();
    formData.append('logoImg', this.logoImg ? this.logoImg : '');
    formData.append('projectName', this.projectName);
    formData.append('projectId', this.id);
    formData.append('logoSize', this.logoBox.nativeElement.getAttribute('style'));

    this.apiService.postAPI('api/user/addProjectNameAndLogo', formData).subscribe({
      next: (res: any) => {
        if (res.success == true) {
          let projectData = {
            clientEnquryId: res.data,
            selectedColor: this.selectedColor,
            projectName: this.projectName,
            projectLogo: this.imagePreview,
            logoStyle: this.logoBox.nativeElement.getAttribute('style')
          }

          sessionStorage.setItem('projectData', JSON.stringify(projectData))
          this.router.navigate([`/refine-idea/${id}`])
        }
      },
      error: err => {
        this.message.error(err.error.message);
      }
    })
  }
}
