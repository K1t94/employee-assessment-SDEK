import { types as t, Instance } from 'mobx-state-tree'

export const History = t
    .model('History', {
        comment: t.maybeNull(t.string),
        countsOfLikes: t.maybeNull(t.integer),
        createdAtComment: t.maybeNull(t.string),
        fromUser: t.maybeNull(t.string),
        toUser: t.maybeNull(t.string),
    });

export type History = Instance<typeof History>
