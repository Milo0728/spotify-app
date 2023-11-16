import { HttpClient, HttpHeaders, HttpParams } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable, map, switchMap } from 'rxjs';
import { Artist } from '../../interfaces/artist.interface';

@Injectable({
  providedIn: 'root'
})
export class SpotifyService {

  private apiUrl = 'https://api.spotify.com/v1';
  private clientId = '933739476d5042248a09fae4dac224b3';
  private clientSecret = 'cb77378250794efdb3d0c6af49c52bcb';

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
