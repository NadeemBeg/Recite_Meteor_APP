// This section sets up some basic app metadata, the entire section is optional.
App.info({
  id: 'com.reciteapp.app', //for adndroid
  //id: 'com.poeticsystems.hoopla',   // for ios
  name: 'Recite',
  version: '2.0.0',
});
App.icons({
  // iOS
  /*'iphone_2x': 'resources/icons/ios/iphone_2x.png',
  'iphone_3x': 'resources/icons/ios/iphone_3x.png',
  'ipad':      'resources/icons/ios/ipad.png',
  'ipad_2x':   'resources/icons/ios/ipad_2x.png',
  'ios_spotlight': 'resources/icons/ios/ios_spotlight.png',
  'ios_spotlight_2x': 'resources/icons/ios/ios_spotlight_2x.png',
  'ios_settings': 'resources/icons/ios/ios_settings.png',
  'ios_settings_2x': 'resources/icons/ios/ios_settings_2x.png',*/
  // Android
  'android_mdpi':  'resources/icons/android/mdpi.png',
  'android_hdpi': 'resources/icons/android/hdpi.png',
  'android_xhdpi': 'resources/icons/android/xhdpi.png',
  'android_xxhdpi': 'resources/icons/android/xxhdpi.png',
  'android_xxxhdpi': 'resources/icons/android/xxxhdpi.png'
});
// Set up resources such as icons and launch screens.
App.launchScreens({
  // iOS
  /*'iphone_2x': 'resources/splash/ios/iphone_2x.png',
  'iphone5': 'resources/splash/ios/iphone5.png',
  'iphone6': 'resources/splash/ios/iphone6.png',
  'iphone6p_portrait': 'resources/splash/ios/iphone6p_portrait.png',
  'ipad_portrait': 'resources/splash/ios/ipad_portrait.png',
  'ipad_portrait_2x': 'resources/splash/ios/ipad_portrait_2x.png',*/

  // Android
  'android_mdpi_portrait': 'resources/splash/android/splash-port-mdpi.png',
  'android_hdpi_portrait': 'resources/splash/android/splash-port-hdpi.png',
  'android_xhdpi_portrait': 'resources/splash/android/splash-port-xhdpi.png',
  'android_xxhdpi_portrait': 'resources/splash/android/splash-port-xxhdpi.png',
  'android_xxxhdpi_portrait': 'resources/splash/android/splash-port-xxxhdpi.png'
});




App.accessRule('*');
App.accessRule('*', { type: 'navigation' });
App.accessRule('http://*');
App.accessRule('https://*');
App.accessRule('content://com.android.contacts/contacts/*');
App.accessRule('content://com.android.contacts/contacts/*',{ type: 'navigation'});
App.accessRule('content:///*');
App.accessRule('content:///*',{ type: 'navigation'});
App.accessRule("https://connect.squareup.com/*",{ type: 'navigation'});
App.accessRule("https://connect.squareup.com/*");
App.accessRule("http://localhost:3000",{type:'navigation'});
App.accessRule("http://localhost:3000");
App.accessRule("http://localhost:12176");
App.accessRule("http://localhost:12176",{type:'navigation'});
App.accessRule('*://lorempixel.com/*');
App.accessRule('*.google.com/*');
App.accessRule('*.googleapis.com/*');
App.accessRule('*.gstatic.com/*');
App.accessRule('https://maps.googleapis.com/*');
App.accessRule('*.apple.com/*', { launchExternal: true });
App.accessRule('*.google.com/maps/*', { launchExternal: true });
App.accessRule('mailto:*', { launchExternal: true });
App.accessRule('sms:*', { launchExternal: true });
App.accessRule('tel:*', { launchExternal: true });
App.accessRule('http:*', { launchExternal: true });
App.accessRule('https:*', { launchExternal: true });
App.accessRule("blob:*");

// Set PhoneGap/Cordova preferences.
App.setPreference('HideKeyboardFormAccessoryBar', true);
App.setPreference('Orientation', 'default');
App.setPreference('StatusBarBackgroundColor', '#000000');
App.setPreference('StatusBarOverlaysWebView', false);
App.setPreference('StatusBarStyle', 'lightcontent');
App.setPreference('AndroidLaunchMode', 'singleTask');
App.setPreference('loadUrlTimeoutValue', '700000');
App.setPreference('BackupWebStorage', 'local');
App.setPreference("KeyboardDisplayRequiresUserAction",false);

App.setPreference("android-targetSdkVersion", "28");
App.setPreference("android-compileSdkVersion", "28");
/*
App.configurePlugin('phonegap-plugin-push', {
  SENDER_ID: 135864196303
});*/

App.configurePlugin('cordova-plugin-googleplus', {
    'REVERSED_CLIENT_ID': '395180108590-c4i0aaqte9mipgde2kkq2bn0rhmisufp.apps.googleusercontent.com'
});

App.configurePlugin('phonegap-plugin-push', {
  SENDER_ID: 988979084578
});