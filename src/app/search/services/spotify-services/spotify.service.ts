import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable, map } from 'rxjs';
import { environments } from 'src/environments/environments';

@Injectable({
  providedIn: 'root'
})
export class SpotifyService {

  private apiUrl = environments.apiUrl;
  private clientId = environments.clientId;
  private clientSecret = environments.clientSecret;

  constructor(private _http: HttpClient) { }

  public getToken(): Observable<string> {
    const auth = btoa(`${this.clientId}:${this.clientSecret}`);
    const headers = new HttpHeaders({
      'Content-Type': 'application/x-www-form-urlencoded',
      Authorization: `Basic ${auth}`
    });
    const body = 'grant_type=client_credentials';

    return this._http.post('https://accounts.spotify.com/api/token', body, { headers }).pipe(
      map((response: any) => response.access_token)
    );
  }

  public getApiUrl(): string {
    return this.apiUrl;
  }

}
