import { Component } from '@angular/core';
import { HeaderComponent } from "../shared/header/header.component";
import { FooterComponent } from "../shared/footer/footer.component";

@Component({
  selector: 'app-retail-ecommerce',
  standalone: true,
  imports: [HeaderComponent, FooterComponent],
  templateUrl: './retail-ecommerce.component.html',
  styleUrl: './retail-ecommerce.component.css'
})
export class RetailEcommerceComponent {

}
