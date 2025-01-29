import { Component } from '@angular/core';
import { FooterComponent } from '../../shared/footer/footer.component';
import { HeaderComponent } from '../../shared/header/header.component';


@Component({
  selector: 'app-creative-store',
  standalone: true,
  imports: [HeaderComponent, FooterComponent],
  templateUrl: './creative-store.component.html',
  styleUrl: './creative-store.component.css'
})
export class CreativeStoreComponent {

}
