import {Component, OnInit} from '@angular/core';
import {DatePipe, NgForOf} from "@angular/common";
import {EventService} from "../../../generated/api";
import {lastValueFrom} from "rxjs";

@Component({
    selector: 'app-event-listings',
    imports: [
        NgForOf,
        DatePipe
    ],
    templateUrl: './event-listings.component.html',
    standalone: true,
    styleUrl: './event-listings.component.scss'
})
export class EventListingsComponent implements OnInit {
    public events: any[] = [];
    
    public returnImage(eventId: number): string {
        return `https://localhost:7033/Event/GetEventImage/${eventId}`
    }
    
    constructor(private eventService: EventService) {
    }

    public async ngOnInit() {
        await this.fetchEvents();
    }

    private async fetchEvents() {
        this.events = await lastValueFrom(this.eventService.eventGetAllEventsGet())
    }
}
