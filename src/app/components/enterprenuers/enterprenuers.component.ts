import { Component } from '@angular/core';
import { HeaderComponent } from "../shared/header/header.component";
import { FooterComponent } from "../shared/footer/footer.component";

@Component({
  selector: 'app-enterprenuers',
  standalone: true,
  imports: [HeaderComponent, FooterComponent],
  templateUrl: './enterprenuers.component.html',
  styleUrl: './enterprenuers.component.css'
})
export class EnterprenuersComponent {

}
