import React, {ChangeEvent, FormEvent, useState} from "react"
import {useInstance} from "react-ioc"
import {AuthService} from "../services"
import {FileInput} from "../components/FileInput"

export interface IRegData {
    email: string;
    password: string;
    firstName: string;
    lastName: string;
    department: string;
    position: string;
    image: File;
}

export const Registration = () => {
    const authService = useInstance(AuthService);

    const [regData, setRegData] = useState<IRegData>({
        department: '',
        email: '',
        firstName: '',
        image: undefined,
        lastName: '',
        password: '',
        position: '',
    });

    const handleChangeImage = (image: File) => {
        setRegData({ ...regData, image });
    };

    const enteringForm = (e: ChangeEvent<HTMLInputElement>) => setRegData({ ...regData, [e.target.name]: e.target.value });

    const onSubmit = async (e: FormEvent<HTMLFormElement>) => {
        e.preventDefault();
        await authService.registerAndPutInTheDatabase(regData);
    };

    return (
        <form onSubmit={onSubmit}>
            <div className="form-row">
                <div className="form-group col-md-6">
                    <label htmlFor="inputEmail4">Email</label>
                    <input
                        type="email"
                        name="email"
                        value={regData.email}
                        className="form-control"
                        onChange={enteringForm}
                    />
                </div>
                <div className="form-group col-md-6">
                    <label htmlFor="inputPassword4">Password</label>
                    <input
                        type="password"
                        name="password"
                        value={regData.password}
                        className="form-control"
                        onChange={enteringForm}
                    />
                </div>
            </div>
            <div className="form-group">
                <label htmlFor="inputAddress">First Name</label>
                <input
                    type="text"
                    name="firstName"
                    value={regData.firstName}
                    className="form-control"
                    onChange={enteringForm}
                />
            </div>
            <div className="form-group">
                <label htmlFor="inputAddress2">Last Name</label>
                <input
                    type="text"
                    name="lastName"
                    value={regData.lastName}
                    className="form-control"
                    onChange={enteringForm}
                />
            </div>
            <div className="form-row">
                <div className="form-group col-md-6">
                    <label htmlFor="inputCity">Department</label>
                    <input
                        type="text"
                        name="department"
                        value={regData.department}
                        className="form-control"
                        onChange={enteringForm}
                    />
                </div>
                <div className="form-group col-md-2">
                    <label htmlFor="inputZip">Position</label>
                    <input
                        type="text"
                        name="position"
                        value={regData.position}
                        className="form-control"
                        onChange={enteringForm}
                    />
                </div>
                <div className="form-group col-md-2">
                    <label htmlFor="inputIcon">Avatar</label>
                    <FileInput onChange={handleChangeImage} />
                </div>
            </div>
            <button type="submit" className="btn btn-primary">Submit</button>
        </form>
    )
};
