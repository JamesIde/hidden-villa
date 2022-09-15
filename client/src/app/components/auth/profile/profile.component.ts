import { Component, OnInit } from '@angular/core';
import { AuthService } from 'src/app/services/auth.service';
import { UserProfile } from 'src/app/shared/userModel';

@Component({
  selector: 'app-profile',
  templateUrl: './profile.component.html',
  styleUrls: ['./profile.component.css'],
})
export class ProfileComponent implements OnInit {
  constructor(private authService: AuthService) {}
  isLoading = false;
  userProfile!: UserProfile;
  isError = false;
  error!: string;

  ngOnInit(): void {
    this.isLoading = true;
    this.authService.getProfile().subscribe(
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
  // TODO Show profile details, have the ability to update profile details, see recent orders, and a model to see the clicked order!

  onClick() {}
}
