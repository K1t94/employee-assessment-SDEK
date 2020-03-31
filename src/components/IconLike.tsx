import likeIcon from "../assests/hand.svg"
import React from "react"

interface IIconLikeProps {
    active: string;
    onMouseEnter: (val: number) => void;
    onMouseLeave: () => void;
    addLike: (val: number) => void;
    countOfLikes: number;
}

export const IconLike = (
    { active, onMouseEnter, onMouseLeave, addLike, countOfLikes }: IIconLikeProps
) => {
    return (
        <img
            className={`${active} mr-2`}
            src={likeIcon}
            width="25"
            height="25"
            alt="Like"
            onMouseEnter={() => onMouseEnter(countOfLikes)}
            onMouseLeave={() => onMouseLeave()}
            onClick={() => addLike(countOfLikes)}
        />
    )
};



