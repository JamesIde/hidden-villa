import { Component, OnInit } from '@angular/core';
import { APIService } from './shared/API.service';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css'],
})
export class AppComponent implements OnInit {
  constructor(private APIService: APIService) {}

  ngOnInit() {
    this.APIService.autologin();
  }
}
