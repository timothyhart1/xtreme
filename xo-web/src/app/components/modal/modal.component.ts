import {Component, Inject} from '@angular/core';
import {MAT_DIALOG_DATA, MatDialogRef} from '@angular/material/dialog';
import {DatePipe} from "@angular/common";
import {MatButton, MatIconButton} from "@angular/material/button";
import {MatIcon} from "@angular/material/icon";

@Component({
    selector: 'app-modal',
    templateUrl: './modal.component.html',
    standalone: true,
    imports: [
        DatePipe,
        MatIcon
    ],
    styleUrls: ['./modal.component.scss']
})
export class ModalComponent {
    constructor(
        private dialogRef: MatDialogRef<ModalComponent>,
        @Inject(MAT_DIALOG_DATA) public event: any
    ) {
    }

    public close(): void {
        this.dialogRef.close();
    }

    public returnImage(eventId: number): string {
        return `https://localhost:7033/Event/GetEventImage/${eventId}`
    }

    public downloadImage(imageUrl: string): void {
        fetch(imageUrl, {mode: 'cors'})
            .then(response => response.blob())
            .then(blob => {
                const url = window.URL.createObjectURL(blob);
                const link = document.createElement('a');
                link.href = url;
                link.download = `${this.event.eventName} XO Event Flyer.jpg`;
                document.body.appendChild(link);
                link.click();
                document.body.removeChild(link);
                window.URL.revokeObjectURL(url);
            })
            .catch(error => {
                console.error('Error downloading image:', error);
            });
    }
}
