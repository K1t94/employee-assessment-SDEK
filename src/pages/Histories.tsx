import React, { Fragment } from 'react'
import {Assessment} from "../components/Assessment"
import {observer} from "mobx-react"
import {useInstance} from "react-ioc"
import {UsersService} from "../services"
import {User, History} from "../models"
import {Loader} from "../components/Loader"

export const Histories = observer((): JSX.Element => {
    const usersService = useInstance(UsersService);
    let { histories } = usersService;

    histories = histories.sort((a: History, b: History) => new Date(a.createdAtComment) < new Date(b.createdAtComment) ? 1 : -1);

    return (
        <Fragment>
            {!histories.length && <Loader />}
            <ul className="note">
                {
                    histories
                        .map((history: History, id: number) => <Assessment
                            key={id}
                            history={history}
                            onFindUser={(uid: string): User => usersService.findUserToUid(uid)}
                        />)
                }
            </ul>
        </Fragment>
    )
});
