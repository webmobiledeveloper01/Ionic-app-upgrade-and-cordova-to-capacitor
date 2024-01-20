ERROR REPORT IOS :

************************

warning: libobjc.A.dylib is being read from process memory. This indicates that LLDB could not find the on-disk shared cache for this device. This will likely reduce debugging performance.

Thread Performance Checker: Thread running at QOS_CLASS_USER_INTERACTIVE waiting on a lower QoS thread running at QOS_CLASS_DEFAULT. Investigate ways to avoid priority inversions
PID: 86457, TID: 19673524
Backtrace
=================================================================
3   GPUToolsCore                        0x00000001036d96b8 _ZN8GPUTools9Interpose15DYInitInterposeEPFP16DYGuestAppClientvEi + 404
4   dyld                                0x00000001cc90e280 CB3FF411-4762-34D2-86A4-ECA13F9FB6C3 + 29312
5   dyld                                0x00000001cc964360 CB3FF411-4762-34D2-86A4-ECA13F9FB6C3 + 381792
6   dyld                                0x00000001cc90c968 CB3FF411-4762-34D2-86A4-ECA13F9FB6C3 + 22888
7   dyld                                0x00000001cc90bcd8 CB3FF411-4762-34D2-86A4-ECA13F9FB6C3 + 19672
8   dyld                                0x00000001cc90b17c CB3FF411-4762-34D2-86A4-ECA13F9FB6C3 + 16764
9   dyld                                0x00000001cc916d5c CB3FF411-4762-34D2-86A4-ECA13F9FB6C3 + 64860
10  dyld                                0x00000001cc913788 CB3FF411-4762-34D2-86A4-ECA13F9FB6C3 + 51080
11  dyld                                0x00000001cc90fccc CB3FF411-4762-34D2-86A4-ECA13F9FB6C3 + 36044
12  dyld                                0x00000001cc91533c CB3FF411-4762-34D2-86A4-ECA13F9FB6C3 + 58172
13  dyld                                0x00000001cc949244 CB3FF411-4762-34D2-86A4-ECA13F9FB6C3 + 270916
14  dyld                                0x00000001cc91e66c CB3FF411-4762-34D2-86A4-ECA13F9FB6C3 + 95852
15  dyld                                0x00000001cc91c8d4 CB3FF411-4762-34D2-86A4-ECA13F9FB6C3 + 88276
2023-09-11 09:27:37.124655+0200 TimeMapp[86457:19673524] Apache Cordova native platform version 6.2.0 is starting.
2023-09-11 09:27:37.124725+0200 TimeMapp[86457:19673524] Multi-tasking -> Device: YES, App: YES
2023-09-11 09:27:37.151504+0200 TimeMapp[86457:19673524] CDVWKWebViewEngine: trying to inject XHR polyfill
2023-09-11 09:27:37.153035+0200 TimeMapp[86457:19673524] The preference key "AutoInjectCordova" is not defined and will default to "FALSE"
2023-09-11 09:27:37.153064+0200 TimeMapp[86457:19673524] The preference key "AudioCanMix" is not defined and will default to "FALSE"
2023-09-11 09:27:37.174612+0200 TimeMapp[86457:19673524] The preference key "WKSuspendInBackground" is not defined and will default to "TRUE"
2023-09-11 09:27:37.174665+0200 TimeMapp[86457:19673524] The preference key "MediaPlaybackAllowsAirPlay" is not defined and will default to "TRUE"
2023-09-11 09:27:39.120972+0200 TimeMapp[86457:19673524] The preference key "KeyboardAppearanceDark" is not defined and will default to "FALSE"
2023-09-11 09:27:39.121111+0200 TimeMapp[86457:19673524] The preference key "AllowLinkPreview" is not defined and will default to "FALSE"
2023-09-11 09:27:39.121898+0200 TimeMapp[86457:19673524] The preference key "AllowBackForwardNavigationGestures" is not defined and will default to "FALSE"
2023-09-11 09:27:39.121937+0200 TimeMapp[86457:19673524] CDVWKWebViewEngine will reload WKWebView if required on resume
2023-09-11 09:27:39.122021+0200 TimeMapp[86457:19673524] Using Ionic WKWebView
2023-09-11 09:27:39.122246+0200 TimeMapp[86457:19673524] [CDVTimer][console] 0.051022ms
2023-09-11 09:27:39.122571+0200 TimeMapp[86457:19673524] [CDVTimer][handleopenurl] 0.273943ms
2023-09-11 09:27:39.125047+0200 TimeMapp[86457:19673524] [CDVTimer][intentandnavigationfilter] 2.434015ms
2023-09-11 09:27:39.125144+0200 TimeMapp[86457:19673524] [CDVTimer][gesturehandler] 0.050068ms
2023-09-11 09:27:39.126540+0200 TimeMapp[86457:19673524] [CDVTimer][file] 1.345992ms
2023-09-11 09:27:39.126605+0200 TimeMapp[86457:19673524] Starting Firebase Messaging plugin
2023-09-11 09:27:39.128026+0200 TimeMapp[86457:19674396] 8.1.0 - [Firebase/Core][I-COR000003] The default Firebase app has not yet been configured. Add `[FIRApp configure];` (`FirebaseApp.configure()` in Swift) to your application initialization. Read more: https://goo.gl/ctyzm8.
2023-09-11 09:27:39.207719+0200 TimeMapp[86457:19674402] 8.1.0 - [Firebase/Messaging][I-FCM001000] FIRMessaging Remote Notifications proxy enabled, will swizzle remote notification receiver handlers. If you'd prefer to manually integrate Firebase Messaging, add "FirebaseAppDelegateProxyEnabled" to your Info.plist, and set it to NO. Follow the instructions at:
https://firebase.google.com/docs/cloud-messaging/ios/client#method_swizzling_in_firebase_messaging
to ensure proper integration.
2023-09-11 09:27:39.210169+0200 TimeMapp[86457:19673524] [CDVTimer][firebasemessaging] 83.594084ms
2023-09-11 09:27:39.211974+0200 TimeMapp[86457:19673524] [CDVTimer][cordovagooglemaps] 1.749992ms
2023-09-11 09:27:39.212025+0200 TimeMapp[86457:19673524] [CDVTimer][TotalPluginStartup] 89.854002ms
2023-09-11 09:27:40.404647+0200 TimeMapp[86457:19673524] [Process] WebContent process (0x114000d90) took 3.165336 seconds to launch
2023-09-11 09:27:40.415285+0200 TimeMapp[86457:19673524] [Process] Networking process (0x1140010f0) took 1.198830 seconds to launch
2023-09-11 09:27:40.442792+0200 TimeMapp[86457:19674406] 8.1.0 - [Firebase/Messaging][I-FCM002022] APNS device token not set before retrieving FCM Token for Sender ID '457684864864'. Notifications to this FCM Token will not be delivered over APNS.Be sure to re-retrieve the FCM token once the APNS device token is set.
2023-09-11 09:27:41.515745+0200 TimeMapp[86457:19673524] WARN: Google Maps JavaScript API has been loaded directly without a callback. This is not supported and can lead to race conditions and suboptimal performance. For supported loading patterns please see https://goo.gle/js-api-loading
2023-09-11 09:27:41.515824+0200 TimeMapp[86457:19673524] WARN: Ionic Angular was already initialized. Make sure IonicModule.forRoot() is just called once.
2023-09-11 09:27:41.516060+0200 TimeMapp[86457:19673524] WARN: [DEPRECATION][Events]: The Events provider is deprecated and it will be removed in the next major release.
  - Use "Observables" for a similar pub/sub architecture: https://angular.io/guide/observables
  - Use "Redux" for advanced state management: https://ngrx.io
