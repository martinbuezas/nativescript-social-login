
declare var AppAuthVersionNumber: number;

declare var AppAuthVersionString: interop.Reference<number>;

declare var OIDApplicationTypeNative: string;

declare var OIDApplicationTypeParam: string;

declare class OIDAuthState extends NSObject implements NSSecureCoding {

	static alloc(): OIDAuthState; // inherited from NSObject

	static authStateByPresentingAuthorizationRequestCallback(authorizationRequest: OIDAuthorizationRequest, callback: (p1: OIDAuthState, p2: NSError) => void): OIDExternalUserAgentSession;

	static authStateByPresentingAuthorizationRequestExternalUserAgentCallback(authorizationRequest: OIDAuthorizationRequest, externalUserAgent: OIDExternalUserAgent, callback: (p1: OIDAuthState, p2: NSError) => void): OIDExternalUserAgentSession;

	static authStateByPresentingAuthorizationRequestPresentingViewControllerCallback(authorizationRequest: OIDAuthorizationRequest, presentingViewController: UIViewController, callback: (p1: OIDAuthState, p2: NSError) => void): OIDExternalUserAgentSession;

	static new(): OIDAuthState; // inherited from NSObject

	readonly authorizationError: NSError;

	errorDelegate: OIDAuthStateErrorDelegate;

	readonly isAuthorized: boolean;

	readonly lastAuthorizationResponse: OIDAuthorizationResponse;

	readonly lastRegistrationResponse: OIDRegistrationResponse;

	readonly lastTokenResponse: OIDTokenResponse;

	readonly refreshToken: string;

	readonly scope: string;

	stateChangeDelegate: OIDAuthStateChangeDelegate;

	static readonly supportsSecureCoding: boolean; // inherited from NSSecureCoding

	constructor(o: { authorizationResponse: OIDAuthorizationResponse; });

	constructor(o: { authorizationResponse: OIDAuthorizationResponse; tokenResponse: OIDTokenResponse; });

	constructor(o: { authorizationResponse: OIDAuthorizationResponse; tokenResponse: OIDTokenResponse; registrationResponse: OIDRegistrationResponse; });

	constructor(o: { coder: NSCoder; }); // inherited from NSCoding

	constructor(o: { registrationResponse: OIDRegistrationResponse; });

	encodeWithCoder(coder: NSCoder): void;

	initWithAuthorizationResponse(authorizationResponse: OIDAuthorizationResponse): this;

	initWithAuthorizationResponseTokenResponse(authorizationResponse: OIDAuthorizationResponse, tokenResponse: OIDTokenResponse): this;

	initWithAuthorizationResponseTokenResponseRegistrationResponse(authorizationResponse: OIDAuthorizationResponse, tokenResponse: OIDTokenResponse, registrationResponse: OIDRegistrationResponse): this;

	initWithCoder(coder: NSCoder): this;

	initWithRegistrationResponse(registrationResponse: OIDRegistrationResponse): this;

	performActionWithFreshTokens(action: (p1: string, p2: string, p3: NSError) => void): void;

	performActionWithFreshTokensAdditionalRefreshParameters(action: (p1: string, p2: string, p3: NSError) => void, additionalParameters: NSDictionary<string, string>): void;

	performActionWithFreshTokensAdditionalRefreshParametersDispatchQueue(action: (p1: string, p2: string, p3: NSError) => void, additionalParameters: NSDictionary<string, string>, dispatchQueue: NSObject): void;

	setNeedsTokenRefresh(): void;

	tokenRefreshRequest(): OIDTokenRequest;

	tokenRefreshRequestWithAdditionalParameters(additionalParameters: NSDictionary<string, string>): OIDTokenRequest;

	updateWithAuthorizationError(authorizationError: NSError): void;

	updateWithAuthorizationResponseError(authorizationResponse: OIDAuthorizationResponse, error: NSError): void;

	updateWithRegistrationResponse(registrationResponse: OIDRegistrationResponse): void;

	updateWithTokenResponseError(tokenResponse: OIDTokenResponse, error: NSError): void;
}

interface OIDAuthStateChangeDelegate extends NSObjectProtocol {

	didChangeState(state: OIDAuthState): void;
}
declare var OIDAuthStateChangeDelegate: {

	prototype: OIDAuthStateChangeDelegate;
};

interface OIDAuthStateErrorDelegate extends NSObjectProtocol {

	authStateDidEncounterAuthorizationError(state: OIDAuthState, error: NSError): void;

	authStateDidEncounterTransientError?(state: OIDAuthState, error: NSError): void;
}
declare var OIDAuthStateErrorDelegate: {

	prototype: OIDAuthStateErrorDelegate;
};

declare class OIDAuthorizationRequest extends NSObject implements NSCopying, NSSecureCoding, OIDExternalUserAgentRequest {

	static alloc(): OIDAuthorizationRequest; // inherited from NSObject

	static codeChallengeS256ForVerifier(codeVerifier: string): string;

	static generateCodeVerifier(): string;

	static generateState(): string;

	static new(): OIDAuthorizationRequest; // inherited from NSObject

	readonly additionalParameters: NSDictionary<string, string>;

	readonly clientID: string;

	readonly clientSecret: string;

