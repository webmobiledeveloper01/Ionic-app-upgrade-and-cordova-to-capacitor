import { CapacitorConfig } from '@capacitor/cli';

const config: CapacitorConfig = {
  appId: 'com.xerintel.timemapp5872',
  appName: 'TimeMapp',
  webDir: 'www/browser',
  server: {
    androidScheme: 'https',
  },
  plugins: {
    GoogleAuth: {
      scopes: ['profile', 'email'],
      serverClientId: "457684864864-iaffen1ng8d9o5jq6vsupgekj2omb5s4.apps.googleusercontent.com",
    },
    FileTransfer: {
      "cordova-plugin-file-transfer": {}
    },
    CordovaGoogleMaps: {
      "cordova-plugin-googlemaps": {}
    },
    CordovaPluginFirebaseMessaging: {
      "cordova-plugin-firebase-messaging": {}
    },
  },
};

export default config;
