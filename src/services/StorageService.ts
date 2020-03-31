import {inject} from "react-ioc"
import FirebaseDatabase from "../firebase/FirebaseDatabase"
import {applySnapshot} from "mobx-state-tree"
import {User} from "../models"

class StorageService {
    @inject fbDatabase: FirebaseDatabase;

    private get _dataContext() {
        return this.fbDatabase.dataContext;
    }

    subscribeToUpdate() {
        this.fbDatabase.commonHistory()
            .on('value', snapshot => {
                applySnapshot(this._dataContext.histories, snapshot.val());
            });

        this.fbDatabase.users()
            .on('value', snapshot => {
                const usersObject = snapshot.val();
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

    unsubscribeFromUpdates() {
        this.fbDatabase.commonHistory().off();
        this.fbDatabase.users().off();
    }
}

export default StorageService
