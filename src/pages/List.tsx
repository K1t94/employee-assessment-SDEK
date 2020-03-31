import React, { Fragment } from 'react'
import {EmployeeInfo} from "../components/EmployeeInfo"
import {useInstance} from "react-ioc"
import {UsersService} from "../services"
import {User} from "../models"
import {observer} from "mobx-react"
import {Loader} from "../components/Loader"

export const List = observer((): JSX.Element => {
    let { users } = useInstance(UsersService);

    users = users.sort((a: User, b: User) => {
        const nameA = `${a.firstName} ${a.lastName}`.toLowerCase();
        const nameB = `${b.firstName} ${b.lastName}`.toLowerCase();
        if (nameA < nameB)
            return -1;
        if (nameA > nameB)
            return 1;
        return 0
    });

    return (
        <Fragment>
            {!users.length && <Loader />}
            {
                users.map((user: User) => <EmployeeInfo
                    key={user.uid}
                    user={user}
                />)
            }
        </Fragment>
    )
});
