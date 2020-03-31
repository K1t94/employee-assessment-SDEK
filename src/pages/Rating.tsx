import * as React from 'react'
import {observer} from "mobx-react"
import {useInstance} from "react-ioc"
import {UsersService} from "../services"
import {User} from "../models"

export const Rating = observer((): JSX.Element => {
    const usersService = useInstance(UsersService);
    let { users } = usersService;

    users = users.sort((a: User, b: User) => a.likes < b.likes ? 1 : -1);

    return (
        <ul>
            {
                users.map((user: User) => (
                        <li key={user.uid} className="list-group-item d-flex justify-content-between align-items-center w-100">
                            <img className="imageRating" src={user.fireBaseImgUrl} width="50" height="50" alt="Assessment Image" />
                            <strong>{user.firstName} {user.lastName}</strong>
                            <span>Всего "Спасибо": <strong>{user.likes}</strong></span>
                        </li>
                    ))
            }
        </ul>
    )
});