	readonly codeChallenge: string;

	readonly codeChallengeMethod: string;

	readonly codeVerifier: string;

	readonly configuration: OIDServiceConfiguration;

	readonly nonce: string;

	readonly redirectURL: NSURL;

	readonly responseType: string;

	readonly scope: string;

	readonly state: string;

	static readonly supportsSecureCoding: boolean; // inherited from NSSecureCoding

	constructor(o: { coder: NSCoder; }); // inherited from NSCoding

	constructor(o: { configuration: OIDServiceConfiguration; clientId: string; clientSecret: string; scope: string; redirectURL: NSURL; responseType: string; state: string; nonce: string; codeVerifier: string; codeChallenge: string; codeChallengeMethod: string; additionalParameters: NSDictionary<string, string>; });

	constructor(o: { configuration: OIDServiceConfiguration; clientId: string; clientSecret: string; scopes: NSArray<string> | string[]; redirectURL: NSURL; responseType: string; additionalParameters: NSDictionary<string, string>; });

	constructor(o: { configuration: OIDServiceConfiguration; clientId: string; scopes: NSArray<string> | string[]; redirectURL: NSURL; responseType: string; additionalParameters: NSDictionary<string, string>; });

	authorizationRequestURL(): NSURL;

	copyWithZone(zone: interop.Pointer | interop.Reference<any>): any;

	encodeWithCoder(coder: NSCoder): void;

	externalUserAgentRequestURL(): NSURL;

	initWithCoder(coder: NSCoder): this;

	initWithConfigurationClientIdClientSecretScopeRedirectURLResponseTypeStateNonceCodeVerifierCodeChallengeCodeChallengeMethodAdditionalParameters(configuration: OIDServiceConfiguration, clientID: string, clientSecret: string, scope: string, redirectURL: NSURL, responseType: string, state: string, nonce: string, codeVerifier: string, codeChallenge: string, codeChallengeMethod: string, additionalParameters: NSDictionary<string, string>): this;

	initWithConfigurationClientIdClientSecretScopesRedirectURLResponseTypeAdditionalParameters(configuration: OIDServiceConfiguration, clientID: string, clientSecret: string, scopes: NSArray<string> | string[], redirectURL: NSURL, responseType: string, additionalParameters: NSDictionary<string, string>): this;

	initWithConfigurationClientIdScopesRedirectURLResponseTypeAdditionalParameters(configuration: OIDServiceConfiguration, clientID: string, scopes: NSArray<string> | string[], redirectURL: NSURL, responseType: string, additionalParameters: NSDictionary<string, string>): this;

	redirectScheme(): string;
}

declare class OIDAuthorizationResponse extends NSObject implements NSCopying, NSSecureCoding {

	static alloc(): OIDAuthorizationResponse; // inherited from NSObject

	static new(): OIDAuthorizationResponse; // inherited from NSObject

	readonly accessToken: string;

	readonly accessTokenExpirationDate: Date;

	readonly additionalParameters: NSDictionary<string, NSObject>;

	readonly authorizationCode: string;

	readonly idToken: string;

	readonly request: OIDAuthorizationRequest;

	readonly scope: string;

	readonly state: string;

	readonly tokenType: string;

	static readonly supportsSecureCoding: boolean; // inherited from NSSecureCoding

	constructor(o: { coder: NSCoder; }); // inherited from NSCoding

	constructor(o: { request: OIDAuthorizationRequest; parameters: NSDictionary<string, NSObject>; });

	copyWithZone(zone: interop.Pointer | interop.Reference<any>): any;

	encodeWithCoder(coder: NSCoder): void;

	initWithCoder(coder: NSCoder): this;

	initWithRequestParameters(request: OIDAuthorizationRequest, parameters: NSDictionary<string, NSObject>): this;

	tokenExchangeRequest(): OIDTokenRequest;

	tokenExchangeRequestWithAdditionalParameters(additionalParameters: NSDictionary<string, string>): OIDTokenRequest;
}

declare class OIDAuthorizationService extends NSObject {

	static alloc(): OIDAuthorizationService; // inherited from NSObject

	static discoverServiceConfigurationForDiscoveryURLCompletion(discoveryURL: NSURL, completion: (p1: OIDServiceConfiguration, p2: NSError) => void): void;

	static discoverServiceConfigurationForIssuerCompletion(issuerURL: NSURL, completion: (p1: OIDServiceConfiguration, p2: NSError) => void): void;

	static new(): OIDAuthorizationService; // inherited from NSObject

	static performRegistrationRequestCompletion(request: OIDRegistrationRequest, completion: (p1: OIDRegistrationResponse, p2: NSError) => void): void;

	static performTokenRequestCallback(request: OIDTokenRequest, callback: (p1: OIDTokenResponse, p2: NSError) => void): void;

	static performTokenRequestOriginalAuthorizationResponseCallback(request: OIDTokenRequest, authorizationResponse: OIDAuthorizationResponse, callback: (p1: OIDTokenResponse, p2: NSError) => void): void;

	static presentAuthorizationRequestExternalUserAgentCallback(request: OIDAuthorizationRequest, externalUserAgent: OIDExternalUserAgent, callback: (p1: OIDAuthorizationResponse, p2: NSError) => void): OIDExternalUserAgentSession;

