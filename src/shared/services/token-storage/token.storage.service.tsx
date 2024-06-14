import { Auth } from '../../models';
import { AuthService } from '../api';

const TOKEN_KEY = 'auth-token';
const REFRESHTOKEN_KEY = 'auth-refreshtoken';
const USER_KEY = 'auth';


export class TokenStorageService {
  public isRefreshing = false;
 

  signOut(): void {
    sessionStorage.clear();
    localStorage.removeItem(REFRESHTOKEN_KEY);
  }

  public saveToken(token: string): void {
    sessionStorage.removeItem(TOKEN_KEY);
    sessionStorage.setItem(TOKEN_KEY, token);

    const user = this.getUser();
    if (user.authenticated) {
      this.saveUser({ ...user, accessToken: token });
    }
  }

  public getToken(): string | null {
    return sessionStorage.getItem(TOKEN_KEY);
  }

  public saveRefreshToken(token: string): void {
    localStorage.removeItem(REFRESHTOKEN_KEY);
    localStorage.setItem(REFRESHTOKEN_KEY, token);
  }

  public getRefreshToken(): string | null {
    return localStorage.getItem(REFRESHTOKEN_KEY);
  }

  public saveUser(user: Auth): void {
    sessionStorage.removeItem(USER_KEY);
    sessionStorage.setItem(USER_KEY, JSON.stringify(user));
  }

  public getUser(): Auth {
    const user = sessionStorage.getItem(USER_KEY);
    if (user)  return JSON.parse(user);
    return {} as Auth;
  }

  public refreshToken = async (): Promise<void> => {
    try {
      this.isRefreshing = true;
      let refreshToken: string | any = this.getRefreshToken();
      const auth = await AuthService.refreshToken(refreshToken);
      if (auth.authenticated) {
        this.isRefreshing = false;
        this.saveUser(auth);
        this.saveToken(auth.accessToken);
      } else {
        this.isRefreshing = false;
        this.signOut();
      }
    } catch (error) {
      this.isRefreshing = false;
      this.signOut();
    }
  }
}
