import { Component, OnInit } from '@angular/core';
import { FormControl, FormGroup, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { RoomService } from 'src/app/services/room.service';
@Component({
  selector: 'app-dates',
  templateUrl: './dates.component.html',
  styleUrls: ['./dates.component.css'],
})
export class DatesComponent implements OnInit {
  datePickerForm!: FormGroup;

  constructor(private roomService: RoomService, private router: Router) {}

  handleSubmit() {
    this.roomService.storeBookingInformation(this.datePickerForm);
    console.log(this.datePickerForm.value);
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