	static presentAuthorizationRequestPresentingViewControllerCallback(request: OIDAuthorizationRequest, presentingViewController: UIViewController, callback: (p1: OIDAuthorizationResponse, p2: NSError) => void): OIDExternalUserAgentSession;

	static presentEndSessionRequestExternalUserAgentCallback(request: OIDEndSessionRequest, externalUserAgent: OIDExternalUserAgent, callback: (p1: OIDEndSessionResponse, p2: NSError) => void): OIDExternalUserAgentSession;

	readonly configuration: OIDServiceConfiguration;
}

declare var OIDClientIDIssuedAtParam: string;

declare var OIDClientIDParam: string;

declare var OIDClientSecretExpirestAtParam: string;

declare var OIDClientSecretParam: string;

declare class OIDEndSessionRequest extends NSObject implements NSCopying, NSSecureCoding, OIDExternalUserAgentRequest {

	static alloc(): OIDEndSessionRequest; // inherited from NSObject

	static new(): OIDEndSessionRequest; // inherited from NSObject

	readonly additionalParameters: NSDictionary<string, string>;

	readonly configuration: OIDServiceConfiguration;

	readonly idTokenHint: string;

	readonly postLogoutRedirectURL: NSURL;

	readonly state: string;

	static readonly supportsSecureCoding: boolean; // inherited from NSSecureCoding

	constructor(o: { coder: NSCoder; }); // inherited from NSCoding

	constructor(o: { configuration: OIDServiceConfiguration; idTokenHint: string; postLogoutRedirectURL: NSURL; additionalParameters: NSDictionary<string, string>; });

	constructor(o: { configuration: OIDServiceConfiguration; idTokenHint: string; postLogoutRedirectURL: NSURL; state: string; additionalParameters: NSDictionary<string, string>; });

	copyWithZone(zone: interop.Pointer | interop.Reference<any>): any;

	encodeWithCoder(coder: NSCoder): void;

	endSessionRequestURL(): NSURL;

	externalUserAgentRequestURL(): NSURL;

	initWithCoder(coder: NSCoder): this;

	initWithConfigurationIdTokenHintPostLogoutRedirectURLAdditionalParameters(configuration: OIDServiceConfiguration, idTokenHint: string, postLogoutRedirectURL: NSURL, additionalParameters: NSDictionary<string, string>): this;

	initWithConfigurationIdTokenHintPostLogoutRedirectURLStateAdditionalParameters(configuration: OIDServiceConfiguration, idTokenHint: string, postLogoutRedirectURL: NSURL, state: string, additionalParameters: NSDictionary<string, string>): this;

	redirectScheme(): string;
}

declare class OIDEndSessionResponse extends NSObject implements NSCopying, NSSecureCoding {

	static alloc(): OIDEndSessionResponse; // inherited from NSObject

	static new(): OIDEndSessionResponse; // inherited from NSObject

	readonly additionalParameters: NSDictionary<string, NSObject>;

	readonly request: OIDEndSessionRequest;

	readonly state: string;

	static readonly supportsSecureCoding: boolean; // inherited from NSSecureCoding

	constructor(o: { coder: NSCoder; }); // inherited from NSCoding

	constructor(o: { request: OIDEndSessionRequest; parameters: NSDictionary<string, NSObject>; });

	copyWithZone(zone: interop.Pointer | interop.Reference<any>): any;

	encodeWithCoder(coder: NSCoder): void;

	initWithCoder(coder: NSCoder): this;

	initWithRequestParameters(request: OIDEndSessionRequest, parameters: NSDictionary<string, NSObject>): this;
}

declare const enum OIDErrorCode {

	InvalidDiscoveryDocument = -2,

	UserCanceledAuthorizationFlow = -3,

	ProgramCanceledAuthorizationFlow = -4,

	NetworkError = -5,

	ServerError = -6,

	JSONDeserializationError = -7,

	TokenResponseConstructionError = -8,

	SafariOpenError = -9,

	BrowserOpenError = -10,

	TokenRefreshError = -11,

	RegistrationResponseConstructionError = -12,

	JSONSerializationError = -13,

	IDTokenParsingError = -14,

	IDTokenFailedValidationError = -15
}

declare const enum OIDErrorCodeOAuth {

	InvalidRequest = -2,

	UnauthorizedClient = -3,

	AccessDenied = -4,

	UnsupportedResponseType = -5,

	InvalidScope = -6,

	ServerError = -7,

	TemporarilyUnavailable = -8,

	InvalidClient = -9,

	InvalidGrant = -10,

	UnsupportedGrantType = -11,

	InvalidRedirectURI = -12,

	InvalidClientMetadata = -13,

	ClientError = -61439,

	Other = -61440
}

declare const enum OIDErrorCodeOAuthAuthorization {

	InvalidRequest = -2,

	UnauthorizedClient = -3,

	AccessDenied = -4,

	UnsupportedResponseType = -5,

	AuthorizationInvalidScope = -6,

	ServerError = -7,

	TemporarilyUnavailable = -8,

	ClientError = -61439,

	Other = -61440
}

