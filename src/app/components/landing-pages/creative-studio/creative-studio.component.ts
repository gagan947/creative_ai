import { Component } from '@angular/core';
import { FooterComponent } from '../../shared/footer/footer.component';
import { HeaderComponent } from '../../shared/header/header.component';
import { RouterLink } from '@angular/router';


@Component({
  selector: 'app-creative-studio',
  standalone: true,
  imports: [HeaderComponent, FooterComponent, RouterLink],
  templateUrl: './creative-studio.component.html',
  styleUrl: './creative-studio.component.css'
})
export class CreativeStudioComponent {

}
