import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';

import { AppComponent } from './app.component';
import { HeaderComponent } from './components/auth/header/header.component';
import { HttpClientModule, HTTP_INTERCEPTORS } from '@angular/common/http';
import { AppRoutingModule } from './app-routing.module';
import { ReactiveFormsModule } from '@angular/forms';
import { APIService } from './shared/API.service';
import { AuthInterceptor } from './components/auth/auth.interceptor';
import { AuthModule } from './components/auth/auth.module';
import { IndexComponent } from './components/home/index/index.component';
@NgModule({
  declarations: [AppComponent, HeaderComponent, IndexComponent],
  imports: [
    BrowserModule,
    HttpClientModule,
    AppRoutingModule,
    AuthModule,
    ReactiveFormsModule,
  ],
  providers: [
    APIService,
    // TodoResolverService,
    { provide: HTTP_INTERCEPTORS, useClass: AuthInterceptor, multi: true },
  ],
  bootstrap: [AppComponent],
})
export class AppModule {}