declare const enum OIDErrorCodeOAuthRegistration {

	InvalidRequest = -2,

	InvalidRedirectURI = -12,

	InvalidClientMetadata = -13,

	ClientError = -61439,

	Other = -61440
}

declare const enum OIDErrorCodeOAuthToken {

	InvalidRequest = -2,

	InvalidClient = -9,

	InvalidGrant = -10,

	UnauthorizedClient = -3,

	UnsupportedGrantType = -11,

	InvalidScope = -6,

	ClientError = -61439,

	Other = -61440
}

declare class OIDErrorUtilities extends NSObject {

	static HTTPErrorWithHTTPResponseData(HTTPURLResponse: NSHTTPURLResponse, data: NSData): NSError;

	static OAuthErrorCodeFromString(errorCode: string): OIDErrorCodeOAuth;

	static OAuthErrorWithDomainOAuthResponseUnderlyingError(OAuthErrorDomain: string, errorResponse: NSDictionary<any, any>, underlyingError: NSError): NSError;

	static alloc(): OIDErrorUtilities; // inherited from NSObject

	static errorWithCodeUnderlyingErrorDescription(code: OIDErrorCode, underlyingError: NSError, description: string): NSError;

	static isOAuthErrorDomain(errorDomain: string): boolean;

	static new(): OIDErrorUtilities; // inherited from NSObject

	static raiseException(name: string): void;

	static raiseExceptionMessage(name: string, message: string): void;

	static resourceServerAuthorizationErrorWithCodeErrorResponseUnderlyingError(code: number, errorResponse: NSDictionary<any, any>, underlyingError: NSError): NSError;
}

interface OIDExternalUserAgent extends NSObjectProtocol {

	dismissExternalUserAgentAnimatedCompletion(animated: boolean, completion: () => void): void;

	presentExternalUserAgentRequestSession(request: OIDExternalUserAgentRequest, session: OIDExternalUserAgentSession): boolean;
}
declare var OIDExternalUserAgent: {

	prototype: OIDExternalUserAgent;
};

declare class OIDExternalUserAgentIOS extends NSObject implements OIDExternalUserAgent {

	static alloc(): OIDExternalUserAgentIOS; // inherited from NSObject

	static new(): OIDExternalUserAgentIOS; // inherited from NSObject

	readonly debugDescription: string; // inherited from NSObjectProtocol

	readonly description: string; // inherited from NSObjectProtocol

	readonly hash: number; // inherited from NSObjectProtocol

	readonly isProxy: boolean; // inherited from NSObjectProtocol

	readonly superclass: typeof NSObject; // inherited from NSObjectProtocol

	readonly  // inherited from NSObjectProtocol

	constructor(o: { presentingViewController: UIViewController; });

	class(): typeof NSObject;

	conformsToProtocol(aProtocol: any /* Protocol */): boolean;

	dismissExternalUserAgentAnimatedCompletion(animated: boolean, completion: () => void): void;

	initWithPresentingViewController(presentingViewController: UIViewController): this;

	isEqual(object: any): boolean;

	isKindOfClass(aClass: typeof NSObject): boolean;

	isMemberOfClass(aClass: typeof NSObject): boolean;

	performSelector(aSelector: string): any;

	performSelectorWithObject(aSelector: string, object: any): any;

	performSelectorWithObjectWithObject(aSelector: string, object1: any, object2: any): any;

	presentExternalUserAgentRequestSession(request: OIDExternalUserAgentRequest, session: OIDExternalUserAgentSession): boolean;

	respondsToSelector(aSelector: string): boolean;

	retainCount(): number;

	self(): this;
}

declare class OIDExternalUserAgentIOSCustomBrowser extends NSObject implements OIDExternalUserAgent {

	static CustomBrowserChrome(): OIDExternalUserAgentIOSCustomBrowser;

	static CustomBrowserFirefox(): OIDExternalUserAgentIOSCustomBrowser;

	static CustomBrowserOpera(): OIDExternalUserAgentIOSCustomBrowser;

	static CustomBrowserSafari(): OIDExternalUserAgentIOSCustomBrowser;

	static URLTransformationSchemeConcatPrefix(URLprefix: string): (p1: NSURL) => NSURL;

	static URLTransformationSchemeSubstitutionHTTPSHTTP(browserSchemeHTTPS: string, browserSchemeHTTP: string): (p1: NSURL) => NSURL;

	static alloc(): OIDExternalUserAgentIOSCustomBrowser; // inherited from NSObject

	static new(): OIDExternalUserAgentIOSCustomBrowser; // inherited from NSObject

	readonly URLTransformation: (p1: NSURL) => NSURL;

	readonly appStoreURL: NSURL;

	readonly canOpenURLScheme: string;

	readonly debugDescription: string; // inherited from NSObjectProtocol

	readonly description: string; // inherited from NSObjectProtocol

	readonly hash: number; // inherited from NSObjectProtocol

	readonly isProxy: boolean; // inherited from NSObjectProtocol

	readonly superclass: typeof NSObject; // inherited from NSObjectProtocol

	readonly  // inherited from NSObjectProtocol

	constructor(o: { URLTransformation: (p1: NSURL) => NSURL; });

	constructor(o: { URLTransformation: (p1: NSURL) => NSURL; canOpenURLScheme: string; appStoreURL: NSURL; });

