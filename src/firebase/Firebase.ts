import {initializeApp, apps, database, storage, auth, User} from 'firebase'
import {inject} from "react-ioc"
import {DataContext} from "../context/dataContext"

const config: Record<string, string> = {
    apiKey: process.env.REACT_APP_API_KEY,
    authDomain: process.env.REACT_APP_AUTH_DOMAIN,
    databaseURL: process.env.REACT_APP_DATABASE_URL,
    projectId: process.env.REACT_APP_PROJECT_ID,
    storageBucket: process.env.REACT_APP_STORAGE_BUCKET,
    messagingSenderId: process.env.REACT_APP_MESSAGING_SENDER_ID,
};

class Firebase {
    @inject public readonly dataContext: DataContext;

    private readonly _auth: auth.Auth;
    private readonly _db: database.Database;
    private readonly _storage: storage.Storage;

    constructor() {
        if (!apps.length) {
            initializeApp(config)
        }

        this._auth = auth();
        this._db = database();
        this._storage = storage();
    }

    public get currentUser(): User | { uid: string } {
        return this.auth.currentUser
    }

    protected get db(): database.Database {
        return this._db
    }

    protected get storage(): storage.Storage {
        return this._storage
    }

    protected get auth(): auth.Auth {
        return this._auth
    }
}

export default Firebase
