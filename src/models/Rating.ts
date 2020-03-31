import { types as t, Instance } from 'mobx-state-tree'

export const Rating = t
    .model('Rating', {
        comment: t.maybeNull(t.string),
        countsOfLikes: t.maybeNull(t.integer),
        createdAtComment: t.maybeNull(t.string),
        fromUser: t.maybeNull(t.string),
    });

export type Rating = Instance<typeof Rating>