	class(): typeof NSObject;

	conformsToProtocol(aProtocol: any /* Protocol */): boolean;

	dismissExternalUserAgentAnimatedCompletion(animated: boolean, completion: () => void): void;

	initWithURLTransformation(URLTransformation: (p1: NSURL) => NSURL): this;

	initWithURLTransformationCanOpenURLSchemeAppStoreURL(URLTransformation: (p1: NSURL) => NSURL, canOpenURLScheme: string, appStoreURL: NSURL): this;

	isEqual(object: any): boolean;

	isKindOfClass(aClass: typeof NSObject): boolean;

	isMemberOfClass(aClass: typeof NSObject): boolean;

	performSelector(aSelector: string): any;

	performSelectorWithObject(aSelector: string, object: any): any;

	performSelectorWithObjectWithObject(aSelector: string, object1: any, object2: any): any;

	presentExternalUserAgentRequestSession(request: OIDExternalUserAgentRequest, session: OIDExternalUserAgentSession): boolean;

	respondsToSelector(aSelector: string): boolean;

	retainCount(): number;

	self(): this;
}

interface OIDExternalUserAgentRequest {

	externalUserAgentRequestURL(): NSURL;

	redirectScheme(): string;
}
declare var OIDExternalUserAgentRequest: {

	prototype: OIDExternalUserAgentRequest;
};

interface OIDExternalUserAgentSession extends NSObjectProtocol {

	cancel(): void;

	cancelWithCompletion(completion: () => void): void;

	failExternalUserAgentFlowWithError(error: NSError): void;

	resumeExternalUserAgentFlowWithURL(URL: NSURL): boolean;
}
declare var OIDExternalUserAgentSession: {

	prototype: OIDExternalUserAgentSession;
};

declare class OIDFieldMapping extends NSObject {

	static JSONTypes(): NSSet<any>;

	static URLConversion(): (p1: NSObject) => any;

	static alloc(): OIDFieldMapping; // inherited from NSObject

	static dateEpochConversion(): (p1: NSObject) => any;

	static dateSinceNowConversion(): (p1: NSObject) => any;

	static decodeWithCoderMapInstance(aCoder: NSCoder, map: NSDictionary<string, OIDFieldMapping>, instance: any): void;

	static encodeWithCoderMapInstance(aCoder: NSCoder, map: NSDictionary<string, OIDFieldMapping>, instance: any): void;

	static new(): OIDFieldMapping; // inherited from NSObject

	static remainingParametersWithMapParametersInstance(map: NSDictionary<string, OIDFieldMapping>, parameters: NSDictionary<string, NSObject>, instance: any): NSDictionary<string, NSObject>;

	readonly conversion: (p1: NSObject) => any;

	readonly expectedType: typeof NSObject;

	readonly name: string;

	constructor(o: { name: string; type: typeof NSObject; });

	constructor(o: { name: string; type: typeof NSObject; conversion: (p1: NSObject) => any; });

	initWithNameType(name: string, type: typeof NSObject): this;

	initWithNameTypeConversion(name: string, type: typeof NSObject, conversion: (p1: NSObject) => any): this;
}

declare var OIDGeneralErrorDomain: string;

declare var OIDGrantTypeAuthorizationCode: string;

declare var OIDGrantTypeClientCredentials: string;

declare var OIDGrantTypePassword: string;

declare var OIDGrantTypeRefreshToken: string;

declare var OIDGrantTypesParam: string;

declare var OIDHTTPErrorDomain: string;

declare class OIDIDToken extends NSObject {

	static alloc(): OIDIDToken; // inherited from NSObject

	static new(): OIDIDToken; // inherited from NSObject

	readonly audience: NSArray<any>;

	readonly claims: NSDictionary<any, any>;

	readonly expiresAt: Date;

	readonly header: NSDictionary<any, any>;

	readonly issuedAt: Date;

	readonly issuer: NSURL;

	readonly nonce: string;

	readonly subject: string;

	constructor(o: { IDTokenString: string; });

	initWithIDTokenString(idToken: string): this;
}

declare var OIDOAuthAuthorizationErrorDomain: string;

declare var OIDOAuthErrorFieldError: string;

declare var OIDOAuthErrorFieldErrorDescription: string;

declare var OIDOAuthErrorFieldErrorURI: string;

declare var OIDOAuthErrorResponseErrorKey: string;

declare var OIDOAuthExceptionInvalidAuthorizationFlow: string;

declare var OIDOAuthExceptionInvalidTokenRequestNullRedirectURL: string;

declare var OIDOAuthRegistrationErrorDomain: string;

declare var OIDOAuthTokenErrorDomain: string;

declare var OIDOAuthorizationRequestCodeChallengeMethodS256: string;

declare var OIDRedirectURIsParam: string;

declare var OIDRegistrationAccessTokenParam: string;

declare var OIDRegistrationClientURIParam: string;

declare class OIDRegistrationRequest extends NSObject implements NSCopying, NSSecureCoding {

	static alloc(): OIDRegistrationRequest; // inherited from NSObject

	static new(): OIDRegistrationRequest; // inherited from NSObject

