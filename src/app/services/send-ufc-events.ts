import { HttpClient } from '@angular/common/http';
import { inject, Service } from '@angular/core';
import { environment } from '../../environments/environment';

@Service()
export class SendUfcEvents {
  private readonly http = inject(HttpClient);

  public send(email: string) {
    return this.http.post(`${environment.API_URL}/subscribers`, { email });
  }
}
