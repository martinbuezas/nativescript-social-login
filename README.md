# NativeScript Social Login

Authenticate users using Facebook and Google sign in.

## Prerequisites
Head on over to [https://console.firebase.google.com/](https://console.firebase.google.com/) and sign up for a free account.
Your first 'Firebase' will be automatically created and made available via an URL like `https://n-plugin-test.firebaseio.com`.

Open your Firebase project at the Google console and click 'Add app' to add an iOS and / or Android app. Follow the steps (make sure the bundle id is the same as your `nativescript.id` in `package.json` and you'll be able to download:

* iOS: `GoogleService-Info.plist` which you'll add to your NativeScript project at `app/App_Resources/iOS/GoogleService-Info.plist`

* Android: `google-services.json` which you'll add to your NativeScript project at `app/App_Resources/Android/google-services.json`

## Installation

```javascript
tns plugin add @martinbuezas/nativescript-social-login
```

## Android Configuration

### `Strings.xml`

Add your Facebook App ID to `App_Resources/Android/src/main/res/values/strings.xml` - If the file doesn't exist, create it and don't forget to add you app's name and kimera title.

```xml
<?xml version="1.0" encoding="utf-8"?>
<resources>
  <string name="app_name">{{ YOUR_APP_NAME }}</string>
  <string name="title_activity_kimera">{{ YOUR_APP_NAME }}</string>
  <string name="facebook_app_id">{{ YOUR_FACEBOOK_APP_ID }}</string>
  <string name="fb_login_protocol_scheme">fb{{ YOUR_FACEBOOK_APP_ID }}</string>
</resources>
```

### `AndroidManifest.xml`

1. Add the `xmlns:tools="http://schemas.android.com/tools"` namespace to your `<manifest>` tag.
1. Check the required permissions
1. Add the Facebook configuration in the `<application>` section of the manifest

```xml
<?xml version="1.0" encoding="utf-8"?>
<manifest
  xmlns:android="http://schemas.android.com/apk/res/android"
  xmlns:tools="http://schemas.android.com/tools"
  >

    <!-- 2. Permission -->
    <uses-permission android:name="android.permission.READ_EXTERNAL_STORAGE" />
    <uses-permission android:name="android.permission.WRITE_EXTERNAL_STORAGE" />
    <uses-permission android:name="android.permission.ACCESS_NETWORK_STATE" />

    <application>
      <!-- 3. Facebook config -->
      <meta-data
        android:name="com.facebook.sdk.ApplicationId"
        android:value="@string/facebook_app_id"
      />
      <activity
        android:name="com.facebook.FacebookActivity"
        android:configChanges="keyboard|keyboardHidden|screenLayout|screenSize|orientation"
        tools:replace="android:theme"
        android:theme="@android:style/Theme.Translucent.NoTitleBar"
        android:label="@string/app_name"
      />
      <activity
        android:name="com.facebook.CustomTabActivity"
        android:exported="true"
      >
        <intent-filter>
          <action android:name="android.intent.action.VIEW" />
          <category android:name="android.intent.category.DEFAULT" />
          <category android:name="android.intent.category.BROWSABLE" />
          <data android:scheme="@string/fb_login_protocol_scheme" />
        </intent-filter>
      </activity>
  </application>
</manifest>
```

### Setup Android Google Sign in for Debug Builds
1. You need the *SHA1* value associated with the `debug.keystore` in your local android setup on your machine. For example, the following command is what you might run on a Windows machine:
``` shell
keytool -list -v -keystore C:/users/brad.martin/.android/debug.keystore -alias androiddebugkey -storepass android -keypass android
```
The path will change according to the path on your machine. The android debug builds are signed with this default `debug.keystore` located on your machine. So when you run the debug build on a device Google will allow the authentication with the running .apk since it has the SHA1 for the debug.keystore the debug app is built with.

2. Create an app [here](https://developers.google.com/mobile/add?platform=android&cntapi=signin&cntapp=Default%20Demo%20App&cntpkg=com.google.samples.quickstart.signin&cnturl=https:%2F%2Fdevelopers.google.com%2Fidentity%2Fsign-in%2Fandroid%2Fstart%3Fconfigured%3Dtrue&cntlbl=Continue%20with%20Try%20Sign-In) on Google Developer site. 
    - Enter the App name. This can be anything but it will display to the user who is authenticating.
    - Enter the android package name. The `package` name is the android app name which is in the *package.json* under the `nativescript` object as the `id` property.
    - Next configure the Google services.
    - Select `Google Sign-In`
    - Enter your Signing Certificate SHA-1. This is the SHA1 value you get from the first step when running the `keytool` command.
    - Enable Google Sign-In
        - If only enabling Google Sign-In you do not need the configuration file inside your application.
3. Run the app and `loginWithGoogle()` should return the data associated with the google account that was selected.

## iOS Configuration

### `Info.plist`

Add your Facebook App ID and your Reversed Client ID to `app/App_Resources/iOS/Info.plist`

```xml
<dict>
  <!-- ... -->

  <!-- FACEBOOK AND GOOGLE LOGIN start -->
  <key>FacebookAppID</key>
  <string>{{ YOUR_FACEBOOK_APP_ID }}</string>
  <key>FacebookDisplayName</key>
  <string>{{ YOUR_FACEBOOK_DISPLAY_NAME }}</string>
  <key>CFBundleURLTypes</key>
  <array>
    <dict>
      <key>CFBundleTypeRole</key>
      <string>Editor</string>
      <key>CFBundleURLSchemes</key>
      <array>
        <!-- Get it from your GoogleService-Info.plist -->
        <string>{{ REVERSED_CLIENT_ID }}</string>
      </array>
    </dict>
    <dict>
      <key>CFBundleTypeRole</key>
      <string>Editor</string>
      <key>CFBundleURLSchemes</key>
      <array>
        <string>fb{{ YOUR_FACEBOOK_APP_ID }}</string>
      </array>
    </dict>
  </array>
  <!-- FACEBOOK AND GOOGLE LOGIN end -->
</dict>
```

## API 

### `requiring / importing the plugin`
	
```typescript
import { SocialLogin } from "@martinbuezas/nativescript-social-login";

export class MyClass {
  private sl: SocialLogin = SocialLogin.getInstance();
}
```

### `loginWithGoogle()`

```typescript
this.sl.loginWithGoogle({
    iosClientId: GOOGLE_IOS_CLIENT_ID,
    serverClientId: GOOGLE_SERVER_CLIENT_ID,
  })
  .then((result) => console.log("USER", result))
  .catch((error) => console.log("ERROR", error));
```

| Property | Default | Description |
| --- | --- | --- |
| requestServerAuthCode | `false` | Request an "offline" code that a server can use to exchange for a new Auth Token |
| iosClientId | `undefined` | Required for iOS |
| serverClientId | `undefined` | Required for Android<br>Required for iOS (and Android) when requesting server auth code. |

### `loginWithFacebook`

```typescript
this.sl.loginWithFacebook({
    scopes: ["profile", "email"]
  })
  .then((result) => console.log("USER", result))
  .catch((error) => console.log("ERROR", error));
```
| Property | Default | Description |
| --- | --- | --- |
| scopes | `["profile", "email"]` | **NOTE:** Additional scopes haven't been tested |


## License

Apache License Version 2.0, January 2004

## To-do

- Implement environment handling of Android and iOS config files
- Test additional Facebook Login scopes