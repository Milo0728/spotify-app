import { Component, OnDestroy, OnInit } from '@angular/core';
import { Artist } from '../../interfaces/artist.interface';
import { SharedSearchService } from '../../services/search-services/shared-search.service';
import { Subscription, filter } from 'rxjs';
import { ArtistService } from '../../services/artist-services/artist.service';

@Component({
  selector: 'app-artists-page',
  templateUrl: './artists-page.component.html',
  styleUrls: ['./artists-page.component.css']
})
export class ArtistsPageComponent implements OnInit, OnDestroy {

  filterSubscription: Subscription = new Subscription;
  searchResults: Artist[] | null = null;
  searchBoxPlaceholder: string = 'Ej. Arcángel, Bad Bunny, The Weekend...';
  topArtists: Artist[] | null = null;

  constructor(
    private _artistService: ArtistService,
    private _sharedSearchService: SharedSearchService
  ) { }

  ngOnInit(): void {
    this.filterSubscription = this._sharedSearchService.searchFilter$.subscribe((filter) => {
      if (typeof filter === 'string') {
        // Si el filtro es una cadena, busca artistas por nombre
        this.searchArtistsByName(filter);
      } else if (Array.isArray(filter)) {
        // Si el filtro es un array, busca artistas por conjunto de nombres
        this.searchArtistsByNames(filter);
      }
      // Otros casos según tus necesidades...
    });

  }

  ngOnDestroy(): void {
    if (this.filterSubscription) {
      this.filterSubscription.unsubscribe()
    }
  }

  searchArtistsByName(name: string): void {
    this._artistService.searchArtists(name).subscribe(
      (res) => {
        // Actualiza los resultados de búsqueda
        this.searchResults = res.artists.items;

        if (this.searchResults) {
          this.searchResults = this.searchResults.slice(0, 10);
        }

      },
      (error) => {
        console.error('Error al buscar artistas por nombre', error);
        this.searchResults = []
      }
    );
  }

  searchArtistsByNames(names: string[]): void {
    // Puedes implementar la lógica para buscar artistas por conjunto de nombres aquí
    // Por ejemplo, realizar múltiples solicitudes al servicio con cada nombre en el array
    console.log('Buscar artistas por conjunto de nombres:', names);

    // Ejemplo simplificado: buscar artistas por cada nombre en el array
    names.forEach((name) => {
      this._artistService.searchArtists(name).subscribe(
        (res) => {
          // Puedes hacer algo con los resultados, por ejemplo, agregarlos a this.searchResults
          this.searchResults?.push(...res.artists.items);
        },
        (error) => {
          console.error('Error al buscar artistas por nombre', error);
          this.searchResults = []

        }
      );
    });
  }

  // Función para manejar cambios en el filtro
  onFilterChanged(filter: string) {
    this.searchArtistsByName(filter);
  }


}
