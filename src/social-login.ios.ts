import * as app from "tns-core-modules/application";
import { Common, ILoginResult } from "./social-login.common";

export class SocialLogin extends Common {
  private static instance: SocialLogin;
  private fbLoginManager: FBSDKLoginManager;
  private googleSignIn: GIDSignIn;

  static getInstance(): SocialLogin {
    if (!SocialLogin.instance) {
      SocialLogin.instance = new SocialLogin();
    }

    return SocialLogin.instance;
  }

  /**
   * Register delegates
   * @todo cleanup: mover a getInstance
   */
  constructor() {
    super();
    this.addAppDelegateMethods(this.getAppDelegate());
  }

  /**
   * @docs LoginManager https://developers.facebook.com/docs/reference/ios/current/class/FBSDKLoginManager/
   * @docs LoginBehaviour https://developers.facebook.com/docs/reference/android/current/class/LoginBehavior/
  */
  loginWithFacebook(config: any = {}): Promise<Partial<ILoginResult>> {
    return new Promise((resolve, reject) => {
      this.fbLoginManager = FBSDKLoginManager.alloc().init();

      let scopes = ["public_profile", "email"];

      // @config.scopes
      if (config.scopes) {
        scopes = config.scopes;
      }

      const onSuccess = (result) => {
        const authToken = result.token.tokenString;

        const onComplete = (connection, obj, handler) => {
          try {
            const loginResult: Partial<ILoginResult> = {
              id: obj.objectForKey("id"),
              email: obj.objectForKey("email"),
              firstName: obj.objectForKey("first_name"),
              lastName: obj.objectForKey("last_name"),
              displayName: obj.objectForKey("name"),
              photo: obj
                .objectForKey("picture")
                .objectForKey("data")
                .objectForKey("url"),
              authToken
            };

            resolve(loginResult);
          } catch (error) {
            reject(error);
          }
        };

        FBSDKGraphRequest.alloc().initWithGraphPathParametersTokenStringVersionHTTPMethod(
            "me",
            NSDictionary.dictionaryWithObjectForKey("id,about,birthday,email,gender,name,first_name,last_name,picture", "fields"),
            authToken,
            null,
            "GET"
          )
          .startWithCompletionHandler(onComplete);
      };

      const handleResponse = (result, error) => {
        if (error) {
          reject(error.localizedDescription);
        } else {
          if (!result) {
            reject("UNKNOWN ERROR");
          } else if (result.isCancelled) {
            resolve(null);
          } else if (result.token) {
            onSuccess(result);
          } else {
            reject("NO TOKEN");
          }
        }
      };

      const permissions: NSArray<string> = NSArray.arrayWithArray(scopes);

      this.fbLoginManager.logInWithPermissionsFromViewControllerHandler(
        permissions,
        app.ios.rootController,
        handleResponse
      );
    });
  }

  /**
   * @docs https://developers.google.com/identity/sign-in/ios/start
  */
  loginWithGoogle(config: any = {}) {
    return new Promise((resolve, reject) => {
      this.googleSignIn = GIDSignIn.sharedInstance();
      this.googleSignIn.presentingViewController = app.ios.rootController;

      // @config.iosClientId
      if (!config.iosClientId || config.iosClientId === "") {
        reject("MISCONFIG: config.iosClientId is required");
        return;
      }
      this.googleSignIn.clientID = config.iosClientId;

      // @config.requestServerAuthCode
      // @config.serverClientId
      if (config.requestServerAuthCode) {
        if (!config.serverClientId || config.serverClientId === "") {
          reject("MISCONFIG: config.serverClientId is required when config.requestServerAuthCode is TURE");
          return;
        }
        // Setting serverClientID retrieves the serverAuthCode in iOS.
        this.googleSignIn.serverClientID = config.serverClientId;
      }

      // @config.scopes - NOT IMPLEMENTED
      // Los implemento solo si tambien agrego requestScopes en Android
      // if (config.scopes) scopes = config.scopes;
      let scopes = ["profile", "email"];
      this.googleSignIn.scopes = NSArray.arrayWithArray(scopes);

      let delegate = GIDSignInDelegateImpl.new().initWithCallback((user: GIDGoogleUser, error: NSError) => {
        if (error) {
          reject(error.localizedDescription);
        } else {
          try {
            const loginResult: ILoginResult = {
              id: user.userID,
              email: user.profile.email,
              firstName: user.profile.givenName,
              lastName: user.profile.familyName,
              displayName: user.profile.name,
              photo: user.profile.imageURLWithDimension(100).absoluteString,
              authToken: user.authentication.idToken,
              authCode: user.serverAuthCode
            };

            resolve(loginResult);
          } catch (error) {
            reject(error);
          }
        }

        CFRelease(delegate);
        delegate = undefined;
      });

      CFRetain(delegate);
      this.googleSignIn.delegate = delegate;
      this.googleSignIn.signIn();
    });
  }

