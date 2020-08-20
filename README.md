# SplendxEntry

Your task is to build a simple card-matching game, the kind that your brother/sister/best friend
always cheated at when you were little. In case you need a reminder, here’s how it should work:

- Present the user with an even number of cards, “face down”.
- When the user clicks a card, “flip it over” and reveal the hidden image.
- When two cards are revealed:
  - If the cards are identical, remove them from play.
  - If they are not, flip them back.
- The game ends when all the cards are removed.

To get full points, your app should also fulfill all of the below requirements:

- It should be **responsive**.
- It should have a **landing page** for the app that explains the rules, and a separate screen for the actual game.
- We expect an **SPA**.
- Allow the user to play **more than one game** without reloading the page.
- Allow the user to set the **number of cards** before a new game (min. 3, max. 10 pairs).
- Present the user with a **step counter** that increments after every second card flip.
- Allow the user to **continue** the previously played game after reloading the page.

We have attached some assets and a basic UI design scheme; implement them as closely as possible.
Aside from that, use Angular framework. This is your project. Just make it happen.

You need to deliver a working game that we can play through until the end, otherwise,
we can’t evaluate your submission. It doesn’t have to be perfect but it cannot contain game-breaking bugs.

We’ll be expecting your submission via a GitHub link. Please commit regularly,
at least after each feature while you work.

You have four hours, starting now.

Limit: `2020-08-20 09:38` - `2020-08-20 13:38`

## UI

![start](./docs/start.png)

![view](./docs/default-view.png)

![match](./docs/default-match.png)

![try](./docs/default-try.png)

## Angular stuff

This project was generated with [Angular CLI](https://github.com/angular/angular-cli) version 10.0.6.

### Development server

Run `ng serve` for a dev server. Navigate to `http://localhost:4200/`. The app will automatically reload if you change any of the source files.

### Code scaffolding

Run `ng generate component component-name` to generate a new component. You can also use `ng generate directive|pipe|service|class|guard|interface|enum|module`.

### Build

Run `ng build` to build the project. The build artifacts will be stored in the `dist/` directory. Use the `--prod` flag for a production build.

### Running unit tests

Run `ng test` to execute the unit tests via [Karma](https://karma-runner.github.io).

### Running end-to-end tests

Run `ng e2e` to execute the end-to-end tests via [Protractor](http://www.protractortest.org/).

### Further help

To get more help on the Angular CLI use `ng help` or go check out the [Angular CLI README](https://github.com/angular/angular-cli/blob/master/README.md).
