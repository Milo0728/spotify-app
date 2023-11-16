import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, NavigationEnd, Router } from '@angular/router';
import { filter } from 'rxjs';

@Component({
  selector: 'app-layout-page',
  templateUrl: './layout-page.component.html',
  styleUrls: ['./layout-page.component.css']
})
export class LayoutPageComponent implements OnInit {

  showBackButton: boolean = true;
  sectionName: string = '';

  constructor(private router: Router, private activatedRoute: ActivatedRoute) { }

  ngOnInit(): void {
    // Suscribirse a eventos de cambio de ruta para actualizar sectionName
    this.router.events.pipe(
      filter(event => event instanceof NavigationEnd)
    ).subscribe(() => {
      this.updateSectionName();
    });

    // Llamar a updateSectionName() inicialmente para establecer la sección en la carga inicial
    this.updateSectionName();
  }

  updateSectionName() {
    // Obtener la ruta activa
    let route = this.activatedRoute;
    while (route.firstChild) {
      route = route.firstChild;
    }

    // Extraer el segmento de la ruta que representa la sección
    const sectionSegment = route.snapshot.url[0]?.path;

    // Actualizar la propiedad showBackButton según la sección actual
    this.showBackButton = sectionSegment !== 'options';

    // Convertir el segmento de la ruta a un formato amigable (por ejemplo, 'artists' a 'Artistas')
    this.sectionName = this.formatSectionName(sectionSegment);
  }

  formatSectionName(sectionSegment: string): string {
    if (!sectionSegment) {
      return '';
    }

    // Puedes agregar lógica personalizada para mapear los nombres de sección según tus necesidades
    switch (sectionSegment.toLowerCase()) {
      case 'artists':
        return 'Artistas';
      case 'options':
        return 'Opciones';
      case 'playlists':
        return 'Playlists';
      case 'tracks':
        return 'Canciones';
      // Agrega más casos según sea necesario para otras secciones
      default:
        return sectionSegment.charAt(0).toUpperCase() + sectionSegment.slice(1).toLowerCase();
    }
  }

}
