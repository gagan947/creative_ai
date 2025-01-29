import { Component } from '@angular/core';
import { FooterComponent } from '../../shared/footer/footer.component';
import { HeaderComponent } from '../../shared/header/header.component';


@Component({
  selector: 'app-how-we-compare',
  standalone: true,
  imports: [HeaderComponent, FooterComponent],
  templateUrl: './how-we-compare.component.html',
  styleUrl: './how-we-compare.component.css'
})
export class HowWeCompareComponent {

}
