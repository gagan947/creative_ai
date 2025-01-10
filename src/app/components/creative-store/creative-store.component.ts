import { Component } from '@angular/core';
import { HeaderComponent } from "../shared/header/header.component";
import { FooterComponent } from "../shared/footer/footer.component";

@Component({
  selector: 'app-creative-store',
  standalone: true,
  imports: [HeaderComponent, FooterComponent],
  templateUrl: './creative-store.component.html',
  styleUrl: './creative-store.component.css'
})
export class CreativeStoreComponent {

}
