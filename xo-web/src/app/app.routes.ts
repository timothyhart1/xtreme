import {Routes} from '@angular/router';
import {EventListingsComponent} from './components/event-listings/event-listings.component';
import {LayoutComponent} from "./components/layout/layout.component";
import {RegisterComponent} from "./register/register.component";
import {LoginComponent} from "./login/login.component";
import {ProfileComponent} from "./pages/profile/profile.component";

export const routes: Routes = [
  {
    path: '',
    component: LayoutComponent,
    children: [
      { path: '', component: LoginComponent },
      { path: 'register', component: RegisterComponent },
      { path: 'edit-profile', component: ProfileComponent },
      { path: 'events', component: EventListingsComponent },
    ]
  }
];
