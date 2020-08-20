import {BrowserModule} from '@angular/platform-browser';
import {NgModule} from '@angular/core';
import {AppRoutingModule} from './app-routing.module';
import {AppComponent} from './app.component';
import {LandingPageComponent} from './components/landing-page/landing-page.component';
import {GamePageComponent} from './components/game-page/game-page.component';
import {SetupGameComponent} from './components/setup-game/setup-game.component';
import {CardComponent} from './components/card/card.component';
import {BrowserAnimationsModule} from '@angular/platform-browser/animations';
import {HeaderLogoComponent} from './components/header-logo/header-logo.component';
import {StoreModule} from '@ngrx/store';
import {rootReducer} from './store/root-reducer';

@NgModule({
  declarations: [
    AppComponent,
    LandingPageComponent,
    GamePageComponent,
    SetupGameComponent,
    CardComponent,
    HeaderLogoComponent
  ],
  imports: [
    BrowserModule,
    BrowserAnimationsModule,
    AppRoutingModule,
    StoreModule.forRoot(rootReducer)
  ],
  providers: [],
  bootstrap: [AppComponent]
})
export class AppModule { }
