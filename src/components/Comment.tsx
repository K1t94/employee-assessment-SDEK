import React from 'react'
import {User} from "../models"
import {Rating} from "../models/Rating"
import moment from "moment";

interface ICommentProps {
    rating: Rating;
    onFindUser: (uid: string) => User;
}

export const Comment = ({ rating, onFindUser }: ICommentProps) => {
    const selectUser: User = onFindUser(rating.fromUser);

    const { firstName, lastName } = selectUser;

    return (
        <div className="d-flex flex-column comment">
            <strong className="d-flex">From: {firstName} {lastName}</strong>
            <small className="text-muted">{moment(rating.createdAtComment).format('DD MMM GG | HH:mm')}</small>
            <span>Comment: {rating.comment ? rating.comment : ''}</span>
        </div>
    )
};
