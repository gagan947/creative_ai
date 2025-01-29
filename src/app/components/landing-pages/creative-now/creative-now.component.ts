import { Component } from '@angular/core';
import { FooterComponent } from '../../shared/footer/footer.component';
import { HeaderComponent } from '../../shared/header/header.component';


@Component({
  selector: 'app-creative-now',
  standalone: true,
  imports: [HeaderComponent, FooterComponent],
  templateUrl: './creative-now.component.html',
  styleUrl: './creative-now.component.css'
})
export class CreativeNowComponent {

}
