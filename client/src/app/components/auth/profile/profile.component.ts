import { Component, OnInit } from '@angular/core';
import { APIService } from 'src/app/shared/API.service';

@Component({
  selector: 'app-profile',
  templateUrl: './profile.component.html',
  styleUrls: ['./profile.component.css'],
})
export class ProfileComponent implements OnInit {
  constructor(private APIService: APIService) {}
  isLoading = false;
  userProfile;
  isError = false;
  error!: string;

  ngOnInit(): void {
    this.isLoading = true;
    this.APIService.getProfile().subscribe(
      (res) => {
        this.userProfile = res;
        this.isLoading = false;
      },
      (error) => {
        this.isError = true;
        this.error = error.error.message;
      }
    );
  }

  onClick() {}
}
