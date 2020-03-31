import {auth} from 'firebase'
import {inject} from "react-ioc"
import FirebaseAuth from "../firebase/FirebaseAuth"
import AlertService from "./AlertService"
import {computed} from "mobx"
import FirebaseStorage from "../firebase/FirebaseStorage"
import FirebaseDatabase from "../firebase/FirebaseDatabase"
import {IRegData} from "../pages/Registration"
import StorageService from "./StorageService"

class AuthService {
    @inject fbAuth: FirebaseAuth;
    @inject fbStorage: FirebaseStorage;
    @inject fbDatabase: FirebaseDatabase;
    @inject storageService: StorageService;
    @inject alertService: AlertService;

    @computed
    get loggedIn(): boolean {
        return this.fbAuth.dataContext.loggedIn
    }

    showAlertError(error: Error): void {
        this.alertService.showAlert(error.message, 'danger')
    }

    subscribeToAuthenticationState(): void {
        this.fbAuth.onAuthStateChanged()
    }

    unsubscribeToAuthentication(): void {
        this.fbAuth.authStateChangedOff()
    }

    async login(email: string, password: string): Promise<void> {
        try {
            await this.fbAuth.doSignInWithEmailAndPassword(email, password);
            this.storageService.subscribeToUpdate();
        } catch (e) {
            this.showAlertError(e)
        }
    }

    async logout(): Promise<void> {
        try {
            await this.fbAuth.doSignOut();
            this.storageService.subscribeToUpdate();
        } catch (e) {
            this.showAlertError(e)
        }
    }

    async registerAndPutInTheDatabase({email, password, firstName, lastName, department, position, image}: IRegData): Promise<void> {
        try {
            if (!email || !password || !firstName || !lastName || !department || !position || !image) {
                throw new Error('Не все поля заполнены.')
            }

            if (password.length < 6) {
                throw new Error('Пароль должен содержать минимум 6 символов.')
            }

            if (!/^(([^<>()[\]\\.,;:\s@"]+(\.[^<>()[\]\\.,;:\s@"]+)*)|(".+"))@([c][d][e][k][.][r][u])$/.test(email)) {
                throw new Error('Ваш email должен оканчиваться на @cdek.ru')
            }

            const authUser: auth.UserCredential = await this.fbAuth.doCreateUserWithEmailAndPassword(email, password);

            const fireBaseImgUrl: string = await this.fbStorage.addImageWithLinkReturn(image);

            await this.fbDatabase.user(authUser.user.uid)
                .set({
                    email,
                    firstName,
                    lastName,
                    department,
                    position,
                    stockOfLikes: 3,
                    likes: 0,
                    fireBaseImgUrl,
                });
        } catch (e) {
            this.showAlertError(e)
        }
    };
}

export default AuthService
