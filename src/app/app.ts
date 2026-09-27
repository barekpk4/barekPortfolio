import { Component, signal } from '@angular/core';
import { RouterOutlet,RouterLinkActive,RouterLink } from '@angular/router';
import { Home } from '../component/home/home';
import { About } from '../component/about/about';
import { Contact } from '../component/contact/contact';
import { Education } from '../component/education/education';
import { Experience } from '../component/experience/experience';
import { Footer } from '../component/footer/footer';

@Component({
  selector: 'app-root',
  imports: [
    RouterOutlet,
    RouterLinkActive,
    RouterLink,
    Home,
    About,
    Contact,
    Footer,
    Education,
    Experience

  ],
  templateUrl: './app.html',
  styleUrl: './app.css'
})
export class App {
  protected readonly title = signal('myPortfolio');
}
