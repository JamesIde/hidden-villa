import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { BookingComponent } from './components/booking/booking.component';
import { IndexComponent } from './components/home/index/index.component';
import { PageNotFoundComponent } from './components/shared/page-not-found/page-not-found.component';

import { AuthGuard } from './shared/auth-guard';

const routes: Routes = [
  {
    path: '',
    component: IndexComponent,
  },
  {
    path: 'booking/payment-success',
    component: BookingComponent,
  },
  // {
  //   path: '**',
  //   pathMatch: 'full',
  //   component: PageNotFoundComponent,
  // },
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule],
  providers: [AuthGuard],
})
export class AppRoutingModule {}
