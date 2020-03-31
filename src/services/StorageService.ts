import {inject} from "react-ioc"
import FirebaseDatabase from "../firebase/FirebaseDatabase"
import {applySnapshot} from "mobx-state-tree"
import {User} from "../models"
import {DataContext} from "../context/dataContext"

class StorageService {
    @inject fbDatabase: FirebaseDatabase;

    private get _dataContext(): DataContext {
        return this.fbDatabase.dataContext;
    }

    subscribeToUpdate(): void {
        this.fbDatabase.commonHistory()
            .on('value', snapshot => applySnapshot(this._dataContext.histories, snapshot.val() || []));

        this.fbDatabase.users()
            .on('value', snapshot => {
                const usersObject: Record<string, User> = snapshot.val();
                const payload: User[] = Object.keys(usersObject)
                    .map(key => {
                        const user: User = {
                            ...usersObject[key],
                            uid: key,
                        };
                        if (this._dataContext.loggedIn && key === this.fbDatabase.currentUser.uid) {
                            applySnapshot(this._dataContext.currentUser, user);
                        }
                        return user
                    });
                applySnapshot(this._dataContext.users, payload);
            });
    }

    unsubscribeFromUpdates(): void {
        this.fbDatabase.commonHistory().off();
        this.fbDatabase.users().off();
    }
}

export default StorageService
