import { Common, ILoginResult } from "./social-login.common";

export declare class SocialLogin extends Common {
  static getInstance(): SocialLogin;
  loginWithFacebook(config?: any): Promise<Partial<ILoginResult>>;
  loginWithGoogle(config: any): Promise<Partial<ILoginResult>>;
  logout(): Promise<void>;
}
