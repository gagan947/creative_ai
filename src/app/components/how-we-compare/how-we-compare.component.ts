import { Component } from '@angular/core';
import { HeaderComponent } from "../shared/header/header.component";
import { FooterComponent } from "../shared/footer/footer.component";

@Component({
  selector: 'app-how-we-compare',
  standalone: true,
  imports: [HeaderComponent, FooterComponent],
  templateUrl: './how-we-compare.component.html',
  styleUrl: './how-we-compare.component.css'
})
export class HowWeCompareComponent {

}
