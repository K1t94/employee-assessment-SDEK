import {Unsubscribe, auth, User} from 'firebase'
import Firebase from "./Firebase"
import {registerIn} from "react-ioc"
import App from "../App"

@registerIn(() => App)
class FirebaseAuth extends Firebase {
    private _listenerAuth: Unsubscribe;

    onAuthStateChanged(): void {
        this._listenerAuth = this.auth.onAuthStateChanged((user: User) => {
            if (user) {
                this.dataContext.loggedIn = !!user;
                } else {
                this.dataContext.loggedIn = false;
            }
        })
    }

    authStateChangedOff(): void {
        this._listenerAuth();
    }

    async doCreateUserWithEmailAndPassword(email: string, password: string): Promise<auth.UserCredential> {
        return await this.auth.createUserWithEmailAndPassword(email, password)
    };

    async doSignInWithEmailAndPassword(email: string, password: string): Promise<auth.UserCredential> {
        return await this.auth.signInWithEmailAndPassword(email, password)
    };

    async doSignOut(): Promise<void> {
       return await this.auth.signOut();
    }
}

export default FirebaseAuth
