import * as app from "@nativescript/core/application";
import { Common, ILoginResult } from "./social-login.common";
declare const com, java;

export class SocialLogin extends Common {
  private static instance: SocialLogin;

  private fbLoginManager: any;    // com.facebook.login.LoginManager
  private fbCallbackManager: any; // com.facebook.CallbackManager
  private googleClient: any;      // com.google.android.gms.common.api.GoogleApiClient
  private googleActivityRequestCode: number = 123;

  static getInstance(): SocialLogin {
    if (!SocialLogin.instance) {
      SocialLogin.instance = new SocialLogin();
    }

    return SocialLogin.instance;
  }

  /**
   * @docs https://developers.facebook.com/docs/reference/androidsdk/current/facebook/com/facebook/login/loginmanager.html/
  */
  loginWithFacebook(config: any = {}): Promise<Partial<ILoginResult>> {
    return new Promise((resolve, reject) => {
      try {
        let scopes = ["public_profile", "email"];

        // @config.scopes
        if (config.scopes) {
          scopes = config.scopes;
        }

        if (typeof (com.facebook) === "undefined" || typeof (com.facebook.FacebookSdk) === "undefined") {
          reject("Facebook SDK not installed - see gradle config");
          return;
        }

        // Lazy loading the Facebook callback manager
        if (!this.fbCallbackManager) {
          com.facebook.FacebookSdk.sdkInitialize(app.getNativeApplication());
          this.fbCallbackManager = com.facebook.CallbackManager.Factory.create();
        }

        const callback = (eventData: app.AndroidActivityResultEventData) => {
          app.android.off(app.AndroidApplication.activityResultEvent, callback);
          this.fbCallbackManager.onActivityResult(eventData.requestCode, eventData.resultCode, eventData.intent);
        };

        app.android.on(app.AndroidApplication.activityResultEvent, callback);

        this.fbLoginManager = com.facebook.login.LoginManager.getInstance();
        this.fbLoginManager.registerCallback(
          this.fbCallbackManager,
          new com.facebook.FacebookCallback({
            onSuccess: result => {
              try {
                const authToken = result.getAccessToken().getToken();

                console.log("ACCESS TOKEN", result.getAccessToken());

                // request userinfo
                const request = com.facebook.GraphRequest.newMeRequest(
                  result.getAccessToken(),
                  new com.facebook.GraphRequest.GraphJSONObjectCallback({
                    onCompleted: (user, resp) => {
                      const loginResult: Partial<ILoginResult> = {
                        id: user.getString("id"),
                        email: user.getString("email"),
                        firstName: user.getString("first_name"),
                        lastName: user.getString("last_name"),
                        displayName: user.getString("name"),
                        photo: user
                          .getJSONObject("picture")
                          .getJSONObject("data")
                          .getString("url"),
                        authToken
                      };

                      resolve(loginResult);
                    }
                  })
                );

                const params = new android.os.Bundle();
                params.putString("fields", "id,name,first_name,last_name,picture.type(large),email");
                request.setParameters(params);
                request.executeAsync();
              } catch (e) {
                reject(e);
              }
            },
            onCancel: () => reject("Facebook Login canceled"),
            onError: ex => reject("Error while trying to login with Fb " + ex)
          })
        );

        const permissions = java.util.Arrays.asList(scopes);
        const activity = app.android.foregroundActivity;
        this.fbLoginManager.logInWithReadPermissions(activity, permissions);
      } catch (error) {
        reject(error);
      }
    });
  }

