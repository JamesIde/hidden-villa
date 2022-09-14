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
import { MatDatepickerModule } from '@angular/material/datepicker';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatNativeDateModule } from '@angular/material/core';
import { MatInputModule } from '@angular/material/input';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { MatIconModule } from '@angular/material/icon';
import { MatButtonModule } from '@angular/material/button';
import { HotelRoomModule } from './components/hotelRoom/hotelRoom.module';
import { RoomService } from './services/room.service';
import { NgxStripeModule } from 'ngx-stripe';
import { environment } from 'src/environments/environment';
import { BookingComponent } from './components/booking/booking.component';
import { FooterComponent } from './components/auth/footer/footer.component';
import { LoadingComponent } from './components/auth/loading/loading.component';
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
    BrowserModule,
    HttpClientModule,
    AppRoutingModule,
    AuthModule,
    HotelRoomModule,
    ReactiveFormsModule,
    MatDatepickerModule,
    MatFormFieldModule,
    MatNativeDateModule,
    MatInputModule,
    BrowserAnimationsModule,
    MatIconModule,
    MatButtonModule,
    NgxStripeModule.forRoot(environment.STRIPE_API_KEY),
  ],
  providers: [
    AuthService,
    // RoomService,
    // TodoResolverService,
    { provide: HTTP_INTERCEPTORS, useClass: AuthInterceptor, multi: true },
  ],
  bootstrap: [AppComponent],
})
export class AppModule {}
