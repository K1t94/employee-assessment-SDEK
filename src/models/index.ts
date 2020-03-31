import { types as t } from 'mobx-state-tree'
import {User} from "./User"
import {History} from "./History"

export {
    User,
    History,
}

export default t
    .model({
        loggedIn: t.optional(t.boolean, false),
        currentUser: t.optional(User, { uid: '0', firstName: 'Vasisualii', lastName: 'Lohankin' }),
        users: t.array(User),
        histories: t.array(History),
    });
