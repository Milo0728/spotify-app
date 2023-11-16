import { Component, EventEmitter, Input, Output } from '@angular/core';
import { ArtistService } from '../../services/artist-services/artist.service';
import { SharedSearchService } from '../../services/search-services/shared-search.service';

@Component({
  selector: 'shared-search-box',
  templateUrl: './search-box.component.html',
  styleUrls: ['./search-box.component.css']
})
export class SearchBoxComponent {

  @Input() placeholder: string = '';
  @Output() filterChanged = new EventEmitter<string>()
  @Output() searchCallback = new EventEmitter<(filter: string) => void>();

  constructor(
    private _sharedSearchService: SharedSearchService,
    private _artistService: ArtistService
  ) { }

  applyFilter(event: any) {
    const value = event.target.value;
    this.filterChanged.emit(value);

    // Emite la función de búsqueda a través de un callback
    this.searchCallback.emit((filter: string) => {
      // Lógica de búsqueda específica según el tipo de búsqueda proporcionado
      if (filter.startsWith('artist:')) {
        const artistFilter = filter.substring(7); // Elimina "artist:" del filtro
        this.searchArtists(artistFilter);
      } else if (filter.startsWith('otherType:')) {
        const otherTypeFilter = filter.substring(10); // Elimina "otherType:" del filtro
        this.searchOtherType(otherTypeFilter);
      } else {
        // Lógica de búsqueda predeterminada, por ejemplo, búsqueda de artistas
        this.searchArtists(filter);
      }
    });
  }
  searchArtists(filter: string): void {
    this._artistService.searchArtists(filter).subscribe(
      (res) => {
        // Actualiza el filtro de búsqueda compartido
        this.filterChanged.emit(filter);

        // Actualiza los resultados de búsqueda compartidos
        console.log('Resultados de la búsqueda de artistas:', res.artists.items.map((artist: { name: any; }) => artist.name));
      },
      (error) => {
        console.error('Error al buscar artistas', error);
      }
    );
  }

  private searchOtherType(filter: string): void {
    // Lógica de búsqueda específica para otro tipo de búsqueda
    console.log('Lógica de búsqueda para otro tipo:', filter);
  }
}
