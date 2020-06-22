export interface ILoginResult {
  id?: string;          // The user ID
  email?: string;       // The user email address
  firstName?: string;   // The user first name
  lastName?: string;    // The user last name
  displayName?: string; // The user full name
  photo?: string;       // The user profile pic url
  authToken?: string;   // The user auth token (if requested)
  authCode?: string;    // The offline auth code used by servers to request new auth tokens (if requests)
}

export class Common {
}
