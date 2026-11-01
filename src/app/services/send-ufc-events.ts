import { HttpClient } from '@angular/common/http';
import { inject, Service } from '@angular/core';

@Service()
export class SendUfcEvents {
  private readonly http = inject(HttpClient);

  public send(email: string) {
    const url = 'url-here';
    return this.http.post(url, { email });
  }
}
