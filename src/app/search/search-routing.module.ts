import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { LayoutPageComponent } from './layouts/layout-page/layout-page.component';
import { OptionPageComponent } from './pages/option-page/option-page.component';
import { ArtistsPageComponent } from './pages/artists-page/artists-page.component';
import { AlbumsPageComponent } from './pages/albums-page/albums-page.component';
import { PlaylistsPageComponent } from './pages/playlists-page/playlists-page.component';
import { TracksPageComponent } from './pages/tracks-page/tracks-page.component';
import { ArtistPageComponent } from './pages/artist-page/artist-page.component';

const routes: Routes = [
    {
        path: '',
        component: LayoutPageComponent,
        children: [
            { path: 'options', component: OptionPageComponent },
            { path: 'artists', component: ArtistsPageComponent },
            { path: 'playlists', component: PlaylistsPageComponent },
            { path: 'tracks', component: TracksPageComponent },
            { path: 'tracks', component: TracksPageComponent },
            { path: 'artists/:id', component: ArtistPageComponent },
            { path: '**', redirectTo: 'options' }
        ]
    }
]

@NgModule({
    imports: [RouterModule.forChild(routes)],
    exports: [RouterModule],
})
export class SearchRoutingModule { }
