import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { LandingPageComponent } from './components/landing-page/landing-page.component';
import { GamePageComponent } from './components/game-page/game-page.component';
import {GameService} from './services/game.service';
import { SetupGameComponent } from './components/setup-game/setup-game.component';

@NgModule({
  declarations: [
    AppComponent,
    LandingPageComponent,
    GamePageComponent,
    SetupGameComponent
  ],
  imports: [
    BrowserModule,
    AppRoutingModule
  ],
  providers: [
    { provide: GameService }
  ],
  bootstrap: [AppComponent]
})
export class AppModule { }
