[![CircleCI](https://circleci.com/gh/mashafrancis/almond-re.svg?style=svg)](https://circleci.com/gh/mashafrancis/almond-re)
[![Maintainability](https://api.codeclimate.com/v1/badges/dbebee07d6ea948658c1/maintainability)](https://codeclimate.com/github/mashafrancis/almond-re/maintainability)
[![Test Coverage](https://api.codeclimate.com/v1/badges/dbebee07d6ea948658c1/test_coverage)](https://codeclimate.com/github/mashafrancis/almond-re/test_coverage)

# almond-fe
Almond frontend application for the hydroponics farm

<br />
<img width="1440" alt="almond-screenshot" src="https://res.cloudinary.com/almondgreen/image/upload/v1569253162/Almond/Screenshot_2019-09-23_at_18.38.45_tajbjv.png">
<br />

## Description
This application will be used in a hydroponics farm control system to be used at home with limited space, in greenhouses and indoors as well.

### Application Heroku Links

-   Backend (Swagger Documentation):
    [swagger-documentation](https://kari4me-api.herokuapp.com/)

-   Frontend (Almond App Hosting):
    [almond web app](https://almond-re-staging.herokuapp.com/)

-   Postman collection
    <br />
    <br />
    [![Run in Postman](https://run.pstmn.io/button.svg)](https://app.getpostman.com/run-collection/f9f0f4ab064818fbf641)

### Development set up
1. Install [`Node JS`](https://nodejs.org/en/).
2. To clone, run `git clone https://github.com/mashafrancis/almond-fe`.
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
    127.0.0.1 almond.com
  ```

- Save changes and quit the editor.

### Development server

Run `yarn start:dev` for a dev server. Navigate to `http://localhost:4200/`. The app will automatically reload if you change any of the source files.

### Build

Run `yarn build` to build the project. The build artifacts will be stored in the `dist/` directory. Use the `--prod` flag for a production build.

## Running unit tests

Run `yarn test` to execute the unit tests. This is achieved through the use of jest package which is used to test javascript code .

## Running end-to-end tests

Run `yarn cypress:open` to execute the end-to-end tests via Cypress.

## FAQ
See the almond [wiki](https://github.com/mashafrancis/almond-hw/wiki)
