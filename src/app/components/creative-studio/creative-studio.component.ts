import { Component } from '@angular/core';
import { HeaderComponent } from "../shared/header/header.component";
import { FooterComponent } from "../shared/footer/footer.component";

@Component({
  selector: 'app-creative-studio',
  standalone: true,
  imports: [HeaderComponent, FooterComponent],
  templateUrl: './creative-studio.component.html',
  styleUrl: './creative-studio.component.css'
})
export class CreativeStudioComponent {

}
