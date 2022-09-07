import { Component, Injectable, OnDestroy, OnInit } from '@angular/core';
import { Subscription } from 'rxjs';
import { APIService } from 'src/app/shared/API.service';

@Component({
  selector: 'app-header',
  templateUrl: './header.component.html',
  styleUrls: ['./header.component.css'],
})
export class HeaderComponent implements OnInit, OnDestroy {
  constructor(private APIService: APIService) {}

  // Subscription to our logged in user from API Service
  userSubscription!: Subscription;

  isLogged = false;
  welcomeMessage!: string;

  onLogout() {
    this.APIService.logout();
  }

  ngOnInit(): void {
    this.userSubscription = this.APIService.token.subscribe((token) => {
      console.log('Received in header', token);
      this.isLogged = token ? true : false;
      this.welcomeMessage = token ? 'Welcome User!' : null;
    });
  }

  ngOnDestroy(): void {
    this.userSubscription.unsubscribe();
  }
}