	readonly additionalParameters: NSDictionary<string, string>;

	readonly applicationType: string;

	readonly configuration: OIDServiceConfiguration;

	readonly grantTypes: NSArray<string>;

	readonly initialAccessToken: string;

	readonly redirectURIs: NSArray<NSURL>;

	readonly responseTypes: NSArray<string>;

	readonly subjectType: string;

	readonly tokenEndpointAuthenticationMethod: string;

	static readonly supportsSecureCoding: boolean; // inherited from NSSecureCoding

	constructor(o: { coder: NSCoder; }); // inherited from NSCoding

	constructor(o: { configuration: OIDServiceConfiguration; redirectURIs: NSArray<NSURL> | NSURL[]; responseTypes: NSArray<string> | string[]; grantTypes: NSArray<string> | string[]; subjectType: string; tokenEndpointAuthMethod: string; additionalParameters: NSDictionary<string, string>; });

	constructor(o: { configuration: OIDServiceConfiguration; redirectURIs: NSArray<NSURL> | NSURL[]; responseTypes: NSArray<string> | string[]; grantTypes: NSArray<string> | string[]; subjectType: string; tokenEndpointAuthMethod: string; initialAccessToken: string; additionalParameters: NSDictionary<string, string>; });

	URLRequest(): NSURLRequest;

	copyWithZone(zone: interop.Pointer | interop.Reference<any>): any;

	encodeWithCoder(coder: NSCoder): void;

	initWithCoder(coder: NSCoder): this;

	initWithConfigurationRedirectURIsResponseTypesGrantTypesSubjectTypeTokenEndpointAuthMethodAdditionalParameters(configuration: OIDServiceConfiguration, redirectURIs: NSArray<NSURL> | NSURL[], responseTypes: NSArray<string> | string[], grantTypes: NSArray<string> | string[], subjectType: string, tokenEndpointAuthMethod: string, additionalParameters: NSDictionary<string, string>): this;

	initWithConfigurationRedirectURIsResponseTypesGrantTypesSubjectTypeTokenEndpointAuthMethodInitialAccessTokenAdditionalParameters(configuration: OIDServiceConfiguration, redirectURIs: NSArray<NSURL> | NSURL[], responseTypes: NSArray<string> | string[], grantTypes: NSArray<string> | string[], subjectType: string, tokenEndpointAuthMethod: string, initialAccessToken: string, additionalParameters: NSDictionary<string, string>): this;
}

declare class OIDRegistrationResponse extends NSObject implements NSCopying, NSSecureCoding {

	static alloc(): OIDRegistrationResponse; // inherited from NSObject

	static new(): OIDRegistrationResponse; // inherited from NSObject

	readonly additionalParameters: NSDictionary<string, NSObject>;

	readonly clientID: string;

	readonly clientIDIssuedAt: Date;

	readonly clientSecret: string;

	readonly clientSecretExpiresAt: Date;

	readonly registrationAccessToken: string;

	readonly registrationClientURI: NSURL;

	readonly request: OIDRegistrationRequest;

	readonly tokenEndpointAuthenticationMethod: string;

	static readonly supportsSecureCoding: boolean; // inherited from NSSecureCoding

	constructor(o: { coder: NSCoder; }); // inherited from NSCoding

	constructor(o: { request: OIDRegistrationRequest; parameters: NSDictionary<string, NSObject>; });

	copyWithZone(zone: interop.Pointer | interop.Reference<any>): any;

	encodeWithCoder(coder: NSCoder): void;

	initWithCoder(coder: NSCoder): this;

	initWithRequestParameters(request: OIDRegistrationRequest, parameters: NSDictionary<string, NSObject>): this;
}

declare var OIDResourceServerAuthorizationErrorDomain: string;

declare var OIDResponseTypeCode: string;

declare var OIDResponseTypeIDToken: string;

declare var OIDResponseTypeToken: string;

declare var OIDResponseTypesParam: string;

declare var OIDScopeAddress: string;

declare var OIDScopeEmail: string;

declare var OIDScopeOpenID: string;

declare var OIDScopePhone: string;

declare var OIDScopeProfile: string;

declare class OIDScopeUtilities extends NSObject {

	static alloc(): OIDScopeUtilities; // inherited from NSObject

	static new(): OIDScopeUtilities; // inherited from NSObject

	static scopesArrayWithString(scopes: string): NSArray<string>;

	static scopesWithArray(scopes: NSArray<string> | string[]): string;
}

declare class OIDServiceConfiguration extends NSObject implements NSCopying, NSSecureCoding {

	static alloc(): OIDServiceConfiguration; // inherited from NSObject

	static new(): OIDServiceConfiguration; // inherited from NSObject

	readonly authorizationEndpoint: NSURL;

	readonly discoveryDocument: OIDServiceDiscovery;

	readonly endSessionEndpoint: NSURL;

	readonly issuer: NSURL;

	readonly registrationEndpoint: NSURL;

	readonly tokenEndpoint: NSURL;

	static readonly supportsSecureCoding: boolean; // inherited from NSSecureCoding

	constructor(o: { authorizationEndpoint: NSURL; tokenEndpoint: NSURL; });

	constructor(o: { authorizationEndpoint: NSURL; tokenEndpoint: NSURL; issuer: NSURL; });

