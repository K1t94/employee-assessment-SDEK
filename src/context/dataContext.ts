import { Instance, unprotect } from 'mobx-state-tree'
import Models from '../models'

export class DataContext {
    static create() {
        const models = Models.create({})!;
        unprotect(models);
        return models
    }
}

export interface DataContext extends Instance<typeof Models> {}
