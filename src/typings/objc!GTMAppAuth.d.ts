
declare class GTMAppAuthFetcherAuthorization extends NSObject implements GTMFetcherAuthorizationProtocol, NSSecureCoding {

	static alloc(): GTMAppAuthFetcherAuthorization; // inherited from NSObject

	static authorizationFromKeychainForName(keychainItemName: string): GTMAppAuthFetcherAuthorization;

	static configurationForGoogle(): OIDServiceConfiguration;

	static new(): GTMAppAuthFetcherAuthorization; // inherited from NSObject

	static removeAuthorizationFromKeychainForName(keychainItemName: string): boolean;

	static saveAuthorizationToKeychainForName(auth: GTMAppAuthFetcherAuthorization, keychainItemName: string): boolean;

	readonly authState: OIDAuthState;

	readonly serviceProvider: string;

	tokenRefreshDelegate: GTMAppAuthFetcherAuthorizationTokenRefreshDelegate;

	readonly userEmailIsVerified: string;

	readonly userID: string;

	// readonly canAuthorize: boolean; // inherited from GTMFetcherAuthorizationProtocol
    //
	readonly debugDescription: string; // inherited from NSObjectProtocol

	readonly description: string; // inherited from NSObjectProtocol

	fetcherService: GTMSessionFetcherServiceProtocol; // inherited from GTMFetcherAuthorizationProtocol

	readonly hash: number; // inherited from NSObjectProtocol

	readonly isProxy: boolean; // inherited from NSObjectProtocol

	shouldAuthorizeAllRequests: boolean; // inherited from GTMFetcherAuthorizationProtocol

	readonly superclass: typeof NSObject; // inherited from NSObjectProtocol

	readonly userEmail: string; // inherited from GTMFetcherAuthorizationProtocol

	readonly  // inherited from NSObjectProtocol

	static readonly supportsSecureCoding: boolean; // inherited from NSSecureCoding

	constructor(o: { authState: OIDAuthState; });

	constructor(o: { authState: OIDAuthState; serviceProvider: string; userID: string; userEmail: string; userEmailIsVerified: string; });

	constructor(o: { coder: NSCoder; }); // inherited from NSCoding

	authorizeRequestCompletionHandler(request: NSMutableURLRequest, handler: (p1: NSError) => void): void;

	authorizeRequestDelegateDidFinishSelector(request: NSMutableURLRequest, delegate: any, sel: string): void;

	// canAuthorize(): boolean;

	class(): typeof NSObject;

	conformsToProtocol(aProtocol: any /* Protocol */): boolean;

	encodeWithCoder(coder: NSCoder): void;

	initWithAuthState(authState: OIDAuthState): this;

	initWithAuthStateServiceProviderUserIDUserEmailUserEmailIsVerified(authState: OIDAuthState, serviceProvider: string, userID: string, userEmail: string, userEmailIsVerified: string): this;

	initWithCoder(coder: NSCoder): this;

	isAuthorizedRequest(request: NSURLRequest): boolean;

	isAuthorizingRequest(request: NSURLRequest): boolean;

	isEqual(object: any): boolean;

	isKindOfClass(aClass: typeof NSObject): boolean;

	isMemberOfClass(aClass: typeof NSObject): boolean;

	performSelector(aSelector: string): any;

	performSelectorWithObject(aSelector: string, object: any): any;

	performSelectorWithObjectWithObject(aSelector: string, object1: any, object2: any): any;

	primeForRefresh(): boolean;

	respondsToSelector(aSelector: string): boolean;

	retainCount(): number;

	self(): this;

	stopAuthorization(): void;

	stopAuthorizationForRequest(request: NSURLRequest): void;
}

declare const enum GTMAppAuthFetcherAuthorizationError {

	UnauthorizableRequest = -1004
}

declare var GTMAppAuthFetcherAuthorizationErrorDomain: string;

declare var GTMAppAuthFetcherAuthorizationErrorRequestKey: string;

interface GTMAppAuthFetcherAuthorizationTokenRefreshDelegate extends NSObjectProtocol {

	additionalRefreshParameters(authorization: GTMAppAuthFetcherAuthorization): NSDictionary<string, string>;
}
declare var GTMAppAuthFetcherAuthorizationTokenRefreshDelegate: {

	prototype: GTMAppAuthFetcherAuthorizationTokenRefreshDelegate;
};

declare var GTMAppAuthVersionNumber: number;

declare var GTMAppAuthVersionString: interop.Reference<number>;

declare class GTMKeychain extends NSObject {

	static alloc(): GTMKeychain; // inherited from NSObject

	static new(): GTMKeychain; // inherited from NSObject

	static passwordDataFromKeychainForName(keychainItemName: string): NSData;

	static passwordFromKeychainForName(keychainItemName: string): string;

	static removePasswordFromKeychainForName(keychainItemName: string): boolean;

	static savePasswordDataToKeychainForNamePasswordData(keychainItemName: string, passwordData: NSData): boolean;

	static savePasswordToKeychainForNamePassword(keychainItemName: string, password: string): boolean;
}

declare class GTMOAuth2KeychainCompatibility extends NSObject {

	static alloc(): GTMOAuth2KeychainCompatibility; // inherited from NSObject

	static authForGoogleFromKeychainForNameClientIDClientSecret(keychainItemName: string, clientID: string, clientSecret: string): GTMAppAuthFetcherAuthorization;

	static authorizeFromKeychainForNameTokenURLRedirectURIClientIDClientSecret(keychainItemName: string, tokenURL: NSURL, redirectURI: string, clientID: string, clientSecret: string): GTMAppAuthFetcherAuthorization;

	static authorizeFromPersistenceStringTokenURLRedirectURIClientIDClientSecret(persistenceString: string, tokenURL: NSURL, redirectURI: string, clientID: string, clientSecret: string): GTMAppAuthFetcherAuthorization;

	static googleAuthorizationURL(): NSURL;

	static googleRevocationURL(): NSURL;

	static googleTokenURL(): NSURL;

	static googleUserInfoURL(): NSURL;

	static nativeClientRedirectURI(): string;

	static new(): GTMOAuth2KeychainCompatibility; // inherited from NSObject

	static persistenceResponseStringForAuthorization(authorization: GTMAppAuthFetcherAuthorization): string;

	static removeAuthFromKeychainForName(keychainItemName: string): boolean;

	static saveAuthToKeychainForNameAuthentication(keychainItemName: string, auth: GTMAppAuthFetcherAuthorization): boolean;
}
