import { Component, OnInit } from '@angular/core';
import { FormControl, FormGroup, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { RoomService } from 'src/app/services/room.service';
@Component({
  selector: 'app-dates',
  templateUrl: './dates.component.html',
  styleUrls: ['./dates.component.css'],
})

// TODO Fix date min and max on form
export class DatesComponent implements OnInit {
  minDate: Date;
  maxDate: Date;

  datePickerForm!: FormGroup;

  constructor(private roomService: RoomService, private router: Router) {
    this.minDate = new Date();
    this.maxDate = new Date();
    // Max booking is 1 month
    this.maxDate.setMonth(this.maxDate.getMonth() + 1);
  }

  handleSubmit() {
    this.roomService.storeBookingInformation(this.datePickerForm);
    this.router.navigate(['/rooms']);
  }

  ngOnInit(): void {
    this.datePickerForm = new FormGroup({
      checkIn: new FormControl<Date | null>(null, [Validators.required]),
      checkOut: new FormControl<Date | null>(null, [Validators.required]),
      NoGuests: new FormControl(1, [Validators.required]),
    });
  }
}
