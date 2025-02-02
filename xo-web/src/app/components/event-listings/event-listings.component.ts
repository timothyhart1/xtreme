import {Component, inject, OnInit} from '@angular/core';
import {DatePipe, NgForOf, NgIf} from "@angular/common";
import {EventService} from "../../../generated/api";
import {lastValueFrom} from "rxjs";
import {Router} from "@angular/router";
import {MatSnackBar} from "@angular/material/snack-bar";
import {MatDialog} from "@angular/material/dialog";
import {ModalComponent} from "../modal/modal.component";

@Component({
    selector: 'app-event-listings',
    imports: [
        NgForOf,
        DatePipe,
        NgIf
    ],
    templateUrl: './event-listings.component.html',
    standalone: true,
    styleUrl: './event-listings.component.scss'
})
export class EventListingsComponent implements OnInit {
    public events: any[] = [];
    private dialog = inject(MatDialog);

    public returnImage(eventId: number): string {
        return `https://localhost:7033/Event/GetEventImage/${eventId}`
    }
    
    constructor(private eventService: EventService, private router: Router, private snackbar: MatSnackBar) {}

    public async ngOnInit() {
        await this.fetchEvents();
    }

    private async fetchEvents() {
        this.events = await lastValueFrom(this.eventService.eventGetAllEventsGet())
    }

    private isShareSupported(): boolean {
        return !!navigator.share;
    }
    
    public async shareOrCopyUrl(customText: string = '', position: 'before' | 'after' = 'before', title: string = 'Share this page'): Promise<boolean> {
        try {
            const currentUrl = window.location.href;
            const textToShare = position === 'before'
                ? `${customText} ${currentUrl}`.trim()
                : `${currentUrl} ${customText}`.trim();

            if (this.isShareSupported()) {
                await navigator.share({
                    title: title,
                    text: textToShare,
                    url: currentUrl
                });
                return true;
            }

            if (navigator.clipboard && window.isSecureContext) {
                await navigator.clipboard.writeText(textToShare);
                return true;
            } else {
                const textarea = document.createElement('textarea');
                textarea.value = textToShare;
                textarea.style.position = 'fixed';
                textarea.style.left = '-999999px';
                textarea.style.top = '-999999px';
                document.body.appendChild(textarea);
                textarea.focus();
                textarea.select();
                document.execCommand('copy');
                textarea.remove();
                
                this.snackbar.open("Event Copied To Clipboard", "Close", {
                    verticalPosition: "top",
                    horizontalPosition: "center",
                    duration: 3000
                });
                
                return true;
            }
        } catch (error) {
            console.error('Failed to share/copy URL:', error);
            return false;
        }
    }
    
    isShareDialogAvailable(): boolean {
        return this.isShareSupported();
    }

    openModal(event: any): void {
        this.dialog.open(ModalComponent, {
            width: '600px',
            data: event
        });
    }
}
