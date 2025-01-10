import { Component } from '@angular/core';
import { HeaderComponent } from "../shared/header/header.component";
import { FooterComponent } from "../shared/footer/footer.component";

@Component({
  selector: 'app-why-we-use-ai',
  standalone: true,
  imports: [HeaderComponent, FooterComponent],
  templateUrl: './why-we-use-ai.component.html',
  styleUrl: './why-we-use-ai.component.css'
})
export class WhyWeUseAiComponent {

}
