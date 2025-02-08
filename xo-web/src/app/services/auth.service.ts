import {BehaviorSubject, lastValueFrom} from 'rxjs';
import {UserModel, UserService} from "../../generated/api";
import {Injectable} from "@angular/core";

@Injectable({
    providedIn: 'root',
})
export class AuthService {
    private jwtTokenSubject = new BehaviorSubject<string | null>(null);
    public jwtToken$ = this.jwtTokenSubject.asObservable();

    constructor(private userService: UserService) {
        const token = localStorage.getItem('jwtToken');
        if (token) {
            this.jwtTokenSubject.next(token);
        }
    }

    public async login(emailAddress: string | undefined, password: string | undefined): Promise<boolean> {
        if (!emailAddress || !password) {
            return false;
        }

        const loginRequest: UserModel = { emailAddress, password };

        const result = await lastValueFrom(this.userService.userLoginPost(loginRequest));
        if (result) {
            this.jwtTokenSubject.next(result.token);
            localStorage.setItem('jwtToken', result.token);
            return true;
        }
        
        console.log(result, "bob")

        return false;
    }

    public logout(): void {
        localStorage.removeItem('jwtToken');
        this.jwtTokenSubject.next(null);
    }

    get token(): string | null {
        return this.jwtTokenSubject.value;
    }

    public getToken(): string | null {
        return this.token;
    }

    isAuthenticated(): boolean {
        return !!this.token;
    }
}
