import React from 'react'
import moment from "moment"
import plusIcon from '../assests/plus.svg'
import {User} from "../models"

export const Assessment = ({ history, onFindUser }) => {
    const fromUser: User = onFindUser(history.fromUser);
    const toUser: User = onFindUser(history.toUser);

    return (
        <li className="list-group-item d-flex flex-column w-100 note">
            <div className="d-flex justify-content-around align-items-center w-100">
                <div className="d-flex align-items-center justify-content-start w-25">
                    <img className="imageRating" src={fromUser.fireBaseImgUrl} width="50" height="50" alt="from user"/>
                    <strong className="ml-xl-3">{`${fromUser.firstName} ${fromUser.lastName}`}</strong>
                </div>
                <div className="d-flex align-items-center justify-content-start">
                    <img src={plusIcon} height="20" width="20" alt="plus"/>
                    <strong className="ml-4 text-muted">{`${history.countsOfLikes} спасибо`}</strong>
                </div>
                <div className="d-flex align-items-center justify-content-start w-25">
                    <img className="imageRating" src={toUser.fireBaseImgUrl} width="50" height="50" alt="from user"/>
                    <strong className="ml-xl-3">{`${toUser.firstName} ${toUser.lastName}`}</strong>
                </div>
                <div className="d-flex flex-column justify-content-start w-25">
                    <div className="d-flex flex-column w-100">
                        <small className="text-muted">{moment(history.createdAtComment).format('DD MMM GG | HH:mm')}</small>
                        <span className="assessmentComment">{history.comment}</span>
                    </div>
                </div>
            </div>
        </li>
    )
};