  /**
   * Logout
  */
  logout(): Promise<void> {
    return new Promise((resolve, reject) => {
      try {
        this.googleSignIn && this.googleSignIn.signOut();
        this.fbLoginManager && this.fbLoginManager.logOut();
        resolve();
      } catch (error) {
        reject(error);
      }
    });
  }

  private getAppDelegate() {
    // Play nice with other plugins by not completely ignoring anything already
    // added to the appdelegate
    if (app.ios.delegate === undefined) {
      @ObjCClass(UIApplicationDelegate)
      class UIApplicationDelegateImpl extends UIResponder implements UIApplicationDelegate {
      }

      app.ios.delegate = UIApplicationDelegateImpl;
    }

    return app.ios.delegate;
  }

  private addAppDelegateMethods(appDelegate) {
    // we need the launchOptions for this one so it's a bit hard to use the
    // UIApplicationDidFinishLaunchingNotification pattern we're using for other
    // things. However, let's not override 'applicationDidFinishLaunchingWithOptions'
    // if we don't really need it:
    if (typeof (FBSDKApplicationDelegate) !== "undefined") {
      appDelegate.prototype.applicationDidFinishLaunchingWithOptions = (application, launchOptions) => {
        // Facebook authentication
        FBSDKApplicationDelegate.sharedInstance.applicationDidFinishLaunchingWithOptions(application, launchOptions);
        return true;
      };
    }

    // there's no notification event to hook into for this one, so using the appDelegate
    if (typeof (FBSDKApplicationDelegate) !== "undefined" || typeof (GIDSignIn) !== "undefined") {
      appDelegate.prototype.applicationOpenURLSourceApplicationAnnotation = (application, url, sourceApplication, annotation) => {
        let result = false;
        if (typeof (FBSDKApplicationDelegate) !== "undefined") {
          result = FBSDKApplicationDelegate.sharedInstance.applicationOpenURLSourceApplicationAnnotation(application, url, sourceApplication, annotation);
        }

        if (typeof (GIDSignIn) !== "undefined") {
          result = result || GIDSignIn.sharedInstance().handleURL(url);
        }

        return result;
      };
    }

    if (typeof (FBSDKApplicationDelegate) !== "undefined" || typeof (GIDSignIn) !== "undefined") {
      appDelegate.prototype.applicationOpenURLOptions = (application, url, options) => {

        let result = false;
        if (typeof (FBSDKApplicationDelegate) !== "undefined") {
          result = FBSDKApplicationDelegate.sharedInstance.applicationOpenURLSourceApplicationAnnotation(
              application,
              url,
              options.valueForKey(UIApplicationOpenURLOptionsSourceApplicationKey),
              options.valueForKey(UIApplicationOpenURLOptionsAnnotationKey));
        }

        if (typeof (GIDSignIn) !== "undefined") {
          result = result || GIDSignIn.sharedInstance().handleURL(url);
        }

        return result;
      };
    }
  }
}

class GIDSignInDelegateImpl extends NSObject implements GIDSignInDelegate {
  public static ObjCProtocols = [];

  static new(): GIDSignInDelegateImpl {
    if (GIDSignInDelegateImpl.ObjCProtocols.length === 0 && typeof (GIDSignInDelegate) !== "undefined") {
      GIDSignInDelegateImpl.ObjCProtocols.push(GIDSignInDelegate);
    }
    return <GIDSignInDelegateImpl>super.new();
  }

  private callback: (user: GIDGoogleUser, error: NSError) => void;

  public initWithCallback(callback: (user: GIDGoogleUser, error: NSError) => void): GIDSignInDelegateImpl {
    this.callback = callback;
    return this;
  }

  public signInDidSignInForUserWithError(signIn: GIDSignIn, user: GIDGoogleUser, error: NSError): void {
    this.callback(user, error);
  }

  /*
  public signInDidDisconnectWithUserWithError(signIn, user, error: NSError) {
    try {
      if (error) {
        self.googleFailCallback(error);
      } else {
        // googleSuccessCallback("logOut");
        self.googleCancelCallback();
      }
    } catch (error) {
      self.googleFailCallback(error);
    }
  }
  */
}