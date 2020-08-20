import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { LandingPageComponent } from './components/landing-page/landing-page.component';
import { GamePageComponent } from './components/game-page/game-page.component';
import {GameService} from './services/game.service';
import { SetupGameComponent } from './components/setup-game/setup-game.component';
import { CardComponent } from './components/card/card.component';
import {BrowserAnimationsModule} from '@angular/platform-browser/animations';

@NgModule({
  declarations: [
    AppComponent,
    LandingPageComponent,
    GamePageComponent,
    SetupGameComponent,
    CardComponent
  ],
  imports: [
    BrowserModule,
    BrowserAnimationsModule,
    AppRoutingModule
  ],
  providers: [
    { provide: GameService }
  ],
  bootstrap: [AppComponent]
})
export class AppModule { }
