import { Component, inject, signal } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { SendUfcEvents } from '../../services/send-ufc-events';

type SubmitStatus = 'idle' | 'sending' | 'success' | 'error';

@Component({
  imports: [FormsModule],
  selector: 'app-home',
  styleUrl: './home.css',
  templateUrl: './home.html',
})
export class Home {
  private readonly service = inject(SendUfcEvents);

  protected readonly email = signal('');
  protected readonly status = signal<SubmitStatus>('idle');

  protected sendUfcEvents() {
    if (this.status() === 'sending') {
      return;
    }

    this.status.set('sending');
    this.service.send(this.email()).subscribe({
      next: () => {
        this.status.set('success');
        this.email.set('');
      },
      error: () => this.status.set('error'),
    });
  }
}
