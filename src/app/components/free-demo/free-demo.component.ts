import { Component } from '@angular/core';
import { HeaderComponent } from "../shared/header/header.component";
import { FooterComponent } from "../shared/footer/footer.component";

@Component({
  selector: 'app-free-demo',
  standalone: true,
  imports: [HeaderComponent, FooterComponent],
  templateUrl: './free-demo.component.html',
  styleUrl: './free-demo.component.css'
})
export class FreeDemoComponent {

}
