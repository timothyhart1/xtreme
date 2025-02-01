import {Routes} from '@angular/router';
import {EventListingsComponent} from './components/event-listings/event-listings.component';
import {LayoutComponent} from "./components/layout/layout.component";

export const routes: Routes = [
  {
    path: '',
    component: LayoutComponent,
    children: [
      { path: '', component: EventListingsComponent },
      { path: 'events', component: EventListingsComponent },
    ]
  }
];
