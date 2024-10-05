import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { ConnexionComponent } from './models/connexion/connexion.component';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { FormsModule } from '@angular/forms';
import { HomeComponent } from './models/home/home.component';
import { HttpClientModule } from '@angular/common/http';
import { VerticalNavComponent } from './components/vertical-nav/vertical-nav.component';
import { EvenementComponent } from './models/evenement/evenement.component';
import { PlaylistComponent } from './models/playlist/playlist.component';
import { FormPlaylistComponent } from './models/form-playlist/form-playlist.component';
import { NgxPaginationModule } from 'ngx-pagination';
import { UpdatePlaylistComponent } from './models/update-playlist/update-playlist.component';
import { FormEventComponent } from './models/form-event/form-event.component';
import { UpdateEventComponent } from './models/update-event/update-event.component';

@NgModule({
  declarations: [
    AppComponent,
    ConnexionComponent,
    HomeComponent,
    VerticalNavComponent,
    EvenementComponent,
    PlaylistComponent,
    FormPlaylistComponent,
    UpdatePlaylistComponent,
    FormEventComponent,
    UpdateEventComponent
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    BrowserAnimationsModule,
    FormsModule,
    HttpClientModule,
    NgxPaginationModule
  ],
  providers: [],
  bootstrap: [AppComponent]
})
export class AppModule { }
