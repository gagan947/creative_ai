import { Component } from '@angular/core';
import { FooterComponent } from '../../shared/footer/footer.component';
import { HeaderComponent } from '../../shared/header/header.component';


@Component({
  selector: 'app-enterprenuers',
  standalone: true,
  imports: [HeaderComponent, FooterComponent],
  templateUrl: './enterprenuers.component.html',
  styleUrl: './enterprenuers.component.css'
})
export class EnterprenuersComponent {

}
