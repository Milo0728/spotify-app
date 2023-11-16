import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { SearchRoutingModule } from './search-routing.module';
import { LayoutPageComponent } from './layouts/layout-page/layout-page.component';
import { OptionPageComponent } from './pages/option-page/option-page.component';
import { ArtistsPageComponent } from './pages/artists-page/artists-page.component';
import { AlbumsPageComponent } from './pages/albums-page/albums-page.component';
import { TracksPageComponent } from './pages/tracks-page/tracks-page.component';
import { PlaylistsPageComponent } from './pages/playlists-page/playlists-page.component';
import { TableComponent } from './shared/table/table.component';
import { SearchBoxComponent } from './shared/search-box/search-box.component';
import { MaterialModule } from '../material/material.module';
import { ArtistPageComponent } from './pages/artist-page/artist-page.component';



@NgModule({
  declarations: [
    LayoutPageComponent,
    OptionPageComponent,
    ArtistsPageComponent,
    AlbumsPageComponent,
    TracksPageComponent,
    PlaylistsPageComponent,
    TableComponent,
    SearchBoxComponent,
    ArtistPageComponent
  ],
  imports: [
    CommonModule,
    SearchRoutingModule,
    MaterialModule
  ]
})
export class SearchModule { }
