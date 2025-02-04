import { Component, Input } from '@angular/core';
import { FormBuilder, FormsModule, Validators } from '@angular/forms';
import { Router, RouterLink } from '@angular/router';
import { ApiService } from '../../services/api.service';
import { CommonModule } from '@angular/common';

import { ColorPickerModule } from 'ngx-color-picker';
@Component({
  selector: 'app-make-it-mine',
  standalone: true,
  imports: [RouterLink , FormsModule, CommonModule , ColorPickerModule],
  templateUrl: './make-it-mine.component.html',
  styleUrl: './make-it-mine.component.css'
})
export class MakeItMineComponent {
  @Input() id!: string;
  projectsData:any []= [];
  projectName:string = 'My Builder Project';
  imagePreview: string | ArrayBuffer | null = null;
  public color: string = '#2889e9';
  selectedColor:any

  constructor(private fb: FormBuilder, private apiService: ApiService, private router: Router) { }

  ngOnInit(): void {
 console.log(this.id);
 this.getProjects()
  };


  getProjects() {

    this.apiService.getApi<any>(`api/user/fetchProjectDetailedById?projectId=${this.id}`)
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

  updateName(name:any){
    this.projectName = name

  };

  onFileSelected(event: Event) {
    const file = (event.target as HTMLInputElement).files?.[0];
    if (file) {
      const reader = new FileReader();
      reader.onload = () => {
        this.imagePreview = reader.result;
      };
      reader.readAsDataURL(file);
    }
  }

  onColorChange(color: string) {
    console.log('Selected Color:', color);
    
    this.selectedColor = color;
  }
}
