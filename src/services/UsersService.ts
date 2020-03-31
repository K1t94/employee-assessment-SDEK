import {inject} from "react-ioc"
import {computed} from "mobx"
import {User, History} from "../models"
import FirebaseDatabase from "../firebase/FirebaseDatabase"
import {DataContext} from "../context/dataContext"
import AlertService from "./AlertService"
import FirebaseStorage from "../firebase/FirebaseStorage"

class UsersService {
    @inject fbDatabase: FirebaseDatabase;
    @inject fbStorage: FirebaseStorage;
    @inject alertService: AlertService;

    private get _dataContext(): DataContext {
        return this.fbDatabase.dataContext
    }

    @computed
    get histories(): History[] {
        return this._dataContext.histories || [];
    }

    @computed
    get authUser(): User {
        return this._dataContext.currentUser
    }

    @computed
    get authUserId(): string {
        return this.fbDatabase.currentUser.uid
    }

    @computed
    get users(): User[] {
        return this._dataContext.users || []
    }

    findUserToUid(uid: string): User {
        return this.users.find((user: User) => user.uid === uid)
    }

    checkUidLikes(comments = []): boolean {
        return comments.some(comment => comment.fromUser === this.authUserId)
    };

    myCountOfLikes(employeeRatings: any[]): number {
        return (employeeRatings.length && employeeRatings || [0])
            .map((rating: any) => rating.fromUser === this.authUserId ? rating.countsOfLikes : 0)
            .reduce((accumulator: number, currentValue: number) => accumulator + currentValue);
    }

    async changeImageUser(image: File) {
        try {
            const fireBaseImgUrl: string = await this.fbStorage.addImageWithLinkReturn(image);

            await this.fbDatabase.user(this.authUserId)
                .update({
                    fireBaseImgUrl,
                })
        } catch (e) {
            this.alertService.showAlert(e.message, 'danger');
        }
    }

    async sendRating(uid: string, setLikes: number, comment: string) {
        try {
            let likedUser: User = this.findUserToUid(uid);

            let { likes, employeeRatings } = likedUser;

            let { stockOfLikes } = this.authUser;

            if (!stockOfLikes) {
                throw 'У вас закончились лайки'
            }

            if (stockOfLikes < setLikes) {
                throw 'У вас недостаточно лайков для этой оценки'
            }

            if (!comment) {
                throw 'Необходимо оставить комментраий'
            }

            if (stockOfLikes >= setLikes) {
                stockOfLikes = stockOfLikes - setLikes;

                const rating: Record<string, string | number> = {
                    fromUser: this.authUserId,
                    createdAtComment: new Date().toJSON(),
                    comment,
                    countsOfLikes: setLikes,
                };

                let ratingsLength = 0;

                if (employeeRatings) ratingsLength = employeeRatings.length;

                await this.fbDatabase.user(this.authUserId)
                    .update({
                        stockOfLikes,
                    });

                await this.fbDatabase.addRating(uid, ratingsLength)
                    .set(rating);

                await this.fbDatabase.addHistory(this.histories.length)
                    .set({ ...rating, toUser: uid });

                await this.fbDatabase.user(uid)
                    .update({
                        likes: likes + setLikes,
                    });

                this.alertService.showAlert('Вы успешно оценили сотрудника', 'success');
            } else {
                throw 'Что-то пошло не так...'
            }
        } catch (e) {
            this.alertService.showAlert(e, 'danger');
        }
    };
}

export default UsersService
