<div align="center">

## almond-re

![CI](https://github.com/almond-hydroponics/almond-re/workflows/CI/badge.svg)
[![CircleCI](https://circleci.com/gh/almond-hydroponics/almond-re.svg?style=svg)](https://circleci.com/gh/almond-hydroponics/almond-re)
[![Maintainability](https://api.codeclimate.com/v1/badges/1787ab6745c18d366de9/maintainability)](https://codeclimate.com/github/almond-hydroponics/almond-re/maintainability)
[![Test Coverage](https://api.codeclimate.com/v1/badges/1787ab6745c18d366de9/test_coverage)](https://codeclimate.com/github/almond-hydroponics/almond-re/test_coverage)
[![Language grade: JavaScript](https://img.shields.io/lgtm/grade/javascript/g/almond-hydroponics/almond-re.svg?logo=lgtm&logoWidth=18)](https://lgtm.com/projects/g/almond-hydroponics/almond-re/context:javascript)
[![Total alerts](https://img.shields.io/lgtm/alerts/g/almond-hydroponics/almond-re.svg?logo=lgtm&logoWidth=18)](https://lgtm.com/projects/g/almond-hydroponics/almond-re/alerts/)
[![Mark stale issues and pull requests](https://github.com/almond-hydroponics/almond-re/actions/workflows/stale.yml/badge.svg)](https://github.com/almond-hydroponics/almond-re/actions/workflows/stale.yml)

</div>

<div align="center">

    Almond frontend application for the hydroponics farm

[![Almond](../public/images/readme.svg)](https://almond-re-staging.herokuapp.com/)

#### Simple but complicated almond

</div>

## Description

This application will be used in a hydroponics farm control system to be used at home with limited space, in greenhouses and indoors as well.

### Application Heroku Links

- Backend (Swagger Documentation):
  [swagger-documentation](https://almond-re.herokuapp.com/)

- Frontend (Almond App Hosting):
  [almond web app](https://almond-re-staging.herokuapp.com/)

- Postman collection
  <br />
  <br />
  [![Run in Postman](https://run.pstmn.io/button.svg)](https://app.getpostman.com/run-collection/144b6f12e9e9def531e1#?env%5Balmond%5D=W3sia2V5IjoiYmFzZS11cmwiLCJ2YWx1ZSI6IiIsImVuYWJsZWQiOnRydWV9LHsia2V5IjoidG9rZW4iLCJ2YWx1ZSI6IiIsImVuYWJsZWQiOnRydWV9LHsia2V5IjoiZ3JhZmFuYS11cmwiLCJ2YWx1ZSI6IiIsImVuYWJsZWQiOnRydWV9LHsia2V5IjoiZ3JhZmFuYS10b2tlbiIsInZhbHVlIjoiIiwiZW5hYmxlZCI6dHJ1ZX0seyJrZXkiOiJpbmZsdXgtc2VydmVyLXVybCIsInZhbHVlIjoiIiwiZW5hYmxlZCI6dHJ1ZX0seyJrZXkiOiJ2ZXJpZmljYXRpb25Ub2tlbiIsInZhbHVlIjoiIiwiZW5hYmxlZCI6dHJ1ZX0seyJrZXkiOiJlbWFpbCIsInZhbHVlIjoidGVzdEB0ZXN0LmNvbSIsImVuYWJsZWQiOnRydWV9LHsia2V5IjoidXNlcl9pZCIsInZhbHVlIjoiIiwiZW5hYmxlZCI6dHJ1ZX1d)

### Development set up

1. Install [`Node JS`](https://nodejs.org/en/).
2. To clone, run `git clone https://github.com/mashafrancis/almond-re`.
3. `cd` into the root of the **project directory**.
4. Install [`yarn`](https://yarnpkg.com/en/docs/install#mac-stable).
5. Run `yarn install` on the terminal to install dependencies.
6. Create a `.env` file in the root directory of the application. Example of the content of a `.env` file is shown in the `.env.example`
7. Setup local development server.

- In your terminal, execute the following command:
  ```bash
    sudo nano /etc/hosts
  ```
  Otherwise, you can open your hosts file in your editor of choice.
- Add the following line to your `hosts` file:

  ```bash
    127.0.0.1 froyo.almond.com
  ```

- Save changes and quit the editor.

### Development server

Run `yarn start:dev` for a dev server. Navigate to `http://froyo.almond.com:3000/`. The app will automatically reload if you change any of the source files.

### Build

Run `yarn build` to build the project. The build artifacts will be stored in the `dist/` directory. Use the `--prod` flag for a production build.

## Running unit tests

Run `yarn test` to execute the unit tests. This is achieved through the use of jest package which is used to test javascript code .

## Running end-to-end tests

Run `yarn cypress:open` to execute the end-to-end tests via Cypress.

## FAQ

See the almond [wiki](https://github.com/mashafrancis/almond-hw/wiki)