2023-09-11 09:27:41.516176+0200 TimeMapp[86457:19673524] Angular is running in the development mode. Call enableProdMode() to enable the production mode.
2023-09-11 09:27:41.516780+0200 TimeMapp[86457:19673524] Ionic Native: deviceready event fired after 295 ms
2023-09-11 09:27:41.516937+0200 TimeMapp[86457:19673524] Se esconde el splash
2023-09-11 09:27:41.524166+0200 TimeMapp[86457:19673524] WARN: [DEPRECATED][ion-split-pane] Using the [main] attribute is deprecated, please use the "contentId" property instead:
BEFORE:
  <ion-split-pane>
    ...
    <div main>...</div>
  </ion-split-pane>

AFTER:
  <ion-split-pane contentId="main-content">
    ...
    <div id="main-content">...</div>
  </ion-split-pane>
2023-09-11 09:27:41.524250+0200 TimeMapp[86457:19673524] WARN: [DEPRECATED][ion-menu] Using the [main] attribute is deprecated, please use the "contentId" property instead:
BEFORE:
  <ion-menu>...</ion-menu>
  <div main>...</div>

AFTER:
  <ion-menu contentId="my-content"></ion-menu>
  <div id="my-content">...</div>
2023-09-11 09:27:41.635076+0200 TimeMapp[86457:19673524] Entra en el set deeplinks
2023-09-11 09:27:41.635139+0200 TimeMapp[86457:19673524] WARN: Native: tried calling Deeplinks.route, but the Deeplinks plugin is not installed.
2023-09-11 09:27:41.635173+0200 TimeMapp[86457:19673524] WARN: Install the Deeplinks plugin: 'ionic cordova plugin add ionic-plugin-deeplinks'
2023-09-11 09:27:41.635203+0200 TimeMapp[86457:19673524] NO Successfully routed plugin_not_installed
2023-09-11 09:27:41.635233+0200 TimeMapp[86457:19673524] WARN: Native: tried calling StatusBar.styleBlackOpaque, but the StatusBar plugin is not installed.
2023-09-11 09:27:41.635275+0200 TimeMapp[86457:19673524] WARN: Install the StatusBar plugin: 'ionic cordova plugin add cordova-plugin-statusbar'
2023-09-11 09:27:42.179247+0200 TimeMapp[86457:19673524] null
2023-09-11 09:27:42.219055+0200 TimeMapp[86457:19673524] The preference key "AutoHideSplashScreen" is not defined and will default to "TRUE"


*******************************************