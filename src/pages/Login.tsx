import React, {FormEvent, useState} from 'react'
import {useInstance} from "react-ioc"
import {AuthService} from "../services"

export const Login = () => {
    const authService = useInstance(AuthService);

    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');

    const onSubmit = async (e: FormEvent<HTMLFormElement>) => {
        e.preventDefault();
        await authService.login(email, password)
    };

    return (
        <form onSubmit={onSubmit}>
            <div className="form-group">
                <label htmlFor="exampleInputEmail1">Email address</label>
                <input
                    type="email"
                    className="form-control"
                    value={email}
                    id="exampleInputEmail1"
                    aria-describedby="emailHelp"
                    onChange={e => setEmail(e.target.value)}
                />
                <small id="emailHelp" className="form-text text-muted">We'll never share your email with anyone else.</small>
            </div>
            <div className="form-group">
                <label htmlFor="exampleInputPassword1">Password</label>
                <input
                    type="password"
                    className="form-control"
                    value={password}
                    id="exampleInputPassword1"
                    onChange={e => setPassword(e.target.value)}
                />
            </div>
            <button className="btn btn-primary" type="submit" disabled={!email || !password}>Sign In</button>
        </form>
    )
};
