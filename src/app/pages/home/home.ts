import { Component, inject, signal } from '@angular/core';
import { email, form, FormField, FormRoot, required } from '@angular/forms/signals';
import { firstValueFrom } from 'rxjs';
import { SendUfcEvents } from '../../services/send-ufc-events';

type SubmitStatus = 'idle' | 'sending' | 'success' | 'error';

@Component({
  imports: [FormField, FormRoot],
  selector: 'app-home',
  styleUrl: './home.css',
  templateUrl: './home.html',
})
export class Home {
  private readonly service = inject(SendUfcEvents);
  private readonly model = signal({ email: '' });

  protected readonly status = signal<SubmitStatus>('idle');

  protected readonly subscribeForm = form(
    this.model,
    (path) => {
      required(path.email, { message: 'Email is required' });
      email(path.email, { message: 'Enter a valid email address' });
    },
    {
      submission: {
        action: async () => {
          this.status.set('sending');
          try {
            await firstValueFrom(this.service.send(this.subscribeForm.email().value()));
            this.status.set('success');
            this.subscribeForm().reset({ email: '' });
          } catch {
            this.status.set('error');
          }
        },
        onInvalid: () => this.subscribeForm.email().markAsTouched(),
      },
    },
  );
}
