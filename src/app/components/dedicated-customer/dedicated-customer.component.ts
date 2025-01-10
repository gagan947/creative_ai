import { Component } from '@angular/core';
import { HeaderComponent } from "../shared/header/header.component";
import { FooterComponent } from "../shared/footer/footer.component";

@Component({
  selector: 'app-dedicated-customer',
  standalone: true,
  imports: [HeaderComponent, FooterComponent],
  templateUrl: './dedicated-customer.component.html',
  styleUrl: './dedicated-customer.component.css'
})
export class DedicatedCustomerComponent {

}
