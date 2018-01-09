// The file contents for the current environment will overwrite these during build.
// The build system defaults to the dev environment which uses `environment.ts`, but if you do
// `ng build --env=prod` then `environment.prod.ts` will be used instead.
// The list of which env maps to which file can be found in `.angular-cli.json`.

export const environment = {
  production: false,
  firebaseConfig : {
    apiKey: "AIzaSyBsjqRg2NG9hGqTthlp7ItMyIgJ6iqrrI4",
    authDomain: "parkinglot-bf79f.firebaseapp.com",
    databaseURL: "https://parkinglot-bf79f.firebaseio.com",
    projectId: "parkinglot-bf79f",
    storageBucket: "parkinglot-bf79f.appspot.com",
    messagingSenderId: "824489959771"
  }
};
