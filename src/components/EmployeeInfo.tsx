import React, {useState, useEffect} from 'react'
import {IconLike} from "./IconLike"
import {Comment} from "./Comment"
import {useInstance} from "react-ioc"
import {UsersService} from "../services"
import {User} from "../models"
import {Rating} from "../models/Rating"

export const SELECTED_LIKE = 'selectedLike';
export const ACTIVE_LIKE = 'likeActive';

interface IAssessmentProps {
    user: User;
}

export const EmployeeInfo = ({ user }: IAssessmentProps) => {
    const usersService = useInstance(UsersService);

    const [comment, setComment] = useState('');
    const [iconOneActive, setIconOneActive] = useState('');
    const [iconTwoActive, setIconTwoActive] = useState('');
    const [iconThreeActive, setIconThreeActive] = useState('');

    const { authUserId } = usersService;

    const checkEarlierPutLikes = usersService.checkUidLikes(user.employeeRatings);
    const myCountOfLikes = usersService.myCountOfLikes(user.employeeRatings);

    useEffect(() => {
        if (myCountOfLikes > 0) {
            setIconOneActive(SELECTED_LIKE);
        }
        if (myCountOfLikes === 2) {
            setIconTwoActive(SELECTED_LIKE);
        }
        if (myCountOfLikes === 3) {
            setIconTwoActive(SELECTED_LIKE);
            setIconThreeActive(SELECTED_LIKE);
        }
    }, [myCountOfLikes]);

    const dischargeHoverLike = () => {
        setIconOneActive(iconOneActive === SELECTED_LIKE ? SELECTED_LIKE : '');
        setIconTwoActive(iconTwoActive === SELECTED_LIKE ? SELECTED_LIKE : '');
        setIconThreeActive(iconThreeActive === SELECTED_LIKE ? SELECTED_LIKE : '');
    };

    const setActiveIcon = (count: number) => {
        setIconOneActive(iconOneActive === SELECTED_LIKE ? SELECTED_LIKE : ACTIVE_LIKE);

        if (count === 2) {
            setIconTwoActive(iconTwoActive === SELECTED_LIKE ? SELECTED_LIKE : ACTIVE_LIKE);
        }

        if (count === 3) {
            setIconTwoActive(iconTwoActive === SELECTED_LIKE ? SELECTED_LIKE : ACTIVE_LIKE);
            setIconThreeActive(iconThreeActive === SELECTED_LIKE ? SELECTED_LIKE : ACTIVE_LIKE);
        }
    };

    const submit = (uid: string, countOfLikes: number) => {
        if (countOfLikes - myCountOfLikes <= 0) return;

        usersService
            .sendRating(uid, countOfLikes - myCountOfLikes, comment)
            .then(() => setComment(''))
    };

    const commonPropsLikes = {
        onMouseEnter: (count: number) => setActiveIcon(count),
        onMouseLeave: dischargeHoverLike,
        addLike: (countOfLikes: number) => submit(user.uid, countOfLikes),
        checkUidLikes: () => checkEarlierPutLikes,
        myCountOfLikes,
    };

    const likesData = [
        { countOfLikes: 1, active: iconOneActive, ...commonPropsLikes },
        { countOfLikes: 2, active: iconTwoActive, ...commonPropsLikes },
        { countOfLikes: 3, active: iconThreeActive, ...commonPropsLikes },
    ];

    return (
        <li className="list-group-item d-flex justify-content-between w-100 h-100">
            <div className="d-flex flex-column align-items-start w-25">
                <div>
                    <img
                        className="img-thumbnail"
                        src={user.fireBaseImgUrl}
                        alt="Avatar"
                        width="250"
                    />
                </div>
                <div>
                    <strong>Email: </strong>
                    <span>{user.email}</span>
                </div>
                <div>
                    <strong>Full Name: </strong>
                    <span>{`${user.firstName} ${user.lastName}`}</span>
                </div>
                <div>
                    <strong>Department: </strong>
                    <span>{user.department}</span>
                </div>
                <div>
                    <strong>Position: </strong>
                    <span>{user.position}</span>
                </div>
                <div>
                    <strong>Likes: </strong>
                    <span>{user.likes}</span>
                </div>
            </div>
            <div className="d-flex flex-column justify-content-start w-25">
                {
                    user.employeeRatings.map((rating: Rating, idx: number) => <Comment
                        key={idx}
                        rating={rating}
                        onFindUser={(uid: string): User => usersService.findUserToUid(uid)}
                    />)
                }
            </div>
            {
                authUserId === user.uid ?
                    <strong>You</strong>
                    : <>
                        {
                            myCountOfLikes === 3 ? <></> :
                                <div className="d-flex flex-column w-25 h-100">
                                    <label>Comment:</label>
                                    <textarea
                                        className="form-control w-100"
                                        value={comment}
                                        onChange={e => setComment(e.target.value)}
                                    />
                                </div>
                        }
                        <div className="likes__wrapper d-flex">
                            {
                                likesData.map(data => <IconLike key={data.countOfLikes} {...data} />)
                            }
                        </div>
                    </>
            }
        </li>
    )
};
