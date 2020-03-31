import {database} from 'firebase'
import Firebase from "./Firebase"
import {registerIn} from "react-ioc"
import App from "../App"

@registerIn(() => App)
class FirebaseDatabase extends Firebase {
    user(uid: string): database.Reference {
        return this.db.ref(`users/${uid}`);
    }

    users(): database.Reference {
        return this.db.ref('users');
    }

    addRating(uid: string, numberRating: number): database.Reference {
        return this.db.ref(`users/${uid}/employeeRatings/${numberRating}`);
    }

    addHistory(numberHistory: number): database.Reference {
        return this.db.ref(`commonHistory/${numberHistory}`);
    }

    commonHistory(): database.Reference {
        return this.db.ref('commonHistory')
    }
}

export default FirebaseDatabase
