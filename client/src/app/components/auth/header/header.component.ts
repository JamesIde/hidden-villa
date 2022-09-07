import { Component, OnInit, OnDestroy } from '@angular/core';
import { Subscription } from 'rxjs';
import { APIService } from '../../../shared/API.service';

@Component({
  template: '',
  selector: 'app-header',
  templateUrl: './header.component.html',
  styleUrls: ['./header.component.css'],
})
export class HeaderComponent implements OnInit, OnDestroy {
  constructor(private authService: APIService) {}

  // Subscription to our logged in user from API Service
  userSubscription!: Subscription;

  isLogged = false;
  welcomeMessage!: string;

  onLogout() {
    this.authService.logout();
  }

  ngOnInit(): void {
    this.userSubscription = this.authService.token.subscribe((token) => {
      console.log('Received in header', token);
      this.isLogged = token ? true : false;
      this.welcomeMessage = token ? 'Welcome User!' : null;
    });
  }

  ngOnDestroy(): void {
    this.userSubscription.unsubscribe();
  }
}