	constructor(o: { authorizationEndpoint: NSURL; tokenEndpoint: NSURL; issuer: NSURL; registrationEndpoint: NSURL; });

	constructor(o: { authorizationEndpoint: NSURL; tokenEndpoint: NSURL; issuer: NSURL; registrationEndpoint: NSURL; endSessionEndpoint: NSURL; });

	constructor(o: { authorizationEndpoint: NSURL; tokenEndpoint: NSURL; registrationEndpoint: NSURL; });

	constructor(o: { coder: NSCoder; }); // inherited from NSCoding

	constructor(o: { discoveryDocument: OIDServiceDiscovery; });

	copyWithZone(zone: interop.Pointer | interop.Reference<any>): any;

	encodeWithCoder(coder: NSCoder): void;

	initWithAuthorizationEndpointTokenEndpoint(authorizationEndpoint: NSURL, tokenEndpoint: NSURL): this;

	initWithAuthorizationEndpointTokenEndpointIssuer(authorizationEndpoint: NSURL, tokenEndpoint: NSURL, issuer: NSURL): this;

	initWithAuthorizationEndpointTokenEndpointIssuerRegistrationEndpoint(authorizationEndpoint: NSURL, tokenEndpoint: NSURL, issuer: NSURL, registrationEndpoint: NSURL): this;

	initWithAuthorizationEndpointTokenEndpointIssuerRegistrationEndpointEndSessionEndpoint(authorizationEndpoint: NSURL, tokenEndpoint: NSURL, issuer: NSURL, registrationEndpoint: NSURL, endSessionEndpoint: NSURL): this;

	initWithAuthorizationEndpointTokenEndpointRegistrationEndpoint(authorizationEndpoint: NSURL, tokenEndpoint: NSURL, registrationEndpoint: NSURL): this;

	initWithCoder(coder: NSCoder): this;

	initWithDiscoveryDocument(discoveryDocument: OIDServiceDiscovery): this;
}

declare class OIDServiceDiscovery extends NSObject implements NSCopying, NSSecureCoding {

	static alloc(): OIDServiceDiscovery; // inherited from NSObject

	static new(): OIDServiceDiscovery; // inherited from NSObject

	readonly IDTokenEncryptionAlgorithmValuesSupported: NSArray<string>;

	readonly IDTokenEncryptionEncodingValuesSupported: NSArray<string>;

	readonly IDTokenSigningAlgorithmValuesSupported: NSArray<string>;

	readonly OPPolicyURI: NSURL;

	readonly OPTosURI: NSURL;

	readonly UILocalesSupported: NSArray<string>;

	readonly acrValuesSupported: NSArray<string>;

	readonly authorizationEndpoint: NSURL;

	readonly claimTypesSupported: NSArray<string>;

	readonly claimsLocalesSupported: NSArray<string>;

	readonly claimsParameterSupported: boolean;

	readonly claimsSupported: NSArray<string>;

	readonly discoveryDictionary: NSDictionary<string, any>;

	readonly displayValuesSupported: NSArray<string>;

	readonly endSessionEndpoint: NSURL;

	readonly grantTypesSupported: NSArray<string>;

	readonly issuer: NSURL;

	readonly jwksURL: NSURL;

	readonly registrationEndpoint: NSURL;

	readonly requestObjectEncryptionAlgorithmValuesSupported: NSArray<string>;

	readonly requestObjectEncryptionEncodingValuesSupported: NSArray<string>;

	readonly requestObjectSigningAlgorithmValuesSupported: NSArray<string>;

	readonly requestParameterSupported: boolean;

	readonly requestURIParameterSupported: boolean;

	readonly requireRequestURIRegistration: boolean;

	readonly responseModesSupported: NSArray<string>;

	readonly responseTypesSupported: NSArray<string>;

	readonly scopesSupported: NSArray<string>;

	readonly serviceDocumentation: NSURL;

	readonly subjectTypesSupported: NSArray<string>;

	readonly tokenEndpoint: NSURL;

	readonly tokenEndpointAuthMethodsSupported: NSArray<string>;

	readonly tokenEndpointAuthSigningAlgorithmValuesSupported: NSArray<string>;

	readonly userinfoEncryptionAlgorithmValuesSupported: NSArray<string>;

	readonly userinfoEncryptionEncodingValuesSupported: NSArray<string>;

	readonly userinfoEndpoint: NSURL;

	readonly userinfoSigningAlgorithmValuesSupported: NSArray<string>;

	static readonly supportsSecureCoding: boolean; // inherited from NSSecureCoding

	constructor(o: { coder: NSCoder; }); // inherited from NSCoding

	constructor(o: { dictionary: NSDictionary<any, any>; });

	constructor(o: { JSONData: NSData; });

	constructor(o: { JSON: string; });

	copyWithZone(zone: interop.Pointer | interop.Reference<any>): any;

	encodeWithCoder(coder: NSCoder): void;

	initWithCoder(coder: NSCoder): this;

	initWithDictionaryError(serviceDiscoveryDictionary: NSDictionary<any, any>): this;

	initWithJSONDataError(serviceDiscoveryJSONData: NSData): this;

