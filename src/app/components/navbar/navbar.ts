import { Component } from '@angular/core';
import { RouterLink } from '@angular/router';

@Component({
  selector: 'app-navbar',
  standalone: true,
  imports: [
    RouterLink
  ],
  styleUrl: './navbar.css',
  templateUrl: './navbar.html'
})
export class NavbarComponent { }