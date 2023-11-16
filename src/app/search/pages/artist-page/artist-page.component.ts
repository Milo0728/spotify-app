import { Component, OnInit, ViewChild } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { switchMap } from 'rxjs';
import { Artist } from '../../interfaces/artist.interface';
import { ArtistService } from '../../services/artist-services/artist.service';
import { MatTableDataSource } from '@angular/material/table';
import { MatSort } from '@angular/material/sort';
import { Album } from '../../interfaces/album.interface';

@Component({
  selector: 'app-artist-page',
  templateUrl: './artist-page.component.html',
  styleUrls: ['./artist-page.component.css']
})
export class ArtistPageComponent implements OnInit {

  public artist?: Artist
  public artistAlbumsDataSource: MatTableDataSource<Album> = new MatTableDataSource()

  @ViewChild(MatSort) sort!: MatSort;
  
  constructor(
    private _artistService: ArtistService,
    private activatedRoute: ActivatedRoute,
    private router: Router,
  ) { }

  ngOnInit(): void {
    this.activatedRoute.params
      .pipe(
        switchMap(({ id }) => this._artistService.getArtistById(id))
      ).subscribe(artist => {
        if (!artist) return this.router.navigate(['/search/artists'])

        this.artist = artist;
        this.loadAlbumsByArtistId(artist.id)
        return;
      })
  }

  public loadAlbumsByArtistId(artistId: string): void {
    this._artistService.getAlbumsByArtistId(artistId)
        .subscribe(response => {
            const albums = response; // Assuming the albums are directly in the response
            console.log('Albums:', albums);

            if (albums && albums.length > 0) {
                this.artistAlbumsDataSource = new MatTableDataSource(albums);
                this.artistAlbumsDataSource.sort = this.sort;
            } else {
                console.error('No albums data received.');
            }
        });
}
  
}
