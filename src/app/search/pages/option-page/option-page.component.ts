import { Component } from '@angular/core';

@Component({
  selector: 'app-option-page',
  templateUrl: './option-page.component.html',
  styleUrls: ['./option-page.component.css']
})
export class OptionPageComponent {

  opciones = [
    {
      imagen: './assets/pages/option/albumes.jpg',
      titulo: 'Albumes',
      descripcion: 'Descubre información sobre tus Albumes favoritos.',
      enlace: '../albums',
      botonTexto: 'Ver Albumes'
    },
    {
      imagen: './assets/pages/option/artist.jpg',
      titulo: 'Artistas',
      descripcion: 'Descubre información sobre tus artistas favoritos.',
      enlace: '../artists',
      botonTexto: 'Ver Artistas'
    },
    {
      imagen: './assets/pages/option/songs.jpg',
      titulo: 'Canciones',
      descripcion: 'Encuentra información detallada sobre tus canciones favoritas.',
      enlace: '../tracks',
      botonTexto: 'Ver Canciones'
    },
    {
      imagen: './assets/pages/option/playlist.jpg',
      titulo: 'Playlist',
      descripcion: 'Encuentra información detallada sobre las playlist creadas por los usuarios.',
      enlace: '../playlists',
      botonTexto: 'Ver Playlists'
    }
  ];

  
}

