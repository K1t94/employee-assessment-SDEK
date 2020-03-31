import React from 'react'
import {observer} from "mobx-react"
import {useInstance} from "react-ioc"
import {UsersService} from "../services"
import {FileInput} from "../components/FileInput"

export const About = observer(() => {
    const usersService = useInstance(UsersService);

    const {
        email,
        firstName,
        lastName,
        department,
        position,
        likes,
        fireBaseImgUrl,
        stockOfLikes,
    } = usersService.authUser;

    const handleChangeImage = async (image: File) => await usersService.changeImageUser(image);

    return (
        <div className="jumbotron">
            <div className="container d-flex align-items-center justify-content-between">
                <div>
                    <div>
                        <strong>Email: </strong>
                        <span>{email}</span>
                    </div>
                    <div>
                        <strong>Full Name: </strong>
                        <span>{`${firstName} ${lastName}`}</span>
                    </div>
                    <div>
                        <strong>Department: </strong>
                        <span>{department}</span>
                    </div>
                    <div>
                        <strong>Position: </strong>
                        <span>{position}</span>
                    </div>
                    <div>
                        <strong>Likes: </strong>
                        <span>{likes}</span>
                    </div>
                    <div>
                        <strong>Stock Of Likes: </strong>
                        <span>{stockOfLikes}</span>
                    </div>
                </div>
                <div>
                    <img className="img-thumbnail" src={fireBaseImgUrl} width="250" alt="Avatar"/>
                    <FileInput onChange={handleChangeImage} />
                </div>
            </div>
        </div>
    )
});
