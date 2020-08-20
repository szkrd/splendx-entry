import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import {LandingPageComponent} from './components/landing-page/landing-page.component';
import {GamePageComponent} from './components/game-page/game-page.component';

const routes: Routes = [
  { path: '', component: LandingPageComponent },
  { path: 'play', component: GamePageComponent },
  { path: '*', component: LandingPageComponent }
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
