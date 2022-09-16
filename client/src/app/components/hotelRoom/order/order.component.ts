import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { BookingService } from 'src/app/services/booking.service';

@Component({
  selector: 'app-order',
  templateUrl: './order.component.html',
  styleUrls: ['./order.component.css'],
})
export class OrderComponent implements OnInit {
  constructor(
    private bookingService: BookingService,
    private router: ActivatedRoute
  ) {}
  isLoading = false;
  orderDetails!: any;

  ngOnInit(): void {
    this.isLoading = true;
    // Get payment ID from route
    const paymentId: string = this.router.snapshot.params['paymentID'];

    this.bookingService.getOrderDetails(paymentId).subscribe((order) => {
      this.orderDetails = order;
      this.isLoading = false;
      console.log(this.orderDetails);
    });
  }
}