	initWithJSONError(serviceDiscoveryJSON: string): this;
}

declare var OIDSubjectTypeParam: string;

declare var OIDTokenEndpointAuthenticationMethodParam: string;

declare class OIDTokenRequest extends NSObject implements NSCopying, NSSecureCoding {

	static alloc(): OIDTokenRequest; // inherited from NSObject

	static new(): OIDTokenRequest; // inherited from NSObject

	readonly additionalParameters: NSDictionary<string, string>;

	readonly authorizationCode: string;

	readonly clientID: string;

	readonly clientSecret: string;

	readonly codeVerifier: string;

	readonly configuration: OIDServiceConfiguration;

	readonly grantType: string;

	readonly redirectURL: NSURL;

	readonly refreshToken: string;

	readonly scope: string;

	static readonly supportsSecureCoding: boolean; // inherited from NSSecureCoding

	constructor(o: { coder: NSCoder; }); // inherited from NSCoding

	constructor(o: { configuration: OIDServiceConfiguration; grantType: string; authorizationCode: string; redirectURL: NSURL; clientID: string; clientSecret: string; scope: string; refreshToken: string; codeVerifier: string; additionalParameters: NSDictionary<string, string>; });

	constructor(o: { configuration: OIDServiceConfiguration; grantType: string; authorizationCode: string; redirectURL: NSURL; clientID: string; clientSecret: string; scopes: NSArray<string> | string[]; refreshToken: string; codeVerifier: string; additionalParameters: NSDictionary<string, string>; });

	URLRequest(): NSURLRequest;

	copyWithZone(zone: interop.Pointer | interop.Reference<any>): any;

	encodeWithCoder(coder: NSCoder): void;

	initWithCoder(coder: NSCoder): this;

	initWithConfigurationGrantTypeAuthorizationCodeRedirectURLClientIDClientSecretScopeRefreshTokenCodeVerifierAdditionalParameters(configuration: OIDServiceConfiguration, grantType: string, code: string, redirectURL: NSURL, clientID: string, clientSecret: string, scope: string, refreshToken: string, codeVerifier: string, additionalParameters: NSDictionary<string, string>): this;

	initWithConfigurationGrantTypeAuthorizationCodeRedirectURLClientIDClientSecretScopesRefreshTokenCodeVerifierAdditionalParameters(configuration: OIDServiceConfiguration, grantType: string, code: string, redirectURL: NSURL, clientID: string, clientSecret: string, scopes: NSArray<string> | string[], refreshToken: string, codeVerifier: string, additionalParameters: NSDictionary<string, string>): this;
}

declare class OIDTokenResponse extends NSObject implements NSCopying, NSSecureCoding {

	static alloc(): OIDTokenResponse; // inherited from NSObject

	static new(): OIDTokenResponse; // inherited from NSObject

	readonly accessToken: string;

	readonly accessTokenExpirationDate: Date;

	readonly additionalParameters: NSDictionary<string, NSObject>;

	readonly idToken: string;

	readonly refreshToken: string;

	readonly request: OIDTokenRequest;

	readonly scope: string;

	readonly tokenType: string;

	static readonly supportsSecureCoding: boolean; // inherited from NSSecureCoding

	constructor(o: { coder: NSCoder; }); // inherited from NSCoding

	constructor(o: { request: OIDTokenRequest; parameters: NSDictionary<string, NSObject>; });

	copyWithZone(zone: interop.Pointer | interop.Reference<any>): any;

	encodeWithCoder(coder: NSCoder): void;

	initWithCoder(coder: NSCoder): this;

	initWithRequestParameters(request: OIDTokenRequest, parameters: NSDictionary<string, NSObject>): this;
}

declare class OIDTokenUtilities extends NSObject {

	static alloc(): OIDTokenUtilities; // inherited from NSObject

	static encodeBase64urlNoPadding(data: NSData): string;

	static formUrlEncode(inputString: string): string;

	static new(): OIDTokenUtilities; // inherited from NSObject

	static randomURLSafeStringWithSize(size: number): string;

	static redact(inputString: string): string;

	static sha256(inputString: string): NSData;
}

declare class OIDURLQueryComponent extends NSObject {

	static URLParamValueAllowedCharacters(): NSMutableCharacterSet;

	static alloc(): OIDURLQueryComponent; // inherited from NSObject

	static new(): OIDURLQueryComponent; // inherited from NSObject

	readonly dictionaryValue: NSDictionary<string, NSObject>;

	readonly parameters: NSArray<string>;

	constructor(o: { URL: NSURL; });

	URLByReplacingQueryInURL(URL: NSURL): NSURL;

	URLEncodedParameters(): string;

	addParameterValue(parameter: string, value: string): void;

	addParameters(parameters: NSDictionary<string, string>): void;

	initWithURL(URL: NSURL): this;

	valuesForParameter(parameter: string): NSArray<string>;
}

declare class OIDURLSessionProvider extends NSObject {

	static alloc(): OIDURLSessionProvider; // inherited from NSObject

	static new(): OIDURLSessionProvider; // inherited from NSObject

	static session(): NSURLSession;

	static setSession(session: NSURLSession): void;
}

declare var gOIDURLQueryComponentForceIOS7Handling: boolean;
