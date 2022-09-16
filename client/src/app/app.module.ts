import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';

import { AppComponent } from './app.component';
import { HeaderComponent } from './components/auth/header/header.component';
import { HttpClientModule, HTTP_INTERCEPTORS } from '@angular/common/http';
import { AppRoutingModule } from './app-routing.module';
import { ReactiveFormsModule } from '@angular/forms';
import { AuthService } from './services/auth.service';
import { AuthInterceptor } from './components/auth/auth.interceptor';
import { AuthModule } from './components/auth/auth.module';
import { IndexComponent } from './components/home/index/index.component';
import { DatesComponent } from './components/home/dates/dates.component';
import { RoomService } from './services/room.service';
import { HotelRoomModule } from './components/hotelRoom/hotelRoom.module';
import { NgxStripeModule } from 'ngx-stripe';
import { environment } from 'src/environments/environment';
import { BookingComponent } from './components/booking/booking.component';
import { SharedModule } from './components/shared/loading/shared.module';
import { MaterialModule } from './components/shared/material.module';
import { CommonModule } from '@angular/common';
import { FooterComponent } from './components/shared/footer/footer.component';
@NgModule({
  declarations: [
    AppComponent,
    HeaderComponent,
    IndexComponent,
    DatesComponent,
    BookingComponent,
    FooterComponent,
  ],
  imports: [
    MaterialModule,
    // SharedModule,
    BrowserModule,
    CommonModule,
    HttpClientModule,
    AppRoutingModule,
    AuthModule,
    HotelRoomModule,
    SharedModule,
    ReactiveFormsModule,
    NgxStripeModule.forRoot(environment.STRIPE_API_KEY),
  ],
  providers: [
    AuthService,
    { provide: HTTP_INTERCEPTORS, useClass: AuthInterceptor, multi: true },
  ],
  bootstrap: [AppComponent],
})
export class AppModule {}