  /**
   * @docs https://developers.google.com/identity/sign-in/android/start-integrating
   */
  loginWithGoogle(config: any): Promise<Partial<ILoginResult>> {
    return new Promise((resolve, reject) => {
      try {
        const googleSignInOptionsBuilder = new com.google.android.gms.auth.api.signin.GoogleSignInOptions.Builder(com.google.android.gms.auth.api.signin.GoogleSignInOptions.DEFAULT_SIGN_IN)
          .requestEmail()
          .requestProfile();

        // @config.serverClientId
        if (!config.serverClientId || config.serverClientId === "") {
          reject(
            "MISCONFIG: You need to specify config.serverClientId"
            + " for google on android because we are requesting"
            + " an idToken (which also gives as the profile pic)"
          );
        }

        // NOTE: also required to get profile pic...
        googleSignInOptionsBuilder.requestIdToken(config.serverClientId);

        // @config.requestServerAuthCode
        if (config.requestServerAuthCode) {
          googleSignInOptionsBuilder.requestServerAuthCode(config.serverClientId, false);
        }

        const googleSignInOptions = googleSignInOptionsBuilder.build();

        const onConnectionFailedListener = new com.google.android.gms.common.api.GoogleApiClient.OnConnectionFailedListener({
          onConnectionFailed: connectionResult => {
            reject("GoogleApiClient connection error: " + connectionResult.getErrorMessage());
          }
        });

        const onActivityResult = (eventData: app.AndroidActivityResultEventData) => {
          if (eventData.requestCode === this.googleActivityRequestCode) {
            app.android.off(app.AndroidApplication.activityResultEvent, onActivityResult);

            const googleSignInResult = com.google.android.gms.auth.api.Auth.GoogleSignInApi.getSignInResultFromIntent(eventData.intent);
            if (googleSignInResult === null) {
              reject("No googleSignInResult, eventData.intent seems to be invalid");
              return;
            }

            if (googleSignInResult.isSuccess()) {
              const account = googleSignInResult.getSignInAccount();
              const userId = account.getId();
              const photoUrl = <android.net.Uri>account.getPhotoUrl();

              this.googleClient.connect();

              const loginResult: Partial<ILoginResult> = {
                id: userId,
                email: account.getEmail(),
                firstName: account.getGivenName(),
                lastName: account.getFamilyName(),
                displayName: account.getDisplayName(),
                // requestIdToken is needed in signin options to get the profile pic
                photo: photoUrl ? photoUrl.toString() : null,
                authToken: account.getIdToken(),
                authCode: account.getServerAuthCode()
              };

              resolve(loginResult);
            } else if (eventData.resultCode === android.app.Activity.RESULT_CANCELED) {
              console.log("Activity was canceled");
              resolve(null);
            } else {
              console.log("Make sure you've uploaded your SHA1 fingerprint(s) to the Firebase console. Status: " + googleSignInResult.getStatus());
              reject("Has the SHA1 fingerprint been uploaded? Sign-in status: " + googleSignInResult.getStatus());
            }
          }
        };

        this.googleClient = new com.google.android.gms.common.api.GoogleApiClient.Builder(app.getNativeApplication())
          .addOnConnectionFailedListener(onConnectionFailedListener)
          .addApi(com.google.android.gms.auth.api.Auth.GOOGLE_SIGN_IN_API, googleSignInOptions)
          .build();

        const signInIntent = com.google.android.gms.auth.api.Auth.GoogleSignInApi.getSignInIntent(this.googleClient);
        const activity = app.android.foregroundActivity || app.android.startActivity;
        activity.startActivityForResult(signInIntent, this.googleActivityRequestCode);
        app.android.on(app.AndroidApplication.activityResultEvent, onActivityResult);
      } catch (error) {
        reject(error);
      }
    });
  }

  /**
   * Logout
   * @todo review facebook logout
  */
  logout(): Promise<void> {
    return new Promise((resolve, reject) => {
      try {
        // GOOGLE LOGOUT
        if (this.googleClient) {
          if (!this.googleClient.isConnected()) {
            console.log("Google logout: client is not connected");
          } else {
            // com.google.android.gms.auth.api.Auth.GoogleSignInApi.revokeAccess(this.googleClient);
            const signOut = com.google.android.gms.auth.api.Auth.GoogleSignInApi.signOut(this.googleClient);

            signOut.setResultCallback(
              new com.google.android.gms.common.api.ResultCallback({
                onResult: status => {
                  if (!status.isSuccess()) {
                    console.log("Google logout error");
                  }
                }
              })
            );
          }
        }

        if (this.fbLoginManager) {
          // What is this logout actually doing?
          // see revoke snippet: https://stackoverflow.com/questions/29305232/facebook-sdk-4-for-android-how-to-log-out-programmatically#:~:text=There%20are%20two%20ways%20to,Facebook%20programmatically%20except%20using%20LoginButton.
          this.fbLoginManager.logOut();
        }

        resolve();
      } catch (error) {
        reject(error);
      }
    });
  }
}
