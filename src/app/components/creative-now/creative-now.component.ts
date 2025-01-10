import { Component } from '@angular/core';
import { HeaderComponent } from "../shared/header/header.component";
import { FooterComponent } from "../shared/footer/footer.component";

@Component({
  selector: 'app-creative-now',
  standalone: true,
  imports: [HeaderComponent, FooterComponent],
  templateUrl: './creative-now.component.html',
  styleUrl: './creative-now.component.css'
})
export class CreativeNowComponent {

}
