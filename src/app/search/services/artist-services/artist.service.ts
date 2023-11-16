import { HttpClient, HttpHeaders, HttpParams } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Artist } from '../../interfaces/artist.interface';
import { Observable, map, of, switchMap, tap } from 'rxjs';
import { SpotifyService } from '../spotify-services/spotify.service';

@Injectable({
  providedIn: 'root'
})
export class ArtistService {

  constructor(
    private _http: HttpClient,
    private _spotifyService: SpotifyService
  ) { }


  getArtistById(artistId: string): Observable<Artist | any> {
    return this._spotifyService.getToken().pipe(
      switchMap((token: string) => {
        const apiUrl = this._spotifyService.getApiUrl();
        const url = `${apiUrl}/artists/${artistId}`;
        const headers = new HttpHeaders({
          Authorization: `Bearer ${token}`
        });

        console.log('Solicitud GET a:', url);
        return this._http.get(url, { headers });
      })
    );
  }

  getArtists(): Observable<Artist[] | any> {
    return this._spotifyService.getToken().pipe(
      switchMap((token: string) => {
        const artistsUrl = `${this._spotifyService.getApiUrl()}/artists`;
        const headers = new HttpHeaders({
          Authorization: `Bearer ${token}`
        });

        // No necesitamos parámetros adicionales para obtener artistas al azar

        console.log('Solicitud GET a:', artistsUrl);
        return this._http.get(artistsUrl, { headers });
      })
    );
  }

  searchArtists(query: string | string[]): Observable<Artist[] | any> {
    return this._spotifyService.getToken().pipe(
      switchMap((token: string) => {
        const searchUrl = `${this._spotifyService.getApiUrl()}/search`;
        const headers = new HttpHeaders({
          Authorization: `Bearer ${token}`
        });

        let params: HttpParams;

        if (Array.isArray(query)) {
          // Si el filtro es un array, puedes manejarlo según tus necesidades
          // En este ejemplo, simplemente convertimos el array a una cadena separada por comas
          const queryString = query.join(',');
          params = new HttpParams().set('q', queryString).set('type', 'artist');
        } else {
          // Si el filtro es una cadena, procedemos como antes
          params = new HttpParams().set('q', query).set('type', 'artist');
        }

        console.log('Solicitud GET a:', searchUrl);
        return this._http.get<SearchResults>(searchUrl, { headers, params });
      })
    );
  }
  getAlbumsByArtistId(artistId: string, minTracks: number = 4): Observable<any> {
    return this._spotifyService.getToken().pipe(
      switchMap((token: string) => {
        const apiUrl = this._spotifyService.getApiUrl();
        const url = `${apiUrl}/artists/${artistId}/albums`;
        const headers = new HttpHeaders({
          Authorization: `Bearer ${token}`
        });

        console.log('Solicitud GET a:', url);
        return this._http.get(url, { headers }).pipe(
          tap(response => console.log('API Response:', response)),  // Log the entire response
          map((response: any) => {
            const albums = response.items || [];

            // Filter albums with more than minTracks
            const filteredAlbums = albums.filter((album: any) => album.total_tracks > minTracks);

            return filteredAlbums;
          })
        );
      })
    );
  }



}

interface SearchResults {
  artists: {
    items: Artist[];
  };
}
