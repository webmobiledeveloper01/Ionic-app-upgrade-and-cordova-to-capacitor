/**
 * Variables globales de la aplicación en local
 */

export const environment = {
  production: false,

  // URL del dominio asociado a la aplicación, para comprobar si está o no suspendido
  domainUrl: "https://fernando.xerintel.net/devxerintel/",
  // domainUrl: "https://timemapp.davidtovar.dev/",

  // URL del endpoint de la api de pruebas
  // apiUrl: "https://timemapp.davidtovar.dev/api/auth/",
  apiUrl: "https://fernando.xerintel.net/devxerintel/api/auth/", // Working Path.
  // apiUrl: "http://192.168.0.73/FERNANDO/laravel-fer/public/api/auth/",
  //apiUrl: "http://192.168.18.114/FERNANDO/laravel-fer/public/api/auth/",

  


  //Sender id para las notificaciones push
  senderID: "777777777",

  //Clave de stripe
  stripePublishableKey:
    "pk_test_51JtZ9ILnCSQDYACUAUUra2uVZjHBdwvZeiay4XUAMkUnQ4ngvcbqyaYvjM2SQngNeOb4KweJzQXVtbf0FSRUkqBJ00yEByxZD1",

  // Clave API de Google Maps ****
  googleMapsApiKey: "AIzaSyDnVEq799iMJ1j0FjyVA2CB5yriBuPHKdE",
  
};
