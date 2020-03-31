import { types as t, Instance } from 'mobx-state-tree'
import {Rating} from "./Rating"

export const User = t
    .model('User', {
        uid: t.maybeNull(t.string),
        email: t.maybeNull(t.string),
        firstName: t.maybeNull(t.string),
        lastName: t.maybeNull(t.string),
        department: t.maybeNull(t.string),
        position: t.maybeNull(t.string),
        stockOfLikes: t.maybeNull(t.integer),
        likes: t.maybeNull(t.integer),
        fireBaseImgUrl: t.maybeNull(t.string),
        employeeRatings: t.array(Rating),
    });

export type User = Instance<typeof User>
